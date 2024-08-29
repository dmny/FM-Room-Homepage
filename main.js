const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// const navigationHeight = document
//   .querySelector(".header")
//   .getBoundingClientRect().height;
// document.documentElement.style.setProperty(
//   "--scroll-padding",
//   navigationHeight + "px"
// );

//Slide carousel
let count = 1;
const next = document.querySelector(".slider-btn-next");
const prev = document.querySelector(".slider-btn-prev");
let slideWidth = document.getElementById("sliderContainer").clientWidth;
let slides = document.getElementsByClassName("slider-image");

function slider() {
  const imageSlider = document.querySelector(".slider");

  imageSlider.style.transition = "";
  imageSlider.style.transform = `translateX(${-slideWidth * count}px)`;

  Array.from(slides).forEach((slide) => {
    slide.style.width = `${slideWidth}px`;
  });
  return slideWidth;
}

function moveSlide() {
  imageSlider.style.transform = `translateX(${-slider() * count}px)`;
  imageSlider.style.transition = "transform 0.4s ease-in-out";
}

imageSlider.addEventListener("transitionend", () => {
  if (slides[count].id === "last-clone") {
    imageSlider.style.transition = "none";
    count = slides.length - 2;
    imageSlider.style.transform = `translateX(${-slideWidth * count}px)`;
  }
  if (slides[count].id === "first-clone") {
    imageSlider.style.transition = "none";
    count = slides.length - count;
    imageSlider.style.transform = `translateX(${-slideWidth * count}px)`;
  }
});

let myTimer = setInterval(() => {
  count++;
  moveSlide();
}, 5000);

next.addEventListener("click", () => {
  if (count >= slides.length - 1) return;
  count++;
  moveSlide();
  // clearInterval(myTimer);
});

prev.addEventListener("click", () => {
  if (count <= 0) return;
  count--;
  moveSlide();
});

window.onresize = slider;
