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

  // Copy the contact address. The mailto button is the happy path; this is the
  // one control that cannot fail, so it never depends on a mail handler.
  var copyBtn = document.getElementById("copyEmail");
  var copyStatus = document.getElementById("copyStatus");
  if (copyBtn) {
    var label = copyBtn.querySelector(".copy-label");
    var resetTimer;

    var flash = function (text) {
      if (label) label.textContent = text;
      if (copyStatus) copyStatus.textContent = text === "Copied" ? "Email address copied" : text;
      copyBtn.classList.toggle("is-copied", text === "Copied");
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        if (label) label.textContent = "Copy";
        copyBtn.classList.remove("is-copied");
      }, 2200);
    };

    // execCommand is deprecated but still the only path on http:// origins and
    // older corporate browsers, where navigator.clipboard is undefined.
    var legacyCopy = function (text) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:absolute;left:-9999px;top:0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      return ok;
    };

    copyBtn.addEventListener("click", function () {
      var text = copyBtn.getAttribute("data-copy") || "";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { flash("Copied"); },
          function () { flash(legacyCopy(text) ? "Copied" : "Press ⌘/Ctrl+C"); }
        );
      } else {
        flash(legacyCopy(text) ? "Copied" : "Press ⌘/Ctrl+C");
      }
    });
  }

  // A mailto: on a machine with no mail handler does nothing at all and looks
  // like a broken button. If the page is still in the foreground shortly after
  // the click, nothing took over, so point people at the copy control instead.
  var ctaMail = document.getElementById("ctaMail");
  var mailHint = document.getElementById("mailHint");
  if (ctaMail && mailHint) {
    ctaMail.addEventListener("click", function () {
      var left = false;
      var noteExit = function () { left = true; };
      window.addEventListener("blur", noteExit, { once: true });
      document.addEventListener("visibilitychange", noteExit, { once: true });

      setTimeout(function () {
        window.removeEventListener("blur", noteExit);
        document.removeEventListener("visibilitychange", noteExit);
        if (left || document.hidden) return;
        mailHint.hidden = false;
      }, 1500);
    });
  }

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
