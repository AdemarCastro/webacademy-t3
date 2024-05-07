import { PrismaClient } from "@prisma/client";
import { UsuarioDto } from "../usuario/usuario.types";
import { LoginDto } from "./auth.types";
import { compare } from "bcryptjs";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";

const prisma = new PrismaClient();

export const checkCredentialsAuth = async (credentials: LoginDto): Promise<UsuarioDto | null> => { // Promise<Partial<UsuarioDto> | null>
    const usuario = await prisma.usuario.findUnique({
        where: { email: credentials.email },
    });

    if (!usuario) return null; // Significa que a credencial não bateu de cara
    const ok = await compare(credentials.senha, usuario.senha); // Se for true = digitou a senha correta
    return ok ? usuario : null;
}

export const checkCredentialsAdmin = async (id: string): Promise<boolean> => {
    const usuario = await prisma.usuario.findUnique({ where: { id }});
    if (!usuario) return false;
    console.log("Privilégios de Administraodor ativado");
    return usuario.tipoUsuarioId === TiposUsuarios.ADMIN;
}