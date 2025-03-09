import { getMissions } from '../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const missions = await getMissions();
            res.status(200).json(missions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch missions' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}