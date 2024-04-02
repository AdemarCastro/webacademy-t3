
dotenv.config();

const express = require("express"); // NODE
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 5555;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Hello World! Rodando na porta ${PORT}`);
});