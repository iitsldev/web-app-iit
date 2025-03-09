import { getFAQs as getGeneralFAQs } from '../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const cards = await getGeneralFAQs();
            res.status(200).json(cards);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch cards' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}