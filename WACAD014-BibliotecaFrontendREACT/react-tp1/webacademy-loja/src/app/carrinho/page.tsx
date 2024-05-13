"use client"; // Renderiza apenas o client - Faz um processo de pré-renderização, continuamos tendo acesso a coisas que somente o backend teria como API do sevidor
import React from "react";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";

export default function Carrinho() {
  const itensCarrinho = mockItensCarrinho.map(item => ({itensCarrinho: [item]}));

  return (
    <>
      <main>
        <div className="container p-5">
          <ListagemCarrinho itensCarrinho={itensCarrinho}></ListagemCarrinho>
          <ResumoCarrinho quantidadeItensTotal={0} precoTotal={0}></ResumoCarrinho>
        </div>
      </main>
    </>
  );
}