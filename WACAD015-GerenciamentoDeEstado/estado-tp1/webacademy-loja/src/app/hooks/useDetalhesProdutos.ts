// hooks/useDetalhesProduto.ts
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDetalhesProduto } from '../services/produtos';

export const useDetalhesProduto = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['produto', id],
    queryFn: () => getDetalhesProduto(id),
  });

  return { produto: data, isLoading, isError, error };
};
