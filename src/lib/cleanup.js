import fs from 'fs';
import path from 'path';
// import { prisma } from '../models/db';
import { knex } from '../models/db'

export async function cleanupUnusedImages() {
    try {
        // Models with image fields
        const modelsWithImages = ['newsAndEvent', 'card', 'ourFocus', 'testimonial'];

        // Get all image paths from the database
        const imagePromises = modelsWithImages.map((model) =>
            // prisma[model].findMany({
            //     select: { image: true },
            //     where: { image: { not: null } },
            // })
            knex(model).select('image').whereNotNull('image')
        );
        const imageResults = await Promise.all(imagePromises);
        const usedImages = imageResults
            .flat()
            .map((item) => item.image)
            .filter(Boolean);

        // Get all files in public/uploads
        const uploadsDir = path.join(process.cwd(), 'public/uploads');
        const uploadedFiles = fs.existsSync(uploadsDir)
            ? fs.readdirSync(uploadsDir).map((file) => `/uploads/${file}`)
            : [];

        // Find unused images
        const unusedImages = uploadedFiles.filter((file) => !usedImages.includes(file));

        // Delete unused images
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