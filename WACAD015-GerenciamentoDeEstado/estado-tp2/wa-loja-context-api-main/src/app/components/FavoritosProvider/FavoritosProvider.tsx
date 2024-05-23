"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Produto } from '@/app/types/produto';

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


const useProdutosFavoritos = () => {
  const { favoritos, setFavoritos } = useContext(FavoritosContext);
  return { favoritos, setFavoritos };
};

const useVerificaProdutoFavorito = (id: string) => {
  const { favoritos } = useContext(FavoritosContext);
  return favoritos.some(produto => produto.id === id);
};

export { FavoritosProvider, useProdutosFavoritos, useVerificaProdutoFavorito };
