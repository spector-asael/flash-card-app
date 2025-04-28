// controllers/cardController.js
import { addCard, deleteCardByID, updateCardByID } from "../models/models.js";

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

export const deleteCard = async (req, res) => {
    const cardId = req.params.id;

    try {
        const deletedCard = await deleteCardByID(cardId);
        res.status(200).json({ message: 'Card deleted successfully', card: deletedCard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting card: ' + error.message });
    }
};
// Controller function to handle updating the card
export async function UpdateCard(req, res) {
    try {
      const cardId = req.params.id;
      const { front, back } = req.body;
  
      const updatedCard = await updateCardByID(cardId, front, back);
  
      // Check if the card was updated successfully
      if (!updatedCard) {
        return res.status(404).json({ message: 'Card not found' }); // Return an error message
      }
  
      // If update was successful, send a success message
      return res.status(200).json({
        message: 'Card updated successfully', // Success message
        card: updatedCard, // Optionally, include the updated card data
      });
    } catch (err) {
      console.error(err);
      // Return a server error message
      return res.status(500).json({ message: 'Server Error' });
    }
  }
  