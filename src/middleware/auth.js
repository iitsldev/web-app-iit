export function adminAuthMiddleware(handler) {
    return async (req, res) => {
        const cookies = parseCookies({ req });

        if (!cookies.adminAuth) {
            return res.status(401).json({ error: 'Unauthorized - Please log in' });
        }

        // Attach user to req object if needed (e.g., from token or session)
        req.user = { role: 'admin' }; // Example; replace with actual logic
        return handler(req, res);
    };
}