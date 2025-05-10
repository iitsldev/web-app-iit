import Head from 'next/head';
import { useState } from 'react';

export default function ReadLog() {
    const [password, setPassword] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [environmentVariables, setEnvironmentVariables] = useState(null);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setError(null); // Clear previous errors

        try {
            const response = await fetch('/api/readfile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                setFileContent(data.fileContent);
                setEnvironmentVariables(data.environmentVariables);
            } else {
                setError(data.error || 'Something went wrong');
                setSubmitted(false); // Allow retry on error
            }
        } catch (err) {
            setError('Failed to connect to the server');
            setSubmitted(false);
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

            {submitted && fileContent && environmentVariables && (
                <div>
                    <h2>File Contents:</h2>
                    <pre>{fileContent}</pre>
                    <h2>Environment Variables:</h2>
                    <pre>{environmentVariables}</pre>
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