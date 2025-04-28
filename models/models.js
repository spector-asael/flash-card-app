import pool from "../db/db.js"

export const addCard = async (front, back) => {
    const result = await pool.query(
        `INSERT INTO cards (front_text, back_text) VALUES ($1, $2) RETURNING *`,
        [front, back]
    );
    return result.rows[0];
};

export const getAllFlashCards = async () => {
    try {
        const result = await pool.query("SELECT * FROM cards");
        return result.rows;

    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }

  export const findCardByID = async (cardId) => {
    try {
        const result = await pool.query(
            "SELECT * FROM cards WHERE card_id = $1", 
            [cardId]
        );

        if (result.rows.length === 0) {
            throw new Error('Card not found');
        }

        return result.rows[0]; // Return the first result (should only be one card)
    } catch (error) {
        console.error("Error finding card:", error);
        throw new Error('Error finding card: ' + error.message);
    }
};

export const deleteCardByID = async (cardId) => {
    try {
        const result = await pool.query(
            "DELETE FROM cards WHERE card_id = $1 RETURNING *", 
            [cardId]
        );

        if (result.rows.length === 0) {
            throw new Error('Card not found');
        }

        return result.rows[0]; // Return the deleted card
    } catch (error) {
        console.error("Error deleting card:", error);
        throw new Error('Error deleting card: ' + error.message);
    }
};

export async function updateCardByID(cardId, frontText, backText ) {
    const query = `
      UPDATE cards
      SET front_text = $1, back_text = $2
      WHERE card_id = $3
      RETURNING *;
    `;
    const values = [frontText, backText, cardId];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the updated card
    } catch (err) {
      console.error('Error updating card:', err);
      throw err;
    }
  }