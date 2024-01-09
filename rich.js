document.addEventListener('DOMContentLoaded', function() {
    // Log to ensure the script is loaded
    console.log('Script loaded');

    // Get the form, password, confirm password elements, and error container
    const form = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const errorContainer = document.getElementById('errorContainer');

    // Add event listener to the form submission
    form.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Get the values of password and confirm password fields
        const passwordValue = passwordInput.value;
        const confirmPasswordValue = confirmPasswordInput.value;

        // Debugging: Log the values for password and confirm password
        console.log('Password:', passwordValue);
        console.log('Confirm Password:', confirmPasswordValue);

        // Check if the passwords match
        if (passwordValue !== confirmPasswordValue) {
            // Display error message
            errorContainer.textContent = 'Passwords do not match!';
            return; // Exit the function to prevent further execution
        }

        // If passwords match, proceed with form submission
        const formData = new FormData(form);

        // Send form data to the server-side endpoint
        fetch('/submit-data', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Check the response from the server
            if (data.success) {
                alert('Data submitted successfully!');
            } else {
                alert('Failed to submit data.');
            }
        })
        .catch(error => {
            // Handle any errors that occur during fetch
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        });
    });
});


// Create a new image element
var img = document.createElement('img');

// Set attributes for the image
img.src = './First-project/discord.png'; // Set the image source
img.alt = 'discord'; // Set the alt text for accessibility
img.width = 200; // Set the width of the image (optional)
img.height = 150; // Set the height of the image (optional)

// Create a new div element
var div = document.createElement('div');

// Append the image element to the div
div.appendChild(img);

// Get the reference to the element where you want to append this div
var container = document.getElementById('yourContainerID'); // Replace 'yourContainerID' with the ID of the container element

// Append the div containing the image to the container element
container.appendChild(div);
