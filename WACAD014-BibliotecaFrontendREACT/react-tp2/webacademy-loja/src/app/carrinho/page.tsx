"use client"; // Renderiza apenas o client - Faz um processo de pré-renderização, continuamos tendo acesso a coisas que somente o backend teria como API do sevidor

import React from "react";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";

export default function Carrinho() {
  const [itensCarrinho, setItensCarrinho] = React.useState(mockItensCarrinho.map(item => ({ itensCarrinho: [item] })));

  const removerItemDoCarrinho = (id: string) => {
    setItensCarrinho(itensCarrinho.filter(carrinho => carrinho.itensCarrinho[0].id !== id));
  };

  return (
    <>
      <main>
        <div className="container p-5">
          <ListagemCarrinho itensCarrinho={itensCarrinho} removerItemDoCarrinho={removerItemDoCarrinho}></ListagemCarrinho>
          <ResumoCarrinho 
            quantidadeItensTotal={
              itensCarrinho.reduce(
                (total, item) => total + item.itensCarrinho[0].quantidade, 0)
            } 
            precoTotal={
              itensCarrinho.reduce(
                (total, item) =>
                  total + (item.itensCarrinho[0].preco * item.itensCarrinho[0].quantidade), 0)
            } 
          />
        </div>
      </main>
    </>
  );
}