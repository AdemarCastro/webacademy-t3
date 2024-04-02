import express from "express";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 4444;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta: ${PORT}.`);
});
