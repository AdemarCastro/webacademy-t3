"use strict";
/********************************************* FUNÇÕES *********************************************/
// Função para cadastrar um novo usuário
function signup(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
}
// Função para verificar se um usuário existe e as credenciais estão corretas
function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);
    return !!user;
}
/********************************************* EVENTOS *********************************************/
// Evento de submissão do formulário de cadastro
const signupForm = document.querySelector('#signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Capturar elementos do formulário
        const nameInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const confirmEmailInput = document.getElementById('confirmarEmail');
        const passwordInput = document.getElementById('senha');
        // Validar campos do formulário
        if (nameInput && emailInput && confirmEmailInput && passwordInput) {
            const name = nameInput.value;
            const email = emailInput.value;
            const confirmEmail = confirmEmailInput.value;
            const password = passwordInput.value;
            // Verificar se os campos de email coincidem
            if (email !== confirmEmail) {
                alert('Os campos de email não coincidem.');
                return;
            }
            // Realizar cadastro
            signup(name, email, password);
            alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
            window.location.href = 'login.html';
        }
        else {
            console.error('Um ou mais campos de entrada não foram encontrados.');
        }
    });
}
// Evento de submissão do formulário de login
const loginForm = document.querySelector('#loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Capturar elementos do formulário
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('senha');
        // Validar campos do formulário
        if (emailInput && passwordInput) {
            const email = emailInput.value;
            const password = passwordInput.value;
            const isAuthenticated = login(email, password);
            // Verificar autenticação
            if (isAuthenticated) {
                alert('Login realizado com sucesso!');
                // Salvar nome de usuário no armazenamento local
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const currentUser = users.find((u) => u.email === email);
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                // Definir token de autenticação
                localStorage.setItem("authToken", "true");
                // Redirecionar para a página principal após o login
                window.location.href = 'index.html';
            }
            else {
                alert('Credenciais inválidas. Por favor, tente novamente.');
            }
        }
        else {
            console.error('Um ou mais campos de entrada não foram encontrados.');
        }
    });
}
