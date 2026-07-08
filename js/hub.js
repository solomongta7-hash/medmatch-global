/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — ADVISOR HUB
   Standalone page script: nav, reveals, commission calculator,
   membership preselect, application form.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/suleymansuleymanoglu@medmatchglobal.info";

  /* commission terms — the Hub's honest math:
     clinic pays MedMatch at most 10% of the package;
     a certified advisor earns 20% of that commission. */
  var CLINIC_COMMISSION = 0.10;
  var ADVISOR_SHARE = 0.20;

  /* ── nav ── */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  var mmenu = document.getElementById("mmenu");

  function onScroll() { nav.classList.toggle("is-solid", window.scrollY > 60); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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

  /* ── smooth anchor scrolling (offset for fixed nav) ── */
  function scrollToTarget(sel) {
    var el = document.querySelector(sel);
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(a.getAttribute("href"));
  });

  /* ── reveal on scroll ── */
  var faders = Array.prototype.slice.call(document.querySelectorAll("[data-fade]"));
  function revealCheck() {
    faders = faders.filter(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.94) {
        el.classList.add("in-view");
        return false;
      }
      return true;
    });
  }
  if (reduced) {
    faders.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    window.addEventListener("scroll", revealCheck, { passive: true });
    window.addEventListener("resize", revealCheck, { passive: true });
    window.addEventListener("load", revealCheck);
    revealCheck();
  }

  /* ── range slider fill (matches styles.css --fill technique) ── */
  function paintRange(input) {
    var min = parseFloat(input.min || 0), max = parseFloat(input.max || 100);
    var pct = ((parseFloat(input.value) - min) / (max - min)) * 100;
    input.style.setProperty("--fill", pct + "%");
  }

  /* ══════════ COMMISSION CALCULATOR ══════════ */
  var calcPkg = document.getElementById("calcPkg");
  var calcPkgOut = document.getElementById("calcPkgOut");
  var calcPatients = document.getElementById("calcPatients");
  var calcPatientsOut = document.getElementById("calcPatientsOut");
  var earnPer = document.getElementById("earnPer");
  var earnMonth = document.getElementById("earnMonth");
  var earnYear = document.getElementById("earnYear");

  function money(n) { return "$" + Math.round(n).toLocaleString("en-US"); }
  function updateEarnings() {
    var pkg = parseInt(calcPkg.value, 10);
    var patients = parseInt(calcPatients.value, 10);
    var perJourney = pkg * CLINIC_COMMISSION * ADVISOR_SHARE;
    calcPkgOut.textContent = money(pkg);
    calcPatientsOut.textContent = patients;
    earnPer.textContent = money(perJourney);
    earnMonth.textContent = money(perJourney * patients);
    earnYear.textContent = money(perJourney * patients * 12);
    paintRange(calcPkg);
    paintRange(calcPatients);
  }
  calcPkg.addEventListener("input", updateEarnings);
  calcPatients.addEventListener("input", updateEarnings);
  updateEarnings();

  /* ══════════ MEMBERSHIP CTAs → application form ══════════ */
  var tierSelect = document.getElementById("a-tier");
  var tierMap = {
    "Guest Pass (Free)": "Guest Pass — Free",
    "Certified Advisor ($299/yr)": "Certified Advisor — $299/year"
  };
  document.querySelectorAll("[data-tier]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var mapped = tierMap[btn.getAttribute("data-tier")];
      if (mapped) {
        Array.prototype.forEach.call(tierSelect.options, function (o) { o.selected = o.text === mapped; });
      }
      scrollToTarget("#apply");
    });
  });

  /* ══════════ APPLICATION FORM ══════════ */
  var applyForm = document.getElementById("applyForm");
  var applySuccess = document.getElementById("applySuccess");
  var applyError = document.getElementById("applyError");
  var submitBtn = applyForm.querySelector('.btn[type="submit"]');
  var submitLabel = submitBtn.querySelector("span");
  var submitDefault = submitLabel.textContent;

  function flagInvalid(field) {
    field.style.borderColor = "#C96A6A";
    setTimeout(function () { field.style.borderColor = ""; }, 1800);
  }

  applyForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("a-name");
    var email = document.getElementById("a-email");
    if (!name.value.trim() || !email.value.trim() || email.validity.typeMismatch) {
      [name, email].forEach(function (f) { if (!f.value.trim() || f.validity.typeMismatch) flagInvalid(f); });
      return;
    }
    var honey = document.getElementById("a-honey");
    if (honey && honey.value) return; // honeypot filled — silently drop bot submission
    var payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: document.getElementById("a-phone").value.trim(),
      program: document.getElementById("a-program").value,
      membership: tierSelect.value,
      motivation: document.getElementById("a-msg").value.trim(),
      _subject: "Advisor Hub application — " + document.getElementById("a-program").value,
      _template: "table",
      _captcha: "false"
    };
    submitBtn.disabled = true;
    submitLabel.textContent = "Sending…";
    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) { if (!res.ok) throw new Error("Request failed"); return res.json(); })
      .then(function () {
        applyForm.querySelectorAll(".ffield, .btn, .invitation__microcopy").forEach(function (el) { el.style.display = "none"; });
        applySuccess.style.display = "block";
        // if Stripe is configured, let eager applicants pay their membership right away
        var payLink = window.MM_CONFIG && window.MM_CONFIG.stripeMembershipLink;
        var payBtn = document.getElementById("applyPayLink");
        if (payLink && payBtn && /^Certified/.test(tierSelect.value)) {
          payBtn.href = payLink;
          payBtn.style.display = "inline-flex";
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitLabel.textContent = submitDefault;
        applyError.style.display = "block";
      });
  });

})();
