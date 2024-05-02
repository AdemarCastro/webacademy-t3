import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // 4.6k (gzipped: 1.8k)
import { v4 as uuidv4 } from "uuid"; // A 4 só usa dados pseudo randomicos mesmo
import session from "express-session";

import validateEnv from "./utils/validateEnv";
import router from "./router"; // index
import setLangCookie from "./middlewares/setLangCookie";

dotenv.config();
validateEnv();

declare module "express-session" {
    interface SessionData {
        uid: String,
        tipoUsuarioId: String
    }
}

const app = express();
const PORT = process.env.PORT ?? 4444;

app.use(cookieParser()); // Precisa vir antes do setLangCookie
app.use(session({
    genid: () => uuidv4(),
    secret: "StMf#She#mj34se#dSm", // Serve para identificar se o genid foi gerado por este ambiente
    resave: true, // O usuário perde a sessão 2h após fazer a conexão
    saveUninitialized: true // O usuário vai poder armazenar itens no carrinho de compra, mesmo não estando logado, basta deixar true aqui
}));
app.use(setLangCookie);
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})