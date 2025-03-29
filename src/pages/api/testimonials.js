import { getTestimonials } from '../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const testimonials = await getTestimonials();
            res.status(200).json(testimonials);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch testimonials' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}