import { PrismaClient } from "@prisma/client";
import { UsuarioDto } from "../usuario/usuario.types";
import { LoginDto } from "./auth.types";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const checkCredentials = async (credentials: LoginDto):Promise<UsuarioDto | null> => { // Promise<Partial<UsuarioDto> | null>
    const usuario = await prisma.usuario.findUnique({
        where: {email: credentials.email },
    });

    if (!usuario) return null; // Significa que a credencial não bateu de cara
    const ok = await compare(credentials.senha, usuario.senha); // Se for true = digitou a senha correta
    if (!ok) return null;
    
    // const objaux: Partial<Usuario> = usuario;
    // delete objaux.senha;
    // return objaux;

    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuarioId: usuario.tipoUsuarioId,
        createAt: usuario.createAt,
        updateAt: usuario.updateAt
    }
}