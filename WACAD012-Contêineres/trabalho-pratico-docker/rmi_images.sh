#!/bin/sh

docker compose down

# Deleta imagens
docker rmi trabalho-pratico-docker-backend:latest 
docker rmi trabalho-pratico-docker-frontend:latest 
docker rmi mysql:8
docker rmi phpmyadmin:5

# Deleta volumes
docker volume rm trabalho-pratico-docker_mysql_data
docker volume rm trabalho-pratico-docker_mysql_config
