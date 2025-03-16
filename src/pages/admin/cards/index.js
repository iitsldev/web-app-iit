// pages/api/admin/cards/index.js
import prisma from "../../../models/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const cards = await prisma.card.findMany();
            res.status(200).json(cards);
        } catch (error) {
            console.error("Error fetching cards:", error);
            res.status(500).json({ message: "Error fetching cards" });
        }
    } else if (req.method === "POST") {
        try {
            const { title, image, description, link, color, titleColor, arrowColor } = req.body;
            const newCard = await prisma.card.create({
                data: {
                    title,
                    image,
                    description,
                    link,
                    color,
                    titleColor,
                    arrowColor,
                },
            });
            res.status(201).json(newCard);
        } catch (error) {
            console.error("Error creating card:", error);
            res.status(500).json({ message: "Error creating card" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}