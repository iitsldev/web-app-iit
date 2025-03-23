import { getAcademicProfiles } from '../../models/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const profiles = await getAcademicProfiles();
            res.status(200).json(profiles);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch academic profiles' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}