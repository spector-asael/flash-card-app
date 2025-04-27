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

  }

};


