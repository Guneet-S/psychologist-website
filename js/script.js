/* ============================================================
   PSYCHOLOGIST WEBSITE — Shared JavaScript
   Handles: mobile nav toggle, active nav link, scroll animations,
            contact form validation, smooth interactions
   ============================================================ */

/* ---------- Navbar: mobile toggle ---------- */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  /* Close menu when a link is clicked */
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ---------- Active nav link (based on current page) ---------- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ---------- Scroll-reveal animation ---------- */
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      el.classList.add('visible');
    }
  });
}

if (revealElements.length > 0) {
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll(); /* run once on load */
}

/* ---------- Contact form: basic validation ---------- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('name');
    const email   = document.getElementById('email');
    const message = document.getElementById('message');
    let valid = true;

    /* Clear previous errors */
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

    if (!name.value.trim()) {
      showError(name, 'Please enter your name.');
      valid = false;
    }
    if (!email.value.trim() || !isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }
    if (!message.value.trim() || message.value.trim().length < 10) {
      showError(message, 'Please enter a message (at least 10 characters).');
      valid = false;
    }

    if (valid) {
      /* TODO: Replace with your actual form submission (e.g. Formspree, EmailJS) */
      showSuccess();
      contactForm.reset();
    }
  });
}

function showError(input, msg) {
  const errorEl = input.parentElement.querySelector('.form-error');
  if (errorEl) errorEl.textContent = msg;
  input.classList.add('input-error');
  input.addEventListener('input', () => {
    input.classList.remove('input-error');
    const err = input.parentElement.querySelector('.form-error');
    if (err) err.textContent = '';
  }, { once: true });
}

function showSuccess() {
  const successMsg = document.getElementById('formSuccess');
  if (successMsg) {
    successMsg.style.display = 'block';
    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
