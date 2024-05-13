"use client";
import NavBar from "./components/NavBar/NavBar";

import Image from "next/image";
import React, { useState } from "react";
import ListagemProduto from "./components/ListagemProduto/ListagemProduto";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import { mockProdutos } from "./mocks/produtos";

export default function Produtos() {
  const produtos = mockProdutos;
  const [carrinho, setCarrinho] = React.useState<ItemCarrinho[]>([]);
  const [valorTotal, setValorTotal] = React.useState<number>(0);
  const [qtdItens, setQtdItens] = React.useState<number>(0);

  const adicionarAoCarrinho = (produto: Produto) => {
    console.log('Função AdicionarAoCarrinho acionada');
  
    // Função auxiliar para atualizar o carrinho
    const atualizarCarrinho = (newCarrinho: ItemCarrinho[]) => {
      setCarrinho(newCarrinho);
      setQtdItens(qtdItens + 1);
      setValorTotal(valorTotal + Number(produto.preco));
    };
  
    // Verifica se o produto já existe no carrinho
    const itemExiste = carrinho.find(c => c.id === produto.id);
  
    if (itemExiste) {
      // Atualiza a quantidade do item existente
      const index = carrinho.findIndex(c => c.id === produto.id);
      const newCarrinho = [...carrinho];
      newCarrinho[index].quantidade += 1;
      atualizarCarrinho(newCarrinho);
    } else {
      // Adiciona um novo item ao carrinho
      const newCarrinho = [...carrinho, {...produto, id: produto.id, nome: produto.nome, preco: Number(produto.preco), quantidade: 1}];
      atualizarCarrinho(newCarrinho);
    }
  };
  

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho precoTotal={valorTotal} quantidadeItensTotal={qtdItens}/>
          <ListagemProduto produtos={produtos} adicionarAoCarrinho={adicionarAoCarrinho}/>
        </div>
      </main>
    </>
  );
}