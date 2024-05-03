"use client"; // Renderiza apenas o client - Faz um processo de pré-renderização, continuamos tendo acesso a coisas que somente o backend teria como API do sevidor
import React from "react";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";

export default function Carrinho() {
  

  return (
    <>
      <main>
        <div className="container p-5">
          <ListagemCarrinho></ListagemCarrinho>
          <ResumoCarrinho></ResumoCarrinho>
        </div>
      </main>
    </>
  );
}