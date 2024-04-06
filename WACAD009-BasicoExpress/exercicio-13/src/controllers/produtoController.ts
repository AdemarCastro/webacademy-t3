import { Request, Response } from "express";
import * as fs from "fs";

const dbPath : string = "data/db.json";

/**
 * Retorna todos os produtos armazenados no banco de dados.
 */
async function index(req: Request, res: Response) {
  try {
    // Lê os dados do arquivo do banco de dados
    const data = fs.readFileSync(dbPath, "utf-8");
    // Parseia os dados para obter a lista de produtos
    const produtos = JSON.parse(data).produtos;

    // Retorna os produtos como resposta
    res.json(produtos);
  } catch (e) {
    // Em caso de erro, retorna um status de erro 500 com a mensagem de erro
    res.status(500).json({ message: (e as Error).message });
  }
}


/**
 * Cria um novo produto com base nos dados fornecidos na requisição e o armazena no banco de dados.
 */
async function create(req: Request, res: Response) {
  try {
    // Lê os dados do arquivo do banco de dados
    const data: string = fs.readFileSync(dbPath, "utf-8");
    // Parseia os dados para obter o objeto do banco de dados
    const db = JSON.parse(data);

    // Cria um novo objeto de produto com base nos dados da requisição
    const novoProduto = {
      id: db.produtos.length + 1,
      nome: req.body.nome,
      preco: req.body.preco,
      estoque: req.body.estoque,
    };

    // Adiciona o novo produto ao array de produtos no banco de dados
    db.produtos.push(novoProduto);

    // Escreve os dados atualizados de volta ao arquivo do banco de dados
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    // Retorna o novo produto criado como resposta com o status 201 (Created)
    res.status(201).json(novoProduto);
  } catch (e) {
    // Em caso de erro, retorna um status de erro 400 (Bad Request) com a mensagem de erro
    res.status(400).json({ message: (e as Error).message });
  }
}


/**
 * Retorna os detalhes de um produto específico com base no ID fornecido na requisição.
 */
async function read(req: Request, res: Response) {
  try {
    // Lê os dados do arquivo do banco de dados
    const data : string = fs.readFileSync(dbPath, "utf-8");
    // Parseia os dados para obter a lista de produtos
    const produtos = JSON.parse(data).produtos;

    // Procura pelo produto com o ID especificado na requisição
    const produto = produtos.find(
        (p: { id: number }) => p.id === parseInt(req.params.id)
    );

    // Se o produto não for encontrado, retorna um status 404 (Not Found)
    if (!produto)
      return res.status(404).json({ message: "Produto não encontrado" });

    // Retorna os detalhes do produto encontrado como resposta
    res.json(produto);

  } catch (e) {
    // Em caso de erro, retorna um status de erro 500 com a mensagem de erro
    res.status(500).json({ message: (e as Error).message });
  }
}


/**
 * Atualiza as informações de um produto existente com base no ID fornecido na requisição.
 */
async function update(req: Request, res: Response) {
  try {
    // Lê os dados do arquivo do banco de dados
    const data : string = fs.readFileSync(dbPath, "utf-8");
    // Parseia os dados para obter o objeto do banco de dados
    const db = JSON.parse(data);

    // Converte o ID do parâmetro para número
    const productId : number = parseInt(req.params.id);

    // Procura pelo índice do produto no array de produtos
    const produtoIndex = db.produtos.findIndex(
        (p: { id: number }) : boolean => p.id === productId // Compara IDs como números
    );

    // Se o produto não for encontrado, retorna um status 404 (Not Found)
    if (produtoIndex === -1)
      return res.status(404).json({ message: "Produto não encontrado" });

    // Atualiza o produto no banco de dados com base nos dados da requisição
    db.produtos[produtoIndex] = { ...db.produtos[produtoIndex], ...req.body };

    // Escreve os dados atualizados de volta ao arquivo do banco de dados
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    // Retorna os detalhes do produto atualizado como resposta
    res.json(db.produtos[produtoIndex]);
  } catch (e) {
    // Em caso de erro, retorna um status de erro 400 (Bad Request) com a mensagem de erro
    res.status(400).json({ message: (e as Error).message });
  }
}


/**
 * Remove um produto existente com base no ID fornecido na requisição.
 */
async function remove(req: Request, res: Response) {
  try {
    // Lê os dados do arquivo do banco de dados
    const data = fs.readFileSync(dbPath, "utf-8");
    // Parseia os dados para obter o objeto do banco de dados
    const db = JSON.parse(data);

    // Converte o ID do parâmetro para número
    const productId : number = parseInt(req.params.id);

    // Procura pelo índice do produto no array de produtos
    const produtoIndex = db.produtos.findIndex(
        (p: { id: number }) : boolean => p.id === productId // Compara IDs como números
    );

    // Se o produto não for encontrado, retorna um status 404 (Not Found)
    if (produtoIndex === -1)
      return res.status(404).json({ message: "Produto não encontrado" });

    // Remove o produto do array de produtos no banco de dados
    db.produtos.splice(produtoIndex, 1);

    // Escreve os dados atualizados de volta ao arquivo do banco de dados
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    // Retorna uma mensagem indicando que o produto foi removido com sucesso
    res.json({ message: "Produto removido com sucesso" });
  } catch (e) {
    // Em caso de erro, retorna um status de erro 500 (Internal Server Error) com a mensagem de erro
    res.status(500).json({ message: (e as Error).message });
  }
}



export default { index, read, create, update, remove };
