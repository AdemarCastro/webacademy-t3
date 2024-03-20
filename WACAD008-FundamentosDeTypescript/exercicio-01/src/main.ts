// Definição de tipos
type Reminder = [string, Date, Date | null, string | null];
let reminders: Reminder[] = []; // Variável reminders agora está definida globalmente

// Função para adicionar um lembrete
function addReminder(title: string, insertionDate: Date, deadline: Date | null = null, description: string | null = null): Reminder {
    return [title, insertionDate, deadline, description];
}

// Função para editar um lembrete
function editReminder(reminder: Reminder, title: string, insertionDate: Date, deadline: Date | null = null, description: string | null = null): Reminder {
    reminder[0] = title;
    reminder[1] = insertionDate;
    reminder[2] = deadline;
    reminder[3] = description;
    return reminder;
}

// Função para deletar um lembrete
function deleteReminder(reminderList: Reminder[], reminder: Reminder): Reminder[] {
    return reminderList.filter((r) => r !== reminder);
}

// Selecionando elementos do DOM
const titleInput: HTMLInputElement | null = document.getElementById('reminderTitle') as HTMLInputElement;
const insertionDateInput: HTMLInputElement | null = document.getElementById('insertionDate') as HTMLInputElement;
const deadlineInput: HTMLInputElement | null = document.getElementById('deadline') as HTMLInputElement;
const descriptionInput: HTMLTextAreaElement | null = document.getElementById('description') as HTMLTextAreaElement;
const addReminderForm: HTMLFormElement | null = document.getElementById('addReminderForm') as HTMLFormElement;
const reminderList: HTMLElement | null = document.getElementById('reminder-list');

// Função para limpar os campos do formulário
function clearFormFields() {
    if (titleInput && insertionDateInput && deadlineInput && descriptionInput) {
        titleInput.value = '';
        insertionDateInput.value = '';
        deadlineInput.value = '';
        descriptionInput.value = '';
    } else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }
}

// Função para renderizar a lista de lembretes
function renderReminderList(reminders: Reminder[]) {
    if (reminderList) {
        reminderList.innerHTML = ''; // Limpar a lista antes de renderizar novamente
        reminders.forEach((reminder : Reminder, index : number) => {
            const [title, insertionDate, deadline, description] = reminder;
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
                <td>${title}</td>
                <td>${insertionDate}</td>
                <td>${deadline ? deadline : ''}</td>
                <td>${description ? description : ''}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-index="${index}">Editar</button>
                    <button type="button" class="btn btn-danger" data-index="${index}">Excluir</button>
                </td>
            `;
            if (reminderList) reminderList.appendChild(listItem);
        });
    } else {
        console.error("O elemento reminder-list não foi encontrado.");
    }
}

// Event listener para adicionar lembrete
if (addReminderForm) {
    addReminderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar o comportamento padrão do formulário
        if (titleInput && insertionDateInput) {
            const title: string = titleInput.value;
            const insertionDate: Date = new Date(insertionDateInput.value);
            const deadline: Date | null = deadlineInput ? new Date(deadlineInput.value) : null;
            const description: string | null = descriptionInput ? descriptionInput.value : null;
            const newReminder: Reminder = addReminder(title, insertionDate, deadline, description);
            reminders.push(newReminder);
            renderReminderList(reminders);
            clearFormFields();
        } else {
            console.error("Um ou mais campos de entrada não foram encontrados.");
        }
    });
} else {
    console.error("O formulário addReminderForm não foi encontrado.");
}

function openEditForm(reminder: Reminder) {
    // Preencher os campos do formulário com as informações do lembrete selecionado
    titleInput.value = reminder[0];
    insertionDateInput.value = reminder[1].toISOString().slice(0, 16);
    deadlineInput.value = reminder[2] ? reminder[2].toISOString().slice(0, 16) : '';
    descriptionInput.value = reminder[3] ? reminder[3] : '';

    // Exibir o modal de edição
    const modal = new bootstrap.Modal(document.getElementById('modalNovoLembrete')!);
    modal.show();
}

// Event listener para editar lembrete
if (reminderList) {
    reminderList.addEventListener('click', function(event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('btn-primary')) {
            const index : number = parseInt(target.getAttribute('data-index') || '');
            const reminder : Reminder = reminders[index];
            openEditForm(reminder);
        } else if (target.classList.contains('btn-danger')) {
            // Implemente aqui a lógica para excluir o lembrete
        }
    });
} else {
    console.error("O elemento reminder-list não foi encontrado.");
}

// Renderizar a lista inicial de lembretes (se houver)
renderReminderList(reminders);
