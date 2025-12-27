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

  function typeEffect() {
    if (!roleText) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      roleText.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        setTimeout(() => (isDeleting = true), 1000);
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

    setTimeout(typeEffect, isDeleting ? 50 : 90);
  }

  typeEffect();

  /* ================================
     PROJECT FADE-IN
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
     PROJECT SLIDER
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

    cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        isHovering = true;
        cards.forEach(c => c.classList.remove("active"));
      });

      card.addEventListener("mouseleave", () => {
        isHovering = false;
        updateActiveCard();
      });
    });
  }

  /* ================================
     CONTACT FORM – EMAILJS ✅🔥
  ================================ */

  if (typeof emailjs !== "undefined") {
    emailjs.init("vTDh9D6uYL4B7e98W"); // ✅ Public Key
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm(
        "service_zjhcunj",      // ✅ Service ID
        "template_pbj3tfa",     // ✅ TEMPLATE ID (FIXED)
        this
      )
      .then(() => {
        alert("✅ Message sent successfully!");
        this.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("❌ Failed to send message");
      });
    });
  }

});
/* ================================
   NAVBAR CLICK FIX (OFFSET SCROLL)
================================ */
const navLinksAll = document.querySelectorAll(".navbar nav a");
const navbarHeight = document.querySelector(".navbar").offsetHeight;

navLinksAll.forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.startsWith("#")) {
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();

        const elementPosition =
          targetEl.getBoundingClientRect().top + window.pageYOffset;

        const offsetPosition = elementPosition - navbarHeight - 10;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  });
});
