import { Router } from "express";
import produtoController from "../controllers/produtoController";

const produtoRouter = Router();

// Controlador Produto
produtoRouter.get("/produto", produtoController.index);
// produtoRouter.get("/produto/create", produtoController.create);
produtoRouter.post("/produto/create", produtoController.create);
// produtoRouter.get("/produto/update/:id", produtoController.update);
produtoRouter.post("/produto/update/:id", produtoController.update);
produtoRouter.get("/produto/:id", produtoController.read);
produtoRouter.delete("/produto/:id", produtoController.remove);

export default produtoRouter;
