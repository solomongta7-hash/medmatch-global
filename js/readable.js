/* ═══════════════════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — text size control
   ───────────────────────────────────────────────────────────────────────────
   A two-button A / A+ control that sits beside the language picker.

   Why it exists: most of our patients are between fifty and seventy, reading
   about surgery, often on a phone in poor light. The people who most need
   bigger text are the least likely to know their browser can do it. So we put
   the control on the page, in their own language, where they will find it.

   It changes type only, never layout — page zoom broke the full-bleed
   sections — so nothing can overflow at either setting.

   Choice is remembered on the device, and applied before first paint so the
   page never visibly jumps.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var STORE = "mm_textsize";

  var LABEL = {
    en: { help: "Text size", normal: "Normal text size", large: "Larger text" },
    es: { help: "Tamaño del texto", normal: "Tamaño normal", large: "Texto más grande" },
    fr: { help: "Taille du texte", normal: "Taille normale", large: "Texte plus grand" },
    de: { help: "Schriftgröße", normal: "Normale Schriftgröße", large: "Größere Schrift" },
    tr: { help: "Yazı boyutu", normal: "Normal yazı boyutu", large: "Daha büyük yazı" },
    ru: { help: "Размер текста", normal: "Обычный размер", large: "Крупный текст" }
  };

  /* Applied immediately, before the body exists, so a returning reader never
     sees the small size flash past. */
  var large = false;
  try { large = localStorage.getItem(STORE) === "large"; } catch (e) {}
  if (large) document.documentElement.className += " text-larger";

  var CSS =
    ".textsize{display:inline-flex;align-items:center;gap:2px;margin-left:10px}" +
    ".textsize__btn{min-width:44px;min-height:44px;display:inline-flex;align-items:center;" +
      "justify-content:center;background:none;border:1px solid currentColor;color:inherit;" +
      "border-radius:8px;cursor:pointer;font-family:var(--sans,system-ui,sans-serif);" +
      "font-weight:600;line-height:1;opacity:.75}" +
    ".textsize__btn+.textsize__btn{margin-left:4px}" +
    ".textsize__btn:hover{opacity:1}" +
    ".textsize__btn[aria-pressed=\"true\"]{opacity:1;background:currentColor}" +
    ".textsize__btn[aria-pressed=\"true\"] span{color:var(--sea-deep,#06333B);" +
      "mix-blend-mode:screen;filter:invert(1) grayscale(1) contrast(9)}" +
    ".textsize__btn--sm{font-size:15px}.textsize__btn--lg{font-size:20px}" +

    /* ── inside the floating picker ─────────────────────────────────────────
       On the pages with no site nav to hang it on, the picker is a fixed pill
       in the corner. The buttons used to be dropped into the page body next to
       it, which on a phone left them loose at the very bottom of the document,
       sitting across the "Get my free quote" button. They belong in the pill:
       one control, one place, never over anything else. */
    ".lang-pick--float .textsize{margin-left:8px;padding-left:8px;" +
      "border-left:1px solid rgba(255,255,255,.28)}" +
    /* 44px, the floor the rest of the site keeps: the readers most likely to
       reach for this control are the ones least able to hit a small target */
    ".lang-pick--float .textsize__btn{min-width:44px;min-height:44px;" +
      "border-color:rgba(255,255,255,.5)}" +
    ".lang-pick--float .textsize__btn[aria-pressed=\"true\"]{background:#fff}" +
    /* the invert trick below is for a button on the page's own background;
       on the dark pill plain dark-on-white is what it should be */
    ".lang-pick--float .textsize__btn[aria-pressed=\"true\"] span{" +
      "color:var(--sea-deep,#06333B);mix-blend-mode:normal;filter:none}" +

    /* On a narrow phone the header is already crowded; the control keeps its
       44px hit area but loses the outer margin. */
    "@media(max-width:640px){.textsize{margin-left:4px}}";

  function labels() {
    var lang = (window.MMi18n && window.MMi18n.lang) || "en";
    return LABEL[lang] || LABEL.en;
  }

  function mount() {
    if (document.querySelector(".textsize")) return;
    var host = document.querySelector(".lang-pick");
    if (!host || !host.parentNode) return;

    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    var t = labels();
    var wrap = document.createElement("div");
    wrap.className = "textsize";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", t.help);
    wrap.innerHTML =
      '<button type="button" class="textsize__btn textsize__btn--sm u-bare" ' +
        'data-size="normal" title="' + t.normal + '" aria-label="' + t.normal + '"><span>A</span></button>' +
      '<button type="button" class="textsize__btn textsize__btn--lg u-bare" ' +
        'data-size="large" title="' + t.large + '" aria-label="' + t.large + '"><span>A</span></button>';

    /* In a header the two controls stand side by side on the row. When the
       picker is the floating pill there is no row to join — going in beside it
       in the body flow put the buttons at the foot of the document, over the
       page's own CTA — so they go inside the pill and travel with it. */
    if (host.classList.contains("lang-pick--float")) {
      host.appendChild(wrap);
      if (window.MMi18n && window.MMi18n.placeFloat) window.MMi18n.placeFloat();
    } else {
      host.parentNode.insertBefore(wrap, host.nextSibling);
    }

    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-size]");
      if (!btn) return;
      set(btn.getAttribute("data-size") === "large");
    });
    sync();
  }

  function set(isLarge) {
    large = isLarge;
    document.documentElement.classList.toggle("text-larger", large);
    try { localStorage.setItem(STORE, large ? "large" : "normal"); } catch (e) {}
    sync();
  }

  function sync() {
    document.querySelectorAll(".textsize__btn").forEach(function (b) {
      b.setAttribute("aria-pressed", (b.getAttribute("data-size") === "large") === large);
    });
  }

  /* A skip link, for anyone arriving by keyboard or screen reader. It is the
     first focusable thing on the page and invisible until focused. */
  function skipLink() {
    if (document.querySelector(".skip-link")) return;
    var main = document.querySelector("main") || document.querySelector("article");
    if (!main) return;
    if (!main.id) main.id = "main-content";
    var t = { en: "Skip to content", es: "Ir al contenido", fr: "Aller au contenu",
              de: "Zum Inhalt springen", tr: "İçeriğe geç",
              ru: "Перейти к содержимому" };
    var lang = (window.MMi18n && window.MMi18n.lang) || "en";
    var a = document.createElement("a");
    a.className = "skip-link";
    a.href = "#" + main.id;
    a.textContent = t[lang] || t.en;
    document.body.insertBefore(a, document.body.firstChild);
  }

  function boot() { mount(); skipLink(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  /* The language picker is built by i18n.js, which may finish after us on a
     slow connection; one late retry is cheaper than coordinating the two. */
  setTimeout(boot, 400);
})();
