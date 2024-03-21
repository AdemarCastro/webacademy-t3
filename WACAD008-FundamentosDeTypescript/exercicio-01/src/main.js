var reminders = []; // Variável reminders agora está definida globalmente
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
    console.log(index);
    // Verificar se o lembrete a ser editado foi encontrado no array
    if (index !== -1) {
        console.log("Este é o lembrete editado pelo saveEditedReminder: " + editedReminder);
        // Remover o lembrete antigo do array
        reminders.splice(index, 1);
        // Adicionar o lembrete editado na posição original
        reminders.push(editedReminder);
        console.log("Array de lembretes após adicionar o novo lembrete editado: " + reminders);
        renderReminderList(reminders); // Renderizar novamente a lista após a edição
        saveEditButton.style.display = "none";
        addReminderButton.style.display = "block";
    }
    else {
        console.error("O lembrete a ser editado não foi encontrado no array de lembretes.");
        console.log("Lembrete a ser editado:", reminder);
        console.log("Lembretes no array:", reminders);
    }
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
// Função para renderizar a lista de lembretes
function renderReminderList(reminders) {
    if (reminderList) {
        reminderList.innerHTML = ''; // Limpar a lista antes de renderizar novamente
        reminders.forEach(function (reminder, index) {
            var title = reminder[0], insertionDate = reminder[1], deadline = reminder[2], description = reminder[3];
            var listItem = document.createElement('tr');
            listItem.innerHTML = "\n                <td>".concat(title, "</td>\n                <td>").concat(insertionDate, "</td>\n                <td>").concat(deadline ? deadline : '', "</td>\n                <td>").concat(description ? description : '', "</td>\n                <td>\n                    <button type=\"button\" class=\"btn btn-primary btn-editar\" data-index=\"").concat(index, "\">Editar</button>\n                    <button type=\"button\" class=\"btn btn-danger btn-excluir\" data-index=\"").concat(index, "\">Excluir</button>\n                </td>\n            ");
            if (reminderList)
                reminderList.appendChild(listItem);
        });
    }
    else {
        console.error("O elemento reminder-list não foi encontrado.");
    }
}
// Event listener para adicionar lembrete
if (addReminderForm) {
    addReminderForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar o comportamento padrão do formulário
        console.log("Adicionar um novo lembrete!");
        if (titleInput && insertionDateInput) {
            var title = titleInput.value;
            // const insertionDate : Date = formatLocalDate(new Date(insertionDateInput.value));
            var insertionDate = new Date(insertionDateInput.value);
            // const deadline : Date = deadlineInput.value ? formatLocalDate(new Date(deadlineInput.value)) : null;
            var deadline = deadlineInput.value ? new Date(deadlineInput.value) : null;
            var description = descriptionInput ? descriptionInput.value : null;
            var newReminder = addReminder(title, insertionDate, deadline, description);
            reminders.push(newReminder);
            renderReminderList(reminders);
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
// Função para salvar lembrete editado
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
    // Chamar a função saveEditedReminder com os valores capturados
    saveEditedReminder(currentEditingReminder, title, insertionDate, deadline, description);
    // Limpar os campos do formulário
    clearFormFields();
    // Resetar o lembrete atualmente em edição
    currentEditingReminder = null;
}
// Event listener para editar lembrete
if (reminderList) {
    reminderList.addEventListener('click', function (event) {
        var target = event.target;
        if (target.classList.contains('btn-editar')) {
            var index = parseInt(target.getAttribute('data-index') || '');
            currentEditingReminder = reminders[index];
            // Abrir o formulário de edição
            // Preencher os campos do formulário com as informações do lembrete selecionado
            titleInput.value = currentEditingReminder[0];
            insertionDateInput.value = currentEditingReminder[1].toISOString().slice(0, 16);
            deadlineInput.value = currentEditingReminder[2] ? currentEditingReminder[2].toISOString().slice(0, 16) : '';
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
