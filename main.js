// Slide carousel
// To do:
// 1. Add debouncing to minimize load during window resize.
// 2. Add subtle transition to copy slider/stack.
// 3. Continue to optimize things where possible.

const imageSlider = document.getElementById("imageSlider");
const slides = document.getElementsByClassName("slider-image");
const copySlider = document.getElementById("copySlider");
const next = document.querySelector(".slider-btn-next");
const prev = document.querySelector(".slider-btn-prev");

let count = 1;
let slideWidth;
let paused = false;

// Reset slider transition based on current slide width.
function setSlider() {
  imageSlider.style.transform = `translateX(${-slideWidth * count}px)`;
}

// Calculate image slider container size initially and after browser resize, then set slide width to match.
function sliderInit() {
  slideWidth = document.getElementById("sliderContainer").clientWidth;
  Array.from(slides).forEach((slide) => {
    slide.style.width = `${slideWidth}px`;
  });
  setSlider();
}

function startSlideTimer() {
  slideTimer = setInterval(function () {
    count++;
    moveSlider();
    nextCopySlide();
  }, 5000);
}

function stopSlideTimer() {
  clearInterval(slideTimer);
}

function moveSlider() {
  imageSlider.style.transition = "transform 0.4s ease-in-out";
  stopSlideTimer();
  setSlider();
  nextCopySlide();
  startSlideTimer();
}

function nextCopySlide() {
  const slides = document.querySelectorAll(".copy-slide");
  let slideArray = Array.from(slides);
  slideArray.forEach((slide, index) => {
    slide.style.zIndex =
      (index + (slides.length - (count % slides.length))) % slides.length;
  });
}

// Pause slider when tab is switched.
function handleVisibilityChange() {
  if (document.visibilityState === "hidden") {
    stopSlideTimer();
    paused = true;
  } else if (paused) {
    startSlideTimer();
    paused = false;
  }
}

// Check for current slide position, reset slider to continue infinate loop.
imageSlider.addEventListener("transitionend", () => {
  count = slides[count].id === "last-clone" ? slides.length - 2 : count;
  count = slides[count].id === "first-clone" ? slides.length - count : count;
  imageSlider.style.transition = "none";
  setSlider();
});

next.addEventListener("click", () => {
  if (count >= slides.length - 1) return;
  count++;
  moveSlider();
});

prev.addEventListener("click", () => {
  if (count <= 0) return;
  count--;
  moveSlider();
});

window.addEventListener("resize", sliderInit);

document.addEventListener("visibilitychange", handleVisibilityChange);
startSlideTimer();
