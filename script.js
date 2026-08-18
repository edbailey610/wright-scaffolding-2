// ========================================
// WRIGHT SCAFFOLDING
// ========================================


// FORCE PAGE TO START AT TOP ON REFRESH

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});


// ========================================
// MOBILE MENU
// ========================================

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    const menuIsOpen = mobileMenu.classList.contains("active");

    menuButton.setAttribute("aria-expanded", menuIsOpen);

    menuButton.textContent = menuIsOpen ? "Close" : "Menu";

  });


  // CLOSE MENU AFTER CLICKING A LINK

  const mobileMenuLinks = mobileMenu.querySelectorAll("a");

  mobileMenuLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("active");

      menuButton.setAttribute("aria-expanded", "false");

      menuButton.textContent = "Menu";

    });

  });

}