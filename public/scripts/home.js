const cards = document.querySelectorAll(".card");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const counter = document.querySelector(".arrows h2");

let currentIndex = 0;

// Hide all cards except the current one
function updateCards() {
  cards.forEach((card, index) => {
    card.style.display = index === currentIndex ? "block" : "none";
    // Reset flipped state when switching cards
    card.classList.remove("flipped");
  });

  // Update counter
  counter.textContent = `${currentIndex + 1}/${cards.length}`;
}

// Flip the current card on click
cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// Navigate left
leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCards();
  }
});

// Navigate right
rightArrow.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCards();
  }
});

// Initialize the carousel
updateCards();
