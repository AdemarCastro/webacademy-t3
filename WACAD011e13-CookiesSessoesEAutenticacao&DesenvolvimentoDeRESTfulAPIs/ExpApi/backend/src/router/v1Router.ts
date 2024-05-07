import { Router } from "express";
import produtoRouter from "../resources/produto/produto.router";
import languageRouter from "../resources/language/language.router";
import usuarioRouter from "../resources/usuario/usuario.router";
import authRouter from '../resources/auth/auth.router';

const router = Router();

router.use(
    "/auth",
    // #swagger.tags = ['Auth']
    authRouter
);

router.use(
    "/produto",
    // #swagger.tags = ['Produto']
    produtoRouter
);

router.use(
    "/language",
    // #swagger.tags = ['Language']
    languageRouter
);

router.use(
    "/usuario",
    // #swagger.tags = ['Usuario']
    usuarioRouter
);

export default router;