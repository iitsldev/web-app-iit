import { parseCookies } from 'nookies';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file storage
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = 'public/uploads';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only JPEG/JPG/PNG images are allowed'));
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Disable Next.js body parsing for this route
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const cookies = parseCookies({ req });
    if (!cookies.adminAuth || cookies.adminAuth !== 'true') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        await new Promise((resolve, reject) => {
            upload.single('image')(req, res, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = `/uploads/${file.filename}`;
        return res.status(200).json({ filePath });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: error.message || 'Failed to upload image' });
    }
}