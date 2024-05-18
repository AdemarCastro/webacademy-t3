"use client";

import React from "react";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";

interface ActionType {
  id: string;
  type: "aumentar_qtd" | "diminuir_qtd" | "remover";
}

function carrinhoReducer(state: any[], action: ActionType) {
  switch (action.type) {
    case "aumentar_qtd":
      return state.map((item) =>
        item.id === action.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
    case "diminuir_qtd":
      return state.map((item) =>
        item.id === action.id && item.quantidade > 0 ? { ...item, quantidade: item.quantidade - 1 } : item
      );
    case "remover":
      return state.filter((item) => item.id !== action.id);
    default:
      throw new Error(`Action type ${action.type} is not handled`);
  }
}

export default function Carrinho() {
  const [itensCarrinho, dispatch] = React.useReducer(carrinhoReducer, mockItensCarrinho);

  const renderizarResumo = () => {
    return (
      <ResumoCarrinho
        quantidadeItensTotal={itensCarrinho.reduce((total, item) => total + item.quantidade, 0)}
        precoTotal={itensCarrinho.reduce((total, item) => total + item.preco * item.quantidade, 0)}
      />
    );
  };

  return (
    <main>
      <div className="container p-5">
        <ListagemCarrinho itensCarrinho={itensCarrinho} dispatch={dispatch}>
          {renderizarResumo()}
        </ListagemCarrinho>
      </div>
    </main>
  );
}
