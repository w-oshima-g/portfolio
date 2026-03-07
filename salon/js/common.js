/* ============================================================
   BLANC HAIR — common.js
   Shared across all pages: transitions, nav, hamburger, reveal
   ============================================================ */

(function () {
  'use strict';

  /* ── Page Transition ──────────────────────────────────────── */
  const overlay = document.getElementById('pageTransition');

  // On load: page fades in (overlay starts visible, then hides)
  window.addEventListener('DOMContentLoaded', () => {
    if (overlay) {
      overlay.classList.add('is-entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.classList.remove('is-entering');
        });
      });
    }
  });

  // Intercept internal link clicks for fade-out transition
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Skip external links, hash-only links, mailto, tel
    if (
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#')
    ) return;

    // Same-page anchor links handled separately
    e.preventDefault();

    if (overlay) {
      overlay.classList.add('is-leaving');
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    } else {
      window.location.href = href;
    }
  });

  /* ── Header Scroll Effect ─────────────────────────────────── */
  const header = document.querySelector('.header');

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── Nav Current Page Highlight ───────────────────────────── */
  function highlightNav() {
    const currentPath = window.location.pathname;
    const allNavLinks = document.querySelectorAll('.nav__link, .mobile-menu__link');

    allNavLinks.forEach((link) => {
      const linkHref = link.getAttribute('href');
      if (!linkHref) return;

      // Normalize: resolve relative href against current path
      const linkPath = new URL(linkHref, window.location.href).pathname;

      // Match: exact path or index.html equivalence
      const isActive =
        linkPath === currentPath ||
        (currentPath.endsWith('/') && linkPath === currentPath + 'index.html') ||
        (linkPath.endsWith('/') && linkPath + 'index.html' === currentPath) ||
        (currentPath.endsWith('/index.html') && linkPath === currentPath.replace('index.html', ''));

      if (isActive) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  highlightNav();

  /* ── Hamburger Menu ───────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  function openMenu() {
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    body.classList.add('menu-is-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    body.classList.remove('menu-is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      if (hamburger.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Close on mobile menu link click (transition handled by anchor interceptor)
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ── Scroll Reveal ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ── Smooth Scroll for Anchor Links ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      closeMenu && closeMenu();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });
})();
