import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth";
import compraController from "./compra.controller";

const router = Router();

router.get("/", isAuth, compraController.listCarrinho);
router.post("/:id/:quantidade", isAuth, compraController.addItemCarrinho);
router.post("/", isAuth, compraController.effectiveCompra);

export default router;