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

// Change mobile header background on scroll
const className = "inverted";
const scrollTrigger = 60;
const thing = document.querySelector("header");
window.onscroll = () => {
  window.scrollY >= scrollTrigger
    ? thing.classList.add(className)
    : thing.classList.remove(className);
};
