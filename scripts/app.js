// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Save form data to session storage
    const formData = {
        name: document.querySelector('[name="name"]').value,
        email: document.querySelector('[name="email"]').value,
        phone: document.querySelector('[name="phone"]').value,
        message: document.querySelector('[name="message"]').value
    };
    sessionStorage.setItem('formData', JSON.stringify(formData));
    
    // Refresh the page
    location.reload();
}

// Check if there's any saved data in session storage when the page loads
window.addEventListener('DOMContentLoaded', function() {
    const savedData = sessionStorage.getItem('formData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        console.log(`Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}, Message: ${formData.message}`);
        
        // Optionally, clear the saved data from session storage
        sessionStorage.removeItem('formData');
    }
});

// Attach the form submission handler to the form element
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', handleSubmit);
}
