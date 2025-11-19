import { supabase } from './supabase-config.js';

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const logoutButton = document.getElementById('logout-button');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Erro no login:', error.message);
            errorMessage.textContent = 'E-mail ou senha incorretos.';
        } else {
            window.location.href = 'dashboard.html';
        }
    });
}

const protegerRotas = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (!data.session) {
        window.location.href = 'index.html';
    }
};

const paginaAtual = window.location.pathname.split('/').pop();

if (paginaAtual !== 'index.html') {
    protegerRotas();
}

if (logoutButton) {
    logoutButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Erro ao fazer logout:', error.message);
        } else {
            window.location.href = 'index.html';
        }
    });
}
