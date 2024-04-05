import { Request, Response } from "express";
import * as fs from 'fs';

const dbPath = 'data/db.json';

async function index (req: Request, res: Response) {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const produtos = JSON.parse(data).produtos;
        res.json(produtos);
    } catch (e) {
        res.status(500).json({ message: (e as Error).message });
    }
}

async function create (req: Request, res: Response) {
    try {
        const data: string = fs.readFileSync(dbPath, 'utf-8');
        const db = JSON.parse(data);
        const novoProduto = req.body;
        novoProduto.id = db.produtos.length + 1;
        db.produtos.push(novoProduto);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        res.status(201).json(novoProduto);
    } catch (e) {
        res.status(400).json({ message: (e as Error).message});
    }
}

async function read (req: Request, res: Response) {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const produtos = JSON.parse(data).produtos;
        const produto = produtos.find((p: { id: string; }) => p.id === req.params.id);
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(produto);
    } catch (e) {
        res.status(500).json({ message: (e as Error).message });
    }
}

async function update(req: Request, res: Response) {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const db = JSON.parse(data);
        const produtoIndex = db.produtos.findIndex((p: { id: string; }) => p.id === req.params.id);
        if (produtoIndex === -1) return res.status(404).json({ message: 'Produto não encontrado' });
        db.produtos[produtoIndex] = { ...db.produtos[produtoIndex], ...req.body };
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        res.json(db.produtos[produtoIndex]);
    } catch (e) {
        res.status(400).json({ message: (e as Error).message });
    }
}
async function remove(req: Request, res: Response) {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const db = JSON.parse(data);
        const produtoIndex = db.produtos.findIndex((p: { id: string; }) => p.id === req.params.id);
        if (produtoIndex === -1) return res.status(404).json({ message: 'Produto não encontrado' });
        db.produtos.splice(produtoIndex, 1);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        res.json({ message: 'Produto removido com sucesso' });
    } catch (e) {
        res.status(500).json({ message: (e as Error).message });
    }
}

export default { index, read, create, update, remove };