import express from 'express';
import mainController from '../controllers/mainController';

const router = express.Router();

// Definindo rotas para o controlador main
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

export default router;
