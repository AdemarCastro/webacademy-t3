// const http = require("http");
//
// const server = http.createServer((req, res) => {
//     if (req.method === "GET") {
//         if (req.url === "/") {
//
//         }
//     }
// });
//
// server.listen(4444);

import express, { Request, Response } from "express";
import validateEnv from "./utils/validateEnv";
import dotenv from "dotenv";

dotenv.config();
validateEnv();

// const express = require("express"); // NODE
// require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 5555;

app.get("/", (req : Request, res : Response) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Hello World! Rodando na porta ${PORT}`);
});

