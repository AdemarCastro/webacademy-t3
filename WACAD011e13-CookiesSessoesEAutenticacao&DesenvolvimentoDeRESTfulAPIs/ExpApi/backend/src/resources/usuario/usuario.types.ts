import { Usuario } from "@prisma/client";

// Dto responsável pela Criação de um novo Usuário
export type CreateUsuarioDto = Pick<Usuario, "nome" | "email" | "senha">;

// Dto responsável pela Atualização de um Usuário
export type UpdateUsuarioDto = Pick<Usuario, "nome" | "email" | "senha">;

// Dto do Usuário, omiti o campo "senha" para UsuarioDto
export type UsuarioDto = Omit<Usuario, "senha">;

// Definindo os tipos de usuários
export type TipoUsuarioDto = "client" | "admin";
