import { getInstituteList } from '../../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const instituteList = await getInstituteList();
            res.status(200).json(instituteList);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch institute list' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}