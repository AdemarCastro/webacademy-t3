import { Produto } from '@/app/types/produto';
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

export { FavoritosProvider, useFavoritos };
