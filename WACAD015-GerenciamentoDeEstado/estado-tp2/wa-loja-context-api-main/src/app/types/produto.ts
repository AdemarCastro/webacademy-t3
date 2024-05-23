export interface Foto {
  titulo: string;
  src: string;
}

export interface Produto {
  id: string;
  fotos: Foto[];
  nome: string;
  preco: string;
  descricao: string;
  vendido: string;
  usuario_id: string;
}
