import { createCard } from "../controllers/apiControllers.js";
import express from 'express'

const apiRouter = express();

apiRouter.post('/addCard', createCard);

export default apiRouter;