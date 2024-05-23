// ResumoFavoritos.tsx

import React from 'react';
import CardProduto from "../CardProduto/CardProduto";
import { useFavoritos } from '../../page'; // Importa o hook useFavoritos do arquivo page.tsx

export default function ResumoFavoritos() {
  const { favoritos } = useFavoritos();

  return (
    <div className="mt-4">
      <h5 className="mb-4">Seus produtos favoritos:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {favoritos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
          />
        ))}
      </div>
    </div>
  );
}
