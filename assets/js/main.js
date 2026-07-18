/* =========================================================================
   Amlaan Bhoi — progressive enhancements
   Everything here is optional polish: the page is fully functional with this
   file absent or JS disabled. Effects that move are disabled under
   prefers-reduced-motion. Content-first — each behavior surfaces, clarifies,
   or rewards attention to content already on the page.
   ========================================================================= */
(function () {
  "use strict";

  // Signal JS is on so CSS can enable the hidden-until-revealed states.
  var root = document.documentElement;
  root.classList.add("js");

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---- tiny toast -------------------------------------------------------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove("show"); }, 1600);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
        resolve();
      } catch (e) { reject(e); }
    });
  }

  /* ---- (1) staggered scroll reveal -------------------------------------- */
  // Collect each section's title + content blocks, reveal on first entry with
  // a gentle per-item stagger. One pass; never re-hides on scroll-up.
  var revealItems = [];
  document.querySelectorAll("main section").forEach(function (section) {
    Array.prototype.forEach.call(section.children, function (el, i) {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-delay", (reduce ? 0 : Math.min(i, 6) * 55) + "ms");
      revealItems.push(el);
    });
  });
  if (reduce || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealItems.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---- (2) reading rail (scroll-spy) ------------------------------------ */
  var RAIL = {
    about: "About", contributions: "Contributions", publications: "Publications",
    awards: "Awards", service: "Service", media: "Talks", experience: "Experience",
    education: "Education"
  };
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"))
    .filter(function (s) { return RAIL[s.id]; });

  if (sections.length && "IntersectionObserver" in window) {
    var rail = document.createElement("nav");
    rail.className = "reading-rail";
    rail.setAttribute("aria-label", "Sections");
    var ul = document.createElement("ul");
    var linkById = {};
    sections.forEach(function (s) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + s.id;
      a.innerHTML = '<span class="rr-dot"></span><span class="rr-label">' + RAIL[s.id] + "</span>";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        s.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", "#" + s.id);
      });
      li.appendChild(a);
      ul.appendChild(li);
      linkById[s.id] = a;
    });
    rail.appendChild(ul);
    document.body.appendChild(rail);

    // Compute the active section on scroll. A plain IntersectionObserver band
    // never catches the last (short) section at the very bottom of the page,
    // so we also force the last section active once scrolled to the bottom.
    function updateActive() {
      var activeId;
      var scrollBottom = window.scrollY + window.innerHeight;
      var atBottom = scrollBottom >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        activeId = sections[sections.length - 1].id;
      } else {
        var line = window.innerHeight * 0.28;   // highlight what's crossed this line
        activeId = sections[0].id;
        sections.forEach(function (s) {
          if (s.getBoundingClientRect().top <= line) activeId = s.id;
        });
      }
      sections.forEach(function (s) {
        linkById[s.id].classList.toggle("active", s.id === activeId);
      });
    }
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { updateActive(); ticking = false; });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateActive();
  }

  /* ---- (3) count-up metrics --------------------------------------------- */
  function countUp(el) {
    var to = parseInt(el.getAttribute("data-to"), 10);
    if (isNaN(to)) return;
    // Reserve final width so sibling stats don't shift as digits grow.
    el.style.display = "inline-block";
    el.textContent = String(to);
    el.style.minWidth = el.offsetWidth + "px";
    if (reduce) { el.textContent = String(to); return; }
    var dur = 2200, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll(".countup");
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(countUp);
    } else {
      var countObs = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); }
        });
      }, { threshold: 1 });
      counters.forEach(function (el) { countObs.observe(el); });
    }
  }

  /* ---- (4) before/after comparison sliders ------------------------------ */
  // Hover-scrub on desktop, drag on touch, arrow-keys for keyboard. The
  // research artifact itself becomes the interaction.
  document.querySelectorAll("[data-compare]").forEach(function (el) {
    function set(pct, animate) {
      pct = Math.max(0, Math.min(100, pct));
      el.classList.toggle("cmp-animate", !!animate);
      el.style.setProperty("--pos", pct + "%");
      el.setAttribute("aria-valuenow", Math.round(pct));
    }
    set(50, false);

    function fromClientX(clientX) {
      var r = el.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * 100;
    }
    el.addEventListener("pointermove", function (e) {
      el.classList.remove("cmp-animate");
      set(fromClientX(e.clientX), false);
    });
    el.addEventListener("pointerleave", function () {
      if (finePointer) set(50, true); // desktop: rest back to center
    });
    el.addEventListener("keydown", function (e) {
      var cur = parseFloat(el.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") { set(cur - 5, true); e.preventDefault(); }
      else if (e.key === "ArrowRight") { set(cur + 5, true); e.preventDefault(); }
      else if (e.key === "Home") { set(0, true); e.preventDefault(); }
      else if (e.key === "End") { set(100, true); e.preventDefault(); }
    });
  });

  /* ---- (5) one-click cite (BibTeX) -------------------------------------- */
  document.querySelectorAll("[data-cite]").forEach(function (wrap) {
    var btn = wrap.querySelector(".cite-btn");
    var box = wrap.querySelector(".cite-box");
    var bib = wrap.querySelector(".cite-bib");
    var copy = wrap.querySelector(".cite-copy");
    if (!btn || !box) return;
    btn.addEventListener("click", function () {
      var open = box.hasAttribute("hidden");
      if (open) { box.removeAttribute("hidden"); } else { box.setAttribute("hidden", ""); }
      btn.setAttribute("aria-expanded", String(open));
    });
    if (copy && bib) {
      copy.addEventListener("click", function () {
        copyText(bib.textContent).then(
          function () { toast("BibTeX copied"); },
          function () { toast("Copy unavailable"); }
        );
      });
    }
  });

  /* ---- (7) deep-link anchors on hover ----------------------------------- */
  sections.forEach(function (s) {
    var h = s.querySelector(".section-title");
    if (!h) return;
    var a = document.createElement("a");
    a.className = "hlink";
    a.href = "#" + s.id;
    a.setAttribute("aria-label", "Copy link to “" + h.textContent.trim() + "” section");
    // Link/chain glyph — signals "copy link to this section" (Feather "link").
    a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>' +
      '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var url = location.href.split("#")[0] + "#" + s.id;
      history.replaceState(null, "", "#" + s.id);
      copyText(url).then(
        function () { toast("Section link copied"); },
        function () { toast("#" + s.id); }
      );
    });
    h.appendChild(a);
  });
})();
