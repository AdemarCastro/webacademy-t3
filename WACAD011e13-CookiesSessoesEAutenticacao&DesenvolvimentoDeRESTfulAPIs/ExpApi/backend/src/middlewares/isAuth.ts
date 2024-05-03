import { NextFunction, Request, Response } from "express";
import { TiposUsuarios } from "../resources/tipoUsuario/tipoUsuario.constants";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.tipoUsuarioId == TiposUsuarios.ADMIN) next();
    else res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
}