import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // 4.6k (gzipped: 1.8k) 

import validateEnv from "./utils/validateEnv";
import router from "./router"; // index
import setLangCookie from "./middlewares/setLangCookie";

dotenv.config();
validateEnv();


const app = express();
const PORT = process.env.PORT || 4444;

app.use(cookieParser()); // Precisa vir antes do setLangCookie
app.use(setLangCookie);
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})