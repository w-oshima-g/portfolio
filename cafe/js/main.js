/* =====================================================
   KOKE COFFEE — main.js
   ===================================================== */

'use strict';

/* ── Hamburger / Mobile menu ────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.nav__mobile-link');

function openMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});

mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});

/* ── Header scroll effect ───────────────────────────── */
const header = document.getElementById('header');

const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // Run once on load

/* ── Smooth anchor scroll ───────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Scroll reveal (IntersectionObserver) ───────────── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Animate only once
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Parallax-style hero ────────────────────────────── */
const heroBg = document.querySelector('.hero__bg');

if (heroBg && window.matchMedia('(min-width: 769px)').matches) {
  // CSS `background-attachment: fixed` handles parallax on desktop.
  // Add JS parallax only as enhancement for unsupported browsers.
  const supportsFixedAttachment = (() => {
    const el = document.createElement('div');
    el.style.backgroundAttachment = 'fixed';
    return el.style.backgroundAttachment === 'fixed';
  })();

  if (!supportsFixedAttachment) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `scale(1.06) translateY(${y * 0.25}px)`;
    }, { passive: true });
  }
}

/* ── Contact form validation ────────────────────────── */
const form        = document.getElementById('contactForm');
const nameInput   = document.getElementById('name');
const emailInput  = document.getElementById('email');
const msgInput    = document.getElementById('message');
const nameError   = document.getElementById('nameError');
const emailError  = document.getElementById('emailError');
const msgError    = document.getElementById('messageError');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a single field.
 * @param {HTMLInputElement|HTMLTextAreaElement} input
 * @param {HTMLElement} errorEl
 * @returns {boolean}
 */
function validate(input, errorEl) {
  let msg = '';

  if (input.required && !input.value.trim()) {
    msg = 'このフィールドは必須です';
  } else if (input.type === 'email' && input.value && !EMAIL_RE.test(input.value.trim())) {
    msg = '正しいメールアドレスを入力してください';
  }

  errorEl.textContent = msg;
  input.classList.toggle('error', !!msg);
  return !msg;
}

// Live validation on blur
nameInput.addEventListener('blur',  () => validate(nameInput,  nameError));
emailInput.addEventListener('blur', () => validate(emailInput, emailError));
msgInput.addEventListener('blur',   () => validate(msgInput,   msgError));

// Clear error on input
[nameInput, emailInput, msgInput].forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('error');
    const errId = input.id + 'Error';
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = '';
  });
});

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const ok = [
      validate(nameInput,  nameError),
      validate(emailInput, emailError),
      validate(msgInput,   msgError),
    ].every(Boolean);

    if (!ok) return;

    const btn      = form.querySelector('.contact__btn');
    const btnText  = btn.querySelector('.contact__btn-text');
    const original = btnText.textContent;

    btn.disabled       = true;
    btnText.textContent = '送信中…';

    // Simulated send (replace with real fetch/submit logic)
    setTimeout(() => {
      btnText.textContent = '送信完了 ✓';
      form.reset();

      setTimeout(() => {
        btn.disabled       = false;
        btnText.textContent = original;
      }, 3500);
    }, 1500);
  });
}

/* ── Menu card — subtle tilt on hover (desktop only) ── */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const xPct  = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const yPct  = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      card.style.transform = `perspective(600px) rotateY(${xPct * 4}deg) rotateX(${-yPct * 4}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
