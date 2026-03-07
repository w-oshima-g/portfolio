/* ============================================================
   FORM architects — main.js
   Page-specific: hero scroll, works filter, contact form
   ============================================================ */

(function () {
  'use strict';

  /* ── Hero Scroll Indicator ─────────────────────────────── */
  var heroScroll = document.querySelector('.hero-top__scroll');
  if (heroScroll) {
    window.addEventListener('scroll', function () {
      heroScroll.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });
  }

  /* ── Works Filter ───────────────────────────────────────── */
  var filterBtns = document.querySelectorAll('.works-filter__btn');
  var workCards = document.querySelectorAll('.work-card[data-category]');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        workCards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.removeAttribute('data-hidden');
          } else {
            card.setAttribute('data-hidden', 'true');
          }
        });
      });
    });
  }

  /* ── Contact Form ───────────────────────────────────────── */
  var form = document.getElementById('contactForm');
  var successEl = document.getElementById('formSuccess');

  if (!form) return;

  function setError(groupEl) {
    if (groupEl) groupEl.classList.add('has-error');
  }

  function clearError(groupEl) {
    if (groupEl) groupEl.classList.remove('has-error');
  }

  function validateField(el) {
    var group = el.closest('.form-group');
    if (!el.value.trim()) {
      if (el.type === 'email') {
        setError(group);
        return false;
      }
      if (el.tagName === 'SELECT' && el.value === '') {
        setError(group);
        return false;
      }
      if (el.required) {
        setError(group);
        return false;
      }
    }
    if (el.type === 'email') {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(el.value.trim())) {
        setError(group);
        return false;
      }
    }
    clearError(group);
    return true;
  }

  // Real-time on blur
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (el) {
    el.addEventListener('blur', function () { validateField(el); });
    el.addEventListener('input', function () {
      if (el.closest('.form-group').classList.contains('has-error')) {
        validateField(el);
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var valid = true;
    ['name', 'email', 'type', 'message'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && !validateField(el)) valid = false;
    });

    if (!valid) return;

    var btn = document.getElementById('submitBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

    setTimeout(function () {
      form.style.display = 'none';
      if (successEl) successEl.classList.add('is-visible');
    }, 800);
  });

})();
