"use client";
import NavBar from "./components/NavBar/NavBar";

import Image from "next/image";
import React from "react";
import ListagemProduto from "./components/ListagemProduto/ListagemProduto";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";

export default function Produtos() {

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho></ResumoCarrinho>
          <ListagemProduto></ListagemProduto>
        </div>
      </main>
    </>
  );
}