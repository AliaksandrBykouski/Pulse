let index = 0;

function moveSlide(step) {
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  index += step;

  if (index < 0) {
    index = totalSlides - 1;
  } else if (index >= totalSlides) {
    index = 0;
  }

  const carousel = document.querySelector(".slides");
  carousel.style.transform = `translateX(-${index * 100}%)`; // сдвиг на ширину одного слайда
}
function flipCard(card) {
  card.classList.toggle("flipped");
}

function showTab(index) {
  document.querySelectorAll(".catalog-button").forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });
  document.querySelectorAll(".catalog__wrapper").forEach((container, i) => {
    container.classList.toggle("active", i === index);
  });
}
// modal windows
document.querySelectorAll("[data-modal-open]").forEach((button) => {
  button.addEventListener("click", function () {
    document.getElementById("overlay").style.display =
      document.getElementById("overlay").style.display === "flex"
        ? "none"
        : "flex";
  });
});
