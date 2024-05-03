import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { TiposUsuarios } from "../resources/tipoUsuario/tipoUsuario.constants";

export const isAdmin = (req: Request, res: Response, next: NextFunction ) => {
    if (req.session.tipoUsuarioId === TiposUsuarios.ADMIN) next();
    res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};

// export const isAuth = (req: Request, res: Response, next: NextFunction ) => {
//     if (req.session.uid) next();
//     res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
// };