import { TiposUsuarios } from "./../tipoUsuario/tipoUsuario.constants";
import { PrismaClient } from "@prisma/client";
import { CreateUsuarioDto, TipoUsuarioDto, UsuarioDto } from "./usuario.types";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const createUsuario = async (
    usuario: CreateUsuarioDto,
    tipoUsuario: TipoUsuarioDto
): Promise<UsuarioDto> => {
    const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
    const salt = await bcrypt.genSalt(rounds); // Tornar a coisa mais demorada, para que o usuŕio não fique colocando uma senha atrás da outra
    const senhaHashed = await bcrypt.hash(usuario.senha, salt);

    const novoUsuario = await prisma.usuario.create({
        data: {
            ...usuario,
            senha: senhaHashed,
            tipoUsuarioId:
                tipoUsuario === "admin" ? TiposUsuarios.ADMIN : TiposUsuarios.CLIENT,
        },
        select: {
            id: true,
            nome: true,
            email: true,
            tipoUsuarioId: true,
            createAt: true,
            updateAt: true,
        },
    });

    return novoUsuario;
};

// Função para listar usuários
export const listUsuarios = async (
    skip?: number,
    take?: number
): Promise<UsuarioDto[]> => {
    return await prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
            tipoUsuarioId: true,
            createAt: true,
            updateAt: true,
        },
        skip,
        take,
    });
};

// Função para ler um usuário específico
export const readUsuario = async (id: string): Promise<UsuarioDto | null> => {
    return await prisma.usuario.findUnique({
        where: { id },
        select: {
            id: true,
            nome: true,
            email: true,
            tipoUsuarioId: true,
            createAt: true,
            updateAt: true,
        },
    });
};

// Função para atualizar um usuário
export const updateUsuario = async (
    id: string,
    usuario: Partial<CreateUsuarioDto>
): Promise<UsuarioDto | null> => {
    return await prisma.usuario.update({
        where: { id },
        data: usuario,
        select: {
            id: true,
            nome: true,
            email: true,
            tipoUsuarioId: true,
            createAt: true,
            updateAt: true,
        },
    });
};

// Função para deletar um usuário
export const deleteUsuario = async (id: string): Promise<UsuarioDto> => {
    return await prisma.usuario.delete({
        where: { id },
        select: {
            id: true,
            nome: true,
            email: true,
            tipoUsuarioId: true,
            createAt: true,
            updateAt: true,
        },
    });
};

// Função para verificar se um usuário com o e-mail fornecido já existe
export const buscarUsuarioPorEmail = async (email: string): Promise<boolean> => {
    const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
        select: {
            id: true,
            nome: true,
            email: true,
            tipoUsuarioId: true,
            createAt: true,
            updateAt: true,
        },
    });

    // Retorna true se o usuário existir, caso contrário false
    return !!usuarioExistente;
}
