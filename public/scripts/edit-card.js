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
  
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".edit-card");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const counter = document.querySelector(".arrows h2");
    const errorMessageContainer = document.getElementById("delete-error-message");

    const editButton = document.querySelector('.edit-button'); // singular
    const deleteButton = document.querySelector('.delete-button'); // singular

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

    leftArrow?.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCards();
        }
    });

    rightArrow?.addEventListener("click", () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCards();
        }
    });

    // Handle edit button
    editButton?.addEventListener('click', function() {
        const currentCard = cards[currentIndex];
        if (!currentCard) {
            alert("Error: No current card found.");
            return;
        }
        const cardId = currentCard.getAttribute('data-id');
        if (!cardId) {
            alert("Error: Card ID not found.");
            return;
        }
        window.location.href = `/update-card/${cardId}`;
    });

    // Handle delete button
    deleteButton.addEventListener('click', async function() {
        const card = cards[currentIndex];
        console.log(card);
        if (!card) {
          alert("Error: Unable to find card container.");
          return;
        }
      
        const cardId = card.getAttribute('data-id');
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
      

    updateCards();
});
