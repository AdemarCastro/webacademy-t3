import express, { NextFunction, Request, Response } from "express";
import validateEnv from "./utils/validateEnv";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 5555;
const LOG_PATH = process.env.LOG_PATH || "logs";

// Middleware para salvar os logs
app.use((req: Request, res: Response, next: NextFunction) => {
  const logFormat = process.env.LOG_FORMAT || "simple";
  let logData: string = "";

  if (logFormat === "simple") {
    logData = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  } else if (logFormat === "completo") {
    logData = `${new Date().toISOString()} - ${req.method} ${req.url} HTTP/${req.httpVersion} ${req.get("User-Agent")}`;
  }

  const logFilePath = path.join(__dirname, LOG_PATH, "acess.log");

  // Verifica se o diretório de logs existe
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  }

  fs.appendFileSync(logFilePath, `${logData}\n`);

  next();
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
