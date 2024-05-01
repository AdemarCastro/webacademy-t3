import { Request, Response } from "express";
import { createUsuario } from "./usuario.service";
import { TiposUsuarios } from "./usuario.types";
import { StatusCodes } from "http-status-codes";

const index = async (req: Request, res: Response) => {};

const create = async (req: Request, res: Response) => {
    const usuario = req.body;
    const tipoUsuario = req.query.tipoUsuario;
    try {
        const novoUsuario = await createUsuario(usuario, tipoUsuario);
        res.status(StatusCodes.OK).json(novoUsuario)
    } catch (err) {
        res.status
    }
};