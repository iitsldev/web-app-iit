import { getEduList } from '../../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const eduList = await getEduList();
            res.status(200).json(eduList);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch edu list' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}