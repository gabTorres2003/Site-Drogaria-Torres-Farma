document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const adminContainer = document.querySelector('.admin-container');

    if (menuToggle && adminContainer) {
        menuToggle.addEventListener('click', function() {
            adminContainer.classList.toggle('sidebar-collapsed');
        });
    }
});