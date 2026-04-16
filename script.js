// Loading animation
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hide"), 700);
});

// Mobile navbar toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Typing effect for hero section
const typingText = document.getElementById("typingText");
const words = [
  "I love building modern websites.",
  "I focus on clean and responsive design.",
  "I am learning and growing every day."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function runTypingEffect() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingText.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
  } else {
    typingText.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
  }

  let speed = deleting ? 40 : 75;

  if (!deleting && charIndex === currentWord.length) {
    speed = 1400;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 420;
  }

  setTimeout(runTypingEffect, speed);
}

runTypingEffect();

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Contact form validation
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function setError(input, message) {
  const field = input.parentElement;
  const errorText = field.querySelector(".error-text");
  field.classList.add("invalid");
  errorText.textContent = message;
}

function clearError(input) {
  const field = input.parentElement;
  const errorText = field.querySelector(".error-text");
  field.classList.remove("invalid");
  errorText.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  const name = form.name;
  const email = form.email;
  const message = form.message;
  let isValid = true;

  if (name.value.trim().length < 2) {
    setError(name, "Please enter at least 2 characters.");
    isValid = false;
  } else {
    clearError(name);
  }

  if (!isValidEmail(email.value)) {
    setError(email, "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError(email);
  }

  if (message.value.trim().length < 10) {
    setError(message, "Message should be at least 10 characters.");
    isValid = false;
  } else {
    clearError(message);
  }

  if (!isValid) {
    formStatus.style.color = "var(--danger)";
    formStatus.textContent = "Please fix the errors and try again.";
    return;
  }

  formStatus.style.color = "var(--success)";
  formStatus.textContent = "Thanks! Your feedback has been submitted.";
  form.reset();
});

// Cursor glow effect
const cursorGlow = document.getElementById("cursorGlow");

window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});
