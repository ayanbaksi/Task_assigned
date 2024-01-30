document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    axios.post('/api/checkuser', formData)
        .then(response => {
            // Handle success, e.g., show a success message
            console.log(response.data);

           // Check if the registration was successful
            if (response.data.is_logged_in) {
                // Redirect to the login page
                sessionStorage.setItem("token", response.data.token);
                alert("Successfully logged in!");
                window.location.href = '/dashboard';
            } else {
                // Show an alert for other messages
                alert("Invalid login credentials");
            }
        })
        .catch(error => {
            // Handle error, e.g., show an error message
            console.error(error.response.data);
        });
});
