import express from 'express';
import { renderHome, renderForm, renderEdit, renderUpdateCard, renderEditCardForm} from '../controllers/controllers.js';

const router = express();

router.get('/', renderHome);

router.get('/form',renderForm);

router.get('/edit', renderEdit);

router.get('/update-card/:id', renderUpdateCard)

router.get('/edit/:id', renderEditCardForm);

export {router};