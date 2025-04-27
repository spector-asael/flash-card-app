
const cardContainer = document.getElementById("card-container");
const card = document.getElementById("card");


card.addEventListener("click", () => {
  card.classList.toggle("flipped");
})