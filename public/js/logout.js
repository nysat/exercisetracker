<<<<<<< Updated upstream

=======
// logout.js
>>>>>>> Stashed changes

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        window.location.href = '/api/login';
      } else {
        throw new Error('Failed to logout');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to logout');
    }
  });

// document.querySelector('#logout').addEventListener('click', logout);