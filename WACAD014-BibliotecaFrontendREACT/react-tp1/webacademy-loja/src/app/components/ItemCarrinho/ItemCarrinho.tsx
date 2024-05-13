interface IItemCarrinhoProps {
    carrinho: Carrinho;
}

export default function ItemCarrinho({ carrinho }: IItemCarrinhoProps) {
    const valorTotalProduto = (
        precoUnitario: number,
        quantidade: number
    ): number => precoUnitario * quantidade;

    return <>
        <tr key="1">
            <td>{carrinho.itensCarrinho[0].nome}</td>
            <td>R$ {(1500).toFixed(2)}</td>
            <td>2</td>

            <td>R$ {valorTotalProduto(1500, 2).toFixed(2)}</td>
            <td>
            <button className="btn btn-danger btn-sm">
                Remover
            </button>
            </td>
        </tr>
    </>
}