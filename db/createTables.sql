DROP TABLE IF EXISTS cards;

CREATE TABLE IF NOT EXISTS cards(
    card_id SERIAL PRIMARY KEY,
    front_text varchar(500),
    back_text varchar(500)
)