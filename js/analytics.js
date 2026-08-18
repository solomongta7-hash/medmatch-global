/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — ANALYTICS (Microsoft Clarity)

   ⚡ TO TURN THIS ON: paste your Clarity project ID below.
   Get it at https://clarity.microsoft.com → sign in → "Add new
   project" → site URL medmatchglobal.info → open Settings →
   "Install tracking code" → "Install manually". The ID is the
   short string in that snippet (looks like "abcd1234ef").

   The project ID is a public value — safe to commit, it appears
   in the page source on every site that uses Clarity.
   NEVER put an API token from Clarity's Data Export settings here.

   Until the ID is filled in, this file does nothing at all.

   Free tier: no traffic limit, no sampling, no project limit.

   WHY THE ID LIVES HERE AND NOT IN js/config.js: only advisor-hub
   and hub-portal load config.js, so it could not be read from the
   other pages. This file is the single edit point.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── EDIT HERE ────────────────────────────────────────────── */
  var CLARITY_PROJECT_ID = "xrpsi5sh4o";
  /* ─────────────────────────────────────────────────────────── */

  /* Regions never sent to Clarity.

     Patients type contact details and medical history into these.
     Clarity masks <input> and <textarea> *values* by default, but
     these attributes extend the masking to the surrounding text,
     chosen options and dynamically inserted content — so nothing a
     patient enters about their health leaves the page.

     Add a selector here before adding any new form that collects
     patient information. */
  var MASK_SELECTORS = [
    "#inviteForm",  // homepage lead form — name, email, phone, free-text history
    "#applyForm",   // advisor-hub application — name, email, phone, free text
    "#joinForm",    // blog email capture
    ".chat-panel",  // chat widget, built at runtime by js/chat.js

    /* book.html and ask.html carried none of the four selectors above,
       and Clarity's automatic masking did not cover them either: it
       masks what is TYPED into inputs and dropdowns, which cannot be
       switched off, but it does not mask what the page RENDERS. On
       these two pages the sensitive part is not typed — it is chosen
       and then drawn back onto the page as text and button states. */
    "#questions",   // book.html — the nine questions and which answers were picked
    "#result",      // book.html — the verdict (READY / CLINICAL REVIEW / OUT OF REGION)
    "#pt",          // ask.html — treatment picker: Teeth / Hair / Nose / Knee

    /* preview.html — the patient's own face, live camera and simulated
       result. The photo itself never leaves the device, and a session
       recording must not become the exception that carries it off. The
       graft estimate is masked for the same reason: it is a number
       derived from their scalp. */
    ".cam",         // live camera feed and the framing overlay
    ".stage",       // the before/after canvases
    "#readout"      // hairline plan — estimated graft count
  ];

  /* Local dev must not pollute real session data. serve.ps1 runs on
     localhost:5581, and pages are sometimes opened straight off disk. */
  function isLocal() {
    var h = location.hostname;
    return (
      location.protocol === "file:" ||
      h === "" ||
      h === "localhost" ||
      h === "127.0.0.1" ||
      h === "::1" ||
      /^192\.168\./.test(h) ||
      /^10\./.test(h) ||
      /\.local$/.test(h)
    );
  }

  /* Honour browser opt-outs. Global Privacy Control is legally
     binding under the CCPA for California visitors, and a good
     default everywhere given what this site is about. */
  function optedOut() {
    return (
      navigator.globalPrivacyControl === true ||
      navigator.doNotTrack === "1" ||
      window.doNotTrack === "1" ||
      navigator.msDoNotTrack === "1"
    );
  }

  function maskWithin(root) {
    MASK_SELECTORS.forEach(function (sel) {
      var nodes = root.querySelectorAll ? root.querySelectorAll(sel) : [];
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].setAttribute("data-clarity-mask", "true");
      }
    });
  }

  /* The chat panel is appended to <body> after this script runs, so
     watch for it rather than relying on script order. */
  function watchForLateNodes() {
    if (!window.MutationObserver) return;
    var seen = 0;
    var observer = new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          if (added[j].nodeType !== 1) continue;
          maskWithin(document);
          if (document.querySelector(".chat-panel")) {
            observer.disconnect();
            return;
          }
        }
      }
      /* Stop watching after the page has settled either way. */
      if (++seen > 50) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { observer.disconnect(); }, 15000);
  }

  function applyMasking() {
    maskWithin(document);
    watchForLateNodes();
  }

  function loadClarity(id) {
    /* Microsoft Clarity's official loader, with the project ID
       supplied from the constant above rather than hard-coded. */
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", id);
  }

  if (!CLARITY_PROJECT_ID) return;   // not configured yet — stay inert
  if (isLocal()) return;             // local dev
  if (optedOut()) return;            // visitor asked not to be tracked

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyMasking);
  } else {
    applyMasking();
  }

  loadClarity(CLARITY_PROJECT_ID);
})();
