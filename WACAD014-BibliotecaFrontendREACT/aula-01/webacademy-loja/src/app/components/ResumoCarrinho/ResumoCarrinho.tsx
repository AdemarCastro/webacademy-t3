export default function ResumoCarrinho() {
    return <div className="card mb-4">
    <div className="card-body">
      <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
      <p className="card-text fw-medium">Quantidade total: 10</p>
      <p className="card-text fw-medium">
        Valor total: R${(1500).toFixed(2)}
      </p>
    </div>
  </div>
}