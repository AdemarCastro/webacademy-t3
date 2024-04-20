import { Router } from 'express';
import clienteController from './cliente.controller';

const router = Router();

// Cliente controller
router.get('/', clienteController.index);
router.post('/', clienteController.create);
router.get('/:id', clienteController.read);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.remove);

export default router;