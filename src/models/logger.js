import fs from 'fs/promises';

// Unified error logging function
export async function logError(message, error) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${message}: ${error.message}\nStack: ${error.stack || 'No stack trace'}\n\n`;
    const logFilePath = '/tmp/errors.log';

    console.error(`${message}:`, error);
    try {
        await fs.appendFile(logFilePath, logEntry, 'utf8');
    } catch (fsError) {
        console.error('Failed to write error to /tmp/errors.log:', fsError);
    }
}