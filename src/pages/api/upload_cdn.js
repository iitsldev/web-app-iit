import { parseCookies } from 'nookies';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to use memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(file.originalname.toLowerCase().split('.').pop());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only JPEG/JPG/PNG images are allowed'));
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export const config = {
    api: {
        bodyParser: false,
    },
};

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
        const file = await new Promise((resolve, reject) => {
            upload.single('image')(req, res, (err) => {
                if (err) return reject(err);
                resolve(req.file);
            });
        });

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = file.originalname.split('.').pop();
        const publicId = `uploads/${uniqueSuffix}`;

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    public_id: publicId,
                    resource_type: 'image',
                    format: fileExtension,
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            uploadStream.end(file.buffer);
        });

        return res.status(200).json({ filePath: result.secure_url });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: error.message || 'Failed to upload image' });
    }
}