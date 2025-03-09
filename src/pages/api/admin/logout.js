import { destroyCookie } from 'nookies';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    destroyCookie({ res }, 'adminAuth', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
}