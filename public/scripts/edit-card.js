function customConfirm(message) {
  return new Promise((resolve) => {
    const modal = document.getElementById("custom-confirm");
    const msg = document.getElementById("confirm-message");
    const yesBtn = document.getElementById("confirm-yes");
    const noBtn = document.getElementById("confirm-no");

    msg.textContent = message;
    modal.style.display = "flex";

    function cleanup(result) {
      modal.style.display = "none";
      yesBtn.removeEventListener('click', onYes);
      noBtn.removeEventListener('click', onNo);
      resolve(result);
    }

    function onYes() { cleanup(true); }
    function onNo() { cleanup(false); }

    yesBtn.addEventListener('click', onYes);
    noBtn.addEventListener('click', onNo);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".edit-card");
  const errorMessageContainer = document.getElementById("delete-error-message");

  let currentIndex = 0;

  function updateCards() {
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
      card.style.display = index === currentIndex ? "flex" : "none";
      card.classList.remove("flipped");
    });

    counter.textContent = `${currentIndex + 1}/${cards.length}`;
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });


  // Attach edit button handlers
  document.querySelectorAll('.edit-button').forEach((button) => {
    button.addEventListener('click', () => {
      const cardId = button.getAttribute('data-id');
      if (!cardId) {
        alert("Error: Card ID not found.");
        return;
      }
      window.location.href = `/update-card/${cardId}`;
    });
  });

  // Attach delete button handlers
  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const cardId = button.getAttribute('data-id');
      if (!cardId) {
        alert("Error: Card ID not found.");
        return;
      }

      const confirmed = await customConfirm("Are you sure you want to delete this card?");
      if (confirmed) {
        try {
          const response = await fetch(`/api/delete-card/${cardId}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Failed to delete the card');

          const data = await response.json();
          alert(data.message);
          window.location.reload();
        } catch (error) {
          errorMessageContainer.textContent = "Error deleting card: " + error.message;
          errorMessageContainer.style.display = "block";
        }
      }
    });
  });

  updateCards();
});
