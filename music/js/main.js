/* ============================================================
   SORA — main.js
   Page-specific: discography filter, contact form validation
   ============================================================ */

(function () {
  'use strict';

  /* ── Discography Filter ──────────────────────────────────── */
  var filterBtns = document.querySelectorAll('.disco-filter__btn');
  var discCards = document.querySelectorAll('.disco-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        discCards.forEach(function (card) {
          var type = card.getAttribute('data-type');
          var show = filter === 'all' || type === filter;
          card.style.display = show ? '' : 'none';
        });

        // Also hide/show section dividers
        document.querySelectorAll('.disco-section').forEach(function (section) {
          if (filter === 'all') {
            section.style.display = '';
            return;
          }
          var cards = section.querySelectorAll('.disco-card[data-type="' + filter + '"]');
          section.style.display = cards.length > 0 ? '' : 'none';
        });
      });
    });
  }

  /* ── Contact Form ────────────────────────────────────────── */
  var form = document.getElementById('contactForm');
  var successEl = document.getElementById('formSuccess');

  if (!form) return;

  function showErr(inputId, errId, msg) {
    var inp = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (inp) inp.classList.add('is-error');
    if (err) { err.textContent = msg; err.classList.add('is-visible'); }
  }

  function clearErr(inputId, errId) {
    var inp = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (inp) inp.classList.remove('is-error');
    if (err) { err.textContent = ''; err.classList.remove('is-visible'); }
  }

  function validate() {
    var ok = true;

    var name = document.getElementById('name');
    if (name && !name.value.trim()) {
      showErr('name', 'nameError', 'お名前をご入力ください。');
      ok = false;
    } else clearErr('name', 'nameError');

    var email = document.getElementById('email');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !email.value.trim()) {
      showErr('email', 'emailError', 'メールアドレスをご入力ください。');
      ok = false;
    } else if (email && !emailRe.test(email.value.trim())) {
      showErr('email', 'emailError', '正しいメールアドレスをご入力ください。');
      ok = false;
    } else clearErr('email', 'emailError');

    var cat = document.getElementById('category');
    if (cat && cat.value === '') {
      showErr('category', 'categoryError', 'カテゴリを選択してください。');
      ok = false;
    } else clearErr('category', 'categoryError');

    var msg = document.getElementById('message');
    if (msg && !msg.value.trim()) {
      showErr('message', 'messageError', 'メッセージをご入力ください。');
      ok = false;
    } else clearErr('message', 'messageError');

    return ok;
  }

  ['name', 'email', 'category', 'message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', validate);
      el.addEventListener('input', function () {
        if (el.classList.contains('is-error')) validate();
      });
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    var btn = document.getElementById('submitBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

    setTimeout(function () {
      form.style.display = 'none';
      if (successEl) successEl.classList.add('is-visible');
    }, 800);
  });

})();
