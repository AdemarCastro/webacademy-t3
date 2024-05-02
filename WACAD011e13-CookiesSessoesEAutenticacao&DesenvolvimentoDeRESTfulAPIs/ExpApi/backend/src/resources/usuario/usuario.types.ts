import { Usuario } from "@prisma/client";

// Supondo que você queira selecionar apenas alguns campos específicos para CreateUsuarioDto
export type CreateUsuarioDto = Pick<Usuario, "nome" | "email" | "senha" | "tipoUsuarioId" | "createAt" | "updateAt">;

export type UpdateUsuarioDto = Pick<Usuario, "nome" | "email" | "senha" | "tipoUsuarioId" | "createAt" | "updateAt">;

// E omitir o campo "senha" para UsuarioDto
export type UsuarioDto = Omit<Usuario, "senha">;

// Definindo os tipos de usuários
export type TiposUsuariosDto = "client" | "admin";
