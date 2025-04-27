import { getAllFlashCards } from "../models/models.js";

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
