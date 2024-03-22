import express, { Request, Response } from "express";
import validateEnv from "./utils/validateEnv";
import dotenv from "dotenv";

dotenv.config();
validateEnv();

function soma(a: number, b: number) : number{
    return a + b;
}

const valor : number = soma(2, 2);

const app = express();
const PORT = process.env.PORT || 5555;

app.get("/", (req : Request, res : Response) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Hello World! Rodando na porta ${PORT}`);
});

