// usuario.schemas.ts

import Joi from "joi";

export const CreateUsuarioSchema = Joi.object({
    nome: Joi.string().min(1).required(),
    email: Joi.string().email().min(1).required(),
    tipoUsuarioId: Joi.string().min(1).required(),
    // Adicione outros campos conforme necessário
});

export const UpdateUsuarioSchema = Joi.object({
    nome: Joi.string().optional(),
    email: Joi.string().email().optional(),
    tipoUsuarioId: Joi.string().optional(),
    // Adicione outros campos conforme necessário
});

export const UsuarioSchema = Joi.object({
    id: Joi.string(),
    nome: Joi.string(),
    email: Joi.string(),
    tipoUsuarioId: Joi.string(),
    createAt: Joi.date(),
    updateAt: Joi.date(),
});
