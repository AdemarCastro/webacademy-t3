import { Request, Response } from 'express';
import { technologies } from '../index';

const hb1 = (req: Request, res: Response) => {
  res.render('hb1', {
    mensagem: 'Olá, você está aprendendo Express + HBS!',
    layout: "mainLayout",
  });
};

const hb2 = (req: Request, res: Response) => {
  res.render('hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
    layout: "mainLayout",
  });
};

const hb3 = (req: Request, res: Response) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];
  res.render('hb3', { profes, layout: "mainLayout", });
};

const hb4 = (req: Request, res: Response) => {
  res.render('hb4', { technologies, layout: "mainLayout", });
};

export default { hb1, hb2, hb3, hb4 }; // Exportando a função hb4