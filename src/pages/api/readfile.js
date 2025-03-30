import fs from 'fs/promises';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { password } = req.body;
    const correctPassword = process.env.LOG_READ_PASSWORD || 'iitmonk'; // Default password if env var not set
    const filePath = '/tmp/error.log'; // Adjust this path as needed

    if (!password || password !== correctPassword) {
        return res.status(401).json({ error: 'Incorrect password' });
    }

    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        let environmentVariables = '';
        for (const [key, value] of Object.entries(process.env)) {
            environmentVariables += `${key}=${value}\n`;
        }
        return res.status(200).json({ fileContent, environmentVariables });
    } catch (error) {
        return res.status(500).json({ error: `Failed to read file: ${error.message}` });
    }
}