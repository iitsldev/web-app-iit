import { prisma } from '../../../models/db'; // Adjust path as needed
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

        // Fetch user by ID, not username
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        if (error instanceof Prisma.PrismaClientValidationError) {
            return res.status(400).json({ error: 'Database query error' });
        }
        res.status(500).json({ error: 'Server error' });
    }
}