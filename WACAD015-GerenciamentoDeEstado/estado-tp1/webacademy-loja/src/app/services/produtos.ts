import axios from 'axios';
import api from './api';

export const getDetalhesProduto = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`https://ranekapi.origamid.dev/json/api/produto/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Falha ao buscar detalhes do produto.');
  }
};

export async function getListaProduto() {
    return api.get<Produto[]>("/produto").then((response) => response.data);
}
