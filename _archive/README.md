# _archive — private partner data (NOT published)

GitHub Pages runs Jekyll, and Jekyll never publishes folders that start with an
underscore. Everything in here stays in the repo but is **not** served on
medmatchglobal.info.

Kept here on 2026-07-11 when partner identities were masked on the public site
(advisor-only model — names, addresses and the tidy price-list page are now
shared only with a personal quote):

- `acibadem-full.html` — the original public Acıbadem price-list page (named
  campuses, addresses, specialists). The live replacement is `partner-hospital.html`.
- `medical-park-full.html` — the original Medical Park coming-soon page. The
  live replacement is `hospital-network.html`.
- `perla-doctors-section.html` — the "Dental Faculty — Perla Dental Clinics"
  block removed from `index.html` (six doctors with names, titles, bios).
- `img-doctors/` — all doctor portrait photos (filenames contain real names).
- `partners-private.js` — real partner names + street addresses that were
  masked out of `js/packages-data.js`.

To restore any of it, copy the block/file back and re-add the names.
The Acıbadem price DATA was never deleted — it still lives in
`js/packages-data.js` under the `hospital:` key (renamed from `acibadem:`).
