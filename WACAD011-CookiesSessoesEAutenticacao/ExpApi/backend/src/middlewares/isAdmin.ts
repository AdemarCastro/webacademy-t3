import { NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const isAdmin = (req: Request, res: Response, next: NextFunction ) => {
    if (req.session.tipoUsuarioId === TiposUsuarios.ADMIN) next();
    res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};

// export const isAuth = (req: Request, res: Response, next: NextFunction ) => {
//     if (req.session.uid) next();
//     res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
// };