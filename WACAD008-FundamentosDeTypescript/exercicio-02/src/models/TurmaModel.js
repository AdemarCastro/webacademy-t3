"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turma = void 0;
class Turma {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    getMediaIdades() {
        let totalIdades = this.alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        return totalIdades / this.getNumAlunos();
    }
    getMediaAlturas() {
        let totalAlturas = this.alunos.reduce((acc, aluno) => acc + aluno.altura, 0);
        return totalAlturas / this.getNumAlunos();
    }
    getMediaPesos() {
        let totalPesos = this.alunos.reduce((acc, aluno) => acc + aluno.peso, 0);
        return totalPesos / this.getNumAlunos();
    }
    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }
    removerAluno(id) {
        this.alunos = this.alunos.filter(aluno => aluno.id !== id);
    }
    atualizarAluno(id, novoAluno) {
        this.alunos = this.alunos.map(aluno => {
            if (aluno.id === id) {
                return novoAluno;
            }
            return aluno;
        });
    }
}
exports.Turma = Turma;
// Adicionando a propriedade __esModule
Object.defineProperty(exports, "__esModule", { value: true });
