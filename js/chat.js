/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — concierge chat widget
   Vanilla JS, no external libraries. Keyword-routed FAQ answers
   with links out to WhatsApp / email / the quote form.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* Everything this widget says is built in JavaScript, so the page tagger
     never saw it and it used to stay English on a translated page. t() looks
     the sentence up in the visitor's language and falls back to the English
     it was handed. */
  function t(s) { return (window.MMi18n && window.MMi18n.t) ? window.MMi18n.t(s) : s; }
  function lang() { return (window.MMi18n && window.MMi18n.lang) || "en"; }

  var WHATSAPP_URL = "https://wa.me/14375951735?text=Hello%20MedMatch%20Global%2C%20I%27d%20like%20a%20free%20quote.";
  var EMAIL_URL = "mailto:medmatchglobal@gmail.com";

  var ANSWERS = {
    // Keep these in step with the "from" figures on index.html. Dental, knee and
    // hair are genuine all-inclusive packages; rhinoplasty is a hospital-list
    // price with the hotel quoted separately, so it cannot be described the same way.
    prices: "Dental implants are $550 each and a full smile makeover is from $4,050, knee surgery from $3,000 and hair transplants from $3,200 — fixed and all-inclusive of surgery, hospital, hotel, transfers and aftercare. Rhinoplasty is from $3,750: the fixed hospital price plus our flat $300 coordination fee, with your hotel quoted separately. Typical savings are 50–70% versus U.S. prices.",
    safety: "Türkiye has one of the largest groups of JCI-accredited hospitals outside the U.S. — the same standard leading American hospitals hold. We only work with board-certified surgeons, and you meet yours on video before paying anything.",
    how: "You start with a free video consultation, then receive one fixed all-inclusive quote in writing. Once you accept, we handle your hospital, hotel, transfers and a personal care coordinator from arrival to aftercare back home.",
    duration: "It depends on the procedure: hair transplants need 2–4 days, dental work 5–7 days, rhinoplasty 7–8 days, and knee surgery 10–14 days including physiotherapy.",
    doctors: "You'll know your surgeon by name and meet them on video before paying anything — credentials included.",
    visa: "Most U.S. and Canadian passport holders can currently enter Türkiye without a visa for short stays. We confirm the exact requirements for your passport as part of your travel plan.",
    fallback: "Great question — the fastest way to get a personal answer is WhatsApp. A real coordinator replies, usually within minutes."
  };

  var CHIPS = [
    { label: "Prices & treatments", key: "prices" },
    { label: "Is it safe?", key: "safety" },
    { label: "How it works", key: "how" },
    { label: "How long do I stay?", key: "duration" },
    { label: "Talk to a human", key: "fallback" }
  ];

  /* Routing the typed question. The English patterns alone meant a Spanish
     visitor typing "precio" or a Turk typing "fiyat" always fell through to
     the generic answer, which reads as the widget ignoring them. Each language
     carries its own words, and English is always also matched because plenty
     of people switch mid-sentence. */
  var KEYWORDS = {
    en: [
      { key: "prices",   test: /price|cost|how much|expensive|fee/i },
      { key: "safety",   test: /safe|safety|risk|danger|accredit/i },
      { key: "duration", test: /long|stay|days|time|how many/i },
      { key: "doctors",  test: /doctor|surgeon|who/i },
      { key: "visa",     test: /visa|passport|entry/i },
      { key: "how",      test: /how.*work|process|step/i }
    ],
    es: [
      { key: "prices",   test: /precio|coste|costo|cu[áa]nto|caro|tarifa|presupuesto/i },
      { key: "safety",   test: /segur|riesgo|peligro|acredit|fiable/i },
      { key: "duration", test: /cu[áa]nto tiempo|d[íi]as|dura|estancia|noches/i },
      { key: "doctors",  test: /m[ée]dico|cirujano|doctor|qui[ée]n/i },
      { key: "visa",     test: /visado|visa|pasaporte|entrada/i },
      { key: "how",      test: /c[óo]mo funciona|proceso|paso/i }
    ],
    fr: [
      { key: "prices",   test: /prix|co[ûu]t|combien|cher|tarif|devis/i },
      { key: "safety",   test: /s[ûu]r|s[ée]curit|risque|danger|accr[ée]dit/i },
      { key: "duration", test: /combien de temps|jours|dur[ée]e|s[ée]jour|nuits/i },
      { key: "doctors",  test: /m[ée]decin|chirurgien|docteur|qui/i },
      { key: "visa",     test: /visa|passeport|entr[ée]e/i },
      { key: "how",      test: /comment.*march|processus|[ée]tape/i }
    ],
    de: [
      { key: "prices",   test: /preis|kosten|wie viel|teuer|geb[üu]hr|angebot/i },
      { key: "safety",   test: /sicher|risiko|gefahr|akkredit/i },
      { key: "duration", test: /wie lange|tage|dauer|aufenthalt|n[äa]chte/i },
      { key: "doctors",  test: /arzt|[äa]rzt|chirurg|wer/i },
      { key: "visa",     test: /visum|reisepass|einreise/i },
      { key: "how",      test: /wie.*funktion|ablauf|schritt/i }
    ],
    tr: [
      { key: "prices",   test: /fiyat|[üu]cret|ne kadar|maliyet|pahal[ıi]|teklif/i },
      { key: "safety",   test: /g[üu]venli|risk|tehlike|akredit/i },
      { key: "duration", test: /ne kadar s[üu]r|g[üu]n|kal[ıi][şs]|gece|s[üu]re/i },
      { key: "doctors",  test: /doktor|cerrah|hekim|kim/i },
      { key: "visa",     test: /vize|pasaport|giri[şs]/i },
      { key: "how",      test: /nas[ıi]l|s[üu]re[çc]|ad[ıi]m/i }
    ]
  };

  function matchers() {
    var own = KEYWORDS[lang()] || [];
    return own.concat(KEYWORDS.en);
  }

  var launcher, panel, body, quickWrap, form, input;
  var isOpen = false;

  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function addBubble(text, isUser) {
    var b = el("div", "chat-bubble" + (isUser ? " chat-bubble--user" : ""));
    if (isUser) b.textContent = text; // user input is never treated as HTML
    else b.innerHTML = text;
    body.appendChild(b);
    scrollToBottom();
    return b;
  }

  function addActionChips() {
    var wrap = el("div", "chat-chips");

    var wa = el("a", "chat-chip chat-chip--action", t("💬 WhatsApp us"));
    wa.href = WHATSAPP_URL;
    wa.target = "_blank";
    wa.rel = "noopener";
    wrap.appendChild(wa);

    var em = el("a", "chat-chip chat-chip--action", t("Email us"));
    em.href = EMAIL_URL;
    wrap.appendChild(em);

    var quote = el("button", "chat-chip chat-chip--action", t("Get my free quote"));
    quote.type = "button";
    quote.addEventListener("click", function () {
      closePanel();
      var target = document.querySelector("#invitation");
      if (!target) return;
      if (window.lenis) window.lenis.scrollTo(target, { offset: -64, duration: 1.4 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
    wrap.appendChild(quote);

    body.appendChild(wrap);
    scrollToBottom();
  }

  function answerFor(key) {
    return t(ANSWERS[key] || ANSWERS.fallback);
  }

  function respond(key, userLabel) {
    if (userLabel) addBubble(userLabel, true);
    addBubble(answerFor(key));
    addActionChips();
  }

  function buildLauncher() {
    launcher = el("button", "chat-launcher");
    launcher.type = "button";
    launcher.setAttribute("aria-label", t("Open MedMatch concierge chat"));
    launcher.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' +
      "</svg>";
    launcher.addEventListener("click", togglePanel);
    document.body.appendChild(launcher);
  }

  function buildPanel() {
    panel = el("div", "chat-panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", t("MedMatch concierge chat"));

    var header = el("div", "chat-panel__header");
    header.innerHTML =
      "<div><h3>MedMatch Concierge</h3><p>" + t("Typically replies in minutes on WhatsApp") + "</p></div>";
    var closeBtn = el("button", "chat-panel__close", "&times;");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", t("Close chat"));
    closeBtn.addEventListener("click", closePanel);
    header.appendChild(closeBtn);
    panel.appendChild(header);

    body = el("div", "chat-panel__body");
    panel.appendChild(body);

    quickWrap = el("div", "chat-panel__quick");
    CHIPS.forEach(function (c) {
      var chip = el("button", "chat-chip", t(c.label));
      chip.type = "button";
      chip.addEventListener("click", function () { respond(c.key, t(c.label)); });
      quickWrap.appendChild(chip);
    });
    panel.appendChild(quickWrap);

    form = el("form", "chat-panel__form");
    input = el("input");
    input.type = "text";
    input.placeholder = t("Type your question…");
    input.setAttribute("aria-label", t("Type your question"));
    var sendBtn = el("button");
    sendBtn.type = "submit";
    sendBtn.setAttribute("aria-label", t("Send"));
    sendBtn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>';
    form.appendChild(input);
    form.appendChild(sendBtn);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      var match = matchers().find(function (k) { return k.test.test(text); });
      respond(match ? match.key : "fallback", text);
      input.value = "";
    });
    panel.appendChild(form);

    document.body.appendChild(panel);

    // greeting
    addBubble(t("Hello — I'm the MedMatch concierge. What would you like to know?"));
  }

  function openPanel() {
    isOpen = true;
    panel.classList.add("is-open");
    launcher.setAttribute("aria-expanded", "true");
    setTimeout(function () { input.focus(); }, 300);
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove("is-open");
    launcher.setAttribute("aria-expanded", "false");
  }

  function togglePanel() {
    if (isOpen) closePanel();
    else openPanel();
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) closePanel();
  });

  function init() {
    buildLauncher();
    buildPanel();
    launcher.setAttribute("aria-expanded", "false");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
