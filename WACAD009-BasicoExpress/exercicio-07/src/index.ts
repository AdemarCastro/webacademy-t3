import express from "express";
import { engine } from "express-handlebars";
import path from "path";

const app = express();
const PORT = process.env.PORT || 4444;

// Configuração de Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

// Definição das Rotas
app.get("/hb1", (req, res) => {
  res.render("hb1", {
    mensagem: "Olá, você está aprendendo Express + HBS!",
    layout: false,
  });
});

app.get("/hb2", (req, res) => {
  res.render("hb2", {
    poweredByNodejs: true,
    name: "Express",
    type: "Framework",
    layout: false,
  });
});

app.get("/hb3", (req, res) => {
  const profes = [
    { nome: "David Fernandes", sala: 1238 },
    { nome: "Horácio Fernandes", sala: 1233 },
    { nome: "Edleno Moura", sala: 1236 },
    { nome: "Elaine Harada", sala: 1231 },
  ];
  res.render("hb3", { profes, layout: false });
});

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta: ${PORT}.`);
});
