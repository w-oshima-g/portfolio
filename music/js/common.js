/* ============================================================
   SORA — common.js
   Page transitions, header scroll, hamburger, reveal
   ============================================================ */

(function () {
  'use strict';

  /* ── Page Transition (fade + scale) ─────────────────────── */
  var overlay = document.getElementById('pageTransition');
  var pageWrap = document.getElementById('pageWrap');

  window.addEventListener('DOMContentLoaded', function () {
    // Reveal page content
    if (pageWrap) {
      requestAnimationFrame(function () {
        pageWrap.classList.add('is-visible');
      });
    }
  });

  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a');
    if (!anchor) return;
    var href = anchor.getAttribute('href');
    if (!href) return;
    if (
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      anchor.hasAttribute('target')
    ) return;

    e.preventDefault();

    if (overlay) {
      overlay.classList.add('is-active');
      setTimeout(function () {
        window.location.href = href;
      }, 350);
    } else {
      window.location.href = href;
    }
  });

  /* ── Header Scroll ── */
  var header = document.getElementById('header');
  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── Nav Current Page Highlight ── */
  (function () {
    var currentPath = window.location.pathname;
    document.querySelectorAll('.header__nav-link, .mobile-menu__link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var linkPath = new URL(href, window.location.href).pathname;
      var isActive =
        linkPath === currentPath ||
        (currentPath.endsWith('/') && linkPath === currentPath + 'index.html') ||
        (currentPath.endsWith('/index.html') && linkPath === currentPath.replace('index.html', ''));
      if (isActive) link.classList.add('is-current');
    });
  })();

  /* ── Hamburger ── */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (hamburger.classList.contains('is-open')) closeMenu(); else openMenu();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Scroll Reveal ── */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

})();
