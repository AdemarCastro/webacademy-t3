import { Request, Response } from "express";
import { createUsuario } from "../usuario/usuario.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkPreferences } from "joi";
import { checkCredentials } from "./auth.service";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";

const signup = async (req: Request, res: Response) => {
    const usuario = req.body;
    try {
        const novoUsuario = await createUsuario({
            ...usuario,
            tipoUsuarioId: TiposUsuarios.CLIENT
        });
        res.status(StatusCodes.CREATED).json(novoUsuario);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const login = async (req: Request, res: Response) => {
    const credentials = req.body;
    try {
        const usuario = checkCredentials(credentials)
        if (!usuario) return res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED)
        req.session.uid = usuario.id;
        req.session.tipoUsuarioId = usuario.tipoUsuarioId;
        res.status(StatusCodes.OK).json(usuario)
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const logout = async (req: Request, res: Response) => {
    if (req.session.uid) {
        req.session.destroy(() => {
            res.status(StatusCodes.OK).json(ReasonPhrases.OK)
        });
    }
};

export default { signup, login, logout };