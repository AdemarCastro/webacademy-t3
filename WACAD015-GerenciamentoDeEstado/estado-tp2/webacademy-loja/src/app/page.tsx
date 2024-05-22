"use client";

import React, { useState, useEffect } from "react";
import ListagemProduto from "./components/ListagemProduto/ListagemProduto";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import api from "./services/api";
// Remover o mockProdutos, pois agora usaremos a API
// import { mockProdutos } from "./mocks/produtos";

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[] | null>(null);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [qtdItens, setQtdItens] = useState<number>(0);

  // useEffect para buscar a lista de produtos da API
  useEffect(() => {
    // const fetchProdutos = async () => {
    //   try {
    //     const response = await fetch("https://ranekapi.origamid.dev/json/api/produto");
    //     const data = await response.json();
    //     setProdutos(data);
    //   } catch (error) {
    //     console.error("Erro ao buscar os produtos:", error);
    //   }
    // };

    // fetchProdutos();

    const controller = new AbortController();

    api
      .get(`/produto/`, {
        signal: controller.signal,
      })
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    
    return () => controller.abort();
  }, []);

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
      const newCarrinho = [...carrinho, { ...produto, id: produto.id, nome: produto.nome, preco: Number(produto.preco), quantidade: 1 }];
      atualizarCarrinho(newCarrinho);
    }
  };

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho precoTotal={valorTotal} quantidadeItensTotal={qtdItens} />
          {produtos ? (
            <ListagemProduto produtos={produtos} adicionarAoCarrinho={adicionarAoCarrinho} />
          ) : (
            <p>Carregando produtos...</p>
          )}
        </div>
      </main>
    </>
  );
}
