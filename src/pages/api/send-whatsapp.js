import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'twilio';


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { to, body, mediaUrl } = req.body;

    if (!to || !body || !mediaUrl) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    let to2 = to;
    try {
        let from = process.env.TWILIO_PHONE_NUMBER;
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
            return res.status(500).json({ error: 'Twilio environment variables are not set' });
        }
        if (!from.startsWith('+') && !from.startsWith('whatsapp:')) {
            return res.status(500).json({ error: 'The sender number is not a whatsapp number' });
        }
        if (!to2.startsWith('+') && !to2.startsWith('whatsapp:')) {
            return res.status(500).json({ error: 'The reciever number is not an international phone number' });
        }


        if (from.startsWith("+")) {
            from = 'whatsapp:' + from
        }
        if (to2.startsWith("+")) {
            to2 = 'whatsapp:' + to2
        }
        console.log('Received request to send WhatsApp message:', { from, to2, body, mediaUrl });

        const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


        const message = await client.messages.create({
            body,
            from: from,
            to: to2,
            mediaUrl: [mediaUrl],
        });

        return res.status(200).json({ sid: message.sid });
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return res.status(500).json({ error: 'Failed to send WhatsApp message' });
    }
}