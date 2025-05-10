import { destroyCookie } from 'nookies';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Clear the token cookie
    destroyCookie({ res }, 'token', {
        path: '/',
    });

    res.status(200).json({ message: 'Logout successful' });
}