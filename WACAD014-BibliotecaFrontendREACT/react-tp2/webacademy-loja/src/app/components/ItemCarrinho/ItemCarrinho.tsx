interface IItemCarrinhoProps {
    carrinho: Carrinho;
    removerItemDoCarrinho: (id: string) => void;
}

export default function ItemCarrinho({ carrinho, removerItemDoCarrinho }: IItemCarrinhoProps) {
    const valorTotalProduto = (
        precoUnitario: number,
        quantidade: number
    ): number => precoUnitario * quantidade;

    return <>
        <tr key="1">
            <td>{carrinho.itensCarrinho[0].nome}</td>
            <td>R$ {(carrinho.itensCarrinho[0].preco).toFixed(2)}</td>
            <td>{carrinho.itensCarrinho[0].quantidade}</td>

            <td>R$ {valorTotalProduto(carrinho.itensCarrinho[0].preco, carrinho.itensCarrinho[0].quantidade).toFixed(2)}</td>
            <td>
            <button 
                className="btn btn-danger btn-sm"
                onClick={() => removerItemDoCarrinho(carrinho.itensCarrinho[0].id)}
            >
                Remover
            </button>
            </td>
        </tr>
    </>
}