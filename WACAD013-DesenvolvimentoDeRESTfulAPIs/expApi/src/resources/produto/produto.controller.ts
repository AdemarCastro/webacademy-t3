import express, { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkNomeIsAvaliable, createProduto } from "./produto.service";
import { CreateProdutoDto } from "./produto.types";

const index = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ msg: "Listagem de produtos" });
}
const create = async (req: Request, res: Response) => {
    const produto = req.body as CreateProdutoDto; // as CreateProdutoDto
    try {
        if (await checkNomeIsAvaliable(produto.nome)) {
            const novoProduto = await createProduto(produto);
            res.status(StatusCodes.CREATED).json(novoProduto);
        } else {
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT)
        }
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}
const read = async (req: Request, res: Response) => {}
const update = async (req: Request, res: Response) => {}
const remove = async (req: Request, res: Response) => {}

export default { index, create, read, update, remove };























