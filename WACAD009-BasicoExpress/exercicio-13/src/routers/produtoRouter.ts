import { Router } from "express";
import produtoController from "../controllers/produtoController";

const produtoRouter : Router = Router();

// Controlador Produto
produtoRouter.get("/produto", produtoController.index);
produtoRouter.post("/produto/create", produtoController.create);
produtoRouter.post("/produto/update/:id", produtoController.update);
produtoRouter.get("/produto/:id", produtoController.read);
produtoRouter.delete("/produto/:id", produtoController.remove);

export default produtoRouter;
