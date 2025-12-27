(function () {
  emailjs.init("vTDh9D6uYL4B7e98W");
})();


/* ================================
   GLOBAL VARIABLES (CERT MODAL)
================================ */
let scale = 1;
let startDistance = 0;
let certImg = null;

/* ================================
   CERTIFICATE FUNCTIONS
================================ */
function setActiveCert(el) {
  document.querySelectorAll(".cert-item").forEach(item =>
    item.classList.remove("active")
  );
  el.classList.add("active");
}

function openCert(e) {
  e.preventDefault();

  const imgSrc = e.target.dataset.img;
  const modal = document.getElementById("certModal");
  certImg = document.getElementById("certImage");

  certImg.src = imgSrc;
  scale = 1;
  certImg.style.transform = "scale(1)";

  modal.classList.add("show");
}

function closeCert() {
  const modal = document.getElementById("certModal");
  modal.classList.remove("show");

  if (certImg) {
    scale = 1;
    certImg.style.transform = "scale(1)";
  }
}

/* ================================
   DISTANCE HELPER (PINCH)
================================ */
function getDistance(t1, t2) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

/* ================================
   MAIN SCRIPT
================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     NAV ACTIVE LINK ON SCROLL
  ================================ */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
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
      topBtn.style.display = window.scrollY > 400 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================================
     TYPING ROLE ANIMATION
  ================================ */
  const roleText = document.getElementById("roleText");
  const roles = ["Full Stack Developer"];
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!roleText) return;

    const text = roles[0];

    if (!isDeleting) {
      roleText.textContent = text.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === text.length) {
        setTimeout(() => (isDeleting = true), 1200);
        return;
      }
    } else {
      roleText.textContent = text.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) isDeleting = false;
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
     CERTIFICATES DEFAULT ACTIVE
  ================================ */
  const certItems = document.querySelectorAll(".cert-item");
  if (certItems.length) certItems[0].classList.add("active");

  /* ================================
     CERT IMAGE ZOOM (AFTER MODAL OPEN)
  ================================ */
  const modal = document.getElementById("certModal");
  const img = document.getElementById("certImage");

  if (img) {
    /* MOBILE PINCH ZOOM */
    img.addEventListener("touchstart", e => {
      if (e.touches.length === 2) {
        startDistance = getDistance(e.touches[0], e.touches[1]);
      }
    });

    img.addEventListener(
      "touchmove",
      e => {
        if (e.touches.length === 2) {
          e.preventDefault();
          const newDistance = getDistance(e.touches[0], e.touches[1]);
          const zoomFactor = newDistance / startDistance;

          scale = Math.min(Math.max(scale * zoomFactor, 1), 3);
          img.style.transform = `scale(${scale})`;

          startDistance = newDistance;
        }
      },
      { passive: false }
    );

    /* DESKTOP MOUSE WHEEL ZOOM */
    img.addEventListener("wheel", e => {
      e.preventDefault();
      scale += e.deltaY < 0 ? 0.1 : -0.1;
      scale = Math.min(Math.max(scale, 1), 3);
      img.style.transform = `scale(${scale})`;
    });
  }
});

/* ================================
   NAVBAR CLICK OFFSET FIX
================================ */

/* ===============================
   SCROLL REVEAL LOGIC
================================ */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 120) {
      el.classList.add("show");
      el.style.setProperty("--delay", `${i * 0.08}s`);
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
/* ================================
   CONTACT FORM – EMAILJS
================================ */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // set current time
    this.time.value = new Date().toLocaleString();

    emailjs
      .sendForm(
        "service_zjhcunj",
        "template_pbj3tfa",
        this
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          contactForm.reset();
        },
        (error) => {
          alert("❌ Failed to send message");
          console.error(error);
        }
      );
  });
}
