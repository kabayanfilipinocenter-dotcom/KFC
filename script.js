/* =========================================================
   KABAYAN FILIPINO CENTER — SHARED SCRIPT
   Handles: sticky nav shadow, mobile hamburger menu,
   scroll fade-in reveals, and current-page nav highlighting.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Sticky nav shadow on scroll ---- */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const toggleNavShadow = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    };
    toggleNavShadow();
    window.addEventListener("scroll", toggleNavShadow, { passive: true });
  }

  /* ---- Mobile hamburger menu ---- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu after a link is tapped
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Highlight the current page in the nav ---- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  /* ---- Scroll-triggered fade-in reveals ---- */
  const revealTargets = document.querySelectorAll(
    ".fade-in, .service-card, .program-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback for very old browsers: just show everything
    revealTargets.forEach((el) => el.classList.add("in-view"));
  }
});
