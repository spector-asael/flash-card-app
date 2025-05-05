document.querySelector(".card-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // prevent form from reloading the page

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = ""; // Clear previous errors

    const frontText = document.getElementById("front").value.trim();
    const backText = document.getElementById("back").value.trim();

    // Client-side validation
    if (!frontText || !backText) {
        errorMessage.style.color = "#ff7733";
        errorMessage.textContent = "Front and Back text cannot be empty.";
        return;
    }

    if (frontText.length > 500 || backText.length > 500) {
        errorMessage.style.color = "#ff7733";
        errorMessage.textContent = "Each field must be under 500 characters.";
        return;
    }

    try {
        const response = await fetch("/api/addCard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                front: frontText,
                back: backText
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unknown server error");
        }

        console.log("Card added successfully:", data);

        // Success feedback: optionally clear form and show success message
        document.querySelector(".card-form").reset();
        errorMessage.style.color = "#b8ff33";
        errorMessage.textContent = "Card added successfully!";

    } catch (error) {
        console.error("Error adding card:", error);
        errorMessage.style.color = "#ff7733";
        errorMessage.textContent = error.message || "An unexpected error occurred.";
    }
});
