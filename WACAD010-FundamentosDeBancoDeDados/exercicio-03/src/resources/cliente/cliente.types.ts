import { Cliente } from '@prisma/client';

export type CreateClienteDto = Pick<Cliente, 'nome_completo'|'cpf'|'email'|'numeros_celular'|'data_nascimento'>;