import ItemCarrinho from "../ItemCarrinho/ItemCarrinho";

interface IListagemCarrinhoProps {
  itensCarrinho: Carrinho[];
}

export default function ListagemCarrinho({ itensCarrinho }: Carrinho) {
    return <>
        <div className="card mb-4">
            <div className="row card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos selecionados
              </h5>
              <div className="table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Valor Unitário</th>
                      <th>Quantidade</th>
                      <th>Valor Total</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itensCarrinho.map((carrinho) => (
                      (
                        <ItemCarrinho
                          key={carrinho.id}
                          nome={carrinho.nome}
                          preco={carrinho.preco}
                          quantidade={carrinho.quantidade}
                        />
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </>
}