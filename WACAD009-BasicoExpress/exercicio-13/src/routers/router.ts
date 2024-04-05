import { Router } from 'express';
import produtoController from '../controllers/produto';

const router = Router();

// Controlador Produto
router.get('/produto', produtoController.index);
router.get('/produto/create', produtoController.create);
router.post('/produto/create', produtoController.create);
router.get('/produto/update/:id', produtoController.update);
router.post('/produto/update/:id', produtoController.update);
router.get('/produto/:id', produtoController.read);
router.post('/produto/:id', produtoController.remove);

export default router;