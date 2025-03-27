// pages/api/admin/cleanup-images.js (or wherever this file lives)
import fs from 'fs';
import path from 'path';
import { parseCookies } from 'nookies';
import db from '../../models/db'; // Adjust path as needed

async function cleanupUnusedImages() {
    try {
        // Fetch all used image paths from the database
        const usedImages = await db.getAllImages();

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
        throw error;
    }
}

export default async function handler(req, res) {

    const cookies = parseCookies({ req });
    const token = cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
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