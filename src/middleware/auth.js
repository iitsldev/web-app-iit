import { parseCookies } from 'nookies';

export function adminAuthMiddleware(handler) {
    return async (context) => {
        const { req } = context;
        const cookies = parseCookies(context); // Pass context to parseCookies

        if (!cookies.adminAuth || cookies.adminAuth !== 'true') {
            return {
                redirect: {
                    destination: '/iitadmin/login',
                    permanent: false,
                },
            };
        }

        return handler(context);
    };
}