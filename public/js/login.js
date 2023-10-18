// Login form handler
const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/home');
        } else {
            alert(response.statusText);
        }
    }
    if(password < 8){
        let pwMsg = document.querySelector('#pwMsg');
        pwMsg.textContent = 'Password must be at least 8 characters long';
        pwMsg.style.color = 'red';
    } else if(email === ''){
        let emailMsg = document.querySelector('#pwMsg');
        emailMsg.textContent = 'Please enter a valid email address';
        emailMsg.style.color = 'red';
    }
};

// Signup form handler
const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const payload = { name: name, email: email, password: password };

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/home');
        } else {
            console.log(response);
        }
    }
    if(name=== '' || email === '' || password === ''){
        let signupMsg = document.querySelector('#signupMsg');
        signupMsg.textContent = 'Please fill out all fields';
        signupMsg.style.color = 'red';
    } else if(password.length < 8){
        const signupMsg = document.querySelector('#signupMsg');
        signupMsg.textContent = 'Password must be at least 8 characters long';
    }
};

// Add event listeners to the login and signup buttons
document.querySelector('#login-button').addEventListener('click', loginFormHandler);
document.querySelector('#signup-button').addEventListener('click', signupFormHandler);

