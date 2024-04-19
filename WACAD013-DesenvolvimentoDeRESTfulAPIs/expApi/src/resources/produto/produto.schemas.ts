// Aqui irão ficar os esquemas de validação - para dizer o que é um produto válido e invalido
import Joi from "joi";

export const produtoSchema = Joi.object().keys({
    nome: Joi.string().min(3).max(50).required(),
    preco: Joi.number().required(),
    estoque: Joi.number().integer().required(),
});

const produto = {
    nome: "Ademar",
    preco: 4.5,
    estoque: 10
}

const result = produtoSchema.validate(produto);
console.log(result);