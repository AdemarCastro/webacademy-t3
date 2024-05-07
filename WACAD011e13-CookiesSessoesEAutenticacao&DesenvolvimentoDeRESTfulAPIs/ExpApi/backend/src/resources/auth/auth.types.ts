import { Usuario } from "@prisma/client";

// Dto responsável pelo Login do Usuário
export type LoginDto = Pick<Usuario, "email" | "senha">
export type SignDto = Pick<Usuario, "nome" | "email" | "senha">