// Check Auth
document.addEventListener('DOMContentLoaded', () => {
    // Determine if we are on the login page
    const isLoginPage = window.location.pathname.endsWith('login.html');

    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

    if (!isLoggedIn && !isLoginPage) {
        window.location.href = 'login.html';
    }

    if (isLoggedIn && isLoginPage) {
        window.location.href = 'index.html';
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }
});
