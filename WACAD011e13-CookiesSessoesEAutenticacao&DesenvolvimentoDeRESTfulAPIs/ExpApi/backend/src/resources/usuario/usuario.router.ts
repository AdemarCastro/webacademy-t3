import { Router } from "express";
import validateBody from "../../middlewares/validateBody";
import { UsuarioSchema } from "../usuario/usuario.schemas";
import UsuarioController from "../usuario/usuario.controller"


const router = Router();

router.get("/", UsuarioController.index);
router.post("/", validateBody(UsuarioSchema), UsuarioController.create);
router.get("/:id", UsuarioController.read);
router.put("/:id", validateBody(UsuarioSchema), UsuarioController.update);
router.delete("/:id", UsuarioController.remove);

export default router;
