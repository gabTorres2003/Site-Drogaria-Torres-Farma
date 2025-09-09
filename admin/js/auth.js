document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    window.location.href = 'dashboard.html';
                })
                .catch((error) => {
                    errorMessage.textContent = 'E-mail ou senha incorretos.';
                });
        });
    }

    if (window.location.pathname.includes('dashboard.html')) {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                window.location.href = 'index.html';
            }
        });
    }
});

function logout() {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Erro ao fazer logout:', error);
    });
}