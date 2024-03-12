const http = require('http');
const fs = require('fs');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });


const server = http.createServer((req, res) => {
    // Verifica se a URL raiz foi requisitada
    if (req.url === '/') {
        // Se a URL raiz foi requisitada, retorna um erro 400 com uma mensagem explicativa
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Por favor, especifique um diretório na URL.');
    } else {
        // Constrói o caminho absoluto do diretório especificado na URL
        const directory = path.join(__dirname, req.url.slice(1));

        // Lê o conteúdo do diretório
        fs.readdir(directory, (err, files) => {
            if (err) {
                // Se ocorrer um erro ao ler o diretório, retorna um erro 500 com uma mensagem explicativa
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Erro ao ler o diretório.');
            } else {
                // Inicia a construção da lista de arquivos e subdiretórios em HTML
                let fileList = '<ul>';
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
                        fileList += `<li>${file}</li>`;
                    }
                });
                fileList += '</ul>';

                // Retorna a lista de arquivos e subdiretórios como resposta HTTP com status 200
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(fileList);
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
