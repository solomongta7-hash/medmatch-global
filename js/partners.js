/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — partner hospital price list
   Renders the categorized price list from js/packages-data.js
   (window.MM_DATA.hospital). Prices are quoted in EUR by the
   hospital; the visitor can view them converted to USD / CAD / GBP,
   with the official € shown alongside each line.
   LOCKED MODE: if #priceList has data-locked, prices render as
   advisor-only lock chips instead of figures.
   Rates reuse MM_DATA.rates (USD-based) × MM_DATA.eurToUsd.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";
  var D = window.MM_DATA;
  if (!D) return;

  var rates = D.rates || { USD: 1, CAD: 1.37, GBP: 0.79 };
  var syms  = D.symbols || { USD: "$", CAD: "CA$", GBP: "£" };
  var e2u   = D.eurToUsd || 1.15;
  var cur   = "USD";

  function conv(eur) { return Math.round(eur * e2u * (rates[cur] || 1) / 10) * 10; }
  function money(eur) { return syms[cur] + conv(eur).toLocaleString("en-US"); }
  function eurStr(eur) { return "€" + eur.toLocaleString("en-US"); }

  /* ── categorized price list ── */
  function renderList() {
    var root = document.getElementById("priceList");
    if (!root || !D.hospital) return;
    var locked = root.hasAttribute("data-locked");
    root.innerHTML = D.hospital.categories.map(function (cat) {
      return (
        '<section class="plist__cat">' +
          '<h3 class="plist__title">' + cat.title +
            (locked ? '<span class="plist__count">' + cat.items.length + ' procedures — official fixed prices</span>' : '') +
          '</h3>' +
          '<table class="plist__table"><tbody>' +
          cat.items.map(function (it) {
            var price = locked
              ? '<b aria-label="Price unlocked with your free quote">€ •,•••</b><span>unlocked with your free quote</span>'
              : '<b>' + money(it.eur) + '</b><span>' + eurStr(it.eur) + ' at the hospital</span>';
            return '<tr><td>' + it.n + '</td><td>' + price + '</td></tr>';
          }).join("") +
          '</tbody></table>' +
        '</section>'
      );
    }).join("");
  }

  /* ── currency toggle ── */
  var curWrap = document.getElementById("priceCurrency");
  if (curWrap) {
    curWrap.innerHTML = ["USD", "CAD", "GBP"].map(function (c) {
      return '<button class="currency__btn' + (c === cur ? " is-active" : "") + '" data-cur="' + c + '">' +
        c + " " + syms[c].replace("CA$", "$") + "</button>";
    }).join("");
    curWrap.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cur]");
      if (!b) return;
      cur = b.getAttribute("data-cur");
      curWrap.querySelectorAll(".currency__btn").forEach(function (x) {
        x.classList.toggle("is-active", x === b);
      });
      renderList();
    });
  }

  var note = document.getElementById("priceNote");
  if (note && D.hospital) note.textContent = D.hospital.note;

  /* ── WhatsApp links ── */
  var waMsg = encodeURIComponent(document.body.getAttribute("data-wa-msg") ||
    "Hello MedMatch Global! I saw your partner hospital price list and I'd like a free quote.");
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/" + D.whatsapp + "?text=" + waMsg;
  });
  var floatBtn = document.getElementById("waFloat");
  if (floatBtn) {
    floatBtn.href = "https://wa.me/" + D.whatsapp + "?text=" + waMsg;
    floatBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 2.6 1.1 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z"/></svg>';
  }

  renderList();
})();
