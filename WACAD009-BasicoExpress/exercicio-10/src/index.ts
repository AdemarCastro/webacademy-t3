import express from 'express';
import path from 'path';
import router from './router/mainRouter';
import { engine } from 'express-handlebars';

const app = express();
const PORT = process.env.PORT || 4444;

// Vetor de tecnologias
export const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
];

// Configuração de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../src/views/main/'));

// Definição das Rotas
app.use(router);

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta: ${PORT}.`);
});
