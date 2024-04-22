// Aqui irão ficar os esquemas de validação - para dizer o que é um produto válido e invalido
import Joi from "joi";

export const produtoSchema = Joi.object().keys({ // Validação de Objetos
    nome: Joi.string().min(3).max(50).required(), //lowercase() - Converte para minusculo | .min(10).allow("Oi") - Aceita a String 'Oi' mesmo o minimo sendo 10
    preco: Joi.number().required(), // forbiden() - Não aceita introdução de valores neste campo
    estoque: Joi.number().positive().integer().required().messages({
        'number.positive': "O {#label} precisa ser positivo. Portanto, o valor {#value} não é válido."
        // 'any.required': t('STOKY_REQUIRED') - O mais comum é traduzir os erros e enviar para o Front-end
    }),
    tags: Joi.array().items(Joi.string()) // Validação de Arrays
    // estoque: Joi.custom((values) => value === 0 ? 0 : 1) - Introduz uma função na validação
});

const produto = {
    nome: "Ademar",
    preco: 4.5,
    estoque: 10,
    tags: ["celular", "motorola"]
}

const { error, value } = produtoSchema.validate(produto);
if (error) console.log(error.details);
console.log(value);