/********************************************* DEFININDO CLASSES *********************************************/
class Aluno {
    id: number;
    nome: string;
    idade: number;
    altura: number;
    peso: number;

    constructor(id?: number, nome?: string, idade?: number, altura?: number, peso?: number) {
        this.id = id || 0;
        this.nome = nome || "";
        this.idade = idade || 0;
        this.altura = altura || 0;
        this.peso = peso || 0;
    }
}

class Turma {
    id: number;
    nome: string;
    alunos: Aluno[];

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }

    getAlunos() : Aluno[] {
        return this.alunos;
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
                console.log("Novo Aluno: " + novoAluno);
                return novoAluno;
            }
            return aluno;
        });
    }
}

/********************************************* VARIÁVEIS e TIPOS *********************************************/

// Instância da turma
const turma: Turma = new Turma(1, "Turma");
const alunoList: HTMLElement | null = document.getElementById('aluno-list');
const addAlunoForm: HTMLFormElement | null = document.getElementById('addAlunoForm') as HTMLFormElement;
const newAlunoButton: HTMLButtonElement | null = document.getElementById('newAlunoButton') as HTMLButtonElement;
const alunoNomeCompletoInput : HTMLInputElement | null = document.getElementById('alunoNomeCompleto') as HTMLInputElement;
const alunoIdadeInput : HTMLInputElement | null = document.getElementById('alunoIdade') as HTMLInputElement;
const alunoAlturaInput : HTMLInputElement | null = document.getElementById('alunoAltura') as HTMLInputElement;
const alunoPesoInput : HTMLInputElement | null = document.getElementById('alunoPeso') as HTMLInputElement;
const progressBars = document.querySelectorAll('.progress-bar') as NodeListOf<HTMLElement>;
// const mediaBar = document.getElementById('mediaBar') as
const modalElement = document.getElementById('modalNovoAluno');
const modal = modalElement && new bootstrap.Modal(modalElement); // Verifica se o modalElement é null antes de passá-lo ao construtor

const addAlunoButton: HTMLButtonElement | null = document.getElementById('addAlunoButton') as HTMLButtonElement;
const saveEditButton: HTMLButtonElement | null = document.getElementById('saveEditButton') as HTMLButtonElement;

// Variável global de edição do Aluno
let currentEditingAluno : Aluno;

// Variável global para definir o index do aluno
let idAluno: number = 0;

/********************************************* FUNÇÕES *********************************************/

// Função para renderizar a lista de alunos
function renderAlunoList(alunos: Aluno[]) : void {
    const alunoListElement: HTMLElement | null = document.getElementById('aluno-list');
    if (alunoListElement) {
        // Limpar a lista antes de renderizar novamente
        alunoListElement.innerHTML = '';

        alunos.forEach((aluno : Aluno) : void => {
            const listItem : HTMLTableRowElement = document.createElement('tr');

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
            if (alunoListElement) alunoListElement.appendChild(listItem);
        });
    } else {
        console.error("O elemento aluno-list não foi encontrado.");
    }
}

// Função para limpar os campos do formulário de aluno
function clearFormFields() : void {
    const nomeInput: HTMLInputElement | null = document.getElementById('alunoNomeCompleto') as HTMLInputElement;
    const idadeInput: HTMLInputElement | null = document.getElementById('alunoIdade') as HTMLInputElement;
    const alturaInput: HTMLInputElement | null = document.getElementById('alunoAltura') as HTMLInputElement;
    const pesoInput: HTMLInputElement | null = document.getElementById('alunoPeso') as HTMLInputElement;

    if (nomeInput && idadeInput && alturaInput && pesoInput) {
        nomeInput.value = '';
        idadeInput.value = '';
        alturaInput.value = '';
        pesoInput.value = '';
    } else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }
}

// Função para adicionar um aluno
function addAlunoHandler(event: SubmitEvent): void {
    event.preventDefault(); // Evitar o comportamento padrão do formulário

    const nomeInput: HTMLInputElement | null = document.getElementById('alunoNomeCompleto') as HTMLInputElement;
    const idadeInput: HTMLInputElement | null = document.getElementById('alunoIdade') as HTMLInputElement;
    const alturaInput: HTMLInputElement | null = document.getElementById('alunoAltura') as HTMLInputElement;
    const pesoInput: HTMLInputElement | null = document.getElementById('alunoPeso') as HTMLInputElement;

    if (nomeInput && idadeInput && alturaInput && pesoInput) {
        const nome: string = nomeInput.value;
        const idade: number = parseInt(idadeInput.value);
        const altura: number = parseFloat(alturaInput.value);
        const peso: number = parseFloat(pesoInput.value);

        // Adicionar um novo aluno à turma
        const novoAluno: Aluno = new Aluno(idAluno, nome, idade, altura, peso);
        turma.adicionarAluno(novoAluno);

        // Atualizar o index
        idAluno++;

        // Fecha o modal do bootstrap
        modal?.hide();

        // Limpar os campos do formulário
        clearFormFields();

        // Renderizar novamente a lista após a adição do aluno
        renderAlunoList(turma.alunos);

    } else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }

    // Atualizar as estatísticas da turma após adicionar um aluno
    updateTurmaStatistics();
}

// Função para salvar aluno editado
function saveEditedAluno(aluno: Aluno, nomeCompleto: string, idade: number, altura: number, peso: number): void {
    const editedAluno: Aluno = new Aluno(aluno.id, nomeCompleto, idade, altura, peso);

    console.log("Aluno a ser editado: " + editedAluno);

    // Atualizar o aluno na turma com os novos dados
    turma.atualizarAluno(aluno.id, editedAluno);

    // Renderizar novamente a lista após a edição
    renderAlunoList(turma.alunos);
}

// Função para capturar o aluno a ser editado
function saveEditedAlunoHandler(event: MouseEvent): void {
    event.preventDefault(); // Evitar o comportamento padrão do formulário

    if (!currentEditingAluno) {
        console.error("Não há aluno em edição.");
        return;
    }

    // Capturar os valores dos campos do formulário
    const nomeCompleto: string = alunoNomeCompletoInput?.value.trim() ?? '';
    const idade: number = parseInt(alunoIdadeInput?.value ?? '0');
    const altura: number = parseFloat(alunoAlturaInput?.value ?? '0');
    const peso: number = parseFloat(alunoPesoInput?.value ?? '0');

    console.log("Botão Save CLICADO!");
    console.log(nomeCompleto);

    // Chamar a função saveEditedAluno com os valores capturados
    saveEditedAluno(currentEditingAluno, nomeCompleto, idade, altura, peso);

    // Fecha o modal do bootstrap
    modal?.hide();

    // Limpar os campos do formulário
    clearFormFields();

    // Resetar o aluno atualmente em edição
    currentEditingAluno = new Aluno();

    // Atualizar as estatísticas da turma após adicionar um aluno
    updateTurmaStatistics();
}

// Função para excluir um aluno
function deleteAlunoHandler(id: number): void {

    // Chamar a função para excluir o aluno com o ID fornecido
    turma.removerAluno(id);

    // Renderizar novamente a lista após a exclusão
    renderAlunoList(turma.alunos);

    // Atualizar as estatísticas da turma após adicionar um aluno
    updateTurmaStatistics();
}

// Função para atualizar as estatísticas da turma
function updateTurmaStatistics(): void {
    const mediaIdade: number = turma.getMediaIdades();
    const mediaAltura: number = turma.getMediaAlturas();
    const mediaPeso: number = turma.getMediaPesos();

    console.log(`Idade Média: ${mediaIdade}`);
    console.log(`Altura Média: ${mediaAltura}`);
    console.log(`Peso Média: ${mediaPeso}`);

    // Atualizar as progress bars com as médias calculadas
    (progressBars[0] as HTMLElement).style.width = `${mediaIdade}%`;
    (progressBars[0] as HTMLElement).setAttribute('aria-valuenow', `${mediaIdade}`);
    (progressBars[0] as HTMLElement).textContent = `${mediaIdade.toFixed(2)} anos`;

    (progressBars[1] as HTMLElement).style.width = `${mediaAltura}%`;
    (progressBars[1] as HTMLElement).setAttribute('aria-valuenow', `${mediaAltura}`);
    (progressBars[1] as HTMLElement).textContent = `${mediaAltura.toFixed(2)} cm`;

    (progressBars[2] as HTMLElement).style.width = `${mediaPeso}%`;
    (progressBars[2] as HTMLElement).setAttribute('aria-valuenow', `${mediaPeso}`);
    (progressBars[2] as HTMLElement).textContent = `${mediaPeso.toFixed(2)} kg`;
}

// Função para procurar um Aluno dentro do array de Alunos da classe Turma
function findAlunoById(id : number) : Aluno | null {
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
    addAlunoForm.addEventListener('submit', function(event) {
        // Verifica se o botão "Adicionar Aluno" está visível
        if (addAlunoButton && addAlunoButton.style.display !== 'none') {
            addAlunoHandler(event); // Se estiver visível, chama a função normalmente
        } else {
            event.preventDefault(); // Se estiver oculto, impede o comportamento padrão de submissão
        }
    });
} else {
    console.error("O formulário addAlunoForm não foi encontrado.");
}

// Event new reminder para abrir o modal do novo lembrete
if (newAlunoButton) {
    newAlunoButton.addEventListener("click", function (event : MouseEvent) {

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
    alunoList.addEventListener('click', function (event: MouseEvent): void {
        const target: HTMLElement = event.target as HTMLElement;
        if (target.classList.contains('btn-editar')) {
            const id: number = parseInt(target.getAttribute('data-id') || '');
            currentEditingAluno = findAlunoById(id) ?? new Aluno();

            // Abrir o formulário de edição
            // Preencher os campos do formulário com as informações do aluno selecionado
            alunoNomeCompletoInput.value = currentEditingAluno?.nome ?? '';
            alunoIdadeInput.value = currentEditingAluno?.idade.toString() ?? '';
            alunoAlturaInput.value = currentEditingAluno?.altura.toString() ?? '';
            alunoPesoInput.value = currentEditingAluno?.peso.toString() ?? '';

            // Exibir o botão "Salvar"
            saveEditButton.style.display = 'block';
            // Esconder o botão "Adicionar Aluno"
            addAlunoButton.style.display = 'none';

        } else if (target.classList.contains('btn-excluir')) {
            const id: number = parseInt(target.getAttribute('data-id') || '');
            turma.removerAluno(id);
            // Renderizar novamente a lista após a exclusão
            renderAlunoList(turma.alunos);
        }
    });
} else {
    console.error("O elemento aluno-list não foi encontrado.");
}

// Event listener para o botão "Salvar"
if (saveEditButton) {
    saveEditButton.addEventListener('click', saveEditedAlunoHandler);
} else {
    console.error("O botão saveEditButton não foi encontrado.");
}

// Evento de clique nos botões de excluir aluno
if (alunoList) {
    alunoList.addEventListener('click', function(event: MouseEvent) : void {
        const target : HTMLElement = event.target as HTMLElement;
        if (target.classList.contains('btn-excluir')) {
            const id: number = parseInt(target.getAttribute('data-id') || '');
            // Chamar a função para excluir o aluno com o ID fornecido
            deleteAlunoHandler(id);
        }
    });
} else {
    console.error("O elemento aluno-list não foi encontrado.");
}

// Atualizar as estatísticas da turma após adicionar um aluno
updateTurmaStatistics();