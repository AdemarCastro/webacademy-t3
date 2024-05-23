"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import { mockProdutos } from "./mocks/produtos";

interface FavoritosContextProps {
  favoritos: Produto[];
  setFavoritos: (favoritos: Produto[]) => void;
}

const FavoritosContext = createContext<FavoritosContextProps>({
  favoritos: [],
  setFavoritos: () => {},
});

const FavoritosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  return (
    <FavoritosContext.Provider value={{ favoritos, setFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
};

const useFavoritos = () => useContext(FavoritosContext);

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

export { useFavoritos };
