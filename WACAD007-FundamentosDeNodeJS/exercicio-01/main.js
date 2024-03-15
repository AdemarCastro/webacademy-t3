const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// Função para criar um link HTML
function createLink(filePath) {
    return `<li><a href="${filePath}">${path.basename(filePath)}</a></li>`;
}

// Função para criar um link para o diretório pai
function createParentLink(currentPath) {
    const parentPath = path.dirname(currentPath);
    if (parentPath !== '/') {
        return `<a href="${parentPath}">.. (Voltar)</a><br>`;
    } else {
        return ''; // Não há link para o diretório raiz
    }
}

const server = http.createServer((req, res) => {
    // Verifica se a URL raiz foi requisitada
    if (req.url === '/') {
        // Se a URL raiz foi requisitada, retorna um erro 400 com uma mensagem explicativa
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Por favor, especifique um diretório na URL.');
    } else {
        // Constrói o caminho absoluto do diretório especificado na URL
        const directory = path.join(__dirname, req.url);

        console.log("Diretório atual: " + directory);

        // Verifica se o caminho é um diretório
        fs.stat(directory, (err, stats) => {
            if (err) {
                // Se ocorrer um erro ao verificar o arquivo ou diretório, retorna um erro 500
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Erro ao verificar o arquivo ou diretório.');
            } else {
                if (stats.isDirectory()) {
                    // Lê o conteúdo do diretório
                    fs.readdir(directory, (err, files) => {
                        if (err) {
                            // Se ocorrer um erro ao ler o diretório, retorna um erro 500
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.end('Erro ao ler o diretório.');
                        } else {
                            // Inicia a construção da lista de arquivos e subdiretórios em HTML
                            let fileList = '<ul>';
                            // Adiciona link para o diretório pai, exceto para o diretório raiz
                            fileList += createParentLink(req.url);
                            files.forEach(file => {
                                // Constrói o caminho relativo para cada arquivo ou subdiretório
                                const filePath = path.join(req.url, file);
                                // Verifica se o item é um diretório
                                const isDirectory = fs.statSync(path.join(directory, file)).isDirectory();
                                if (isDirectory) {
                                    // Se for um diretório, cria um link para ele na lista
                                    fileList += `<li><a href="${filePath}">${file}</a></li>`;
                                } else {
                                    // Se não for um diretório, adiciona o nome do arquivo à lista
                                    fileList += createLink(filePath);
                                }
                            });
                            fileList += '</ul>';

                            // Retorna a lista de arquivos e subdiretórios como resposta HTTP com status 200
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.end(fileList);
                        }
                    });
                } else {
                    // Se for um arquivo, lê o conteúdo do arquivo
                    fs.readFile(directory, 'utf8', (err, data) => {
                        if (err) {
                            // Se ocorrer um erro ao ler o arquivo, retorna um erro 500
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.end('Erro ao ler o arquivo.');
                        } else {
                            // Retorna o conteúdo do arquivo como resposta HTTP com status 200
                            res.writeHead(200, {'Content-Type': 'text/plain'});
                            res.end(data);
                        }
                    });
                }
            }
        });
    }
});

// Define a porta em que o servidor vai escutar
const PORT = process.env.PORT || 3001;

// Inicia o servidor, ouvindo na porta definida
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
