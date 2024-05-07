// Arquivo src/swagger.ts
import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();
const doc = {
    info: {
        title: "API da Loja virtual",
        description: "Documentação da API",
    },
    host: `${process.env.HOST}:${process.env.PORT}`,
    definitions: {
        CreateProdutoDto: {
            nome: "Martelo",
            preco: 29.0,
            estoque: 10,
        },
        Produto: {
            id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
            nome: "Bacon",
            preco: 261,
            estoque: 1,
            createdAt: "2023-11-07T19:27:15.645Z",
            updatedAt: "2023-11-07T19:27:15.645Z",
        },
    },
};
const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];
swaggerAutogen()(outputFile, routes, doc);