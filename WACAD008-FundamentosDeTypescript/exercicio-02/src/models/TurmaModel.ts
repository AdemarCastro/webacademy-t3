// Importando o AlunoModel
import { Aluno } from './AlunoModel';

export class Turma {
    id: number;
    nome: string;
    alunos: Aluno[];

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }

    getNumAlunos(): number {
        return this.alunos.length;
    }

    getMediaIdades(): number {
        let totalIdades = this.alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        return totalIdades / this.getNumAlunos();
    }

    getMediaAlturas(): number {
        let totalAlturas = this.alunos.reduce((acc, aluno) => acc + aluno.altura, 0);
        return totalAlturas / this.getNumAlunos();
    }

    getMediaPesos(): number {
        let totalPesos = this.alunos.reduce((acc, aluno) => acc + aluno.peso, 0);
        return totalPesos / this.getNumAlunos();
    }

    adicionarAluno(aluno: Aluno) {
        this.alunos.push(aluno);
    }

    removerAluno(id: number) {
        this.alunos = this.alunos.filter(aluno => aluno.id !== id);
    }

    atualizarAluno(id: number, novoAluno: Aluno) {
        this.alunos = this.alunos.map(aluno => {
            if (aluno.id === id) {
                return novoAluno;
            }
            return aluno;
        });
    }
}

// Adicionando a propriedade __esModule
Object.defineProperty(exports, "__esModule", { value: true });