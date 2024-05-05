"use client";
import NavBar from "./components/NavBar/NavBar";

import Image from "next/image";
import React, { useState } from "react";
import ListagemProduto from "./components/ListagemProduto/ListagemProduto";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import { mockProdutos } from "./mocks/produtos";

export default function Produtos() {
  const produtos = mockProdutos;
  const [modal, setModalAberto] = useState<boolean>(true);

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho precoTotal={0} quantidadeItensTotal={0}/>
          <ListagemProduto produtos={produtos} />

          <Modal modal={modal} setModalAberto={setModalAberto} /> // Controlar o estado
        </div>
      </main>
    </>
  );
}

// Trabalho 01 vai ser até o Slide 2 - Vamos praticar 2 - Data de entrega do Trabalho 01 e 02 é no dia 12