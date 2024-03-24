/********************************************* FUNÇÕES *********************************************/

// Função para cadastrar um novo usuário
function signup(name: string, email: string, password: string): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para verificar se um usuário existe e as credenciais estão corretas
function login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);
    return !!user;
}

/********************************************* EVENTOS *********************************************/

// Evento de submissão do formulário de cadastro
const signupForm: HTMLFormElement | null = document.querySelector('#signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function (event: Event) {
        event.preventDefault();

        // Capturar elementos do formulário
        const nameInput: HTMLInputElement | null = document.getElementById('nome') as HTMLInputElement;
        const emailInput: HTMLInputElement | null = document.getElementById('email') as HTMLInputElement;
        const confirmEmailInput: HTMLInputElement | null = document.getElementById('confirmarEmail') as HTMLInputElement;
        const passwordInput: HTMLInputElement | null = document.getElementById('senha') as HTMLInputElement;

        // Validar campos do formulário
        if (nameInput && emailInput && confirmEmailInput && passwordInput) {
            const name: string = nameInput.value;
            const email: string = emailInput.value;
            const confirmEmail: string = confirmEmailInput.value;
            const password: string = passwordInput.value;

            // Verificar se os campos de email coincidem
            if (email !== confirmEmail) {
                alert('Os campos de email não coincidem.');
                return;
            }

            // Realizar cadastro
            signup(name, email, password);
            alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
            window.location.href = 'login.html';
        } else {
            console.error('Um ou mais campos de entrada não foram encontrados.');
        }
    });
}

// Evento de submissão do formulário de login
const loginForm: HTMLFormElement | null = document.querySelector('#loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (event: Event) {
        event.preventDefault();

        // Capturar elementos do formulário
        const emailInput: HTMLInputElement | null = document.getElementById('email') as HTMLInputElement;
        const passwordInput: HTMLInputElement | null = document.getElementById('senha') as HTMLInputElement;

        // Validar campos do formulário
        if (emailInput && passwordInput) {
            const email: string = emailInput.value;
            const password: string = passwordInput.value;
            const isAuthenticated : boolean = login(email, password);

            // Verificar autenticação
            if (isAuthenticated) {
                alert('Login realizado com sucesso!');

                // Salvar nome de usuário no armazenamento local
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const currentUser = users.find((u: { email: string; password: string }) : boolean => u.email === email);
                localStorage.setItem("currentUser", JSON.stringify(currentUser));

                // Definir token de autenticação
                localStorage.setItem("authToken", "true");

                // Redirecionar para a página principal após o login
                window.location.href = 'index.html';
            } else {
                alert('Credenciais inválidas. Por favor, tente novamente.');
            }
        } else {
            console.error('Um ou mais campos de entrada não foram encontrados.');
        }
    });
}
