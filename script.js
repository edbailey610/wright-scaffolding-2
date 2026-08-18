// ========================================
// WRIGHT SCAFFOLDING
// ========================================


// ========================================
// FORCE PAGE TO START AT TOP ON REFRESH
// ========================================

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

const menuButton =
  document.getElementById("menuButton");

const mobileMenu =
  document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    const menuIsOpen =
      mobileMenu.classList.contains("active");

    menuButton.setAttribute(
      "aria-expanded",
      menuIsOpen
    );

    menuButton.textContent =
      menuIsOpen ? "Close" : "Menu";

  });


  const mobileMenuLinks =
    mobileMenu.querySelectorAll("a");


  mobileMenuLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.textContent = "Menu";

    });

  });

}


// ========================================
// DESKTOP INFINITE GALLERY
// MOBILE = NORMAL SWIPE
// ========================================

const galleryTrack =
  document.getElementById("galleryTrack");

const galleryPrevious =
  document.getElementById("galleryPrevious");

const galleryNext =
  document.getElementById("galleryNext");


if (
  galleryTrack &&
  galleryPrevious &&
  galleryNext
) {

  let moving = false;


  // ========================================
  // GET WIDTH OF ONE PROJECT
  // ========================================

  function getStep() {

    const firstItem =
      galleryTrack.querySelector(".gallery-item");

    if (!firstItem) {
      return 0;
    }

    const styles =
      window.getComputedStyle(galleryTrack);

    const gap =
      parseFloat(styles.columnGap) || 18;

    return (
      firstItem.getBoundingClientRect().width +
      gap
    );

  }


  // ========================================
  // DESKTOP NEXT
  // ========================================

  function moveNext() {

    // MOBILE DOES NOT USE THIS
    if (window.innerWidth <= 768) {
      return;
    }

    if (moving) {
      return;
    }

    moving = true;

    const step = getStep();

    galleryTrack.style.scrollBehavior = "smooth";

    galleryTrack.scrollBy({
      left: step,
      behavior: "smooth"
    });


    setTimeout(() => {

      const firstItem =
        galleryTrack.firstElementChild;

      if (firstItem) {

        // Move first project to the end

        galleryTrack.appendChild(firstItem);

        // Correct position invisibly

        galleryTrack.style.scrollBehavior = "auto";

        galleryTrack.scrollLeft -= step;

      }

      moving = false;

    }, 450);

  }


  // ========================================
  // DESKTOP PREVIOUS
  // ========================================

  function movePrevious() {

    // MOBILE DOES NOT USE THIS
    if (window.innerWidth <= 768) {
      return;
    }

    if (moving) {
      return;
    }

    moving = true;

    const step = getStep();

    const lastItem =
      galleryTrack.lastElementChild;

    if (!lastItem) {

      moving = false;

      return;

    }


    galleryTrack.style.scrollBehavior = "auto";


    // Move last project to the beginning

    galleryTrack.insertBefore(
      lastItem,
      galleryTrack.firstElementChild
    );


    // Compensate for inserted project

    galleryTrack.scrollLeft += step;


    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        galleryTrack.style.scrollBehavior =
          "smooth";

        galleryTrack.scrollBy({
          left: -step,
          behavior: "smooth"
        });

      });

    });


    setTimeout(() => {

      moving = false;

    }, 450);

  }


  // ========================================
  // DESKTOP ARROWS
  // ========================================

  galleryNext.addEventListener(
    "click",
    moveNext
  );


  galleryPrevious.addEventListener(
    "click",
    movePrevious
  );

}