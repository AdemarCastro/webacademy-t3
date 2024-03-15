// server.js

import http from 'http';
import { handleRequest } from './requestHandler.js';
import { fileURLToPath } from 'url'; // Importa fileURLToPath do módulo url
import path from 'path';

// Obtém o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
// Obtém o diretório base do arquivo atual
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    handleRequest(req, res, __dirname); // Passando o diretório base como parâmetro
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
