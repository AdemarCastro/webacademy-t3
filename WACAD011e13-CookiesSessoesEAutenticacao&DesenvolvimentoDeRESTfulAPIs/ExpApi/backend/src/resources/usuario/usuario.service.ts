import { TiposUsuarios } from "./../tipoUsuario/tipoUsuario.constants";
import { PrismaClient } from "@prisma/client";
import { CreateUsuarioDto, TipoUsuarioDto, UpdateUsuarioDto, UsuarioDto } from "./usuario.types";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const createUsuario = async (
    usuario: CreateUsuarioDto,
): Promise<UsuarioDto> => {
    const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
    const salt = await bcrypt.genSalt(rounds); // Tornar a coisa mais demorada, para que o usuŕio não fique colocando uma senha atrás da outra
    const senhaHashed = await bcrypt.hash(usuario.senha, salt);

    const novoUsuario = await prisma.usuario.create({
        data: {
            ...usuario,
            senha: senhaHashed
        },
    });

    return {
        id: novoUsuario.id,
        tipoUsuarioId: novoUsuario.tipoUsuarioId,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        createdAt: novoUsuario.createdAt,
        updatedAt: novoUsuario.updatedAt,
    };
};

// Função para listar usuários
export const listUsuarios = async (
    tipo?: TiposUsuarios
): Promise<UsuarioDto[]> => {
    if(!tipo) {
        return await prisma.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                tipoUsuarioId: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    return prisma.usuario.findMany({
        where: { tipoUsuarioId: tipo },
        select: {
            id: true,
            nome: true,
            email: true,
            tipoUsuarioId: true,
            createdAt: true,
            updatedAt: true,
        },
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
            createdAt: true,
            updatedAt: true,
        },
    });
};

// Função para atualizar um usuário
export const updateUsuario = async (
    id: string,
    usuario: UpdateUsuarioDto
): Promise<UsuarioDto | null> => {
    return await prisma.usuario.update({
        where: { id },
        data: usuario,
        select: {
            id: true,
            nome: true,
            email: true,
            tipoUsuarioId: true,
            createdAt: true,
            updatedAt: true,
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
            createdAt: true,
            updatedAt: true,
        },
    });
};

// Função para verificar se um usuário com o e-mail fornecido já existe
export const buscarUsuarioPorEmail = async (email: string): Promise<UsuarioDto | null> => {
    return await prisma.usuario.findUnique({
        where: { email },
        select: {
            id: true,
            nome: true,
            email: true,
            tipoUsuarioId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};
