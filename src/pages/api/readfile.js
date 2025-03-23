// pages/api/read-file.js
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Get the file path from query parameter (e.g., ?path=/tmp/errors.log)
            const { path: filePath } = req.query;

            if (!filePath) {
                return res.status(400).json({ error: 'File path is required. Use ?path=<file-path>' });
            }

            // Sanitize and resolve the file path to prevent directory traversal
            const safePath = path.resolve('/', filePath);

            // Restrict access to only allowed directories (e.g., /tmp/ or /var/task/)
            if (!safePath.startsWith('/tmp/') && !safePath.startsWith('/var/task/')) {
                return res.status(403).json({ error: 'Access restricted to /tmp/ or /var/task/ directories' });
            }

            // Read the file
            const fileContent = await fs.readFile(safePath, 'utf8');
            res.status(200).json({ content: fileContent });
        } catch (error) {
            res.status(500).json({ error: `Failed to read file: ${error.message}` });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}