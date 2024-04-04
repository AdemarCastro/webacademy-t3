import express from "express";
import path from "path";
import router from "./router/mainRouter";
import { engine } from "express-handlebars";
import sass from "node-sass-middleware";

const app = express();
const PORT = process.env.PORT || 4444;

// Vetor de tecnologias
export const technologies = [
  { name: "Express", type: "Framework", poweredByNodejs: true },
  { name: "Laravel", type: "Framework", poweredByNodejs: false },
  { name: "React", type: "Library", poweredByNodejs: true },
  { name: "Handlebars", type: "Engine View", poweredByNodejs: true },
  { name: "Django", type: "Framework", poweredByNodejs: false },
  { name: "Docker", type: "Virtualization", poweredByNodejs: false },
  { name: "Sequelize", type: "ORM tool", poweredByNodejs: true },
];

// Configuração de Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../src/views/main/"));

app.use(
  sass({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: "compressed",
    prefix: "/css",
  })
);

app.use("/css", express.static(`${__dirname}/../public/css`));

// Definição das Rotas
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta: ${PORT}.`);
});
