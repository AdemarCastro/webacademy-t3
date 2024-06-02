import React from 'react';
import { render, screen } from '@testing-library/react';
import ListagemProdutos from '../ListagemProdutos';
import { mockProdutos } from '../../../mocks/produtos';

describe('ListagemProdutos', () => {
    it('renders products correctly', async () => {
        const produtos = mockProdutos;

        // Renderiza o componente ListagemProdutos com os produtos mockados
        render(<ListagemProdutos produtos={produtos} />);

        // Itera sobre cada produto para realizar verificações
        produtos.forEach(async (produto) => {
            // Encontra o elemento com o nome do produto e verifica se o nome do produto está no mock
            const nomeElement = await screen.findByText(produto.nome); 
            expect(nomeElement).toBeInTheDocument();

            // Procura por todos os elementos que mostram o preço do produto e garante que pelo menos um elemento corresponda
            const precoElements = await screen.queryAllByText(`R$ ${produto.preco}`);
            expect(precoElements.length).toBeGreaterThan(0);

            // Se o produto tiver desconto, encontra o elemento com a informação de desconto e verifica se o desconto está presente no mock
            if (produto.desconto) {
                const descontoElement = await screen.findByText(`${produto.desconto}% de desconto`);
                expect(descontoElement).toBeInTheDocument();
            }

            // Para cada foto do produto, encontra o elemento com o título da foto e verifica se o título da foto está presente no mock
            produto.fotos.forEach(async (foto) => {
                const tituloElement = await screen.findByAltText(foto.titulo);
                expect(tituloElement).toBeInTheDocument();
            });
        });
    });
});
