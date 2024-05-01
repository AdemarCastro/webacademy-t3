import { Router } from "express";
import authController from "./auth.controller";
import languageController from "../language/language.controller";
import usuarioRouter from "../resources/usuario/usuarioDto";
import authRouter from "../resources/auth/auth.router.ts"

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/usuario", usuarioRouter);