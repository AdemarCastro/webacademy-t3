import express from 'express';
import {getInicio, getLoremIpsum} from '../controllers/mainController.js';

const router = express.Router();

// Rota para GET e POST na raiz
router.route('/lorem').get(getLoremIpsum);
router.route('/').get(getInicio);

export default router;
