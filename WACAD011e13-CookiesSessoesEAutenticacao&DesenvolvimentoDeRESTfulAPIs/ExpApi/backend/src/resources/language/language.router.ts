import { Router } from "express";
import languageRouter from "./language.router";
import languageController from "./language.controller";
import validateBody from "../../middlewares/validateBody";
import { languageSchema } from "./language.schemas";

const router = Router();

router.post("/", validateBody(languageSchema), languageController.changeLanguage);

export default router;