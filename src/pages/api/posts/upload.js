import formidable from 'formidable';
import cloudinary from 'cloudinary';

// Load environment variables from the .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Cloudinary configuration (using environment variables)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = formidable({
        keepExtensions: true,
        filename: (name, ext) => `${Date.now()}-${name}${ext}`,
    });

    try {
        const [fields, files] = await form.parse(req);
        const file = files.image[0];

        // Upload image to Cloudinary
        cloudinary.v2.uploader.upload(file.filepath, {
            folder: 'iit/post_images/',
        }, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Upload to Cloudinary failed' });
            }

            // Send back Cloudinary response (URL and other details)
            res.status(200).json({
                url: result.secure_url,
                public_id: result.public_id,
                width: result.width, // Image width
                height: result.height, // Image height
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Upload failed' });
    }
}
