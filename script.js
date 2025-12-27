document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     NAV ACTIVE LINK ON SCROLL
  ================================ */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  /* ================================
     FADE IN ON SCROLL
  ================================ */
  const faders = document.querySelectorAll(".fade");

  function fadeOnScroll() {
    faders.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) {
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", fadeOnScroll);
  fadeOnScroll();

  /* ================================
     BACK TO TOP BUTTON
  ================================ */
  const topBtn = document.getElementById("topBtn");

  if (topBtn) {
    window.addEventListener("scroll", () => {
      topBtn.style.display = scrollY > 400 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================================
     TYPING ROLE ANIMATION
  ================================ */
  const roles = ["Full Stack Developer", "Full Stack Developer"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const roleText = document.getElementById("roleText");
  const typingSpeed = 90;
  const deletingSpeed = 50;
  const holdAfterType = 1000;

  function typeEffect() {
    if (!roleText) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      roleText.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, holdAfterType);
        return;
      }
    } else {
      roleText.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
  }

  typeEffect();

  /* ================================
     PROJECT FADE-IN (VERTICAL ENTRY)
  ================================ */
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.6s ease";
  });

  function showProjects() {
    projectCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", showProjects);
  showProjects();

  /* ================================
     PROJECTS HORIZONTAL SLIDER
     (CENTER ACTIVE)
  ================================ */
  const slider = document.querySelector(".projects-slider");
  let isHovering = false;

  if (slider) {
    const cards = slider.querySelectorAll(".project-card");

    function updateActiveCard() {
      if (isHovering) return;

      const center = slider.scrollLeft + slider.offsetWidth / 2;

      cards.forEach(card => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        card.classList.remove("active");

        if (Math.abs(center - cardCenter) < card.offsetWidth / 2) {
          card.classList.add("active");
        }
      });
    }

    slider.addEventListener("scroll", updateActiveCard);
    window.addEventListener("resize", updateActiveCard);

    setTimeout(updateActiveCard, 200);

    /* ================================
       HOVER PRIORITY (FRONT PROJECT)
    ================================ */
    cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        isHovering = true;
        cards.forEach(c => c.classList.remove("active"));
      });

      card.addEventListener("mouseleave", () => {
        isHovering = false;
        updateActiveCard(); // restore center project
      });
    });
  }

});
