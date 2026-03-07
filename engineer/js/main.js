/* ============================================================
   Takuya Nishida — main.js
   Typing animation, header scroll, hamburger,
   skill bars, scroll reveal, contact form
   ============================================================ */

(function () {
  'use strict';

  /* ── Header Scroll ── */
  var header = document.getElementById('header');
  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── Hamburger Menu ── */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-is-open');
  }
  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-is-open');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      if (hamburger.classList.contains('is-open')) closeMenu(); else openMenu();
    });
    document.querySelectorAll('[data-close-menu]').forEach(function (el) {
      el.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── Smooth Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = anchor.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu && closeMenu();
      var offset = header ? header.offsetHeight + 16 : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Hero Scroll Indicator ── */
  var heroScroll = document.querySelector('.hero__scroll');
  if (heroScroll) {
    window.addEventListener('scroll', function () {
      heroScroll.style.opacity = window.scrollY > 80 ? '0' : '1';
    }, { passive: true });
  }

  /* ── Typing Animation ── */
  var nameTextEl = document.getElementById('heroNameText');
  if (nameTextEl) {
    var fullName = 'Takuya Nishida';
    var idx = 0;
    function type() {
      if (idx <= fullName.length) {
        nameTextEl.textContent = fullName.slice(0, idx);
        idx++;
        setTimeout(type, idx === 1 ? 600 : 80);
      }
    }
    setTimeout(type, 400);
  }

  /* ── Scroll Reveal ── */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, parseInt(delay));
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  /* ── Skill Bars ── */
  var barFills = document.querySelectorAll('.skills__bar-fill');
  if (barFills.length > 0) {
    var barObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var width = target.style.getPropertyValue('--target-width') || '0%';
          setTimeout(function () {
            target.style.width = width;
          }, 200);
          barObs.unobserve(target);
        }
      });
    }, { threshold: 0.3 });
    barFills.forEach(function (el) { barObs.observe(el); });
  }

  /* ── Contact Form ── */
  var form = document.getElementById('contactForm');
  if (!form) return;

  function showError(inputId, errId, msg) {
    var inp = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (inp) inp.classList.add('is-error');
    if (err) err.textContent = msg;
  }
  function clearError(inputId, errId) {
    var inp = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (inp) inp.classList.remove('is-error');
    if (err) err.textContent = '';
  }

  function validate() {
    var ok = true;

    var name = document.getElementById('name');
    if (name && !name.value.trim()) {
      showError('name', 'nameError', '名前を入力してください');
      ok = false;
    } else clearError('name', 'nameError');

    var email = document.getElementById('email');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !email.value.trim()) {
      showError('email', 'emailError', 'メールアドレスを入力してください');
      ok = false;
    } else if (email && !emailRe.test(email.value.trim())) {
      showError('email', 'emailError', '正しいメールアドレスを入力してください');
      ok = false;
    } else clearError('email', 'emailError');

    var msg = document.getElementById('message');
    if (msg && !msg.value.trim()) {
      showError('message', 'messageError', 'メッセージを入力してください');
      ok = false;
    } else clearError('message', 'messageError');

    return ok;
  }

  ['name', 'email', 'message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('blur', validate);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    var btn = document.getElementById('formSubmit');
    if (btn) { btn.disabled = true; btn.querySelector('.form__submit-text').textContent = 'Sending...'; }

    var feedback = document.getElementById('formFeedback');
    var feedbackBody = document.getElementById('formFeedbackBody');

    setTimeout(function () {
      if (feedback) feedback.classList.add('is-visible');
      if (feedbackBody) {
        feedbackBody.innerHTML =
          '<p class="terminal__line terminal__line--success">✓ Message sent successfully</p>' +
          '<p class="terminal__line terminal__line--output">&gt; Expected response: 2 business days</p>' +
          '<p class="terminal__line terminal__line--cyan">$ echo "Thank you!"</p>';
      }
      form.querySelectorAll('input, textarea').forEach(function (el) { el.value = ''; });
      if (btn) btn.disabled = false;
    }, 900);
  });

})();
