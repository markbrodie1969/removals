/* Irish Van Man — shared site script
   - mobile nav dropdown
   - current-page highlight
   - footer year
*/
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // ── Mobile nav ──
    var toggle = document.querySelector('.nav-toggle');
    var dropdown = document.querySelector('.nav-dropdown');

    if (toggle && dropdown) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', dropdown.classList.contains('open'));
      });

      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
          dropdown.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          dropdown.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // ── Highlight the current page in the desktop nav ──
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links-desktop a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (href && href === here) a.classList.add('active');
    });

    // ── Footer year ──
    document.querySelectorAll('.js-year').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
})();
