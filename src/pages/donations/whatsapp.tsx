import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import MainLayoutSection from '../../components/maincommonlayout/MainCommonLayoutSection';
import OurFocusCardComponent from '../../components/ourFocusCardComponent/ourFocusCardComponent';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Form, Button, Card, Alert } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar'

export default function Donation({ donations }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedDonation, setSelectedDonation] = useState<any | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Create an array for card components to view in card slider
    const cards = donations.map((data, index) => (
        <OurFocusCardComponent
            key={index}
            cardData={{
                id: data.id,
                title: data.topic,
                donor: data.donor,
                amount: data.amount,
                date: new Date(data.date).toLocaleDateString(),
            }}
        />
    ));

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

    // Handle date selection
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            const donationOnDate = donations.find(
                (d) => new Date(d.date).toDateString() === date.toDateString()
            );
            setSelectedDonation(donationOnDate || null);
        } else {
            setSelectedDonation(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Donations</title>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="Support the International Institute of Theravada through donations"
                />
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            </Head>

            <Header />

            <MainLayoutSection
                title="Donations"
                description="Your generous contributions help sustain the Buddha Sāsana and support the International Institute of Theravada."
                photo="/DonationSangha.png"
                backgroundImg="url(/Ellipse-6.svg)"
                info={undefined}
            />

            <main className="container mx-auto px-4 py-12">
                {imageUrl && (
                    <section className="bg-white shadow-xl rounded-2xl p-8 mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Donation Certificate</h2>
                        <div className="flex justify-center">
                            <Image
                                src={imageUrl}
                                alt="Generated Certificate"
                                width={1131}
                                height={1600}
                                className="rounded-lg shadow-md max-w-full h-auto"
                            />
                        </div>
                        <Button
                            variant="success"
                            className="mt-4 w-full font-semibold py-2 rounded-lg"
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = imageUrl;
                                link.download = 'donation_certificate.png';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                        >
                            Download Certificate
                        </Button>
                    </section>
                )}

                <canvas ref={canvasRef} style={{ display: 'none' }} />

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Donation Calendar</h2>
                    <Card className="shadow-lg rounded-lg p-6">
                        <Form.Group>
                            <Calendar
                                selected={selectedDate}
                                onChange={handleDateChange}
                                highlightDates={donations.map((d) => new Date(d.date))}
                                inline
                                className="w-full"
                            />
                        </Form.Group>
                    </Card>
                </section>

                {selectedDate && selectedDonation && (
                    <section className="mb-12">
                        <Card className="shadow-lg rounded-lg">
                            <Card.Body>
                                <Card.Title className="text-xl font-semibold text-gray-800 mb-4">
                                    {selectedDonation.donor}
                                </Card.Title>
                                <Card.Text className="text-gray-600">
                                    Topic: {selectedDonation.topic}
                                </Card.Text>
                                <Card.Text className="text-gray-600">
                                    Amount: {selectedDonation.amount}
                                </Card.Text>
                                <Card.Text className="text-gray-600">
                                    Date: {new Date(selectedDonation.date).toLocaleDateString()}
                                </Card.Text>
                                {selectedDonation.phoneNumber && (
                                    <Button
                                        variant="primary"
                                        className="mt-4 font-semibold py-2 rounded-lg"
                                        onClick={() => sendWhatsAppMessage(selectedDonation)}
                                    >
                                        Send Certificate via WhatsApp
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </section>
                )}

                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Donation History</h2>
                    {error && (
                        <Alert variant="danger" className="mb-6">
                            {error}
                        </Alert>
                    )}
                    {donations.map((donation) => (
                        <Card key={donation.id} className="shadow-lg rounded-lg mb-4">
                            <Card.Body>
                                <Card.Title className="text-xl font-semibold text-gray-800 mb-4">
                                    {donation.donor}
                                </Card.Title>
                                <Card.Text className="text-gray-600">
                                    Topic: {donation.topic}
                                </Card.Text>
                                <Card.Text className="text-gray-600">
                                    Amount: {donation.amount}
                                </Card.Text>
                                <Card.Text className="text-gray-600">
                                    Date: {new Date(donation.date).toLocaleDateString()}
                                </Card.Text>
                                {donation.phoneNumber && (
                                    <Button
                                        variant="primary"
                                        className="mt-4 font-semibold py-2 rounded-lg"
                                        onClick={() => sendWhatsAppMessage(donation)}
                                    >
                                        Send Certificate via WhatsApp
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </section>
            </main>

            <Footer />

            <style jsx global>{`
                .has-donation {
                    background-color: #ff4444 !important;
                    color: white !important;
                    border-radius: 50%;
                }
                .react-bootstrap-datepicker {
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .card {
                    transition: transform 0.2s;
                }
                .card:hover {
                    transform: translateY(-5px);
                }
                .btn-primary, .btn-success {
                    transition: background-color 0.3s, transform 0.2s;
                }
                .btn-primary:hover, .btn-success:hover {
                    transform: scale(1.05);
                }
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
                    donations: [],
                },
            };
        }
        donations = (await response.json()).reverse();
    } catch (error) {
        const errorMsg = `Unexpected error in getServerSideProps: ${error.message}`;
        console.error(errorMsg);
        return {
            props: {
                donations: [],
            },
        };
    }

    return {
        props: {
            donations,
        },
    };
}