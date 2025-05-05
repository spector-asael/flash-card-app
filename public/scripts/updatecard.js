document.getElementById("edit-card-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";

    const frontTextarea = document.getElementById("front");
    const backTextarea = document.getElementById("back");

    const frontText = frontTextarea.value.trim();
    const backText = backTextarea.value.trim();

    // Reset styles
    frontTextarea.classList.remove("error");
    backTextarea.classList.remove("error");

    if (!frontText || !backText) {
        errorMessage.style.color = "#ff7733";
        errorMessage.textContent = "Front and Back text cannot be empty.";
        front.focus()
        if (!frontText) frontTextarea.classList.add("error");
        if (!backText) backTextarea.classList.add("error");
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

    // Continue with the fetch or update logic...
});
