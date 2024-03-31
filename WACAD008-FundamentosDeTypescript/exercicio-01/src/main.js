"use strict";
/********************************************* VARIÁVEIS e TIPOS *********************************************/
// Array responsável por guardar o conjunto de Reminders
let reminders = [];
// Variável global de Reminder:
// Permite guardar o array sendo atualmente manipulado ao clicar em Editar Reminder
let currentEditingReminder = null;
// Selecionando elementos do DOM
const titleInput = document.getElementById('reminderTitle');
const insertionDateInput = document.getElementById('insertionDate');
const deadlineInput = document.getElementById('deadline');
const descriptionInput = document.getElementById('description');
const newReminderButton = document.getElementById('newReminderButton');
const addReminderForm = document.getElementById('addReminderForm');
const addReminderButton = document.getElementById('addReminderButton');
const saveEditButton = document.getElementById('saveEditButton');
const reminderList = document.getElementById('reminder-list');
const modalElement = document.getElementById('modalNovoLembrete');
const modal = modalElement && new bootstrap.Modal(modalElement); // Verifica se o modalElement é null antes de passá-lo ao construtor
const exitButton = document.getElementById('exitButton');
/********************************************* FUNÇÕES *********************************************/
// Função para verificar se o usuário está autenticado
function checkAuthentication() {
    const authenticated = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : "";
    return authenticated === 'true';
}
// Função para exibir o nome do usuário ao ser autenticado
function displayUserName() {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        const userString = localStorage.getItem('currentUser');
        if (userString) {
            const user = JSON.parse(userString);
            if (user && user.name) {
                userNameElement.textContent = `Olá, ${user.name}!`;
            }
        }
    }
}
// Função para adicionar um lembrete
function addReminder(title, insertionDate, deadline = null, description = null) {
    return [title, insertionDate, deadline, description];
}
// Função para salvar lembrete editado
function saveEditedReminder(reminder, title, insertionDate, deadline = null, description = null) {
    const editedReminder = [title, insertionDate, deadline, description];
    const index = reminders.indexOf(reminder);
    console.log("Index do Reminder a ser Editado: " + index);
    // Verificar se o lembrete a ser editado foi encontrado no array
    if (index !== -1) { // Quando o lembrete a ser editado não é encontrado, normalmente retorna -1
        console.log("Este é o lembrete editado pelo saveEditedReminder: " + editedReminder);
        // Remover o lembrete antigo do array e adicionar o lembrete editado na mesma posição
        reminders.splice(index, 1, editedReminder);
        // Renderizar novamente a lista após a edição
        renderReminderList(reminders);
        console.log("Array de lembretes após adicionar o novo lembrete editado: " + reminders);
    }
    else {
        console.error("O lembrete a ser editado não foi encontrado no array de lembretes.");
        console.log("Lembrete a ser editado:", reminder);
        console.log("Lembretes no array:", reminders);
    }
}
// Função para capturar o lembrete a ser editado
function saveEditedReminderHandler(event) {
    var _a, _b, _c;
    event.preventDefault(); // Evitar o comportamento padrão do formulário
    console.log('Passou no saveEditedReminderHandler!');
    if (!currentEditingReminder) {
        console.error("Não há lembrete em edição.");
        return;
    }
    // Capturar os valores dos campos do formulário
    const title = (_a = titleInput === null || titleInput === void 0 ? void 0 : titleInput.value) !== null && _a !== void 0 ? _a : '';
    const insertionDate = new Date((_b = insertionDateInput === null || insertionDateInput === void 0 ? void 0 : insertionDateInput.value) !== null && _b !== void 0 ? _b : '');
    const deadline = (deadlineInput === null || deadlineInput === void 0 ? void 0 : deadlineInput.value) ? new Date(deadlineInput.value) : null;
    const description = (_c = descriptionInput === null || descriptionInput === void 0 ? void 0 : descriptionInput.value) !== null && _c !== void 0 ? _c : null;
    // Fecha o modal do bootstrap
    modal === null || modal === void 0 ? void 0 : modal.hide();
    // Chamar a função saveEditedReminder com os valores capturados
    saveEditedReminder(currentEditingReminder, title, insertionDate, deadline, description);
    // Limpar os campos do formulário
    clearFormFields();
    // Resetar o lembrete atualmente em edição
    currentEditingReminder = null;
}
// Função para excluir o lembrete
function deleteReminderHandler(reminder) {
    // Confirmar a exclusão com o usuário
    if (confirm('Tem certeza que deseja excluir este lembrete?')) {
        // Remover o lembrete do array de lembretes
        reminders = reminders.filter((r) => r !== reminder);
        // Renderizar novamente a lista após a exclusão
        renderReminderList(reminders);
    }
}
// Função para limpar os campos do formulário
function clearFormFields() {
    if (titleInput && insertionDateInput && deadlineInput && descriptionInput) {
        titleInput.value = '';
        insertionDateInput.value = '';
        deadlineInput.value = '';
        descriptionInput.value = '';
    }
    else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }
}
// Função para adicionar zeros à esquerda, se necessário - Necessária para formatDateTime()
function addLeadingZero(value) {
    return value < 10 ? `0${value}` : `${value}`;
}
// Função para formatar data e hora para o formato "yyyy-MM-ddThh:mm"
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = addLeadingZero(date.getMonth() + 1);
    const day = addLeadingZero(date.getDate());
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
function formatViewDataTime(date) {
    const dia = addLeadingZero(date.getDate());
    const mes = addLeadingZero(date.getMonth() + 1);
    const ano = date.getFullYear();
    const horas = addLeadingZero(date.getHours());
    const minutos = addLeadingZero(date.getMinutes());
    return `${dia}/${mes}/${ano}, ${horas}:${minutos}`;
}
// Função para renderizar a lista de lembretes
function renderReminderList(reminders) {
    if (reminderList) {
        reminderList.innerHTML = ''; // Limpar a lista antes de renderizar novamente
        reminders.forEach((reminder, index) => {
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
            if (reminderList)
                reminderList.appendChild(listItem);
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
    }
    else {
        console.error("O elemento reminder-list não foi encontrado.");
    }
}
// Função para sair da aplicação
function exitApp() {
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
    }
    else {
        // Exibi o nome do usuário
        displayUserName();
    }
});
// Event new reminder para abrir o modal do novo lembrete
if (newReminderButton) {
    newReminderButton.addEventListener("click", function (event) {
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
    addReminderForm.addEventListener('submit', function (event) {
        // Verifica se o botão "Adicionar Aluno" está visível
        if (addReminderButton && addReminderButton.style.display !== 'none') {
            event.preventDefault(); // Evitar o comportamento padrão do formulário
            console.log("Adicionar um novo lembrete!");
            if (titleInput && insertionDateInput) {
                const title = titleInput.value;
                const insertionDate = new Date(insertionDateInput.value);
                const deadline = deadlineInput.value ? new Date(deadlineInput.value) : null;
                const description = descriptionInput ? descriptionInput.value : null;
                const newReminder = addReminder(title, insertionDate, deadline, description);
                reminders.push(newReminder);
                renderReminderList(reminders);
                // Fecha o modal do bootstrap
                modal === null || modal === void 0 ? void 0 : modal.hide();
                // Limpar os campos do formulário
                clearFormFields();
            }
            else {
                console.error("Um ou mais campos de entrada não foram encontrados.");
            }
        }
        else {
            event.preventDefault(); // Se estiver oculto, impede o comportamento padrão de submissão
        }
    });
}
else {
    console.error("O formulário addReminderForm não foi encontrado.");
}
// Event listener para editar e excluir lembretes
if (reminderList) {
    reminderList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('btn-editar')) {
            const index = parseInt(target.getAttribute('data-index') || '');
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
        }
        else if (target.classList.contains('btn-excluir')) {
            const index = parseInt(target.getAttribute('data-index') || '');
            const reminder = reminders[index];
            // Chamar a função para excluir o lembrete
            deleteReminderHandler(reminder);
        }
    });
}
else {
    console.error("O elemento reminder-list não foi encontrado.");
}
// Event listener para o botão "Salvar"
if (saveEditButton) {
    saveEditButton.addEventListener('click', saveEditedReminderHandler);
}
else {
    console.error("O botão saveEditButton não foi encontrado.");
}
// Event exit para sair da aplicação e voltar a rota inicial
if (exitButton) {
    exitButton.addEventListener('click', exitApp);
}
else {
    console.error("O botão exitButton não foi encontrado.");
}
// Renderizar a lista inicial de lembretes (se houver)
renderReminderList(reminders);
