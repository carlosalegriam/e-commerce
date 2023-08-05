const prevSlideButton = document.getElementById("prevSlide");
const nextSlideButton = document.getElementById("nextSlide");
const slides = document.querySelectorAll(".banner__slide");
const banner = document.querySelector(".banner");
let currentSlideIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });

  switch (index) {
    case 0:
      banner.style.backgroundImage = 'url("../assets/img/banner-image.png")';
      break;
    case 1:
      banner.style.backgroundImage = 'url("../assets/img/barnner2.jpg")';
      break;
  
    default:
      banner.style.backgroundImage = 'url("../assets/img/banner-image.png")';
  }
}

prevSlideButton.addEventListener("click", () => {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  showSlide(currentSlideIndex);
});

nextSlideButton.addEventListener("click", () => {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  showSlide(currentSlideIndex);
});

showSlide(currentSlideIndex);
