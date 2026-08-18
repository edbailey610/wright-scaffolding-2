const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {

  mobileMenu.classList.toggle("active");

  const menuIsOpen = mobileMenu.classList.contains("active");

  menuButton.setAttribute("aria-expanded", menuIsOpen);

  if (menuIsOpen) {
    menuButton.textContent = "Close";
  } else {
    menuButton.textContent = "Menu";
  }

});


/* CLOSE MOBILE MENU AFTER CLICKING A LINK */

const mobileMenuLinks = mobileMenu.querySelectorAll("a");

mobileMenuLinks.forEach((link) => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.textContent = "Menu";

  });

});