import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { saveCompra } from "./compra.service";

const listCarrinho = (req: Request, res: Response) => {
    if (!req.session.carrinhoCompra) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Não há itens no carrinho"});
    if (!req.session.uid) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Usuário não autenticado"});
    res.status(StatusCodes.OK).json(req.session.carrinhoCompra);
};

const addItemCarrinho = (req: Request, res: Response) => {
    const id = req.params.id;
    const quantidade = parseInt(req.params.quantidade);

    if (!req.session.carrinhoCompra) req.session.carrinhoCompra = [];
    req.session.carrinhoCompra.push({ id, quantidade });

    res.status(StatusCodes.OK).json({ msg: "Item adicionado ao carrinho"});
};

const effectiveCompra = async (req: Request, res: Response) => {
    if (!req.session.carrinhoCompra) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Não há itens no carrinho"})
    if (!req.session.uid) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Usuário não autenticado"});
    try {
        await saveCompra(req.session.uid, req.session.carrinhoCompra);
        req.session.carrinhoCompra = [];
        res.status(StatusCodes.OK).json({ msg: "Compra realizada com sucesso!"});
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    };
};

export default { listCarrinho, addItemCarrinho, effectiveCompra };