import { getOurFocus } from '../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const newsAndEvents = await getOurFocus();
            res.status(200).json(newsAndEvents);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch news and events' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}