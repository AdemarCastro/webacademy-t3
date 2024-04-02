"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const express = require("express"); // NODE
// require("dotenv").config()
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5555;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(PORT, () => {
    console.log(`Hello World! Rodando na porta ${PORT}`);
});
