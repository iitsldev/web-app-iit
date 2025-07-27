import { getCarousel } from '../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const carousel = await getCarousel();
            res.status(200).json(carousel);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch carousel' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}