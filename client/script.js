// JavaScript to handle form submissions for login and register actions (if needed)

// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/index.html'; // Redirect to home page after successful login
        } else {
            alert('Login failed');
        }
    })
    .catch(err => alert('Error: ' + err));
});

// Handle register form submission
document.getElementById('register-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/login.html'; // Redirect to login page after successful registration
        } else {
            alert('Registration failed');
        }
    })
    .catch(err => alert('Error: ' + err));
});
