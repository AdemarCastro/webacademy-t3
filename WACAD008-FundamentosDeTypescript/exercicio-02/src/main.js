"use strict";
/********************************************* DEFININDO CLASSES *********************************************/
class Aluno {
    constructor(id, nome, idade, altura, peso) {
        this.id = id || 0;
        this.nome = nome || "";
        this.idade = idade || 0;
        this.altura = altura || 0;
        this.peso = peso || 0;
    }
}
class Turma {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }
    getAlunos() {
        return this.alunos;
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
                console.log("Novo Aluno: " + novoAluno);
                return novoAluno;
            }
            return aluno;
        });
    }
}
/********************************************* VARIÁVEIS e TIPOS *********************************************/
// Instância da turma
const turma = new Turma(1, "Turma");
const alunoList = document.getElementById('aluno-list');
const addAlunoForm = document.getElementById('addAlunoForm');
const newAlunoButton = document.getElementById('newAlunoButton');
const alunoNomeCompletoInput = document.getElementById('alunoNomeCompleto');
const alunoIdadeInput = document.getElementById('alunoIdade');
const alunoAlturaInput = document.getElementById('alunoAltura');
const alunoPesoInput = document.getElementById('alunoPeso');
const progressBars = document.querySelectorAll('.progress-bar');
// const mediaBar = document.getElementById('mediaBar') as
const modalElement = document.getElementById('modalNovoAluno');
const modal = modalElement && new bootstrap.Modal(modalElement); // Verifica se o modalElement é null antes de passá-lo ao construtor
const addAlunoButton = document.getElementById('addAlunoButton');
const saveEditButton = document.getElementById('saveEditButton');
// Variável global de edição do Aluno
let currentEditingAluno;
// Variável global para definir o index do aluno
let idAluno = 0;
/********************************************* FUNÇÕES *********************************************/
// Função para renderizar a lista de alunos
function renderAlunoList(alunos) {
    const alunoListElement = document.getElementById('aluno-list');
    if (alunoListElement) {
        // Limpar a lista antes de renderizar novamente
        alunoListElement.innerHTML = '';
        alunos.forEach((aluno) => {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.altura}</td>
                <td>${aluno.peso}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-editar" data-id="${aluno.id}" data-bs-toggle="modal" data-bs-target="#modalNovoAluno">Editar</button>
                    <button type="button" class="btn btn-danger btn-excluir" data-id="${aluno.id}">Excluir</button>
                </td>
            `;
            if (alunoListElement)
                alunoListElement.appendChild(listItem);
        });
    }
    else {
        console.error("O elemento aluno-list não foi encontrado.");
    }
}
// Função para limpar os campos do formulário de aluno
function clearFormFields() {
    const nomeInput = document.getElementById('alunoNomeCompleto');
    const idadeInput = document.getElementById('alunoIdade');
    const alturaInput = document.getElementById('alunoAltura');
    const pesoInput = document.getElementById('alunoPeso');
    if (nomeInput && idadeInput && alturaInput && pesoInput) {
        nomeInput.value = '';
        idadeInput.value = '';
        alturaInput.value = '';
        pesoInput.value = '';
    }
    else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }
}
// Função para adicionar um aluno
function addAlunoHandler(event) {
    event.preventDefault(); // Evitar o comportamento padrão do formulário
    const nomeInput = document.getElementById('alunoNomeCompleto');
    const idadeInput = document.getElementById('alunoIdade');
    const alturaInput = document.getElementById('alunoAltura');
    const pesoInput = document.getElementById('alunoPeso');
    if (nomeInput && idadeInput && alturaInput && pesoInput) {
        const nome = nomeInput.value;
        const idade = parseInt(idadeInput.value);
        const altura = parseFloat(alturaInput.value);
        const peso = parseFloat(pesoInput.value);
        // Adicionar um novo aluno à turma
        const novoAluno = new Aluno(idAluno, nome, idade, altura, peso);
        turma.adicionarAluno(novoAluno);
        // Atualizar o index
        idAluno++;
        // Fecha o modal do bootstrap
        modal === null || modal === void 0 ? void 0 : modal.hide();
        // Limpar os campos do formulário
        clearFormFields();
        // Renderizar novamente a lista após a adição do aluno
        renderAlunoList(turma.alunos);
    }
    else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }
    // Atualizar as estatísticas da turma após adicionar um aluno
    updateTurmaStatistics();
}
// Função para salvar aluno editado
function saveEditedAluno(aluno, nomeCompleto, idade, altura, peso) {
    const editedAluno = new Aluno(aluno.id, nomeCompleto, idade, altura, peso);
    console.log("Aluno a ser editado: " + editedAluno);
    // Atualizar o aluno na turma com os novos dados
    turma.atualizarAluno(aluno.id, editedAluno);
    // Renderizar novamente a lista após a edição
    renderAlunoList(turma.alunos);
}
// Função para capturar o aluno a ser editado
function saveEditedAlunoHandler(event) {
    var _a, _b, _c, _d;
    event.preventDefault(); // Evitar o comportamento padrão do formulário
    if (!currentEditingAluno) {
        console.error("Não há aluno em edição.");
        return;
    }
    // Capturar os valores dos campos do formulário
    const nomeCompleto = (_a = alunoNomeCompletoInput === null || alunoNomeCompletoInput === void 0 ? void 0 : alunoNomeCompletoInput.value.trim()) !== null && _a !== void 0 ? _a : '';
    const idade = parseInt((_b = alunoIdadeInput === null || alunoIdadeInput === void 0 ? void 0 : alunoIdadeInput.value) !== null && _b !== void 0 ? _b : '0');
    const altura = parseFloat((_c = alunoAlturaInput === null || alunoAlturaInput === void 0 ? void 0 : alunoAlturaInput.value) !== null && _c !== void 0 ? _c : '0');
    const peso = parseFloat((_d = alunoPesoInput === null || alunoPesoInput === void 0 ? void 0 : alunoPesoInput.value) !== null && _d !== void 0 ? _d : '0');
    console.log("Botão Save CLICADO!");
    console.log(nomeCompleto);
    // Chamar a função saveEditedAluno com os valores capturados
    saveEditedAluno(currentEditingAluno, nomeCompleto, idade, altura, peso);
    // Fecha o modal do bootstrap
    modal === null || modal === void 0 ? void 0 : modal.hide();
    // Limpar os campos do formulário
    clearFormFields();
    // Resetar o aluno atualmente em edição
    currentEditingAluno = new Aluno();
    // Atualizar as estatísticas da turma após adicionar um aluno
    updateTurmaStatistics();
}
// Função para excluir um aluno
function deleteAlunoHandler(id) {
    // Chamar a função para excluir o aluno com o ID fornecido
    turma.removerAluno(id);
    // Renderizar novamente a lista após a exclusão
    renderAlunoList(turma.alunos);
    // Atualizar as estatísticas da turma após adicionar um aluno
    updateTurmaStatistics();
}
// Função para atualizar as estatísticas da turma
function updateTurmaStatistics() {
    const mediaIdade = turma.getMediaIdades();
    const mediaAltura = turma.getMediaAlturas();
    const mediaPeso = turma.getMediaPesos();
    console.log(`Idade Média: ${mediaIdade}`);
    console.log(`Altura Média: ${mediaAltura}`);
    console.log(`Peso Média: ${mediaPeso}`);
    // Atualizar as progress bars com as médias calculadas
    progressBars[0].style.width = `${mediaIdade}%`;
    progressBars[0].setAttribute('aria-valuenow', `${mediaIdade}`);
    progressBars[0].textContent = `${mediaIdade.toFixed(2)} anos`;
    progressBars[1].style.width = `${mediaAltura}%`;
    progressBars[1].setAttribute('aria-valuenow', `${mediaAltura}`);
    progressBars[1].textContent = `${mediaAltura.toFixed(2)} cm`;
    progressBars[2].style.width = `${mediaPeso}%`;
    progressBars[2].setAttribute('aria-valuenow', `${mediaPeso}`);
    progressBars[2].textContent = `${mediaPeso.toFixed(2)} kg`;
}
// Função para procurar um Aluno dentro do array de Alunos da classe Turma
function findAlunoById(id) {
    for (const aluno of turma.alunos) {
        if (aluno.id === id) {
            console.log("findAlunoById.nome = " + aluno.nome);
            return aluno;
        }
    }
    return null; // Retorna null se nenhum aluno com o ID desejado for encontrado
}
/********************************************* EVENTOS *********************************************/
// Evento de submissão do formulário de aluno
if (addAlunoForm) {
    addAlunoForm.addEventListener('submit', function (event) {
        // Verifica se o botão "Adicionar Aluno" está visível
        if (addAlunoButton && addAlunoButton.style.display !== 'none') {
            addAlunoHandler(event); // Se estiver visível, chama a função normalmente
        }
        else {
            event.preventDefault(); // Se estiver oculto, impede o comportamento padrão de submissão
        }
    });
}
else {
    console.error("O formulário addAlunoForm não foi encontrado.");
}
// Event new reminder para abrir o modal do novo lembrete
if (newAlunoButton) {
    newAlunoButton.addEventListener("click", function (event) {
        // Limpar os campos do formulário
        clearFormFields();
        // Exiba o botão "Salvar"
        saveEditButton.style.display = 'none';
        // Esconda o botão "Adicionar Lembrete"
        addAlunoButton.style.display = 'block';
    });
}
// Event listener para editar e excluir alunos
if (alunoList) {
    alunoList.addEventListener('click', function (event) {
        var _a, _b, _c, _d, _e;
        const target = event.target;
        if (target.classList.contains('btn-editar')) {
            const id = parseInt(target.getAttribute('data-id') || '');
            currentEditingAluno = (_a = findAlunoById(id)) !== null && _a !== void 0 ? _a : new Aluno();
            // Abrir o formulário de edição
            // Preencher os campos do formulário com as informações do aluno selecionado
            alunoNomeCompletoInput.value = (_b = currentEditingAluno === null || currentEditingAluno === void 0 ? void 0 : currentEditingAluno.nome) !== null && _b !== void 0 ? _b : '';
            alunoIdadeInput.value = (_c = currentEditingAluno === null || currentEditingAluno === void 0 ? void 0 : currentEditingAluno.idade.toString()) !== null && _c !== void 0 ? _c : '';
            alunoAlturaInput.value = (_d = currentEditingAluno === null || currentEditingAluno === void 0 ? void 0 : currentEditingAluno.altura.toString()) !== null && _d !== void 0 ? _d : '';
            alunoPesoInput.value = (_e = currentEditingAluno === null || currentEditingAluno === void 0 ? void 0 : currentEditingAluno.peso.toString()) !== null && _e !== void 0 ? _e : '';
            // Exibir o botão "Salvar"
            saveEditButton.style.display = 'block';
            // Esconder o botão "Adicionar Aluno"
            addAlunoButton.style.display = 'none';
        }
        else if (target.classList.contains('btn-excluir')) {
            const id = parseInt(target.getAttribute('data-id') || '');
            turma.removerAluno(id);
            // Renderizar novamente a lista após a exclusão
            renderAlunoList(turma.alunos);
        }
    });
}
else {
    console.error("O elemento aluno-list não foi encontrado.");
}
// Event listener para o botão "Salvar"
if (saveEditButton) {
    saveEditButton.addEventListener('click', saveEditedAlunoHandler);
}
else {
    console.error("O botão saveEditButton não foi encontrado.");
}
// Evento de clique nos botões de excluir aluno
if (alunoList) {
    alunoList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('btn-excluir')) {
            const id = parseInt(target.getAttribute('data-id') || '');
            // Chamar a função para excluir o aluno com o ID fornecido
            deleteAlunoHandler(id);
        }
    });
}
else {
    console.error("O elemento aluno-list não foi encontrado.");
}
// Atualizar as estatísticas da turma após adicionar um aluno
updateTurmaStatistics();
