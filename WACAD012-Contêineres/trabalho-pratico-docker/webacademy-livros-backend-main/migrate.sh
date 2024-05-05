#!/bin/sh
docker exec -it backendlivros npx prisma migrate dev --name "create-table-livros"