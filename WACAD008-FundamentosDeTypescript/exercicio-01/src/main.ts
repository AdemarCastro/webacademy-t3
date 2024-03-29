/********************************************* VARIÁVEIS e TIPOS *********************************************/

// Tupla responsável por definir os valores do Reminder
type Reminder = [string, Date, Date | null, string | null];

// Array responsável por guardar o conjunto de Reminders
let reminders: Reminder[] = [];

// Variável global de Reminder:
// Permite guardar o array sendo atualmente manipulado ao clicar em Editar Reminder
let currentEditingReminder: Reminder | null = null;

// Selecionando elementos do DOM
const titleInput: HTMLInputElement | null = document.getElementById('reminderTitle') as HTMLInputElement;
const insertionDateInput: HTMLInputElement | null = document.getElementById('insertionDate') as HTMLInputElement;
const deadlineInput: HTMLInputElement | null = document.getElementById('deadline') as HTMLInputElement;
const descriptionInput: HTMLTextAreaElement | null = document.getElementById('description') as HTMLTextAreaElement;
const newReminderButton: HTMLButtonElement | null = document.getElementById('newReminderButton') as HTMLButtonElement;
const addReminderForm: HTMLFormElement | null = document.getElementById('addReminderForm') as HTMLFormElement;
const addReminderButton: HTMLButtonElement | null = document.getElementById('addReminderButton') as HTMLButtonElement;
const saveEditButton: HTMLButtonElement | null = document.getElementById('saveEditButton') as HTMLButtonElement;
const reminderList: HTMLElement | null = document.getElementById('reminder-list');
const modalElement = document.getElementById('modalNovoLembrete');
const modal = modalElement && new bootstrap.Modal(modalElement); // Verifica se o modalElement é null antes de passá-lo ao construtor
const exitButton : HTMLElement | null = document.getElementById('exitButton') as HTMLButtonElement;

/********************************************* INTERFACES *********************************************/
interface User {
    password: string;
    name: string;
    email: string;
}

/********************************************* FUNÇÕES *********************************************/

// Função para verificar se o usuário está autenticado
function checkAuthentication(): boolean {
    const authenticated : string | null = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : "";
    return authenticated === 'true';
}

// Função para exibir o nome do usuário ao ser autenticado
function displayUserName(): void {
    const userNameElement: HTMLElement | null = document.getElementById('userName');
    if (userNameElement) {
        const userString: string | null = localStorage.getItem('currentUser');
        if (userString) {
            const user: User = JSON.parse(userString);
            if (user && user.name) {
                userNameElement.textContent = `Olá, ${user.name}!`;
            }
        }
    }
}

// Função para adicionar um lembrete
function addReminder(title: string, insertionDate: Date, deadline: Date | null = null, description: string | null = null): Reminder {
    return [title, insertionDate, deadline, description];
}

// Função para salvar lembrete editado
function saveEditedReminder(reminder: Reminder, title: string, insertionDate: Date, deadline: Date | null = null, description: string | null = null) : void {
    const editedReminder: Reminder = [title, insertionDate, deadline, description];
    const index : number = reminders.indexOf(reminder);
    console.log("Index do Reminder a ser Editado: " + index);

    // Verificar se o lembrete a ser editado foi encontrado no array
    if (index !== -1) { // Quando o lembrete a ser editado não é encontrado, normalmente retorna -1
        console.log("Este é o lembrete editado pelo saveEditedReminder: " + editedReminder);

        // Remover o lembrete antigo do array e adicionar o lembrete editado na mesma posição
        reminders.splice(index, 1, editedReminder);

        // Renderizar novamente a lista após a edição
        renderReminderList(reminders);
        console.log("Array de lembretes após adicionar o novo lembrete editado: " + reminders);
    } else {
        console.error("O lembrete a ser editado não foi encontrado no array de lembretes.");
        console.log("Lembrete a ser editado:", reminder);
        console.log("Lembretes no array:", reminders);
    }
}

// Função para capturar o lembrete a ser editado
function saveEditedReminderHandler(event: MouseEvent): void {

    event.preventDefault(); // Evitar o comportamento padrão do formulário

    console.log('Passou no saveEditedReminderHandler!');

    if (!currentEditingReminder) {
        console.error("Não há lembrete em edição.");
        return;
    }

    // Capturar os valores dos campos do formulário
    const title: string = titleInput?.value ?? '';
    const insertionDate: Date = new Date(insertionDateInput?.value ?? '');
    const deadline: Date | null = deadlineInput?.value ? new Date(deadlineInput.value) : null;
    const description: string | null = descriptionInput?.value ?? null;

    // Fecha o modal do bootstrap
    modal?.hide();

    // Chamar a função saveEditedReminder com os valores capturados
    saveEditedReminder(currentEditingReminder, title, insertionDate, deadline, description);

    // Limpar os campos do formulário
    clearFormFields();

    // Resetar o lembrete atualmente em edição
    currentEditingReminder = null;
}

// Função para excluir o lembrete
function deleteReminderHandler(reminder: Reminder): void {
    // Confirmar a exclusão com o usuário
    if (confirm('Tem certeza que deseja excluir este lembrete?')) {
        // Remover o lembrete do array de lembretes
        reminders = reminders.filter((r) => r !== reminder);
        // Renderizar novamente a lista após a exclusão
        renderReminderList(reminders);
    }
}


// Função para limpar os campos do formulário
function clearFormFields() : void {
    if (titleInput && insertionDateInput && deadlineInput && descriptionInput) {
        titleInput.value = '';
        insertionDateInput.value = '';
        deadlineInput.value = '';
        descriptionInput.value = '';
    } else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }
}

// Função para adicionar zeros à esquerda, se necessário - Necessária para formatDateTime()
function addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
}

// Função para formatar data e hora para o formato "yyyy-MM-ddThh:mm"
function formatDateTime(date: Date): string {
    const year : number = date.getFullYear();
    const month : string = addLeadingZero(date.getMonth() + 1);
    const day : string = addLeadingZero(date.getDate());
    const hours: string = addLeadingZero(date.getHours());
    const minutes: string = addLeadingZero(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatViewDataTime(date: Date): string {
    const dia : string = addLeadingZero(date.getDate());
    const mes : string= addLeadingZero(date.getMonth() + 1);
    const ano : number = date.getFullYear();
    const horas : string = addLeadingZero(date.getHours());
    const minutos : string = addLeadingZero(date.getMinutes());

    return `${dia}/${mes}/${ano}, ${horas}:${minutos}`;
}


// Função para renderizar a lista de lembretes
function renderReminderList(reminders: Reminder[]) : void {
    if (reminderList) {
        reminderList.innerHTML = ''; // Limpar a lista antes de renderizar novamente
        reminders.forEach((reminder : Reminder, index : number) => {
            const [title, insertionDate, deadline, description] = reminder;
            const listItem = document.createElement('tr');

            listItem.innerHTML = `
                <td>${title}</td>
                <td>${formatViewDataTime(insertionDate)}</td>
                <td>${deadline ? formatViewDataTime(deadline) : "Não há"}</td>
                <td style="max-width: 150px;" class="text-truncate" data-bs-toggle="modal" data-bs-target="#descricaoCompletaModal" data-descricao="${description}">${description ? description : "Sem descrição"}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-editar" data-bs-toggle="modal" data-bs-target="#modalNovoLembrete" data-index="${index}">Editar</button>
                    <button type="button" class="btn btn-danger btn-excluir" data-index="${index}">Excluir</button>
                </td>
            `;
            if (reminderList) reminderList.appendChild(listItem);
        });

        // Adicionar evento de clique para abrir o modal com a descrição completa
        const descricaoCompletaCells = document.querySelectorAll('#reminder-list td[data-bs-toggle="modal"]');
        descricaoCompletaCells.forEach(cell => {
            cell.addEventListener('click', () => {
                const descricaoCompletaTexto = cell.getAttribute('data-descricao');
                const descricaoCompletaModal = document.getElementById('descricaoCompletaTexto');
                if (descricaoCompletaModal) {
                    descricaoCompletaModal.textContent = descricaoCompletaTexto;
                }
            });
        });
    } else {
        console.error("O elemento reminder-list não foi encontrado.");
    }
}

// Função para sair da aplicação
function exitApp() : void {
    // Limpa o localStorage para que apague os usuários criados
    localStorage.clear();

    // Retorna a tela de login
    window.location.href = 'login.html';
}

/********************************************* EVENTOS *********************************************/

// Verificar se o usuário está autenticado antes de permitir o acesso à página
window.addEventListener('DOMContentLoaded', () => {
    if (!checkAuthentication()) {
        // Se o usuário não estiver autenticado, redirecione para a página de login
        window.location.href = 'login.html';
    } else {
        // Exibi o nome do usuário
        displayUserName();
    }
});

// Event new reminder para abrir o modal do novo lembrete
if (newReminderButton) {
    newReminderButton.addEventListener("click", function (event : MouseEvent) {

        // Limpar os campos do formulário
        clearFormFields();

        // Exiba o botão "Salvar"
        saveEditButton.style.display = 'none';
        // Esconda o botão "Adicionar Lembrete"
        addReminderButton.style.display = 'block';

    });
}

// Event listener para adicionar lembrete
if (addReminderForm) {
    addReminderForm.addEventListener('submit', function(event : SubmitEvent): void {

        // Verifica se o botão "Adicionar Aluno" está visível
        if (addReminderButton && addReminderButton.style.display !== 'none') {
            event.preventDefault(); // Evitar o comportamento padrão do formulário

            console.log("Adicionar um novo lembrete!");

            if (titleInput && insertionDateInput) {
                const title: string = titleInput.value;
                const insertionDate : Date = new Date(insertionDateInput.value);
                const deadline : Date | null = deadlineInput.value ? new Date(deadlineInput.value) : null;
                const description: string | null = descriptionInput ? descriptionInput.value : null;
                const newReminder: Reminder = addReminder(title, insertionDate, deadline, description);
                reminders.push(newReminder);
                renderReminderList(reminders);

                // Fecha o modal do bootstrap
                modal?.hide();

                // Limpar os campos do formulário
                clearFormFields();

            } else {
                console.error("Um ou mais campos de entrada não foram encontrados.");
            }
        } else {
            event.preventDefault(); // Se estiver oculto, impede o comportamento padrão de submissão
        }
    });
} else {
    console.error("O formulário addReminderForm não foi encontrado.");
}

// Event listener para editar e excluir lembretes
if (reminderList) {
    reminderList.addEventListener('click', function(event : MouseEvent) : void {
        const target : HTMLElement = event.target as HTMLElement;
        if (target.classList.contains('btn-editar')) {
            const index: number = parseInt(target.getAttribute('data-index') || '');
            currentEditingReminder = reminders[index];

            // Abrir o formulário de edição
            // Preencher os campos do formulário com as informações do lembrete selecionado
            titleInput.value = currentEditingReminder[0];
            insertionDateInput.value = formatDateTime(currentEditingReminder[1]);

            // As duas linhas abaixo no meu compilador apitam um erro, mas os erros não fazem nenhum sentido,
            // já que estou fazendo uma verificação de nulidade antes de atribuir o valor ao
            // .value que só pode ser de um tipo (DATE e STRING) respectivamente
            deadlineInput.value = currentEditingReminder[2] ? formatDateTime(currentEditingReminder[2]) : '';
            descriptionInput.value = currentEditingReminder[3] ? currentEditingReminder[3] : '';


            console.log("Este é o Lembrete a ser editado: " + currentEditingReminder);

            // Exiba o botão "Salvar"
            saveEditButton.style.display = 'block';
            // Esconda o botão "Adicionar Lembrete"
            addReminderButton.style.display = 'none';

        } else if (target.classList.contains('btn-excluir')) {
            const index: number = parseInt(target.getAttribute('data-index') || '');
            const reminder: Reminder = reminders[index];

            // Chamar a função para excluir o lembrete
            deleteReminderHandler(reminder);
        }
    });
} else {
    console.error("O elemento reminder-list não foi encontrado.");
}

// Event listener para o botão "Salvar"
if (saveEditButton) {
    saveEditButton.addEventListener('click', saveEditedReminderHandler);
} else {
    console.error("O botão saveEditButton não foi encontrado.");
}

// Event exit para sair da aplicação e voltar a rota inicial
if (exitButton) {
    exitButton.addEventListener('click', exitApp);
} else {
    console.error("O botão exitButton não foi encontrado.");
}

// Renderizar a lista inicial de lembretes (se houver)
renderReminderList(reminders);