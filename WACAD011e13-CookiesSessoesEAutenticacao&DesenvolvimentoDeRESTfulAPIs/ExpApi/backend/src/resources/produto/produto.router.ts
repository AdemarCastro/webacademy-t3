import { Router } from "express";
import validateBody from "../../middlewares/validateBody";
import { produtoSchema } from "./produto.schemas";
import produtoController from "./produto.controller";
import { isAdmin } from "../../middlewares/isAdmin";
import { isAuth } from "../../middlewares/isAuth";

const router = Router();

router.get("/", produtoController.index);
router.post("/", isAdmin, validateBody(produtoSchema), produtoController.create);
router.get("/:id", produtoController.read);
router.put("/:id", isAdmin, validateBody(produtoSchema), produtoController.update);
router.delete("/:id", isAdmin, produtoController.remove);

export default router;