// import fs from 'fs/promises';

export async function logError(message, error) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${message}: ${error.message}\nStack: ${error.stack || 'No stack trace'}\n\n`;
    const logFilePath = '/tmp/errors.log';

    console.error(`${message}:`, error);
    try {
        // await fs.appendFile(logFilePath, logEntry, 'utf8');
        console.error(logEntry)
    } catch (fsError) {
        console.error('Failed to write error to /tmp/errors.log:', fsError);
    }
}