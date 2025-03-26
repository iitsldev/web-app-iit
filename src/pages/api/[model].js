import { parseCookies } from 'nookies';
import fs from 'fs';
import path from 'path';
import {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    knex,
} from '../../models/db';

async function cleanupUnusedImages() {
    try {
        const modelsWithImages = ['newsAndEvent', 'card', 'ourFocus', 'testimonial'];

        modelsWithImages.forEach((model) => {
            if (!knex(model)) {
                console.error(`Model ${model} not found in Prisma client`);
            }
        });

        const imagePromises = modelsWithImages.map((model) =>
            // prisma[model].findMany({
            //     select: { image: true },
            //     where: { image: { not: null } }, // Simplified syntax
            // })
            knex(model)
                .select('image')
                .whereNotNull('image')
        );
        const imageResults = await Promise.all(imagePromises);
        const usedImages = imageResults
            .flat()
            .map((item) => item.image)
            .filter(Boolean);

        const uploadsDir = path.join(process.cwd(), 'public/uploads');
        const uploadedFiles = fs.existsSync(uploadsDir)
            ? fs.readdirSync(uploadsDir).map((file) => `/uploads/${file}`)
            : [];

        const unusedImages = uploadedFiles.filter((file) => !usedImages.includes(file));

        unusedImages.forEach((file) => {
            const filePath = path.join(process.cwd(), 'public', file);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Deleted unused image: ${file}`);
            }
        });

        return unusedImages.length;
    } catch (error) {
        console.error('Error cleaning up images:', error);
        return 0;
    }
}

export default async function handler(req, res) {
    const cookies = parseCookies({ req });
    if (!cookies.adminAuth || cookies.adminAuth !== 'true') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { model } = req.query;
    const validModels = [
        'Mission',
        'Card',
        'NavigationItem',
        'DhammaLecture',
        'FAQ',
        'Meditation',
        'NewsAndEvent',
        'OurFocus',
        'Testimonial',
    ];

    if (!validModels.includes(model)) {
        return res.status(400).json({ error: 'Invalid model' });
    }

    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                if (req.query.id) {
                    const item = await getItemById(model, req.query.id);
                    return res.status(200).json(item);
                }
                const items = await getItems(model);
                return res.status(200).json(items);

            case 'POST':
                const createdItem = await createItem(model, req.body);
                return res.status(201).json(createdItem);

            case 'PUT':
                if (!req.query.id) {
                    return res.status(400).json({ error: 'ID required for update' });
                }
                const oldItem = await getItemById(model, req.query.id);
                const updatedItem = await updateItem(model, req.query.id, req.body);
                if (oldItem.image && oldItem.image !== updatedItem.image) {
                    await cleanupUnusedImages();
                }
                return res.status(200).json(updatedItem);

            case 'DELETE':
                if (!req.query.id) {
                    return res.status(400).json({ error: 'ID required for delete' });
                }
                const deletedItem = await deleteItem(model, req.query.id);
                await cleanupUnusedImages();
                return res.status(204).json({ message: 'Deleted successfully' });

            default:
                return res.status(405).json({ error: `Method ${method} Not Allowed` });
        }
    } catch (error) {
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: `Failed to process ${model} request: ${error.message}` });
    }
}