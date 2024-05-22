import React from "react";
import ItemCarrinho from "../ItemCarrinho/ItemCarrinho";

interface IListagemCarrinhoProps {
  itensCarrinho: {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
  }[];
  dispatch: React.Dispatch<{
    id: string;
    type: "aumentar_qtd" | "diminuir_qtd" | "remover";
  }>;
  children: React.ReactNode;
}

export default function ListagemCarrinho({ itensCarrinho, dispatch, children }: IListagemCarrinhoProps) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itensCarrinho.map((item) => (
            <ItemCarrinho key={item.id} item={item} dispatch={dispatch} />
          ))}
        </tbody>
      </table>
      {children}
    </>
  );
}
