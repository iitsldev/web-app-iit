import Head from 'next/head';
import { useState } from 'react';
import fs from 'fs/promises'; // For async file operations
import { env } from 'process';

export default function ReadLog({ environonmentVariables, fileContent, error }) {
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        // Submit the password via POST
        const response = await fetch('/read-log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        // Reload the page to reflect the result
        if (response.ok) {
            window.location.reload();
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Read Log File</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Read log file with password" />
            </Head>

            <h1>Read Log File</h1>

            {!submitted && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">Enter Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )}

            {submitted && error && (
                <div style={{ color: 'red' }}>
                    <p>{error}</p>
                    <button onClick={() => setSubmitted(false)}>Try Again</button>
                </div>
            )}

            {submitted && fileContent && environonmentVariables && (
                <div>
                    <h2>File Contents:</h2>
                    <pre>{fileContent}</pre>
                    <h2>Envrionemental Variables:</h2>
                    <pre>{environonmentVariables}</pre>

                </div>
            )}

            <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        form {
          margin-bottom: 20px;
        }
        label {
          margin-right: 10px;
        }
        input {
          padding: 5px;
          margin-right: 10px;
        }
        button {
          padding: 5px 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
        pre {
          background-color: #f4f4f4;
          padding: 10px;
          border-radius: 5px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const filePath = '/tmp/error.log'; // File to read
    const correctPassword = process.env.LOG_READ_PASSWORD || 'iitmonk'; // Set in environment variables

    if (req.method === 'POST') {
        // Parse the POST body
        const body = await new Promise((resolve) => {
            let data = '';
            req.on('data', (chunk) => (data += chunk));
            req.on('end', () => resolve(JSON.parse(data)));
        });

        const { password } = body;

        // Validate password
        if (password !== correctPassword) {
            return {
                props: {
                    error: 'Incorrect password',
                    fileContent: null,
                },
            };
        }

        // Read the file if password is correct
        let environonmentVariables = '';
        try {
            for (const [key, value] of Object.entries(process.env)) {
                environonmentVariables += `${key}=${value}\n`;
            }
            const fileContent = await fs.readFile(filePath, 'utf8');
            return {
                props: {
                    environonmentVariables,
                    fileContent,
                    error: null,
                },
            };
        } catch (error) {
            return {
                props: {
                    error: `Failed to read file: ${error.message}`,
                    fileContent: null,
                    environonmentVariables: null,
                },
            };
        }
    }

    // For GET requests, return empty props until a POST is made
    return {
        props: {
            fileContent: null,
            error: null,
        },
    };
}