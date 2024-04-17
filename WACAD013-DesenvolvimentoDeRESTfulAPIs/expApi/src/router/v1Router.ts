import { Router } from "express";
import produtoRouter from "../resources/produto/produto.router";

const router = Router();

router.use("/produto", produtoRouter); // Quando for digitado o /produto será direcionado para o produtoRouter

export default router;