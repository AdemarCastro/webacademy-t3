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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
// const express = require("express"); // NODE
require("dotenv").config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5555;
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(PORT, function () {
    console.log("Hello World! Rodando na porta ".concat(PORT));
});
