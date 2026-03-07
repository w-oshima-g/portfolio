/* ============================================================
   BLANC HAIR — main.js
   Page-specific JS: hero scroll indicator, contact form
   ============================================================ */

(function () {
  'use strict';

  /* ── Hero Scroll Indicator ─────────────────────────────── */
  const heroScroll = document.querySelector('.hero__scroll');
  if (heroScroll) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 80) {
        heroScroll.style.opacity = '0';
        heroScroll.style.pointerEvents = 'none';
      } else {
        heroScroll.style.opacity = '1';
        heroScroll.style.pointerEvents = '';
      }
    }, { passive: true });
  }

  /* ── Contact Form Validation ───────────────────────────── */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add('is-error');
    if (error) {
      error.textContent = message;
      error.classList.add('is-visible');
    }
  }

  function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.remove('is-error');
    if (error) {
      error.textContent = '';
      error.classList.remove('is-visible');
    }
  }

  function validateForm() {
    let valid = true;

    // Name
    const name = document.getElementById('name');
    if (name && name.value.trim() === '') {
      showError('name', 'nameError', 'お名前をご入力ください。');
      valid = false;
    } else {
      clearError('name', 'nameError');
    }

    // Email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && email.value.trim() === '') {
      showError('email', 'emailError', 'メールアドレスをご入力ください。');
      valid = false;
    } else if (email && !emailRegex.test(email.value.trim())) {
      showError('email', 'emailError', '正しいメールアドレスをご入力ください。');
      valid = false;
    } else {
      clearError('email', 'emailError');
    }

    // Category
    const category = document.getElementById('category');
    if (category && category.value === '') {
      showError('category', 'categoryError', 'お問い合わせ種別を選択してください。');
      valid = false;
    } else {
      clearError('category', 'categoryError');
    }

    // Message
    const message = document.getElementById('message');
    if (message && message.value.trim() === '') {
      showError('message', 'messageError', 'メッセージをご入力ください。');
      valid = false;
    } else {
      clearError('message', 'messageError');
    }

    return valid;
  }

  // Real-time validation on blur
  ['name', 'email', 'category', 'message'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', validateForm);
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '送信中...';
    }

    // Simulate async submission
    setTimeout(function () {
      form.style.display = 'none';
      if (successMsg) successMsg.classList.add('is-visible');
    }, 800);
  });

})();
