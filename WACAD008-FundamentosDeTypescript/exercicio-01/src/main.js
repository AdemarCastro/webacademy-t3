/********************************************* VARIÁVEIS e TIPOS *********************************************/
// Array responsável por guardar o conjunto de Reminders
var reminders = [];
// Variável global de Reminder:
// Permite guardar o array sendo atualmente manipulado ao clicar em Editar Reminder
var currentEditingReminder = null;
// Selecionando elementos do DOM
var titleInput = document.getElementById('reminderTitle');
var insertionDateInput = document.getElementById('insertionDate');
var deadlineInput = document.getElementById('deadline');
var descriptionInput = document.getElementById('description');
var newReminderButton = document.getElementById('newReminderButton');
var addReminderForm = document.getElementById('addReminderForm');
var addReminderButton = document.getElementById('addReminderButton');
var saveEditButton = document.getElementById('saveEditButton');
var reminderList = document.getElementById('reminder-list');
var modal = new bootstrap.Modal(document.getElementById('modalNovoLembrete'));
/********************************************* FUNÇÕES *********************************************/
// Função para adicionar um lembrete
function addReminder(title, insertionDate, deadline, description) {
    if (deadline === void 0) { deadline = null; }
    if (description === void 0) { description = null; }
    return [title, insertionDate, deadline, description];
}
// Função para salvar lembrete editado
function saveEditedReminder(reminder, title, insertionDate, deadline, description) {
    if (deadline === void 0) { deadline = null; }
    if (description === void 0) { description = null; }
    var editedReminder = [title, insertionDate, deadline, description];
    var index = reminders.indexOf(reminder);
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
    event.preventDefault(); // Evitar o comportamento padrão do formulário
    console.log('Passou no saveEditedReminderHandler!');
    if (!currentEditingReminder) {
        console.error("Não há lembrete em edição.");
        return;
    }
    // Capturar os valores dos campos do formulário
    var title = titleInput.value;
    var insertionDate = new Date(insertionDateInput.value);
    var deadline = deadlineInput.value ? new Date(deadlineInput.value) : null;
    var description = descriptionInput.value ? descriptionInput.value : null;
    // Fecha o modal do bootstrap
    modal.hide();
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
        reminders = reminders.filter(function (r) { return r !== reminder; });
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
    return value < 10 ? "0".concat(value) : "".concat(value);
}
// Função para formatar data e hora para o formato "yyyy-MM-ddThh:mm"
function formatDateTime(date) {
    var year = date.getFullYear();
    var month = addLeadingZero(date.getMonth() + 1);
    var day = addLeadingZero(date.getDate());
    var hours = addLeadingZero(date.getHours());
    var minutes = addLeadingZero(date.getMinutes());
    return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes);
}
function formatViewDataTime(date) {
    var dia = addLeadingZero(date.getDate());
    var mes = addLeadingZero(date.getMonth() + 1);
    var ano = date.getFullYear();
    var horas = addLeadingZero(date.getHours());
    var minutos = addLeadingZero(date.getMinutes());
    return "".concat(dia, "/").concat(mes, "/").concat(ano, ", ").concat(horas, ":").concat(minutos);
}
// Função para renderizar a lista de lembretes
function renderReminderList(reminders) {
    if (reminderList) {
        reminderList.innerHTML = ''; // Limpar a lista antes de renderizar novamente
        reminders.forEach(function (reminder, index) {
            var title = reminder[0], insertionDate = reminder[1], deadline = reminder[2], description = reminder[3];
            var listItem = document.createElement('tr');
            listItem.innerHTML = "\n                <td>".concat(title, "</td>\n                <td>").concat(formatViewDataTime(insertionDate), "</td>\n                <td>").concat(deadline ? formatViewDataTime(deadline) : 'Não há', "</td>\n                <td style=\"max-width: 150px;\" class=\"text-truncate\" data-bs-toggle=\"modal\" data-bs-target=\"#descricaoCompletaModal\" data-descricao=\"").concat(description, "\">").concat(description, "</td>\n                <td>\n                    <button type=\"button\" class=\"btn btn-primary btn-editar\" data-bs-toggle=\"modal\" data-bs-target=\"#modalNovoLembrete\" data-index=\"").concat(index, "\">Editar</button>\n                    <button type=\"button\" class=\"btn btn-danger btn-excluir\" data-index=\"").concat(index, "\">Excluir</button>\n                </td>\n            ");
            if (reminderList)
                reminderList.appendChild(listItem);
        });
        // Adicionar evento de clique para abrir o modal com a descrição completa
        var descricaoCompletaCells = document.querySelectorAll('#reminder-list td[data-bs-toggle="modal"]');
        descricaoCompletaCells.forEach(function (cell) {
            cell.addEventListener('click', function () {
                var descricaoCompletaTexto = cell.getAttribute('data-descricao');
                var descricaoCompletaModal = document.getElementById('descricaoCompletaTexto');
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
/********************************************* EVENTOS *********************************************/
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
        event.preventDefault(); // Evitar o comportamento padrão do formulário
        console.log("Adicionar um novo lembrete!");
        if (titleInput && insertionDateInput) {
            var title = titleInput.value;
            var insertionDate = new Date(insertionDateInput.value);
            var deadline = deadlineInput.value ? new Date(deadlineInput.value) : null;
            var description = descriptionInput ? descriptionInput.value : null;
            var newReminder = addReminder(title, insertionDate, deadline, description);
            reminders.push(newReminder);
            renderReminderList(reminders);
            // Fecha o modal do bootstrap
            modal.hide();
            // Limpar os campos do formulário
            clearFormFields();
        }
        else {
            console.error("Um ou mais campos de entrada não foram encontrados.");
        }
    });
}
else {
    console.error("O formulário addReminderForm não foi encontrado.");
}
// Event listener para editar e excluir lembretes
if (reminderList) {
    reminderList.addEventListener('click', function (event) {
        var target = event.target;
        if (target.classList.contains('btn-editar')) {
            var index = parseInt(target.getAttribute('data-index') || '');
            currentEditingReminder = reminders[index];
            // Abrir o formulário de edição
            // Preencher os campos do formulário com as informações do lembrete selecionado
            titleInput.value = currentEditingReminder[0];
            insertionDateInput.value = formatDateTime(currentEditingReminder[1]);
            deadlineInput.value = currentEditingReminder[2] ? formatDateTime(currentEditingReminder[2]) : '';
            descriptionInput.value = currentEditingReminder[3] ? currentEditingReminder[3] : '';
            console.log("Este é o Lembrete a ser editado: " + currentEditingReminder);
            // Exiba o botão "Salvar"
            saveEditButton.style.display = 'block';
            // Esconda o botão "Adicionar Lembrete"
            addReminderButton.style.display = 'none';
        }
        else if (target.classList.contains('btn-excluir')) {
            var index = parseInt(target.getAttribute('data-index') || '');
            var reminder = reminders[index];
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
// Renderizar a lista inicial de lembretes (se houver)
renderReminderList(reminders);