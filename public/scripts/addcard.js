document.querySelector(".card-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // prevent form from reloading the page

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = ""; // Clear previous errors

    const frontTextarea = document.getElementById("front");
    const backTextarea = document.getElementById("back");

    const frontText = frontTextarea.value.trim();
    const backText = backTextarea.value.trim();

    // Reset error styles
    frontTextarea.classList.remove("error");
    backTextarea.classList.remove("error");

    let hasError = false;

    if (!frontText || !backText) {
        errorMessage.style.color = "#ff7733";
        errorMessage.textContent = "Front and Back text cannot be empty.";
        if (!frontText) frontTextarea.classList.add("error");
        if (!backText) backTextarea.classList.add("error");
        front.focus();
        return;
    }

    if (frontText.length > 500 || backText.length > 500) {
        errorMessage.style.color = "#ff7733";
        errorMessage.textContent = "Each field must be under 500 characters.";
        if (frontText.length > 500) frontTextarea.classList.add("error");
        if (backText.length > 500) backTextarea.classList.add("error");
        front.focus()
        return;
    }

    try {
        const response = await fetch("/api/addCard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ front: frontText, back: backText })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unknown server error");
        }

        document.querySelector(".card-form").reset();
        errorMessage.style.color = "#b8ff33";
        errorMessage.textContent = "Card added successfully!";
    } catch (error) {
        console.error("Error adding card:", error);
        errorMessage.style.color = "#ff7733";
        errorMessage.textContent = error.message || "An unexpected error occurred.";
    }
});
