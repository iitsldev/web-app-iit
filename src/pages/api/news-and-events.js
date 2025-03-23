import { getNewsAndEvents } from '../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { id, type, limit } = req.query;

            const newsAndEvents = await getNewsAndEvents({
                id,
                type,
                limit,
            });

            res.status(200).json(newsAndEvents);
        } catch (error) {
            if (error.message === 'News or event not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: 'Failed to fetch news and events' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}