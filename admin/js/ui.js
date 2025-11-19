document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const adminContainer = document.querySelector('.admin-container');

    if (menuToggle && adminContainer) {
        menuToggle.addEventListener('click', () => {
            adminContainer.classList.toggle('sidebar-collapsed');
        });
    }
});
