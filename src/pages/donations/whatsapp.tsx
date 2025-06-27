import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import MainLayoutSection from '../../components/maincommonlayout/MainCommonLayoutSection';
import OurFocusCardComponent from '../../components/ourFocusCardComponent/ourFocusCardComponent';
import styles from './donation.module.css';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

export default function Donation({ donations }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Create an array for card components to view in card slider
    const cards = donations.map((data, index) => {
        return <OurFocusCardComponent key={index} cardData={{
            id: data.id,
            title: data.topic,
            donor: data.donor,
            amount: data.amount,
            date: new Date(data.date).toLocaleDateString(),
        }} />;
    });

    const { t, lang } = useTranslation();
    const router = useRouter();

    // Certificate generation
    const generateCertificate = async (donation) => {
        setError(null);
        try {
            const response = await fetch('/api/generate-certificate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    donor: donation.donor,
                    topic: donation.topic,
                    date: donation.date,
                    id: donation.id,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to generate certificate: ${response.statusText}`);
            }

            const { url } = await response.json();
            setImageUrl(url);
            return { url };
        } catch (e) {
            setError('Error generating certificate: ' + (e instanceof Error ? e.message : String(e)));
            return null;
        }
    };

    // Send WhatsApp message
    const sendWhatsAppMessage = async (donation) => {
        try {
            const result = await generateCertificate(donation);
            if (!result || !donation.phoneNumber) return;

            const { url } = result;

            const response = await fetch('/api/send-whatsapp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: `whatsapp:${donation.phoneNumber}`,
                    body: `Thank you for your donation of ${donation.amount} for ${donation.topic} on ${new Date(donation.date).toLocaleDateString()}.`,
                    mediaUrl: url,
                }),
            });

            if (!response.ok) {
                setError(`Failed to send WhatsApp message: ${response.statusText}`);
            }
        } catch (error) {
            setError('Error sending WhatsApp message: ' + (error instanceof Error ? error.message : String(error)));
        }
    };

    return (
        <div className="skeleton">
            <Head>
                <title>Donations</title>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="Support the International Institute of Theravada through donations"
                />
            </Head>

            <div className="navbarCarouselWrapper contact">
                <Header />
            </div>

            <MainLayoutSection
                title="Donations"
                description="Your generous contributions help sustain the Buddha Sāsana and support the International Institute of Theravada."
                photo="/DonationSangha.png"
                backgroundImg="url(/Ellipse-6.svg)" info={undefined} />

            {imageUrl && (
                <div className="container py-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Generated Donation Certificate</h5>
                            <Image
                                src={imageUrl}
                                alt="Generated Certificate"
                                width={1131}
                                height={1600}
                                className="img-fluid mb-3"
                            />
                            <button
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = imageUrl;
                                    link.download = 'donation_certificate.png';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                                className="btn btn-success w-100"
                            >
                                Download Certificate
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <div className="container py-5">
                <h2>Send Donation Certificate</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {donations.map((donation) => (
                    <div key={donation.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{donation.donor}</h5>
                            <p>Topic: {donation.topic}</p>
                            <p>Amount: {donation.amount}</p>
                            <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
                            {donation.phoneNumber && (
                                <button
                                    onClick={() => sendWhatsAppMessage(donation)}
                                    className="btn btn-primary"
                                >
                                    Send Certificate via WhatsApp
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Footer />

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Comic+Sans+MS&display=swap');
      `}</style>
        </div>
    );
}

export async function getServerSideProps(context) {
    let donations = [];


    try {
        // Fetch Donations
        const response = await fetch(`${process.env.API_BASE_URL}/api/donation`);
        if (!response.ok) {
            const errorMsg = `Failed to fetch donations: ${response.status}`;
            console.error(errorMsg);
            return {
                props: {
                    donations: [], // Return empty array on failure
                },
            };
        }
        donations = (await response.json()).reverse();
    } catch (error) {
        // Catch unexpected errors (e.g., network issues, JSON parsing errors)
        const errorMsg = `Unexpected error in getServerSideProps: ${error.message}`;
        console.error(errorMsg);
        return {
            props: {
                donations: [], // Return empty array on failure
            },
        };
    }

    return {
        props: {
            donations,
        },
    };
}