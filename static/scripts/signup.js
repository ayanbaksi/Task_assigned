
    document.getElementById('signupForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Prepare the form data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        // Make a POST request using Axios
        axios.post('/api/regt', formData)
            .then(response => {
                // Handle success, e.g., show a success message
                console.log(response.data);

                // Check if the registration was successful
                if (response.data.message === "Registration successful") {
                    // Redirect to the login page
                    alert(response.data.message)
                    window.location.href = '/login';
                } else {
                    // Show an alert for other messages
                    alert(response.data.error);
                }
            })
            .catch(error => {
                // Handle error, e.g., show an error message
                console.error(error.response.data);
            });
    });

