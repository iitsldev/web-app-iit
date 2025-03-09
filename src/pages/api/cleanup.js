import fs from 'fs';
import path from 'path';
import { parseCookies } from 'nookies';
import { prisma } from '../../models/db';

async function cleanupUnusedImages() {
    try {
        const modelsWithImages = [
            'Mission', 'Card', 'DhammaLecture', 'Meditation',
            'NewsAndEvent', 'OurFocus', 'Testimonial'
        ];
        const imagePromises = modelsWithImages.map((model) =>
            prisma[model].findMany({
                select: { image: true },
                where: { image: { not: '' } }, // Simplified syntax
            })
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
        throw error;
    }
}

export default async function handler(req, res) {
    const cookies = parseCookies({ req });
    if (!cookies.adminAuth || cookies.adminAuth !== 'true') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const deletedCount = await cleanupUnusedImages();
        return res.status(200).json({ message: `Cleaned up ${deletedCount} unused images` });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to clean up images: ' + error.message });
    }
}