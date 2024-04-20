import { PrismaClient, Cliente } from '@prisma/client';
import { CreateClienteDto } from './cliente.types';

const prisma = new PrismaClient();

export const checkCpfIsAvaliable = async (cpf: string): Promise<boolean> => {
    return !(await prisma.cliente.findUnique({ where: { cpf }}));
};

export const checkEmailIsAvaliable = async (email: string): Promise<boolean> => {
    return !(await prisma.cliente.findUnique({ where: { email }}));
};

export const createCliente = async (cliente: CreateClienteDto): Promise<Cliente> => {
    return await prisma.cliente.create({ data: cliente });
};

export const listClientes = async ():Promise<Cliente[]> => {
    return await prisma.cliente.findMany();
};

export const readCliente = async (id: number):Promise<Cliente | null> => {
    return await prisma.cliente.findUnique({ where: { id } });
};

export const updateCliente = async (id: number, cliente: Partial<CreateClienteDto>): Promise<Cliente | null> => {
    return await prisma.cliente.update({
        where: { id },
        data: cliente,
    });
};


export const deleteCliente = async (id: number): Promise<Cliente | null> => {
    return await prisma.cliente.delete({
        where: { id },
    });
};
