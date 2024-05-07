import express, { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkNomeIsAvaliable, createProduto, deleteProduto, listProdutos, readProduto, updateProduto } from "./produto.service";
import { CreateProdutoDto, UpdateProdutoDto } from "./produto.types";

const index = async (req: Request, res: Response) => {
    const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
    const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
    /*
    #swagger.summary = 'Listagem de produtos.'
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ProdutosArray' }
    }    
    */
    try {
        const produto = await listProdutos(skip, take);
        res.status(StatusCodes.OK).json(produto);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const create = async (req: Request, res: Response) => {
    const produto = req.body as CreateProdutoDto; // as CreateProdutoDto
    /*
    #swagger.summary = 'Adiciona um novo produto na base.'
    #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/CreateProduto' }
    }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Produto' }
    }
    */
    try {
        if (await checkNomeIsAvaliable(produto.nome)) {
            const novoProduto = await createProduto(produto);
            res.status(StatusCodes.CREATED).json(novoProduto);
        } else {
            res.status(StatusCodes.CONFLICT).json({ error: "Produto já existe" })
        }
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
    }
};

const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    /*
    #swagger.summary = 'Recupera um produto específico.'
    #swagger.parameters['id'] = { description: 'ID do produto' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Produto' }
    }
    */
    try {
        const produto = await readProduto(id);
        if (!produto) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        res.status(StatusCodes.OK).json(produto);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    /*
    #swagger.summary = 'Altera os dados de um produto.'
    #swagger.parameters['id'] = { description: 'ID do produto' }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/UpdateProdutoDto' }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Produto' }
    }
    */
    const produto = req.body as UpdateProdutoDto;
    try {
        if (await checkNomeIsAvaliable(produto.nome, id)) {
            const updatedProduto = await updateProduto(id, produto);
            res.status(StatusCodes.NO_CONTENT).json();
        } else {
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
    }
};


const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    /*
    #swagger.summary = 'Apaga um produto.'
    #swagger.parameters['id'] = { description: 'ID do produto' }  
    */
    try {
        const deletedProduto = await deleteProduto(id);
        res.status(StatusCodes.NO_CONTENT).json();
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
    }
};

export default { index, create, read, update, remove };























