import express from 'express';

import { renderHome, renderForm, renderEdit } from '../controllers/controllers.js';

import { renderHome, renderForm } from '../controllers/controllers.js';


const router = express();

router.get('/', renderHome);

router.get('/form',renderForm);


router.get('/edit', renderEdit);


export {router};