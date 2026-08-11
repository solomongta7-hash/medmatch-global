/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — concierge chat widget
   Vanilla JS, no external libraries. Keyword-routed FAQ answers
   with links out to WhatsApp / email / the quote form.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var WHATSAPP_URL = "https://wa.me/14375951735?text=Hello%20MedMatch%20Global%2C%20I%27d%20like%20a%20free%20quote.";
  var EMAIL_URL = "mailto:contact@medmatchglobal.info";

  var ANSWERS = {
    // Keep these in step with the "from" figures on index.html. Dental, knee and
    // hair are genuine all-inclusive packages; rhinoplasty is a hospital-list
    // price with the hotel quoted separately, so it cannot be described the same way.
    prices: "Dental veneers from $2,400, knee surgery from $3,000 and hair transplants from $3,200 — fixed and all-inclusive of surgery, hospital, hotel, transfers and aftercare. Rhinoplasty is from $3,750: the fixed hospital price plus our flat $300 coordination fee, with your hotel quoted separately. Typical savings are 50–70% versus U.S. prices.",
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

  var KEYWORDS = [
    { key: "prices", test: /price|cost|how much|expensive|fee/i },
    { key: "safety", test: /safe|safety|risk|danger|accredit/i },
    { key: "duration", test: /long|stay|days|time|how many/i },
    { key: "doctors", test: /doctor|surgeon|who/i },
    { key: "visa", test: /visa|passport|entry/i },
    { key: "how", test: /how.*work|process|step/i }
  ];

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

    var wa = el("a", "chat-chip chat-chip--action", "💬 WhatsApp us");
    wa.href = WHATSAPP_URL;
    wa.target = "_blank";
    wa.rel = "noopener";
    wrap.appendChild(wa);

    var em = el("a", "chat-chip chat-chip--action", "Email us");
    em.href = EMAIL_URL;
    wrap.appendChild(em);

    var quote = el("button", "chat-chip chat-chip--action", "Get my free quote");
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
    return ANSWERS[key] || ANSWERS.fallback;
  }

  function respond(key, userLabel) {
    if (userLabel) addBubble(userLabel, true);
    addBubble(answerFor(key));
    addActionChips();
  }

  function buildLauncher() {
    launcher = el("button", "chat-launcher");
    launcher.type = "button";
    launcher.setAttribute("aria-label", "Open MedMatch concierge chat");
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
    panel.setAttribute("aria-label", "MedMatch concierge chat");

    var header = el("div", "chat-panel__header");
    header.innerHTML =
      "<div><h3>MedMatch Concierge</h3><p>Typically replies in minutes on WhatsApp</p></div>";
    var closeBtn = el("button", "chat-panel__close", "&times;");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close chat");
    closeBtn.addEventListener("click", closePanel);
    header.appendChild(closeBtn);
    panel.appendChild(header);

    body = el("div", "chat-panel__body");
    panel.appendChild(body);

    quickWrap = el("div", "chat-panel__quick");
    CHIPS.forEach(function (c) {
      var chip = el("button", "chat-chip", c.label);
      chip.type = "button";
      chip.addEventListener("click", function () { respond(c.key, c.label); });
      quickWrap.appendChild(chip);
    });
    panel.appendChild(quickWrap);

    form = el("form", "chat-panel__form");
    input = el("input");
    input.type = "text";
    input.placeholder = "Type your question…";
    input.setAttribute("aria-label", "Type your question");
    var sendBtn = el("button");
    sendBtn.type = "submit";
    sendBtn.setAttribute("aria-label", "Send");
    sendBtn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>';
    form.appendChild(input);
    form.appendChild(sendBtn);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      var match = KEYWORDS.find(function (k) { return k.test.test(text); });
      respond(match ? match.key : "fallback", text);
      input.value = "";
    });
    panel.appendChild(form);

    document.body.appendChild(panel);

    // greeting
    addBubble("Hello — I'm the MedMatch concierge. What would you like to know?");
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
