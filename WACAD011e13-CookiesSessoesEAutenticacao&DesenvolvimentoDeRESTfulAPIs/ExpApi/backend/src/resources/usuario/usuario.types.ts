import { Usuario } from "@prisma/client";
export type CreateUsuarioDto = Pick<Usuario, "nome" | "email" | "senha">; // Request do Usuário para o Servidor
export type UsuarioDto = Omit<Usuario, "senha">; // Resposta do Servidor
export type TiposUsuarios = "client"| "admin";