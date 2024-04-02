import express, { Request, Response } from "express";
import { LoremIpsum } from "lorem-ipsum";

const router = express.Router();
const lorem = new LoremIpsum();

router.get("/lorem/:paragraphs", (req: Request, res: Response) => {
  const paragraphs = parseInt(req.params.paragraphs, 10);
  const loremText = lorem.generateParagraphs(paragraphs);

  const formattedText = lorem.formatStrings(loremText.split("\n")).join("\n\n"); // Adiciona dois novos caracteres de linha entre os parágrafos
  res.send(formattedText);
});

export default router;
