// controllers/cardController.js
import { addCard } from "../models/models.js";

export const createCard = async (req, res) => {
    const { front, back } = req.body;

    if (!front || !back) {
        return res.status(400).json({ error: "Front and Back text are required." });
    }

    if (front.length > 500 || back.length > 500) {
        return res.status(400).json({ error: "Text exceeds allowed length (500 characters)." });
    }

    try {
        const card = await addCard(front, back);
        res.status(201).json(card);
    } catch (err) {
        console.error("Error creating card:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
