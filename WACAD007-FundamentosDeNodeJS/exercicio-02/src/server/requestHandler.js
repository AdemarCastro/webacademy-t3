// requestHandler.js

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// Função para criar um link HTML
export function createLink(filePath) {
    return `<li><a href="${filePath}">${path.basename(filePath)}</a></li>`;
}

// Função para criar um link para o diretório pai
export function createParentLink(currentPath) {
    const parentPath = path.dirname(currentPath);
    if (parentPath !== '/') {
        return `<a href="${parentPath}">.. (Voltar)</a><br>`;
    } else {
        return ''; // Não há link para o diretório raiz
    }
}

// Função para lidar com as solicitações
export async function handleRequest(req, res, currentDir) {
    // Verifica se a URL raiz foi requisitada
    if (req.url === '/') {
        // Se a URL raiz foi requisitada, retorna um erro 400 com uma mensagem explicativa
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Por favor, especifique um diretório na URL.');
    } else if (req.url === '/favicon.ico') {
        // Se a solicitação for para o arquivo favicon.ico, retorna um código 204 (No Content)
        res.writeHead(204);
        res.end();
    } else {
        // Constrói o caminho absoluto do diretório especificado na URL
        const directory = path.join(currentDir, req.url);

        console.log(directory);

        try {
            // Verifica se o caminho é um diretório
            const stats = await fs.promises.stat(directory);

            if (stats.isDirectory()) {
                // Lê o conteúdo do diretório
                const files = await fs.promises.readdir(directory);

                // Inicia a construção da lista de arquivos e subdiretórios em HTML
                let fileList = '<ul>';
                // Adiciona link para o diretório pai, exceto para o diretório raiz
                fileList += createParentLink(req.url);

                // Loop síncrono para verificar cada arquivo ou subdiretório
                for (const file of files) {
                    // Constrói o caminho relativo para cada arquivo ou subdiretório
                    const filePath = path.join(req.url, file);
                    // Verifica se o item é um diretório
                    const itemStats = await fs.promises.stat(path.join(directory, file));
                    const isDirectory = itemStats.isDirectory();

                    if (isDirectory) {
                        // Se for um diretório, cria um link para ele na lista
                        fileList += `<li><a href="${filePath}">${file}</a></li>`;
                    } else {
                        // Se não for um diretório, adiciona o nome do arquivo à lista
                        fileList += createLink(filePath);
                    }
                }

                fileList += '</ul>';

                // Retorna a lista de arquivos e subdiretórios como resposta HTTP com status 200
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(fileList);
            } else {
                // Se for um arquivo, lê o conteúdo do arquivo
                const data = await fs.promises.readFile(directory, 'utf8');
                // Retorna o conteúdo do arquivo como resposta HTTP com status 200
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data);
            }
        } catch (err) {
            console.error('Erro ao verificar o arquivo ou diretório:', err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Erro ao verificar o arquivo ou diretório.');
        }
    }
}

