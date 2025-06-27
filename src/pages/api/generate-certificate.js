import { createCanvas, loadImage } from 'canvas';
import cloudinary from 'cloudinary';
import path from 'path';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { donor, topic, date, id } = req.body;

    if (!donor || !topic || !date || !id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Create canvas
        const canvas = createCanvas(1131, 1600);
        const ctx = canvas.getContext('2d');

        // Load images
        const background = await loadImage(path.join(process.cwd(), 'public', 'images', 'certificate_background.jpg'));
        const signature = await loadImage(path.join(process.cwd(), 'public', 'images', 'signature1.png'));

        // Set canvas dimensions
        canvas.width = background.width;
        canvas.height = background.height;
        const width = canvas.width;
        const height = canvas.height;

        // Draw background
        ctx.drawImage(background, 0, 0, width, height);

        // Draw donor name
        ctx.textAlign = 'center';
        ctx.font = `bold 60px "Great Vibes", cursive`;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#000000';
        ctx.fillText(donor, width / 2, height * 0.4);

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // Draw topic
        ctx.font = `bold 60px "Great Vibes", cursive`;
        ctx.fillStyle = '#000000';
        ctx.fillText(topic, width / 2, height * 0.51);

        // Draw date
        ctx.font = `40px "Arial", sans-serif`;
        ctx.fillStyle = '#000000';
        ctx.fillText(new Date(date).toLocaleDateString(), width / 2, height * 0.62);

        // Draw signature
        const sig_height = 400;
        const signatureX = 120;
        const signatureY = height - sig_height - 120;
        ctx.drawImage(
            signature,
            signatureX,
            signatureY,
            signature.width * (sig_height / signature.height),
            sig_height
        );

        // Generate buffer
        const buffer = canvas.toBuffer('image/png');
        const timestamp = Date.now();
        const filename = `certificate_${id}_${timestamp}`;

        // Upload to Cloudinary using Promise
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
                {
                    public_id: filename,
                    folder: 'certificates',
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) {
                        reject(new Error('Cloudinary upload failed: ' + error.message));
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(buffer);
        });

        console.log('Certificate uploaded to Cloudinary:', result);
        res.status(200).json({ url: result.secure_url });
    } catch (error) {
        res.status(500).json({ error: 'Error generating certificate: ' + (error instanceof Error ? error.message : String(error)) });
    }
}