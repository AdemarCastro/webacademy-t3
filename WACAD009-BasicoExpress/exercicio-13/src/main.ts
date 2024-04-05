import express from 'express';
import router from "./routers/router";

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.urlencoded({extended: false}));

// Definição das rotas
app.use(router);

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta: ${PORT}.`);
})