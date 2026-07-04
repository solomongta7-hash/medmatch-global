# MedMatch Global — The Academy of Medical Travel

A luxury single-page landing site for MedMatch Global: private health-tourism
concierge matching U.S. & Canadian patients with vetted surgeons in Türkiye.

## Run locally

Any static server works. On this machine (no Node/Python):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
# → http://localhost:4173/
```

Or simply deploy the folder to Netlify / Vercel / GitHub Pages — it is pure
static HTML/CSS/JS with CDN dependencies (GSAP 3.12, Lenis 1.1, Three.js r128,
Google Fonts).

## Structure

- `index.html` — full page: hero, marquee, The Standard, Treatments
  (pinned horizontal scroll), Numbers, The Private Ledger (4 pricing
  calculators), The Passage (journey timeline), Voices (testimonials),
  Invitation (lead form), footer.
- `css/styles.css` — design system (Mediterranean edition). Palette: sea-deep
  `#06333B`, teal `#12707B`, turquoise `#2FA9A4`, aqua `#8FD6D0`, foam `#F4FAF9`,
  sand `#F2EFE7`. Type: Cormorant Garamond (display) + Jost (UI).
  Hero, interludes and Faculty portraits use Unsplash placeholder URLs — swap the
  `background-image` URLs in `index.html` for your own photography.
- `js/scene.js` — Three.js hero: noise-displaced "silk" plane + 700 gold-dust
  particles, mouse parallax, scroll dolly (reads `window.__heroScroll`).
- `js/main.js` — Lenis smooth scroll, GSAP/ScrollTrigger choreography
  (preloader, char/word reveals, horizontal pin, counters, timeline progress,
  velocity-reactive marquee, magnetic buttons, custom cursor) and the four
  calculator pricing models (`MODELS` object — all figures USD; CAD via
  `CAD_RATE = 1.37`).

## Editing prices

All calculator figures live in one place: the `MODELS` object in
`js/main.js`. Each model returns `{ tr: [low, high], us: [low, high] }` in USD.
The Türkiye figures are positioned as all-inclusive (surgery, hotel, VIP
transfers, host). Update there and the UI, bars and savings recompute
automatically.

## Notes

- The lead form is front-end only (shows a success state); wire the submit
  handler in `main.js` to a backend/Formspree/CRM when ready.
- Respects `prefers-reduced-motion`; mobile (<901px) swaps the horizontal
  treatment scroll for a vertical stack.
- Estimates are marked as indicative — keep the disclaimer visible for
  compliance.
