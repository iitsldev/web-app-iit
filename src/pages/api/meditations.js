import { getMeditations } from '../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const meditations = await getMeditations();
            res.status(200).json(meditations);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch meditations' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}