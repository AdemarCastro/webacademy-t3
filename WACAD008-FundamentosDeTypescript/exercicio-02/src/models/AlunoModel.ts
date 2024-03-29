export class Aluno {
    id: number;
    nome: string;
    idade: number;
    altura: number;
    peso: number;

    constructor(id: number, nome: string, idade: number, altura: number, peso: number) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
}