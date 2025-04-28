import { getAllFlashCards, findCardByID } from "../models/models.js";

export const renderHome = async (req, res) => {
    try {
        const cards = await getAllFlashCards();
        res.render("home", { cards });
      } catch (error) {
        console.error("Controller error:", error);
        res.status(500).send("Internal Server Error");
      }
}

export const renderForm = (req, res) => {
    res.render("form");
}

export const renderEdit = async (req, res) => {
    try {
        const cards = await getAllFlashCards();
        res.render("edit-card", { cards });
      } catch (error) {
        console.error("Controller error:", error);
        res.status(500).send("Internal Server Error");
      }
}

export const renderUpdateCard = async (req, res) => {
  const cardId = req.params.id;

  try {
      const card = await findCardByID(cardId);
      res.render('update-card', { card });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching card for update');
  }
};
// Controller function to render the "edit card" form
export async function renderEditCardForm(req, res) {
  try {
    const cardId = req.params.id;
    const card = await findCardById(cardId);

    if (!card) {
      return res.status(404).send('Card not found');
    }

    // Render the 'update-card' view and pass the card data
    res.render('update-card', { card });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}