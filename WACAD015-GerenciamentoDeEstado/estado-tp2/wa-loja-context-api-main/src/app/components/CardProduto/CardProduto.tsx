import React from 'react';
import Image from "next/image";
import { Produto } from '@/app/types/produto';
import { useFavoritos } from '../FavoritosProvider/FavoritosProvider';

interface CardProdutoProps {
  produto: Produto;
}

export default function CardProduto({ produto }: CardProdutoProps) {
  const { favoritos, setFavoritos } = useFavoritos();

  const adicionarAosFavoritos = (produto: Produto) => {
    setFavoritos((prevFavoritos: Produto[]) => [...prevFavoritos, produto]);
  };

  const ehFavorito = favoritos.some((item) => item.id === produto.id);

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.fotos[0].src}
          className="card-img-top"
          alt="imagem placeholder"
          width={300}
          height={320}
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">R$ {produto.preco}</p>
          <button
            className="btn btn-success d-block w-100"
            type="button"
            onClick={() => adicionarAosFavoritos(produto)}
            disabled={ehFavorito}
          >
            {ehFavorito ? "Adicionado" : "Adicionar aos favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}
