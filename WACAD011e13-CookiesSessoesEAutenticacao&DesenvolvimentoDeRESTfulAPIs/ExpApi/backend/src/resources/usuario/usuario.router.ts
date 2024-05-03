import { Router } from "express";
import validateBody from "../../middlewares/validateBody";
import UsuarioController from "../usuario/usuario.controller"


const router = Router();

router.get("/", UsuarioController.index);
router.post("/", UsuarioController.create);
router.get("/:id", UsuarioController.read);
router.put("/:id", UsuarioController.update);
router.delete("/:id", UsuarioController.remove);

export default router;
