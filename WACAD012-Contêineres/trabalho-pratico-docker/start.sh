#!/bin/sh

docker compose stop

# Função para verificar e encerrar processos nas portas especificadas
check_and_kill_processes() {
    for PORTA in 3306 8080 4444 8000; do
        # Verifica se há algum processo rodando na porta atual
        if sudo lsof -t -i:$PORTA > /dev/null; then
            # Se houver, executa o comando kill para encerrá-lo
            echo "Encerrando processo rodando na porta $PORTA..."
            sudo kill $(sudo lsof -t -i:$PORTA)
        fi
    done
}

check_and_kill_processes

# Inicia os contêineres em segundo plano 🚀
docker compose up -d

# Aguarda o contêiner "db" (mysql) estar pronto para receber conexões 🕒
echo "Aguardando banco de dados estar pronto para receber conexões..."
DB_CONTAINER_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' dblivros)
while ! nc -z $DB_CONTAINER_IP 3306; do
    echo "Verificando conectividade com o banco de dados... 🔍"
    sleep 10
done
echo "Conectividade com o banco de dados estabelecida. ✅"

# Espera um pouco mais para garantir que o banco de dados esteja totalmente inicializado 🛌
sleep 10

# Muda para o diretório onde os arquivos Prisma estão localizados
cd webacademy-livros-backend-main

echo "Executando script de migração... 🔄"
sh migrate.sh

cd ..

echo "Script de inicialização concluído. 🎉"
