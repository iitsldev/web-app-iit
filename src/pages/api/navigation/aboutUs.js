import { getAboutUsList } from '../../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const aboutUsList = await getAboutUsList();
            res.status(200).json(aboutUsList);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch aboutUs list' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}