import express from "express";
import produtoRouter from "./routers/produtoRouter";

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Definição das rotas
app.use(produtoRouter);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta: ${PORT}.`);
});
