"use client";

import { FavoritosProvider } from "./components/FavoritosProvider/FavoritosProvider";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import { mockProdutos } from "./mocks/produtos";

export default function App() {
  const produtos = mockProdutos;
  
  return (
    <main>
      <div className="container p-5">
        <FavoritosProvider>
          <ListagemProdutos produtos={produtos} />
        </FavoritosProvider>
      </div>
    </main>
  );
}
