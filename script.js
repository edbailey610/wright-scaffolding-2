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

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

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
// INFINITE DESKTOP GALLERY
// ========================================

const galleryTrack =
  document.getElementById("galleryTrack");

const galleryPrev =
  document.getElementById("galleryPrev");

const galleryNext =
  document.getElementById("galleryNext");


if (galleryTrack) {

  let originalItems = [];

  let itemStep = 0;

  let setWidth = 0;

  let desktopMode = false;

  let resizeTimer;


  // ========================================
  // FIND ORIGINAL IMAGES
  // ========================================

  function getOriginalItems() {

    originalItems = Array.from(
      galleryTrack.querySelectorAll(
        ".gallery-item:not(.gallery-clone)"
      )
    );

  }


  // ========================================
  // REMOVE OLD CLONES
  // ========================================

  function removeClones() {

    const clones =
      galleryTrack.querySelectorAll(
        ".gallery-clone"
      );

    clones.forEach((clone) => {
      clone.remove();
    });

  }


  // ========================================
  // MEASURE ONE GALLERY SET
  // ========================================

  function measureGallery() {

    const firstItem =
      galleryTrack.querySelector(".gallery-item");

    if (!firstItem) {
      return;
    }


    const trackStyles =
      window.getComputedStyle(galleryTrack);


    const gap =
      parseFloat(trackStyles.columnGap) ||
      parseFloat(trackStyles.gap) ||
      0;


    const itemWidth =
      firstItem.getBoundingClientRect().width;


    itemStep =
      itemWidth + gap;


    setWidth =
      itemStep * originalItems.length;

  }


  // ========================================
  // CREATE DESKTOP INFINITE LOOP
  // ========================================

  function createDesktopGallery() {

    desktopMode = false;


    // Remove any clones that already exist

    removeClones();


    // Get the five real gallery images

    getOriginalItems();


    if (originalItems.length === 0) {
      return;
    }


    /*
      We are going to create:

      COPY 1
      ORIGINALS
      COPY 2

      So visually the gallery becomes:

      1 2 3 4 5 | 1 2 3 4 5 | 1 2 3 4 5

      We start inside the middle set.
    */


    const beforeFragment =
      document.createDocumentFragment();

    const afterFragment =
      document.createDocumentFragment();


    // ========================================
    // CREATE FIRST COPY
    // ========================================

    originalItems.forEach((item) => {

      const clone =
        item.cloneNode(true);

      clone.classList.add(
        "gallery-clone"
      );

      clone.setAttribute(
        "aria-hidden",
        "true"
      );

      beforeFragment.appendChild(clone);

    });


    // ========================================
    // CREATE LAST COPY
    // ========================================

    originalItems.forEach((item) => {

      const clone =
        item.cloneNode(true);

      clone.classList.add(
        "gallery-clone"
      );

      clone.setAttribute(
        "aria-hidden",
        "true"
      );

      afterFragment.appendChild(clone);

    });


    // Put first copy before originals

    galleryTrack.insertBefore(
      beforeFragment,
      galleryTrack.firstChild
    );


    // Put last copy after originals

    galleryTrack.appendChild(
      afterFragment
    );


    // Measure everything

    measureGallery();


    // ========================================
    // START IN MIDDLE SET
    // ========================================

    galleryTrack.style.scrollBehavior = "auto";

    galleryTrack.scrollLeft = setWidth;


    // Force browser to apply position

    void galleryTrack.offsetWidth;


    galleryTrack.style.scrollBehavior = "";

    desktopMode = true;

  }


  // ========================================
  // MOBILE VERSION
  // ========================================

  function createMobileGallery() {

    desktopMode = false;


    // Mobile should NOT have clones

    removeClones();


    galleryTrack.style.scrollBehavior = "auto";

    galleryTrack.scrollLeft = 0;


    void galleryTrack.offsetWidth;


    galleryTrack.style.scrollBehavior = "";

  }


  // ========================================
  // KEEP DESKTOP LOOP CONTINUOUS
  // ========================================

  function maintainInfiniteLoop() {

    if (!desktopMode) {
      return;
    }

    if (!setWidth) {
      return;
    }


    const position =
      galleryTrack.scrollLeft;


    /*
      STRUCTURE:

      COPY:
      0 → setWidth

      ORIGINAL:
      setWidth → setWidth * 2

      COPY:
      setWidth * 2 → setWidth * 3


      When we move into the right-hand copy,
      silently move one full set backwards.

      The visible image is IDENTICAL.

      Therefore the user never sees the reset.
    */


    if (position >= setWidth * 2) {

      galleryTrack.style.scrollBehavior = "auto";


      galleryTrack.scrollLeft =
        position - setWidth;


      void galleryTrack.offsetWidth;


      galleryTrack.style.scrollBehavior = "";

    }


    /*
      Same thing going backwards.

      If we move into the left-hand copy,
      silently move to the identical position
      one complete set further right.
    */

    else if (position < setWidth) {

      galleryTrack.style.scrollBehavior = "auto";


      galleryTrack.scrollLeft =
        position + setWidth;


      void galleryTrack.offsetWidth;


      galleryTrack.style.scrollBehavior = "";

    }

  }


  // ========================================
  // WATCH DESKTOP SCROLL POSITION
  // ========================================

  galleryTrack.addEventListener(
    "scroll",
    maintainInfiniteLoop,
    { passive: true }
  );


  // ========================================
  // RIGHT ARROW
  // ========================================

  if (galleryNext) {

    galleryNext.addEventListener(
      "click",
      () => {

        if (!desktopMode) {
          return;
        }


        galleryTrack.scrollBy({

          left: itemStep,

          behavior: "smooth"

        });

      }
    );

  }


  // ========================================
  // LEFT ARROW
  // ========================================

  if (galleryPrev) {

    galleryPrev.addEventListener(
      "click",
      () => {

        if (!desktopMode) {
          return;
        }


        galleryTrack.scrollBy({

          left: -itemStep,

          behavior: "smooth"

        });

      }
    );

  }


  // ========================================
  // DESKTOP OR MOBILE?
  // ========================================

  function setupGallery() {

    if (window.innerWidth > 768) {

      createDesktopGallery();

    }

    else {

      createMobileGallery();

    }

  }


  // ========================================
  // START GALLERY
  // ========================================

  window.addEventListener(
    "load",
    () => {

      setupGallery();

    }
  );


  // ========================================
  // HANDLE WINDOW RESIZING
  // ========================================

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);


      resizeTimer =
        setTimeout(() => {

          setupGallery();

        }, 250);

    }
  );

}