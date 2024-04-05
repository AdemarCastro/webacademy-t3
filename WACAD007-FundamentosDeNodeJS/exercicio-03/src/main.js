import express from 'express';
import cors from 'cors';
import mainRouter from './routers/mainRouter.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', mainRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
