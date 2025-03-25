import { prisma } from '../../../models/db';
import { adminAuthMiddleware } from '../../../middleware/auth';
import bcrypt from 'bcrypt';

export default adminAuthMiddleware(async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role
            }
        });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user', message: error.message });
    }
});