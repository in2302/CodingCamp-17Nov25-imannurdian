// script.js - 8. Only one JavaScript file

document.addEventListener('DOMContentLoaded', () => {

    // --- 4. Dynamic Welcome Speech ("Hi, name") ---
    function setWelcomeMessage() {
        // Prompt user for their name
        const userName = prompt("Please enter your name to personalize your experience:");

        // Get the span element to display the name
        const userNameSpan = document.getElementById('userName');

        if (userName && userName.trim() !== "") {
            // Use the provided name
            userNameSpan.textContent = userName.trim();
        } else {
            // Default name if input is cancelled or empty
            userNameSpan.textContent = "Guest";
        }
    }

    // Call the function when the page loads
    setWelcomeMessage();


    // --- 5. Form Validation and Submission ---
    const form = document.getElementById('inquiryForm');
    const outputDiv = document.getElementById('submissionOutput');

    // Utility function to display a specific error
    function displayError(id, message) {
        document.getElementById(id).textContent = message;
    }

    // Validation function
    function validateForm(name, email, phone, message) {
        let isValid = true;

        // Clear previous errors
        displayError('nameError', '');
        displayError('emailError', '');
        displayError('phoneError', '');
        displayError('messageError', '');

        // Name Validation: Required and reasonable length
        if (name.trim() === "") {
            displayError('nameError', 'Name is required.');
            isValid = false;
        }

        // Email Validation: Required and simple regex check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === "") {
            displayError('emailError', 'Email is required.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            displayError('emailError', 'Please enter a valid email address.');
            isValid = false;
        }

        // Phone Validation: Required and simple number check (adjust regex for stricter validation if needed)
        const phoneRegex = /^\+?(\d[\s-]?){6,15}$/; // Allows for common international formats
        if (phone.trim() === "") {
            displayError('phoneError', 'Phone number is required.');
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            displayError('phoneError', 'Please enter a valid phone number (6-15 digits, optional country code).');
            isValid = false;
        }

        // Message Validation: Required and minimum length
        if (message.trim() === "") {
            displayError('messageError', 'A message/inquiry is required.');
            isValid = false;
        } else if (message.length < 10) {
             displayError('messageError', 'Message must be at least 10 characters long.');
            isValid = false;
        }

        return isValid;
    }

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop the form from submitting normally (reloading page)

        // Get form values
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const message = messageInput.value;

        // Run validation
        if (validateForm(name, email, phone, message)) {
            // If validation passes:

            // 5. Show value when submit from on the html
            outputDiv.innerHTML = `
                <h3>Thank you for your inquiry, ${name}!</h3>
                <p>We have received the following details:</p>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Message:</strong></li>
                    <p class="submitted-message">${message}</p>
                </ul>
                <p style="margin-top: 10px;">We will get back to you within 24 hours.</p>
            `;

            // Optional: Clear the form after successful submission
            form.reset();

        } else {
            // If validation fails, errors are already displayed by validateForm
            outputDiv.innerHTML = `<h3>Submission Failed!</h3><p>Please fix the errors in the form above and try again.</p>`;
        }
    });

});