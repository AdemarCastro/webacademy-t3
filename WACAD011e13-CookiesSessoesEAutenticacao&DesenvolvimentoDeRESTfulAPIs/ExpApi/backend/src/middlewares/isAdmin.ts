import { Request, Response, NextFunction } from "express";
import { checkCredentialsAdmin } from "../resources/auth/auth.service";
import { StatusCodes } from "http-status-codes";

export const isAdmin = async (req: Request, res: Response, next: NextFunction ) => {
    console.log(`Verificando se o usuário ${req.session.uid} é um admin`);
    try {
        if (req.session.uid && (await checkCredentialsAdmin(req.session.uid))) next();
        else res.status(StatusCodes.FORBIDDEN).json({ msg: "Não autenticado como Admin" });
    } catch (error) {
        console.error("Erro ao verificar credenciais do admin:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Erro interno" });
    }
      
};