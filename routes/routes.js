import express from 'express';
import { renderLanding, renderHome } from '../controllers/controllers.js';

const router = express();

router.get('/', renderLanding);

router.get('/home', renderHome);

export {router};