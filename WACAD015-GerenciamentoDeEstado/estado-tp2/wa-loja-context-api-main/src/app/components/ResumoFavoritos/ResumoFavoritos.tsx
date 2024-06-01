import React, { useContext } from 'react';
import CardProduto from '../CardProduto/CardProduto';
import { Produto } from '@/app/types/produto';
import { useProdutosFavoritos } from '../FavoritosProvider/FavoritosProvider';

export default function ResumoFavoritos() {
  const { favoritos } = useProdutosFavoritos();

  return (
    <div className="mt-4">
      <h5 className="mb-4">Seus produtos favoritos:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {favoritos.map((produto: Produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
          />
        ))}
      </div>
    </div>
  );
}