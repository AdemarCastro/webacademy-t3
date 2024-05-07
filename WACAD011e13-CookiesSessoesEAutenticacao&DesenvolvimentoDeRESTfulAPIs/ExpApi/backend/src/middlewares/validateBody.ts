import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema } from "joi"; // Schema representa o Objeto de Validação

// Vamos validar o Body
const validateBody = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        });
        if (error) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
        else next();
    }
};

export default validateBody;