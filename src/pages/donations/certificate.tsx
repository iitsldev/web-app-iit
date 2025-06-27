'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

const CertificatePage: React.FC = () => {
    const [name, setName] = useState('Mrs Monika and Family');
    const [nameStyles, setNameStyles] = useState({ fontSize: 60, isBold: false, fontFamily: 'Comic Sans MS' });
    const [topic, setTopic] = useState('Full Day Piṇḍapāta Donation');
    const [topicStyles, setTopicStyles] = useState({ fontSize: 60, isBold: true, fontFamily: 'Great Vibes' });
    const [time, setTime] = useState('April 17th, 2025');
    const [timeStyles, setTimeStyles] = useState({ fontSize: 40, isBold: false, fontFamily: 'Arial' });
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const fontOptions = ['Comic Sans MS', 'Great Vibes', 'Arial', 'Times New Roman', 'Georgia'];

    const generateCertificate = async () => {
        setError(null);
        const canvas = canvasRef.current;
        if (!canvas) {
            setError('Canvas element not found.');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            setError('Unable to get canvas context.');
            return;
        }

        try {
            const background = new window.Image();
            background.src = 'images/certificate_background.jpg';
            background.crossOrigin = 'anonymous';

            const signature = new window.Image();
            signature.src = 'images/signature1.png';
            signature.crossOrigin = 'anonymous';

            await Promise.all([
                new Promise((resolve, reject) => {
                    background.onload = () => resolve(null);
                    background.onerror = () => reject(new Error('Failed to load background image.'));
                }),
                new Promise((resolve, reject) => {
                    signature.onload = () => resolve(null);
                    signature.onerror = () => reject(new Error('Failed to load signature image.'));
                }),
            ]);

            canvas.width = background.width;
            canvas.height = background.height;
            const width = canvas.width;
            const height = canvas.height;

            ctx.drawImage(background, 0, 0, width, height);

            // Draw name
            ctx.textAlign = 'center';
            ctx.font = `${nameStyles.isBold ? 'bold' : ''} ${nameStyles.fontSize}px "${nameStyles.fontFamily}", cursive`;
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 5;
            ctx.fillStyle = '#000000';
            ctx.fillText(name, width / 2, height * 0.4);

            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;

            // Draw topic
            ctx.font = `${topicStyles.isBold ? 'bold' : ''} ${topicStyles.fontSize}px "${topicStyles.fontFamily}", cursive`;
            ctx.fillStyle = '#000000';
            ctx.fillText(topic, width / 2, height * 0.51);

            // Draw time
            ctx.font = `${timeStyles.isBold ? 'bold' : ''} ${timeStyles.fontSize}px "${timeStyles.fontFamily}", sans-serif`;
            ctx.fillStyle = '#000000';
            ctx.fillText(time, width / 2, height * 0.62);

            // Draw signature
            const sig_height = 400;
            const signatureX = 120;
            const signatureY = height - sig_height - 120;
            ctx.drawImage(
                signature,
                signatureX,
                signatureY,
                signature.width * (sig_height / signature.height),
                sig_height
            );

            try {
                const url = canvas.toDataURL('image/png');
                setImageUrl(url);
            } catch (e) {
                setError('Failed to export canvas: Tainted canvas detected.');
            }
        } catch (e) {
            setError('Error generating certificate: ' + (e instanceof Error ? e.message : String(e)));
        }
    };

    const downloadImage = () => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'generated_certificate.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">Certificate Generator</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                <div className="col-lg-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Name Settings</h5>
                            <div className="mb-3">
                                <label className="form-label">Text:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Font Size:</label>
                                    <input
                                        type="number"
                                        value={nameStyles.fontSize}
                                        onChange={(e) => setNameStyles({ ...nameStyles, fontSize: Number(e.target.value) })}
                                        className="form-control"
                                        min="10"
                                        max="100"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Font:</label>
                                    <select
                                        value={nameStyles.fontFamily}
                                        onChange={(e) => setNameStyles({ ...nameStyles, fontFamily: e.target.value })}
                                        className="form-select"
                                    >
                                        {fontOptions.map((font) => (
                                            <option key={font} value={font}>{font}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-check pt-4">
                                        <input
                                            type="checkbox"
                                            checked={nameStyles.isBold}
                                            onChange={(e) => setNameStyles({ ...nameStyles, isBold: e.target.checked })}
                                            className="form-check-input"
                                            id="nameBold"
                                        />
                                        <label className="form-check-label" htmlFor="nameBold">Bold</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Topic Settings</h5>
                            <div className="mb-3">
                                <label className="form-label">Text:</label>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Font Size:</label>
                                    <input
                                        type="number"
                                        value={topicStyles.fontSize}
                                        onChange={(e) => setTopicStyles({ ...topicStyles, fontSize: Number(e.target.value) })}
                                        className="form-control"
                                        min="10"
                                        max="100"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Font:</label>
                                    <select
                                        value={topicStyles.fontFamily}
                                        onChange={(e) => setTopicStyles({ ...topicStyles, fontFamily: e.target.value })}
                                        className="form-select"
                                    >
                                        {fontOptions.map((font) => (
                                            <option key={font} value={font}>{font}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-check pt-4">
                                        <input
                                            type="checkbox"
                                            checked={topicStyles.isBold}
                                            onChange={(e) => setTopicStyles({ ...topicStyles, isBold: e.target.checked })}
                                            className="form-check-input"
                                            id="topicBold"
                                        />
                                        <label className="form-check-label" htmlFor="topicBold">Bold</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Time Settings</h5>
                            <div className="mb-3">
                                <label className="form-label">Text:</label>
                                <input
                                    type="text"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Font Size:</label>
                                    <input
                                        type="number"
                                        value={timeStyles.fontSize}
                                        onChange={(e) => setTimeStyles({ ...timeStyles, fontSize: Number(e.target.value) })}
                                        className="form-control"
                                        min="10"
                                        max="100"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Font:</label>
                                    <select
                                        value={timeStyles.fontFamily}
                                        onChange={(e) => setTimeStyles({ ...timeStyles, fontFamily: e.target.value })}
                                        className="form-select"
                                    >
                                        {fontOptions.map((font) => (
                                            <option key={font} value={font}>{font}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-check pt-4">
                                        <input
                                            type="checkbox"
                                            checked={timeStyles.isBold}
                                            onChange={(e) => setTimeStyles({ ...timeStyles, isBold: e.target.checked })}
                                            className="form-check-input"
                                            id="timeBold"
                                        />
                                        <label className="form-check-label" htmlFor="timeBold">Bold</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={generateCertificate}
                        className="btn btn-primary btn-lg w-100 mb-4"
                    >
                        Generate Certificate
                    </button>
                </div>

                <div className="col-lg-6">
                    {imageUrl && (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Generated Certificate</h5>
                                <Image
                                    src={imageUrl}
                                    alt="Generated Certificate"
                                    width={1131}
                                    height={1600}
                                    className="img-fluid mb-3"
                                />
                                <button
                                    onClick={downloadImage}
                                    className="btn btn-success w-100"
                                >
                                    Download Certificate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Comic+Sans+MS&display=swap');
              `}</style>
        </div>
    );
};
export default CertificatePage;