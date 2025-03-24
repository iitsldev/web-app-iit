import { getUserByUsername } from '../../../models/db';
import bcrypt from 'bcrypt';
import { setCookie } from 'nookies';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Create JWT token with user info
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'IIT_SECRET',
            { expiresIn: '30d' }
        );

        setCookie({ res }, 'adminAuth', token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
            httpOnly: true,
        });

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, username: user.username, role: user.role }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
}