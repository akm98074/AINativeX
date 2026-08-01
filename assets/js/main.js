/* AINativeX — minimal progressive enhancement
   Keep this light: the site works fully without JS. */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close menu after tapping a link
    links.addEventListener("click", function (e) {
      if (e.target.closest("a") && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // Highlight the nav link for the section currently in view.
  if (links && "IntersectionObserver" in window) {
    var navLinks = Array.prototype.slice.call(links.querySelectorAll('a[href^="#"]'));
    var sections = navLinks
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);

    if (sections.length) {
      var visible = Object.create(null);

      var paint = function () {
        // Topmost visible section wins, so overlapping sections don't fight.
        var current = null;
        sections.forEach(function (s) {
          if (visible[s.id] && !current) current = s.id;
        });
        navLinks.forEach(function (a) {
          a.classList.toggle("is-current", a.getAttribute("href") === "#" + current);
        });
      };

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting;
        });
        paint();
      }, { rootMargin: "-72px 0px -55% 0px", threshold: 0 });

      sections.forEach(function (s) { observer.observe(s); });
    }
  }

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
