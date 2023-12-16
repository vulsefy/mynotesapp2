
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginRegisterForms = document.querySelector('.loginregisterform');
    const welcomeMessage = document.querySelector('.welcome-message');
    const logoutButton = document.querySelector('.bx-log-out');
    

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Basic client-side validation
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        // Simulated server request - login logic
        // This is a simulated successful login process
        setTimeout(() => {
            console.log('Simulated Login:', { username, password });

            // Display welcome message
            showWelcomeMessage(username);

            // Hide the login/register forms
            loginRegisterForms.style.display = 'none';
            // window.location.href = '/dashboard';
        }, 1000); // Simulate delay for server request
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // Basic client-side validation
        if (!username || !email || !password) {
            alert('Please fill in all registration fields.');
            return;
        }

        // Simulated server request - registration logic
        // This is a simulated successful registration process
        setTimeout(() => {
            console.log('Simulated Register:', { username, email, password });

            // Display welcome message
            showWelcomeMessage(username);

            // Hide the login/register forms
            loginRegisterForms.style.display = 'none';
            // window.location.href = '/login';
        }, 1000); // Simulate delay for server request
    });

    logoutButton.addEventListener('click', function() {
        // Handle logout
        console.log('Logged out!');
        hideWelcomeMessage();
        showLoginRegisterForms();
    });
    
    function showWelcomeMessage(username) {
        welcomeMessage.textContent = `Welcome, ${username}!`;
        welcomeMessage.style.display = 'block';
    }
    
    function hideWelcomeMessage() {
        welcomeMessage.style.display = 'none';
    }
    
    function showLoginRegisterForms() {
        loginRegisterForms.style.display = 'block';
    }
});