import { parseCookies } from 'nookies';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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

// Configure AWS S3 Client
const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});

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
        const fileName = `${uniqueSuffix}.${fileExtension}`;

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `uploads/${fileName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3Client.send(new PutObjectCommand(params));

        const fileUrl = `https://${process.env.S3_S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/uploads/${fileName}`;

        return res.status(200).json({ filePath: fileUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: error.message || 'Failed to upload image' });
    }
}