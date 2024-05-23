import React from 'react';
import Image from "next/image";
// Importe o tipo Produto aqui se ainda não estiver importado
import { useFavoritos } from '../../page';

interface CardProdutoProps {
  produto: Produto; // Verifique se o tipo Produto está correto aqui
}

export default function CardProduto({ produto }: CardProdutoProps) {
  const { favoritos, setFavoritos } = useFavoritos(); // Garanta que favoritos seja um array de Produto

  const adicionarAosFavoritos = (produto: Produto) => {
    setFavoritos(prevFavoritos => [...prevFavoritos, produto]);
  };

  const ehFavorito = favoritos.some((item) => item.id === produto.id); // Certifique-se de que favoritos contém objetos do tipo Produto

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
            className="btn btn-success d-block w-100 "
            type="button"
            onClick={() => adicionarAosFavoritos(produto)} // Esta linha parece correta
            disabled={ehFavorito}
          >
            {ehFavorito? "Adicionado" : "Adicionar aos favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}
