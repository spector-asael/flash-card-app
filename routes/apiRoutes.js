import { createCard, deleteCard, UpdateCard } from "../controllers/apiControllers.js";
import express from 'express'

const apiRouter = express();

apiRouter.post('/addCard', createCard);

apiRouter.delete('/delete-card/:id', deleteCard);

apiRouter.put('/edit/:id', UpdateCard);

export default apiRouter;