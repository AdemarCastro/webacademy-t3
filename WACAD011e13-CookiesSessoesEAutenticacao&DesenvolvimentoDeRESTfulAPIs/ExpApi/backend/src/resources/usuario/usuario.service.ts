import { PrismaClient } from "@prisma/client";
import { CreateUsuarioDto, TiposUsuarios, UsuarioDto } from "./usuario.types";
import { genSalt, salt } from "bcryptjs";

const prisma = new PrismaClient();

export const createUsuario = async (
    usuario: CreateUsuarioDto, tipoUsuarios: TipoUsuarios
): Promise<UsuarioDto> => {
    const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
    const salt = await genSalt(10);  // Tornar a coisa mais demorada, para que o usuŕio não fique colocando uma senha atrás da outra
    const senha = await hash(usuario.senha, salt);
    return await prisma.usuario.create({
        select: { id: true, nome: true, email: true, tipoUsuarioId: true, createdAt: true, updateAt: true };
        data: {
            ... usuario,
            senha,
            tipoUsuarioId: tipoUsuarios === "admin" ? TiposUsuarios.ADMIN : TiposUsuarios.CLIENT;
        }; // É possível evitar isso criando um Mapping: Mapeia os atributos de um modelo para um Dto
    })
};