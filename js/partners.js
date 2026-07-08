/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — partner hospital price list (Acibadem etc.)
   Renders the categorized price list from js/packages-data.js
   (window.MM_DATA.acibadem). Prices are quoted in EUR by the
   hospital; an approximate USD figure is shown alongside, using
   MM_DATA.eurToUsd. Edit prices only in the data file.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";
  var D = window.MM_DATA;
  if (!D) return;

  function eur(v) { return "€" + v.toLocaleString("en-US"); }
  function usd(v) {
    var x = Math.round(v * (D.eurToUsd || 1.15) / 10) * 10;
    return "US$" + x.toLocaleString("en-US");
  }

  /* ── categorized price list ── */
  var root = document.getElementById("priceList");
  if (root && D.acibadem) {
    root.innerHTML = D.acibadem.categories.map(function (cat) {
      return (
        '<section class="plist__cat">' +
          '<h3 class="plist__title">' + cat.title + '</h3>' +
          '<table class="plist__table"><tbody>' +
          cat.items.map(function (it) {
            return '<tr><td>' + it.n + '</td>' +
              '<td><b>' + eur(it.eur) + '</b><span>≈ ' + usd(it.eur) + '</span></td></tr>';
          }).join("") +
          '</tbody></table>' +
        '</section>'
      );
    }).join("");
  }

  var note = document.getElementById("priceNote");
  if (note && D.acibadem) note.textContent = D.acibadem.note;

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
})();
