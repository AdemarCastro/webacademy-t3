#!/bin/sh

docker compose down

# Deleta imagens
docker compose down --rmi all

# Deleta volumes
docker compose down -v

# Deleta networks
docker network rm -f trabalho-pratico-docker_default
