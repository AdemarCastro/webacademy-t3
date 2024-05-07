import { PrismaClient } from "@prisma/client";
import { ProdutoCarrinho } from "./compra.types";

const prisma = new PrismaClient();

export async function saveCompra(
    uid: string,
    produtosCarrinho: ProdutoCarrinho[],
) {
    const newCompra = await prisma.compra.create({
        data: {
            usuarioId: uid,
        },
    });

    // Promisse.all aceita um array de Promessas
    await Promise.all(produtosCarrinho.map(produtoCarrinho => saveItem(produtoCarrinho, newCompra.id)));
};

async function saveItem(produtoCarrinho: ProdutoCarrinho, compraId: string) {
    await prisma.compraProduto.create({
        data: {
            compraId,
            produtoId: produtoCarrinho.id,
            quantidade: produtoCarrinho.quantidade,
        },
    });
};