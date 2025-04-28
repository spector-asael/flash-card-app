document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('edit-card-form');
    const errorMessage = document.getElementById('error-message');

    // Create a new div for success messages
    const successMessage = document.createElement('div');
    successMessage.style.color = 'green';
    successMessage.style.marginBottom = '1em';
    successMessage.style.display = 'none'; // Initially hidden

    form.appendChild(successMessage); // Append it to the form for later use

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const front = document.getElementById('front').value;
        const back = document.getElementById('back').value;
        console.log(front);
        console.log(back);
        const cardId = window.location.pathname.split('/').pop(); // Assuming the card ID is in the URL

        const updatedCard = { front, back };

        try {
            const response = await fetch(`/api/edit/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCard),
            });

            console.log('Response Status:', response.status); // Log status code
            const responseText = await response.text(); // Read the response body as text

            if (response.ok) {
                // Display success message
                errorMessage.textContent = 'Card updated successfully!';
                errorMessage.style.color = "green";
                errorMessage.style.display = 'block'; // Hide the error message
            } else {
                // Handle error message
                console.error('Response Body:', responseText);
                const errorData = JSON.parse(responseText);
                errorMessage.textContent = errorData.message || 'An error occurred';
                errorMessage.style.color = 'red';
                errorMessage.style.display = 'block'; // Show error message if there's an issue
            }
        } catch (err) {
            // Catch any network or unexpected errors
            console.error('Error:', err);
            errorMessage.textContent = 'An error occurred while updating the card.';
            errorMessage.style.color = 'red';
            errorMessage.style.display = 'block'; // Show error message
        }
    });
});
