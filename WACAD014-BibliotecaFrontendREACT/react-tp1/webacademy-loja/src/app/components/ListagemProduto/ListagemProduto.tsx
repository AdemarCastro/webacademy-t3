import CardProduto from "../CardProduto/CardProduto";

interface IListagemProdutoProps {
    produtos: Produto[] | null;
    adicionarAoCarrinho: (produto: Produto) => void;
  }

export default function ListagemProduto({ produtos, adicionarAoCarrinho }: IListagemProdutoProps) {
    return <>
        <h5 className="mb-3">Produtos disponíveis:</h5>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            {produtos ?
                produtos.map((produto) => (
                    <CardProduto
                        key={produto.id}
                        produto={produto}
                        adicionarAoCarrinho={adicionarAoCarrinho}
                    />
                ))
            : null} 
        </div>
    </>
}