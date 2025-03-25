import { parseCookies } from 'nookies';

export function adminAuthMiddleware(handler) {
    return async (context) => {
        const { req } = context;
        const cookies = parseCookies(context); // Pass context to parseCookies

        if (!cookies.adminAuth) {
            return res.status(401).json({ error: 'Unauthorized - Please log in' });
        }

        return handler(context);
    };
}
