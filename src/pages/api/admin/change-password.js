// pages/api/admin/change-password.js (or wherever this file lives)
import { getUserById, updateUser } from '../../../models/db'; // Adjust path as needed
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const cookies = parseCookies({ req });
    const token = cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        // Verify JWT and get userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Invalid token: No userId found' });
        }

        const { currentPassword, newPassword } = req.body;

        // Fetch user by ID using Knex
        const user = await getUserById(userId);

        // Verify current password
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password using Knex
        await updateUser(userId, { password: hashedPassword });

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        if (error.message === 'User not found') {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(500).json({ error: 'Server error' });
    }
}