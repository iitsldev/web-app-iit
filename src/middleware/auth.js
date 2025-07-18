import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

export function adminAuthMiddleware(handler) {
    return async (context) => {
        const { req } = context;
        const cookies = parseCookies(context);
        const token = cookies.token;

        if (!token) {
            return {
                redirect: {
                    destination: '/admin/login',
                    permanent: false,
                },
            };
        }

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Optionally attach userId to req if needed downstream
            req.userId = decoded.userId;
            req.username = decoded.username;
            req.role = decoded.role;
            return handler(context);
        } catch (error) {
            console.error('Auth error:', error);
            return {
                redirect: {
                    destination: '/admin/login',
                    permanent: false,
                },
            };
        }
    };
}