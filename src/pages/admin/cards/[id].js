// pages/api/admin/cards/[id].js
import prisma from "../../../models/db";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const card = await prisma.card.findUnique({
                where: { id: parseInt(id) },
            });
            if (!card) {
                return res.status(404).json({ message: "Card not found" });
            }
            res.status(200).json(card);
        } catch (error) {
            console.error("Error fetching card:", error);
            res.status(500).json({ message: "Error fetching card" });
        }
    } else if (req.method === "PUT") {
        try {
            const { title, image, description, link, color, titleColor, arrowColor } = req.body;
            const updatedCard = await prisma.card.update({
                where: { id: parseInt(id) },
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
            res.status(200).json(updatedCard);
        } catch (error) {
            console.error("Error updating card:", error);
            res.status(500).json({ message: "Error updating card" });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.card.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({ message: "Card deleted" });
        } catch (error) {
            console.error("Error deleting card:", error);
            res.status(500).json({ message: "Error deleting card" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}