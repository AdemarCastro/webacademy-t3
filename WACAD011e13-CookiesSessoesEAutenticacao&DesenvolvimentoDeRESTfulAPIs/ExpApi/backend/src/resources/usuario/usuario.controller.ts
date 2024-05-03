import { Request, Response } from "express";
import { createUsuario, deleteUsuario, readUsuario, updateUsuario } from "./usuario.service";
import { CreateUsuarioDto, UpdateUsuarioDto, TipoUsuarioDto } from "./usuario.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const index = async (req: Request, res: Response) => {

};

const create = async (req: Request, res: Response) => {
    const usuario = req.body as CreateUsuarioDto;
    const tipoUsuario = req.query.tipoUsuario as TipoUsuarioDto;
    try {
        const createdUsuario = await createUsuario(usuario, tipoUsuario);
        res.status(StatusCodes.OK).json(createdUsuario);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await readUsuario(id);
        if (!usuario) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        res.status(StatusCodes.OK).json(usuario);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = req.body as UpdateUsuarioDto;
    try {
        const updatedUsuario = await updateUsuario(id, usuario);
        res.status(StatusCodes.NO_CONTENT).json(updatedUsuario);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUsuario = await deleteUsuario(id);
        res.status(StatusCodes.NO_CONTENT).json(deletedUsuario);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

export default { index, create, read, update, remove };