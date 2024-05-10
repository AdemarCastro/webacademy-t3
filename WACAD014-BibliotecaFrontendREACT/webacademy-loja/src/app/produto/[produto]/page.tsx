"use client";

import { useParams } from "next/dist/client/components/navigation";
import Image from "next/image";
import React from "react";

export default function Produto() {
    let produtoId = useParams<{produto: string}>();
    const [produto, setProduto] = React.useState<Produto | null>(null);

    React.useEffect(() => {
      fetch("https://ranekapi.origamid.dev/json/api/produto/" + produtoId.produto)
        .then((res) => res.json())
        .then((json) => setProduto(json));
    }, []);

    console.log(produtoId.produto)

    let imageSrc = produto?.fotos ? produto.fotos[0].src : "";
    let imageTitulo = produto?.fotos ? produto.fotos[0].titulo : "";

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            {produto ? 
              <>
                <h5 className="card-title mb-4 fw-light">{produto?.descricao}</h5>

                <h5 className="card-title mb-4 fw-bold">{produto?.nome}</h5>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                  <Image key={produto?.id} src={imageSrc} alt={imageTitulo} width={300} height={320} />
                </div>

                <p className="card-text fw-medium">
                  Valor: R${produto?.preco}
                </p>
                <p className="card-text fw-medium">Descrição: {produto?.descricao}</p>
                <p className="card-text fw-medium">Anunciado por: {produto?.vendido}</p>
              </>
            : <h5 className="card-title mb-4 fw-bold">Carregando...</h5>}
          </div>
        </div>
      </div>
    </main>
  );
}