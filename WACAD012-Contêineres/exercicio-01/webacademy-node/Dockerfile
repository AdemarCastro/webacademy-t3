# Imagem baseada no node
FROM node:18.16-slim

# Diretorio padrao é o app
WORKDIR /home/app

# Copiando tudo do diretorio atual para o /app
COPY . .

# Comando a executar
# RUN npm install

# Porta
EXPOSE 4567

# Comando que irá criar o nosso contêiner
# Também poderia ser "node", "index.js"
CMD [ "npm", "start" ]

# Docker build localiza o DockerFile e cria uma imagem 
# com base nessa receita descrita nele