/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — THE ACADEMY
   Motion direction: unhurried, weighted, precise.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof gsap !== "undefined";
  var isTouch = window.matchMedia("(hover: none)").matches;

  if (reduced) document.body.classList.add("reduced");

  /* ───────────────────────── smooth scroll ───────────────────────── */
  var lenis = null;
  if (typeof Lenis !== "undefined" && !reduced) {
    lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    window.lenis = lenis; // chat widget uses this for smooth scrolling
  }

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  }

  function scrollToTarget(sel) {
    var el = document.querySelector(sel);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.6 });
    else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }

  document.querySelectorAll("[data-scroll-to]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var calc = a.getAttribute("data-goto-calc");
      if (calc) activateCalc(calc, true);
      closeMenu();
      scrollToTarget(a.getAttribute("data-scroll-to"));
    });
  });

  /* ───────────────────────── text splitting ───────────────────────── */
  function splitWords(el) {
    // wraps each word in a mask so it can rise into view; keeps <br> and <em>
    function process(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (piece) {
            if (!piece) return;
            if (/^\s+$/.test(piece)) { frag.appendChild(document.createTextNode(" ")); return; }
            var mask = document.createElement("span");
            mask.className = "word-mask";
            var w = document.createElement("span");
            w.className = "word";
            w.textContent = piece;
            mask.appendChild(w);
            frag.appendChild(mask);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== "BR") {
          process(child);
        }
      });
    }
    process(el);
    return el.querySelectorAll(".word");
  }

  function splitChars(el) {
    var text = el.textContent;
    el.textContent = "";
    var chars = [];
    text.split(" ").forEach(function (word, wi, arr) {
      var w = document.createElement("span");
      w.className = "word";
      word.split("").forEach(function (ch) {
        var c = document.createElement("span");
        c.className = "char";
        c.textContent = ch;
        w.appendChild(c);
        chars.push(c);
      });
      el.appendChild(w);
      if (wi < arr.length - 1) el.appendChild(document.createTextNode(" "));
    });
    return chars;
  }

  /* ───────────────────────── preloader + hero intro ───────────────────────── */
  var loader = document.getElementById("loader");

  function heroIntro() {
    if (!hasGsap || reduced) {
      document.querySelectorAll(".hero [data-fade]").forEach(function (el) { el.style.opacity = 1; });
      document.querySelectorAll(".hero__line").forEach(function (el) { el.style.opacity = 1; });
      return;
    }
    var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    document.querySelectorAll('.hero [data-reveal="chars"]').forEach(function (line, i) {
      var chars = splitChars(line);
      gsap.set(chars, { yPercent: 115 });
      tl.to(chars, { yPercent: 0, duration: 1.3, stagger: 0.022 }, 0.15 + i * 0.14);
    });
    tl.to(".hero [data-fade]", { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.6);
    gsap.set(".hero [data-fade]", { y: 26 });
  }

  var isSmallViewport = window.matchMedia("(max-width: 900px)").matches;
  var skipLoader = isTouch || isSmallViewport;

  if (hasGsap && !reduced && loader && !skipLoader) {
    // desktop: full curtain animation, capped to ~1.2s total
    document.documentElement.style.overflow = "hidden";
    var pct = { v: 0 };
    var pctEl = document.getElementById("loaderPct");
    var tl = gsap.timeline({
      onComplete: function () {
        loader.style.display = "none";
        document.documentElement.style.overflow = "";
        if (lenis) lenis.resize();
        ScrollTrigger.refresh();
      }
    });
    tl.to(".loader__ring", { strokeDashoffset: 0, duration: 0.65, ease: "power2.inOut" }, 0)
      .to(pct, {
        v: 100, duration: 0.65, ease: "power2.inOut",
        onUpdate: function () { pctEl.textContent = Math.round(pct.v); }
      }, 0)
      .to(".loader__center", { opacity: 0, y: -26, duration: 0.25, ease: "power2.in" }, 0.7)
      .to(".loader__curtain--l", { xPercent: -101, duration: 0.45, ease: "power4.inOut" }, 0.82)
      .to(".loader__curtain--r", { xPercent: 101, duration: 0.45, ease: "power4.inOut" }, 0.82)
      .add(heroIntro, 0.95);
  } else {
    // touch devices / small viewports: skip the loader entirely so content paints fast
    if (loader) loader.style.display = "none";
    document.documentElement.style.overflow = "";
    heroIntro();
  }

  /* ───────────────────────── nav ───────────────────────── */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  var mmenu = document.getElementById("mmenu");

  window.addEventListener("scroll", onScrollNav, { passive: true });
  if (lenis) lenis.on("scroll", onScrollNav);
  function onScrollNav() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle("is-solid", y > 60);
  }

  function closeMenu() {
    burger.classList.remove("is-open");
    mmenu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.setAttribute("aria-expanded", "false");
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-open");
    mmenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", burger.classList.contains("is-open") ? "true" : "false");
  });

  /* ───────────────────────── mobile sticky CTA bar ───────────────────────── */
  var mobilebar = document.getElementById("mobilebar");
  if (mobilebar && "IntersectionObserver" in window) {
    var hideTargets = [document.getElementById("invitation"), document.querySelector(".footer")].filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      var anyVisible = entries.some(function (en) { return en.isIntersecting; });
      mobilebar.classList.toggle("is-hidden", anyVisible);
    }, { threshold: 0.1 });
    hideTargets.forEach(function (t) { io.observe(t); });
  }

  /* ───────────────────────── scroll-driven motion ───────────────────────── */
  if (hasGsap && !reduced) {

    // hero canvas scroll progress → three.js dolly
    ScrollTrigger.create({
      trigger: "#hero", start: "top top", end: "bottom top", scrub: true,
      onUpdate: function (self) { window.__heroScroll = self.progress; }
    });

    // hero photo: slow Ken Burns drift + scroll parallax
    gsap.fromTo(".hero__bg", { scale: 1.08 }, { scale: 1, duration: 6, ease: "power2.out" });
    gsap.to(".hero__bg", {
      yPercent: 10, ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
    });

    // full-bleed interlude photos drift against scroll
    gsap.utils.toArray("[data-parallax]").forEach(function (img) {
      gsap.fromTo(img, { yPercent: -10 }, {
        yPercent: 10, ease: "none",
        scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    // hero content drifts up & fades as you leave
    gsap.to(".hero__inner", {
      yPercent: -14, opacity: 0.25, ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom 25%", scrub: true }
    });

    // generic fades (outside hero)
    gsap.utils.toArray("[data-fade]").forEach(function (el) {
      if (el.closest(".hero")) return;
      gsap.fromTo(el, { opacity: 0, y: 34 }, {
        opacity: 1, y: 0, duration: 1.15, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%" }
      });
    });

    // word reveals on section headlines
    gsap.utils.toArray('[data-reveal="words"]').forEach(function (el) {
      var words = splitWords(el);
      gsap.set(words, { yPercent: 112 });
      gsap.to(words, {
        yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.045,
        scrollTrigger: { trigger: el, start: "top 84%" }
      });
    });

    // gold rules draw in
    gsap.utils.toArray("[data-rule]").forEach(function (el) {
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: 1, duration: 1.4, ease: "power4.inOut",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });

    // marquee — perpetual, accelerates with scroll velocity
    var mTrack = document.getElementById("marqueeTrack");
    if (mTrack) {
      var marquee = gsap.to(mTrack, { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
      ScrollTrigger.create({
        onUpdate: function (self) {
          var boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 3.2);
          gsap.to(marquee, { timeScale: boost, duration: 0.3, overwrite: true });
          gsap.to(marquee, { timeScale: 1, duration: 1.4, delay: 0.3, overwrite: false });
        }
      });
    }

    // treatments — pinned horizontal voyage (desktop only)
    ScrollTrigger.matchMedia({
      "(min-width: 901px)": function () {
        var track = document.getElementById("htrack");
        var getDist = function () { return track.scrollWidth - window.innerWidth; };
        gsap.to(track, {
          x: function () { return -getDist(); },
          ease: "none",
          scrollTrigger: {
            trigger: "#treatments",
            start: "top top",
            end: function () { return "+=" + getDist(); },
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
        // plates rotate gently as the train passes
        gsap.utils.toArray(".tpanel__plate").forEach(function (plate) {
          gsap.fromTo(plate, { rotation: -7 }, {
            rotation: 7, ease: "none",
            scrollTrigger: {
              trigger: "#treatments", start: "top top",
              end: function () { return "+=" + getDist(); }, scrub: 1.2
            }
          });
        });
      }
    });

    // numbers — counters
    gsap.utils.toArray("[data-count]").forEach(function (el) {
      var end = parseInt(el.getAttribute("data-count"), 10);
      var obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 85%", once: true,
        onEnter: function () {
          gsap.to(obj, {
            v: end, duration: 2.2, ease: "power3.out",
            onUpdate: function () { el.textContent = Math.round(obj.v).toLocaleString("en-US"); }
          });
        }
      });
    });

    // the passage — progress line + step activation
    var progress = document.getElementById("passageProgress");
    if (progress) {
      ScrollTrigger.create({
        trigger: ".passage__layout", start: "top 65%", end: "bottom 55%", scrub: true,
        onUpdate: function (self) { progress.style.height = (self.progress * 100) + "%"; }
      });
    }
    gsap.utils.toArray("[data-step]").forEach(function (step) {
      ScrollTrigger.create({
        trigger: step, start: "top 62%", end: "bottom 30%",
        onToggle: function (self) { step.classList.toggle("is-active", self.isActive); }
      });
      gsap.fromTo(step, { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: step, start: "top 80%" }
      });
    });

    // footer wordmark rises
    gsap.fromTo(".footer__word span", { yPercent: 60, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 1.4, ease: "power4.out",
      scrollTrigger: { trigger: ".footer", start: "top 78%" }
    });
  }

  /* ───────────────────────── cursor + magnetics ───────────────────────── */
  if (hasGsap && !isTouch && !reduced) {
    var cursor = document.getElementById("cursor");
    var xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    var yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    window.addEventListener("mousemove", function (e) { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
    document.querySelectorAll("a, button, .switch, input, select").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursor.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("is-hover"); });
    });

    document.querySelectorAll(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * 0.28,
          y: (e.clientY - r.top - r.height / 2) * 0.34,
          duration: 0.5, ease: "power3.out"
        });
      });
      el.addEventListener("mouseleave", function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      });
    });
  }

  /* ═════════════════════════ THE PRIVATE LEDGER ═════════════════════════
     All base figures in USD. [low, high] ranges; home = published
     U.S./Canadian private-pay averages. Türkiye figures are all-inclusive
     (surgery, hospital, hotel, VIP transfers, personal host).            */

  // EDIT HERE — conversion rates FROM USD (base). Keep in sync with js/packages-data.js "rates".
  var FX = { USD: 1, CAD: 1.37, GBP: 0.79 };
  var EUR_USD  = 1.15;  // EDIT HERE — €→$ rate for partner-hospital prices (keep in sync with js/packages-data.js eurToUsd)
  var currency = "USD";

  /* ── partner-hospital fixed prices ──────────────────────────────
     item = [value, label, EUR price, US-average low, US-average high]
     EUR figures are the official international-patient rates of our
     partner hospital group; US figures are published private-pay
     averages used for the comparison bars. EDIT HERE on rate updates. */

  var ACB_MENU = {
    plastic: [
      ["Breast", [
        ["aug-lift-impl", "Breast Augmentation + Lift — implants included", 4300, 9000, 16000],
        ["aug-lift",      "Breast Augmentation + Lift", 4000, 8000, 14000],
        ["reduction",     "Breast Reduction", 4000, 9000, 16000]
      ]],
      ["Face", [
        ["bichectomy",   "Bichectomy — buccal fat removal", 1600, 3000, 5000],
        ["otoplasty-ga", "Otoplasty — both ears, general anesthesia", 2200, 5000, 8000],
        ["otoplasty-la", "Otoplasty — both ears, local anesthesia", 1900, 4000, 7000],
        ["bleph-upper",  "Blepharoplasty — upper eyelids", 2200, 4500, 8000],
        ["bleph-lower",  "Blepharoplasty — lower eyelids", 2000, 4500, 8000],
        ["bleph-both",   "Blepharoplasty — upper + lower", 3000, 7000, 12000]
      ]],
      ["Face & neck lifting", [
        ["facelift-mid",  "Facelift — midface", 4300, 12000, 25000],
        ["facelift-full", "Facelift — full face", 5300, 15000, 30000],
        ["necklift",      "Neck Lift", 3500, 9000, 15000],
        ["brow-jplasma",  "Endoscopic Brow Lift — J-Plasma", 2750, 6000, 11000],
        ["forehead-lift", "Forehead Lift", 5800, 7000, 12000]
      ]],
      ["Body", [
        ["gyneco-exc",   "Gynecomastia — excisional", 3800, 7000, 12000],
        ["gyneco-lipo",  "Gynecomastia — with liposuction", 3000, 6000, 10000],
        ["labiaplasty",  "Labiaplasty / Nymphoplasty", 2200, 4000, 7000],
        ["abdomino",     "Abdominoplasty — tummy tuck", 4000, 9000, 18000],
        ["abdomino-ext", "Abdominoplasty — extended", 4000, 12000, 22000],
        ["arm-lift",     "Arm Lift — brachioplasty", 2750, 6000, 10000],
        ["thigh-lift",   "Thigh Lift", 4000, 8000, 13000],
        ["buttock-lift", "Buttock Lift", 4000, 8000, 14000],
        ["back-lift",    "Back Lift", 3500, 8000, 13000],
        ["lift-360",     "360 Lifting", 4400, 15000, 30000]
      ]],
      ["Liposuction & filling", [
        ["lipo-1",         "Liposuction — 1 region", 2200, 4000, 7500],
        ["lipo-23",        "Liposuction — 2–3 regions", 2750, 7000, 12000],
        ["lipo-45",        "Liposuction — 4–5 regions", 3300, 10000, 16000],
        ["llipo-1",        "Laser Liposuction — 1 region", 2200, 4500, 8000],
        ["llipo-23",       "Laser Liposuction — 2–3 regions", 3300, 8000, 13000],
        ["llipo-5",        "Laser Liposuction — 5 regions", 4000, 12000, 18000],
        ["lipofill-small", "Lipofilling — small, local anesthesia", 900, 2500, 5000],
        ["lipofill-23la",  "Lipofilling — 2–3 regions, local anesthesia", 1100, 3000, 6000],
        ["lipofill-23ga",  "Lipofilling — 2–3 regions, general anesthesia", 1600, 4000, 8000],
        ["filling",        "Filling", 700, 1500, 3000]
      ]]
    ],
    eye: [
      [null, [
        ["ilasik",       "iLASIK — both eyes", 1500, 4000, 5500],
        ["ilasik-hotel", "iLASIK — both eyes + 2 hotel nights", 1700, 4000, 5500],
        ["smile",        "SMILE Laser — both eyes", 2000, 4500, 6500],
        ["smile-hotel",  "SMILE Laser — both eyes + 2 hotel nights", 2200, 4500, 6500],
        ["phaco",        "Cataract (Phaco) — both eyes, lens included", 5500, 8000, 14000],
        ["phaco-hotel",  "Cataract (Phaco) — both eyes + 5 hotel nights", 6000, 8000, 14000]
      ]]
    ],
    obesity: [
      [null, [
        ["sleeve",         "Gastric Sleeve — incl. 5 hotel nights", 5000, 18000, 28000],
        ["bypass",         "Gastric Bypass — incl. 5 hotel nights", 6000, 25000, 38000],
        ["balloon-endo",   "Gastric Balloon — endoscopic", 3500, 7000, 9500],
        ["balloon-swallow","Gastric Balloon — swallowable", 3500, 6500, 9000],
        ["botox",          "Gastric Botox", 2000, 2000, 3500]
      ]]
    ],
    checkup: [
      ["Check-Up Packages", [
        ["standard",  "Standard Check-Up", 800, 1500, 2800],
        ["gold",      "Gold Check-Up", 1200, 2500, 4500],
        ["premium",   "Premium Check-Up Package", 2000, 4000, 7000],
        ["exec-endo", "Executive — endoscopy + colonoscopy", 3800, 6500, 11000],
        ["exec-mri",  "Executive — full-body MRI", 3500, 6000, 10500],
        ["cardiac",   "Cardiac Check-Up", 1700, 3000, 6000],
        ["lung",      "Lung Check-Up", 1700, 3000, 6000],
        ["thyroid",   "Thyroid Package", 400, 800, 1600],
        ["womens",    "Women's Health Screening", 300, 700, 1400],
        ["breast-40", "Breast Screening Panel — over 40", 350, 700, 1500],
        ["breast-u40","Breast Screening Panel — under 40", 250, 500, 1100]
      ]],
      ["Imaging", [
        ["brain-mri",  "Brain MRI — 3T", 650, 1600, 4000],
        ["thorax-mri", "Thorax MRI", 650, 1500, 3500],
        ["leg-mri",    "Leg MRI", 650, 1500, 3500],
        ["knee-mri",   "Knee MRI", 650, 1500, 3500],
        ["pet-ct",     "PET-CT", 850, 4000, 8000]
      ]]
    ]
  };

  var ACB_SELECTS = { plastic: "p-proc", eye: "e-proc", obesity: "o-proc", checkup: "c-proc" };
  var ACB_LOOKUP = {};

  Object.keys(ACB_MENU).forEach(function (panel) {
    var sel = document.getElementById(ACB_SELECTS[panel]);
    if (!sel) return;
    ACB_LOOKUP[panel] = {};
    sel.innerHTML = ACB_MENU[panel].map(function (grp) {
      var opts = grp[1].map(function (it) {
        ACB_LOOKUP[panel][it[0]] = it;
        return '<option value="' + it[0] + '">' + it[1] + ' — €' + it[2].toLocaleString("en-US") + '</option>';
      }).join("");
      return grp[0] ? '<optgroup label="' + grp[0] + '">' + opts + '</optgroup>' : opts;
    }).join("");
  });

  function acbFixed(panel) {
    var it = ACB_LOOKUP[panel][document.getElementById(ACB_SELECTS[panel]).value];
    var usd = it[2] * EUR_USD;
    return { tr: [usd, usd], us: [it[3], it[4]], fixed: true, eur: it[2] };
  }

  var MODELS = {
    dental: function () {
      var implants = +document.getElementById("d-implants").value;
      var veneers  = +document.getElementById("d-veneers").value;
      var crowns   = +document.getElementById("d-crowns").value;
      var emax     = document.getElementById("d-material").value === "emax";
      var white    = document.getElementById("d-whitening").checked;
      var m = emax ? 1.2 : 1;

      var tr = [implants * 450 + veneers * 170 * m + crowns * 150 * m + (white ? 120 : 0),
                implants * 650 + veneers * 260 * m + crowns * 240 * m + (white ? 180 : 0)];
      var us = [implants * 3500 + veneers * (emax ? 1400 : 1200) + crowns * 1000 + (white ? 450 : 0),
                implants * 5000 + veneers * (emax ? 2500 : 2000) + crowns * 1600 + (white ? 650 : 0)];
      if (tr[0] > 0) { tr[0] += 600; tr[1] += 800; } // hotel + transfers + host
      return { tr: tr, us: us, unitLabel: implants + veneers + crowns === 0 && !white ? "Select your treatments above" : null };
    },

    rhinoplasty: function () {
      var types = {
        primary: { eur: 3000, us: [9000, 15000] },
        complex: { eur: 3500, us: [13000, 22000] }
      };
      var t = types[document.getElementById("r-type").value];
      var usd = t.eur * EUR_USD;
      return { tr: [usd, usd], us: t.us, fixed: true, eur: t.eur };
    },

    plastic: function () { return acbFixed("plastic"); },
    eye:     function () { return acbFixed("eye"); },
    obesity: function () { return acbFixed("obesity"); },
    checkup: function () { return acbFixed("checkup"); },

    knee: function () {
      var procs = {
        arthro:    { tr: [3000, 4500],   us: [10000, 15000] },
        partial:   { tr: [7000, 9500],   us: [20000, 32000] },
        total:     { tr: [8500, 12000],  us: [30000, 50000] },
        bilateral: { tr: [15000, 20500], us: [55000, 90000] }
      };
      var p = procs[document.getElementById("k-proc").value];
      var premium = document.getElementById("k-implant").value === "premium";
      var weeks = +document.getElementById("k-physio").value;
      var f = premium ? 1.15 : 1, fu = premium ? 1.12 : 1;
      var tr = [p.tr[0] * f + weeks * 300, p.tr[1] * f + weeks * 450];
      var us = [p.us[0] * fu + weeks * 1200, p.us[1] * fu + weeks * 2000];
      if (document.getElementById("k-companion").checked) { tr[0] += 600; tr[1] += 900; }
      return { tr: tr, us: us };
    },

    hair: function () {
      var hotel = document.getElementById("h-hotel").checked;
      var tech = {
        fue: { eur: hotel ? 2500 : 2300, us: [12000, 18000] },
        dhi: { eur: hotel ? 2700 : 2500, us: [13000, 20000] }
      }[document.getElementById("h-tech").value];
      var usd = tech.eur * EUR_USD;
      return { tr: [usd, usd], us: tech.us, fixed: true, eur: tech.eur };
    }
  };

  /* — result template — */
  var INCLUDES_TEXT = {
    dental: "Includes five-star hotel, VIP transfers, personal host &amp; lifetime aftercare.",
    knee:   "Includes five-star hotel, VIP transfers, personal host &amp; lifetime aftercare.",
    hospital: "Official fixed hospital price, paid directly to our partner hospital — hotel included only where stated. " +
              "Transfers &amp; your personal host arranged by us; our only charge is the fixed $300 coordination fee."
  };

  function resultShell(panel) {
    var name = panel.getAttribute("data-panel");
    var box = panel.querySelector(".calc__result");
    box.innerHTML =
      '<p class="res__label">Your estimate in T&uuml;rkiye</p>' +
      '<p class="res__price" data-r="price">$0</p>' +
      '<p class="res__range" data-r="range">&nbsp;</p>' +
      '<div class="res__bars">' +
        '<div class="res__bar res__bar--home"><span><b data-r="homeLabel">At home — U.S. average</b><b data-r="homeVal">$0</b></span><i data-r="homeBar"></i></div>' +
        '<div class="res__bar res__bar--tr"><span><b>With MedMatch, in T&uuml;rkiye</b><b data-r="trVal">$0</b></span><i data-r="trBar"></i></div>' +
      '</div>' +
      '<div class="res__save"><strong data-r="save">You keep $0</strong><em data-r="pct">&minus;0%</em></div>' +
      '<p class="res__includes">' + (INCLUDES_TEXT[name] || INCLUDES_TEXT.hospital) + '</p>' +
      '<a class="btn btn--gold res__cta magnetic" href="#invitation" data-scroll-to="#invitation"><span>Reserve this estimate</span></a>';
    box.querySelector("[data-scroll-to]").addEventListener("click", function (e) {
      e.preventDefault();
      scrollToTarget("#invitation");
    });
    return box;
  }

  function fmt(v) {
    var val = v * (FX[currency] || 1);
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency: currency, maximumFractionDigits: 0
    }).format(Math.round(val / 10) * 10);
  }

  var displayed = {}; // panel → last shown numbers, for tweening

  function renderCalc(name, animate) {
    var panel = document.querySelector('[data-panel="' + name + '"]');
    if (!panel) return;
    var box = panel.querySelector(".calc__result");
    if (!box.hasChildNodes()) box = resultShell(panel);

    var r = MODELS[name]();
    var trMid = (r.tr[0] + r.tr[1]) / 2;
    var usMid = (r.us[0] + r.us[1]) / 2;
    var save = Math.max(usMid - trMid, 0);
    var pct = usMid > 0 ? Math.round(save / usMid * 100) : 0;

    var q = function (k) { return box.querySelector('[data-r="' + k + '"]'); };

    q("homeLabel").textContent = { CAD: "At home — Canadian average", GBP: "At home — U.K. average" }[currency] || "At home — U.S. average";
    q("range").innerHTML = r.fixed
      ? "fixed hospital price — &euro;" + r.eur.toLocaleString("en-US") + ", quoted in writing by the hospital"
      : (r.tr[0] > 0
        ? "typically " + fmt(r.tr[0]) + " &ndash; " + fmt(r.tr[1])
        : (r.unitLabel || "&nbsp;"));

    var end = { price: trMid, home: usMid, save: save, pct: pct };
    var start = displayed[name] || { price: 0, home: 0, save: 0, pct: 0 };
    displayed[name] = end;

    function apply(s) {
      q("price").textContent = fmt(s.price);
      q("homeVal").textContent = fmt(s.home);
      q("trVal").textContent = fmt(s.price);
      q("save").textContent = "You keep " + fmt(s.save);
      q("pct").innerHTML = "&minus;" + Math.round(s.pct) + "% vs home";
    }

    var homeW = 100;
    var trW = usMid > 0 ? Math.max((trMid / usMid) * 100, 2) : 0;

    if (hasGsap && animate && !reduced) {
      var obj = { price: start.price, home: start.home, save: start.save, pct: start.pct };
      gsap.to(obj, {
        price: end.price, home: end.home, save: end.save, pct: end.pct,
        duration: 0.9, ease: "power3.out", overwrite: true,
        onUpdate: function () { apply(obj); }
      });
      gsap.to(q("homeBar"), { width: homeW + "%", duration: 0.9, ease: "power3.out" });
      gsap.to(q("trBar"), { width: trW + "%", duration: 0.9, ease: "power3.out" });
    } else {
      apply(end);
      q("homeBar").style.width = homeW + "%";
      q("trBar").style.width = trW + "%";
    }
  }

  /* — tabs — */
  var tabs = document.querySelectorAll("#calcTabs .tab");
  var ink = document.getElementById("tabsInk");

  function positionInk(btn) {
    ink.style.left = btn.offsetLeft + "px";
    ink.style.width = btn.offsetWidth + "px";
  }

  function activateCalc(name, instant) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-calc") === name;
      t.setAttribute("aria-selected", on ? "true" : "false");
      if (on) positionInk(t);
    });
    document.querySelectorAll(".calc__panel").forEach(function (p) {
      var on = p.getAttribute("data-panel") === name;
      p.classList.toggle("is-active", on);
      if (on && hasGsap && !reduced && !instant) {
        gsap.fromTo(p, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
      }
    });
    renderCalc(name, false);
    if (hasGsap) ScrollTrigger.refresh();
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { activateCalc(t.getAttribute("data-calc")); });
  });
  window.addEventListener("resize", function () {
    var active = document.querySelector('#calcTabs .tab[aria-selected="true"]');
    if (active) positionInk(active);
  });

  /* — currency — */
  document.querySelectorAll("#currencyToggle .currency__btn").forEach(function (b) {
    b.addEventListener("click", function () {
      currency = b.getAttribute("data-cur");
      document.querySelectorAll("#currencyToggle .currency__btn").forEach(function (x) {
        x.classList.toggle("is-active", x === b);
      });
      var active = document.querySelector(".calc__panel.is-active");
      if (active) renderCalc(active.getAttribute("data-panel"), true);
    });
  });

  /* — inputs — */
  function sliderFill(input) {
    var p = (input.value - input.min) / (input.max - input.min) * 100;
    input.style.setProperty("--fill", p + "%");
  }

  var OUTPUT_FMT = {
    "k-physio": function (v) { return v === "0" ? "none" : v + (v === "1" ? " week" : " weeks"); }
  };

  document.querySelectorAll("[data-recalc]").forEach(function (input) {
    var evt = input.tagName === "SELECT" || input.type === "checkbox" ? "change" : "input";
    input.addEventListener(evt, function () {
      if (input.type === "range") {
        sliderFill(input);
        var out = document.getElementById(input.id + "-out");
        if (out) out.textContent = (OUTPUT_FMT[input.id] || String)(input.value);
      }
      var panel = input.closest(".calc__panel");
      renderCalc(panel.getAttribute("data-panel"), true);
    });
    if (input.type === "range") sliderFill(input);
  });

  // initial state
  activateCalc("dental", true);
  ["dental", "rhinoplasty", "plastic", "eye", "obesity", "checkup", "knee", "hair"].forEach(function (n) { renderCalc(n, false); });

  /* ───────────────────────── invitation form ───────────────────────── */
  var form = document.getElementById("inviteForm");
  var submitBtn = form.querySelector(".btn[type='submit']");
  var submitBtnLabel = submitBtn ? submitBtn.querySelector("span") : null;
  var submitBtnDefaultText = submitBtnLabel ? submitBtnLabel.textContent : "";

  function showSuccess() {
    var fields = form.querySelectorAll(".ffield, .btn, .invitation__microcopy");
    var success = document.getElementById("inviteSuccess");
    var errBox = document.getElementById("inviteError");
    if (errBox) errBox.style.display = "none"; // clear a stale error from a failed earlier attempt
    if (hasGsap && !reduced) {
      gsap.to(fields, {
        opacity: 0, y: -14, duration: 0.5, stagger: 0.05, ease: "power2.in",
        onComplete: function () {
          fields.forEach(function (f) { f.style.display = "none"; });
          success.style.display = "block";
          gsap.fromTo(success, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
        }
      });
    } else {
      fields.forEach(function (f) { f.style.display = "none"; });
      success.style.display = "block";
    }
  }

  function showError() {
    var errBox = document.getElementById("inviteError");
    if (!errBox) return;
    errBox.style.display = "block";
    if (hasGsap && !reduced) {
      gsap.fromTo(errBox, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }
  }

  function setSending(sending) {
    if (!submitBtn) return;
    submitBtn.disabled = sending;
    if (submitBtnLabel) submitBtnLabel.textContent = sending ? "Sending…" : submitBtnDefaultText;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("f-name");
    var email = document.getElementById("f-email");
    var phone = document.getElementById("f-phone");
    var treatment = document.getElementById("f-treatment");
    var msg = document.getElementById("f-msg");

    if (!name.value.trim() || !email.value.trim() || email.validity.typeMismatch) {
      [name, email].forEach(function (f) {
        if (!f.value.trim() || f.validity.typeMismatch) {
          if (hasGsap && !reduced) gsap.fromTo(f, { x: -7 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
          f.style.borderColor = "#C96A6A";
          setTimeout(function () { f.style.borderColor = ""; }, 1800);
        }
      });
      return;
    }

    var honey = document.getElementById("f-honey");
    if (honey && honey.value) return; // honeypot filled — silently drop bot submission

    var treatmentVal = treatment ? treatment.value : "";

    var LEAD_ENDPOINT = "https://script.google.com/macros/s/AKfycbx8G_Drl8SkJfAqJ1YTjOl-muJqLssAkdtyqZyGFobQ2SDt0ompH-jK2ciq_UL5uB4B/exec";

    var payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone ? phone.value.trim() : "",
      treatment: treatmentVal,
      message: msg ? msg.value.trim() : "",
      page: location.pathname + location.search,
      _honey: ""
    };

    setSending(true);
    var errBox = document.getElementById("inviteError");
    if (errBox) errBox.style.display = "none"; // hide any previous error while retrying

    // No headers here: Apps Script web apps don't answer CORS preflight,
    // so this fetch must stay a "simple request" (no Content-Type).
    fetch(LEAD_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (!data.ok) throw new Error("Request failed");
        setSending(false);
        showSuccess();
      })
      .catch(function () {
        setSending(false);
        showError();
      });
  });

})();
