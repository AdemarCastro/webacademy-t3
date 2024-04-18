import express, { Request, Response } from "express";
import dotenv from "dotenv";

import validateEnv from "./utils/validateEnv";
import router from "./router"; // index

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})