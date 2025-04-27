import express from 'express';
import { renderHome, renderForm } from '../controllers/controllers.js';

const router = express();

router.get('/', renderHome);

router.get('/form',renderForm);

export {router};