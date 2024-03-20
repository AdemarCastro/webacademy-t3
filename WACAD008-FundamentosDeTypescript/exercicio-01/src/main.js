var reminders = []; // Variável reminders agora está definida globalmente
// Função para adicionar um lembrete
function addReminder(title, insertionDate, deadline, description) {
    if (deadline === void 0) { deadline = null; }
    if (description === void 0) { description = null; }
    return [title, insertionDate, deadline, description];
}
// Função para editar um lembrete
function editReminder(reminder, title, insertionDate, deadline, description) {
    if (deadline === void 0) { deadline = null; }
    if (description === void 0) { description = null; }
    reminder[0] = title;
    reminder[1] = insertionDate;
    reminder[2] = deadline;
    reminder[3] = description;
    return reminder;
}
// Função para deletar um lembrete
function deleteReminder(reminderList, reminder) {
    return reminderList.filter(function (r) { return r !== reminder; });
}
// Selecionando elementos do DOM
var titleInput = document.getElementById('reminderTitle');
var insertionDateInput = document.getElementById('insertionDate');
var deadlineInput = document.getElementById('deadline');
var descriptionInput = document.getElementById('description');
var addReminderForm = document.getElementById('addReminderForm');
var reminderList = document.getElementById('reminder-list');
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
            listItem.innerHTML = "\n                <td>".concat(title, "</td>\n                <td>").concat(insertionDate, "</td>\n                <td>").concat(deadline ? deadline : '', "</td>\n                <td>").concat(description ? description : '', "</td>\n                <td>\n                    <button type=\"button\" class=\"btn btn-primary\" data-index=\"").concat(index, "\">Editar</button>\n                    <button type=\"button\" class=\"btn btn-danger\" data-index=\"").concat(index, "\">Excluir</button>\n                </td>\n            ");
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
        if (titleInput && insertionDateInput) {
            var title = titleInput.value;
            var insertionDate = new Date(insertionDateInput.value);
            var deadline = deadlineInput ? new Date(deadlineInput.value) : null;
            var description = descriptionInput ? descriptionInput.value : null;
            var newReminder = addReminder(title, insertionDate, deadline, description);
            reminders.push(newReminder);
            renderReminderList(reminders);
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
function openEditForm(reminder) {
    // Preencher os campos do formulário com as informações do lembrete selecionado
    titleInput.value = reminder[0];
    insertionDateInput.value = reminder[1].toISOString().slice(0, 16);
    deadlineInput.value = reminder[2] ? reminder[2].toISOString().slice(0, 16) : '';
    descriptionInput.value = reminder[3] ? reminder[3] : '';
    // Exibir o modal de edição
    var modal = new bootstrap.Modal(document.getElementById('modalNovoLembrete'));
    modal.show();
}
// Event listener para editar lembrete
if (reminderList) {
    reminderList.addEventListener('click', function (event) {
        var target = event.target;
        if (target.classList.contains('btn-primary')) {
            var index = parseInt(target.getAttribute('data-index') || '');
            var reminder = reminders[index];
            openEditForm(reminder);
        }
        else if (target.classList.contains('btn-danger')) {
            // Implemente aqui a lógica para excluir o lembrete
        }
    });
}
else {
    console.error("O elemento reminder-list não foi encontrado.");
}
// Renderizar a lista inicial de lembretes (se houver)
renderReminderList(reminders);
