import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const isAuth = (req: Request, res: Response, next: NextFunction ) => {
    if (req.session.uid) next();
    res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};