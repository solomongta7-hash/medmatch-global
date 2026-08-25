/* ═══════════════════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — language engine
   ───────────────────────────────────────────────────────────────────────────
   Loads in <head> on EVERY page, so a visitor's language survives every click.

   How it works
   ------------
   Each translatable string in the HTML carries data-i18n="<8 hex chars>",
   which is a hash of the English text itself. Two consequences worth knowing:

     · The same sentence anywhere on the site shares one dictionary entry.
       "Book a Call" is translated once, not thirty-seven times.

     · If someone edits the English copy, the hash changes, no translation
       matches, and the visitor sees the new English. Never a stale, wrong
       translation. Run tools/check-translations.py to list what drifted.

   Attributes (placeholder, aria-label, title, alt) are handled through
   data-i18n-attr="placeholder:ab12cd34,title:ef56ab78".

   The dictionary for the chosen language is pulled in synchronously from
   /js/lang/<code>.js while the head is still parsing, so the text is already
   translated before anything paints or animates. English visitors download
   nothing extra.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* Languages we actually support properly. Adding one means: add it here,
     drop a /js/lang/<code>.js beside the others, and it appears in the picker
     on all 37 pages by itself. Russian is translated and ready — uncomment the
     line to switch it back on. */
  var LANGS = [
    { code: "en", name: "English",   english: "English" },
    { code: "es", name: "Español",   english: "Spanish" },
    { code: "fr", name: "Français",  english: "French" },
    { code: "de", name: "Deutsch",   english: "German" },
    { code: "tr", name: "Türkçe",    english: "Turkish" }
    // , { code: "ru", name: "Русский", english: "Russian" }
  ];

  var RTL = { ar: 1, fa: 1, he: 1, ur: 1 };
  var STORE = "mm_lang";
  var VERSION = "22";

  var CODES = {};
  LANGS.forEach(function (l) { CODES[l.code] = l; });

  /* ── which language ───────────────────────────────────────────────────────
     A saved choice always wins. Otherwise we follow the browser, but only if
     we carry that language — we never guess. */
  function detect() {
    var saved = null;
    try { saved = localStorage.getItem(STORE); } catch (e) {}
    if (saved && CODES[saved]) return saved;

    var list = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i] || "").slice(0, 2).toLowerCase();
      if (CODES[code]) return code;
    }
    return "en";
  }

  var lang = detect();
  var dict = {};

  /* Expose early so the dictionary file can hand us its table. */
  var text = {};

  var MM = window.MMi18n = {
    lang: lang,
    langs: LANGS,
    dict: dict,
    text: text,

    /* Markup translations, keyed by hash of the English source. */
    register: function (code, table) {
      if (code === lang) { for (var k in table) dict[k] = table[k]; }
    },

    /* Strings that scripts build at runtime — the chat answers, the package
       names — keyed by the English sentence itself, because there is no
       element to hang a hash on. */
    registerText: function (code, table) {
      if (code === lang) { for (var k in table) text[k] = table[k]; }
    },

    /* MMi18n.t("Is it safe?") -> "Güvenli mi?"  Falls back to the English it
       was given, so a missing entry degrades to the original sentence rather
       than to a blank. */
    t: function (s) {
      return (lang !== "en" && text[s]) || s;
    }
  };

  /* ── hide the page for the split second before the swap ───────────────────
     Only for non-English visitors, and only ever for a moment: a failsafe
     reveals the page regardless if anything goes wrong, so a broken
     dictionary can never leave someone staring at a blank screen. */
  if (lang !== "en") {
    var root = document.documentElement;
    root.className += " i18n-boot";
    var st = document.createElement("style");
    st.textContent = ".i18n-boot body{visibility:hidden}";
    document.head.appendChild(st);
    setTimeout(function () { root.className = root.className.replace(/\s*i18n-boot/, ""); }, 1600);

    /* Synchronous on purpose. The parser is still in <head>, so the table is
       in memory before the body exists — no flash, no race with the hero
       animation, which splits the headline letter by letter and would
       otherwise fight a later swap. */
    document.write('<script src="/js/lang/' + lang + '.js?v=' + VERSION + '"><\/script>');
  }

  /* ── applying ─────────────────────────────────────────────────────────────
     Safe to call as often as you like; each element is only ever touched when
     the dictionary actually has something better than what is on screen. */
  var done = false;

  function apply() {
    if (!document.body) return;

    if (lang !== "en") {
      var nodes = document.querySelectorAll("[data-i18n]");
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i], v = dict[el.getAttribute("data-i18n")];
        if (v != null && el.getAttribute("data-i18n-done") !== lang) {
          el.innerHTML = v;
          el.setAttribute("data-i18n-done", lang);
        }
      }
      var attrs = document.querySelectorAll("[data-i18n-attr]");
      for (var j = 0; j < attrs.length; j++) {
        var e2 = attrs[j], spec = e2.getAttribute("data-i18n-attr").split(",");
        for (var s = 0; s < spec.length; s++) {
          var bits = spec[s].split(":"), t = dict[bits[1]];
          if (t != null) e2.setAttribute(bits[0], t);
        }
      }
    }

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", RTL[lang] ? "rtl" : "ltr");
    document.documentElement.className =
      document.documentElement.className.replace(/\s*i18n-boot/, "");

    if (!done) { done = true; mountPicker(); mountNotice(); }
    syncPicker();
  }

  MM.apply = apply;

  MM.set = function (code) {
    if (!CODES[code] || code === lang) return;
    try { localStorage.setItem(STORE, code); } catch (e) {}
    location.reload();          // cleanest possible swap: nothing half-translated
  };

  /* ── the picker ───────────────────────────────────────────────────────────
     Built here rather than pasted into 37 files, so the list can never drift
     from page to page. Deliberately a native <select>: it is the control every
     phone and screen reader already knows, and it opens as a full-screen list
     on mobile — which matters for the older patients this site is for. */
  /* Styles travel with the component. The picker and the notice are injected
     into pages that load five different stylesheets between them; shipping the
     CSS here is the only way they cannot end up unstyled on one of them. */
  var CSS =
    ".lang-pick{display:inline-flex;align-items:center;gap:7px;position:relative;min-height:44px}" +
    ".lang-pick svg{width:18px;height:18px;opacity:.85;flex:none}" +
    ".lang-pick__label{font:500 15px/1 var(--sans,system-ui,sans-serif);letter-spacing:.02em;" +
      "color:currentColor;pointer-events:none;white-space:nowrap}" +
    ".lang-pick select{position:absolute;inset:0;width:100%;height:100%;min-height:44px;" +
      "opacity:0;cursor:pointer;font-size:16px}" +   /* 16px stops iOS zooming on focus */
    ".lang-pick:focus-within{outline:2px solid currentColor;outline-offset:4px;border-radius:6px}" +
    ".lang-pick--float{position:fixed;right:14px;bottom:14px;z-index:9999;background:var(--sea-deep,#06333B);" +
      "color:#fff;padding:10px 16px;border-radius:999px;box-shadow:0 6px 24px rgba(0,0,0,.28)}" +

    /* Matches the site's own callout idiom — .callout in true-cost.css and
       .note in preview.css both use an even hairline border over a tinted
       ground. No side accent: the heaviest rule anywhere on the site is 3px,
       and every other border-left here is a 1px divider. */
    ".i18n-notice{display:flex;align-items:center;gap:16px;flex-wrap:wrap;" +
      "margin:0 0 34px;padding:18px 22px;border:1px solid rgba(18,112,123,.22);" +
      "border-radius:12px;background:rgba(18,112,123,.05)}" +
    ".i18n-notice svg{width:26px;height:26px;color:var(--teal,#12707B);flex:none}" +
    ".i18n-notice p{margin:0;flex:1 1 300px;display:flex;flex-direction:column;gap:4px}" +
    ".i18n-notice strong{font:600 17px/1.4 var(--sans,system-ui,sans-serif);color:var(--sea-deep,#06333B)}" +
    ".i18n-notice span{font:400 16px/1.55 var(--sans,system-ui,sans-serif);opacity:.85}" +
    ".i18n-notice__cta{display:inline-flex;align-items:center;min-height:46px;padding:0 22px;" +
      "border-radius:999px;background:var(--teal,#12707B);color:#fff;text-decoration:none;" +
      "font:600 16px/1 var(--sans,system-ui,sans-serif);white-space:nowrap}" +
    ".i18n-notice__cta:hover,.i18n-notice__cta:focus{background:var(--sea-deep,#06333B)}" +
    "@media(prefers-color-scheme:dark){.i18n-notice strong{color:inherit}}";

  function mountStyles() {
    if (document.getElementById("i18n-css")) return;
    var s = document.createElement("style");
    s.id = "i18n-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function mountPicker() {
    mountStyles();
    var host = document.querySelector(".lang-pick");

    if (!host) {
      var header = document.querySelector("header");
      host = document.createElement("div");
      host.className = "lang-pick";
      if (header) header.appendChild(host);
      else { host.className = "lang-pick lang-pick--float"; document.body.appendChild(host); }
    }

    host.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>' +
      '<label class="lang-pick__label" for="langSelect">' + (CODES[lang] || CODES.en).name + '</label>' +
      '<select id="langSelect" aria-label="Choose your language"></select>';

    var sel = host.querySelector("#langSelect");
    LANGS.forEach(function (l) {
      var o = document.createElement("option");
      o.value = l.code;
      /* Each language is written in its own script — someone looking for
         Türkçe is not helped by the word "Turkish". */
      o.textContent = l.name;
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () { MM.set(sel.value); });
  }

  function syncPicker() {
    var sel = document.getElementById("langSelect");
    if (sel) sel.value = lang;
    var lbl = document.querySelector(".lang-pick__label");
    if (lbl) lbl.textContent = (CODES[lang] || CODES.en).name;
  }

  /* ── the honest notice on English-only pages ──────────────────────────────
     The long guides stay in English on purpose: they are written to be found
     in English search and quoted by AI assistants, and machine-translating
     medical detail and prices is how people get hurt. Rather than silently
     serving a wall of English to someone reading in Spanish, we say so in
     their language and offer a human who speaks it. */
  var NOTICE = {
    es: ["Esta guía está disponible solo en inglés.",
         "¿Prefiere leerla en español? Escríbanos por WhatsApp y se la explicamos.",
         "Preguntar en español"],
    fr: ["Ce guide n'est disponible qu'en anglais.",
         "Vous préférez le français ? Écrivez-nous sur WhatsApp et nous vous l'expliquons.",
         "Poser une question en français"],
    de: ["Dieser Ratgeber liegt nur auf Englisch vor.",
         "Lieber auf Deutsch? Schreiben Sie uns auf WhatsApp, wir erklären es Ihnen.",
         "Auf Deutsch fragen"],
    tr: ["Bu rehber yalnızca İngilizce olarak mevcuttur.",
         "Türkçe mi tercih edersiniz? WhatsApp'tan yazın, size anlatalım.",
         "Türkçe sorun"],
    ru: ["Это руководство доступно только на английском языке.",
         "Предпочитаете русский? Напишите нам в WhatsApp, и мы всё объясним.",
         "Спросить по-русски"]
  };

  function mountNotice() {
    if (lang === "en") return;
    if (document.body.getAttribute("data-i18n-scope") !== "article") return;
    if (document.querySelector(".i18n-notice")) return;

    var copy = NOTICE[lang];
    if (!copy) return;

    /* The notice promises WhatsApp, so it has to go to WhatsApp. Scraping the
       page for a link put the guides — which carry no WhatsApp button — on
       /ask.html while still saying "message us on WhatsApp". The number is the
       same one used across the site, and the opening line is prefilled in the
       reader's own language so whoever answers knows immediately. */
    var OPENER = {
      es: "Hola MedMatch Global, tengo una pregunta y prefiero el español.",
      fr: "Bonjour MedMatch Global, j'ai une question et je préfère le français.",
      de: "Hallo MedMatch Global, ich habe eine Frage und bevorzuge Deutsch.",
      tr: "Merhaba MedMatch Global, bir sorum var ve Türkçe tercih ediyorum.",
      ru: "Здравствуйте, MedMatch Global! У меня вопрос, и я предпочитаю русский."
    };
    var href = "https://wa.me/14375951735?text=" +
               encodeURIComponent(OPENER[lang] || OPENER.en || "");

    var box = document.createElement("aside");
    box.className = "i18n-notice";
    box.setAttribute("role", "note");
    box.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>' +
      '<p><strong>' + copy[0] + '</strong><span>' + copy[1] + '</span></p>' +
      '<a class="i18n-notice__cta" href="' + href + '">' + copy[2] + '</a>';

    var anchor = document.querySelector("main") || document.querySelector("article");
    if (anchor) anchor.insertBefore(box, anchor.firstChild);
    else document.body.appendChild(box);
  }

  /* Run as early as the body allows. main.js also calls apply() before it
     splits the headline into letters, so the animation animates the
     translated words rather than the English ones. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
