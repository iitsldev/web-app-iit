import { S3Client, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { knex } from '../models/db';

// Configure AWS S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function cleanupUnusedImages() {
    try {
        // Models with image fields
        const modelsWithImages = ['newsAndEvent', 'card', 'ourFocus', 'testimonial'];

        // Get all image paths from the database
        const imagePromises = modelsWithImages.map((model) =>
            knex(model).select('image').whereNotNull('image')
        );
        const imageResults = await Promise.all(imagePromises);
        const usedImages = imageResults
            .flat()
            .map((item) => item.image)
            .filter(Boolean);

        // Get all files in S3 bucket under uploads/
        const listParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Prefix: 'uploads/',
        };

        const listedObjects = await s3Client.send(new ListObjectsV2Command(listParams));
        const uploadedFiles = listedObjects.Contents?.map(obj => {
            return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`;
        }) || [];

        // Find unused images
        const unusedImages = uploadedFiles.filter((file) => !usedImages.includes(file));

        // Delete unused images from S3
        for (const fileUrl of unusedImages) {
            const key = fileUrl.split('.com/')[1]; // Extract the key from the URL
            const deleteParams = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
            };

            await s3Client.send(new DeleteObjectCommand(deleteParams));
            console.log(`Deleted unused image from S3: ${fileUrl}`);
        }

        return unusedImages.length;
    } catch (error) {
        console.error('Error cleaning up S3 images:', error);
        return 0;
    }
}