/* What the picture is showing, in words and in money.

   Two jobs, both asked for after the first people outside the office
   tried it. First, a saved image that says only "a picture of a goal"
   tells a patient nothing about what was simulated or what it would
   cost — the description and the price are the useful part. Second,
   the whole tool was invisible to anyone using a screen reader, since
   a canvas is an empty box to assistive technology. One description
   solves both, so it is generated once here and used in the page, in
   the aria-label, and on the saved card.

   Every figure comes out of window.MM_DATA — the same file that prices
   packages.html and the homepage — using the same arithmetic that
   js/packages.js uses: treatment price, plus the 4-star hotel nights
   the package includes, plus the flat coordination fee. Nothing is
   hardcoded here, so editing packages-data.js moves these numbers too
   and the tool can never quietly drift out of step with the site. */

const D = () => (typeof window !== "undefined" ? window.MM_DATA : null);

/** Total the way packages.js totals it: clinic price + hotel + fee. */
function packageTotal(pkg) {
  const d = D();
  if (!d || !pkg || typeof pkg.price !== "number") return null;
  const hotel = pkg.hotelIncluded ? 0 : (d.hotel4PerNight || 0) * (pkg.nights || 0);
  return pkg.price + hotel + (d.coordinationFee || 0);
}

function findPackage(id) {
  const d = D();
  if (!d || !d.packages) return null;
  return d.packages.find(p => p.id === id) || null;
}

/** Hospital list items are quoted in euros and carry no hotel unless the
    line says so — the same treatment the rest of the site gives them. */
function hospitalTotal(namePrefix) {
  const d = D();
  if (!d || !d.hospital || !d.hospital.categories) return null;
  for (const cat of d.hospital.categories) {
    for (const item of cat.items) {
      if (item.n.toLowerCase().startsWith(namePrefix.toLowerCase())) {
        return {
          name: item.n,
          usd: Math.round(item.eur * (d.eurToUsd || 1)) + (d.coordinationFee || 0)
        };
      }
    }
  }
  return null;
}

export function money(usd) {
  const d = D();
  const sym = (d && d.symbols && d.symbols.USD) || "$";
  return sym + Math.round(usd).toLocaleString("en-US");
}

/* Joins a list the way a person would say it. */
function sentenceList(parts) {
  if (parts.length <= 1) return parts[0] || "";
  return parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
}

/**
 * @param {string} treatment  "dental" | "nose" | "hair"
 * @param {object} params     current slider values, 0..1
 * @param {object} [extra]    e.g. { grafts: [300, 350] } from the hair pass
 * @returns {{idle:boolean, service:string, detail:string,
 *            packageName:string|null, fromUsd:number|null, alt:string}}
 */
export function describe(treatment, params, extra) {
  const on = v => (v || 0) > 0.05;

  if (treatment === "dental") {
    const w = on(params.whiten), a = on(params.align);
    if (!w && !a) return idle("teeth");

    const bits = [];
    if (w) bits.push(params.whiten > 0.66 ? "noticeably whiter teeth" : "slightly whiter teeth");
    if (a) bits.push("reshaped upper front teeth");

    /* Any shape work is a crowns-or-veneers job, which is exactly what
       the Hollywood Smile package is — and it already includes
       whitening, so it covers the combined case too. Whitening on its
       own is the whitening package and nothing more. */
    const pkg = findPackage(a ? "hollywood-smile" : "whitening");
    const total = packageTotal(pkg);

    return {
      idle: false,
      service: a ? (w ? "Whitening and reshaping the front teeth"
                      : "Reshaping the front teeth")
                 : "Teeth whitening",
      detail: "Simulated: " + sentenceList(bits) + ".",
      packageName: pkg ? pkg.name : null,
      fromUsd: total,
      alt: "Simulated preview of " + sentenceList(bits) + "."
    };
  }

  if (treatment === "nose") {
    const bits = [];
    if (on(params.hump))  bits.push("a straighter bridge");
    if (on(params.width)) bits.push("a narrower base");
    if (on(params.tip))   bits.push("a more refined tip");
    if (!bits.length) return idle("nose");

    const h = hospitalTotal("Rhinoplasty");
    return {
      idle: false,
      service: "Rhinoplasty",
      detail: "Simulated: " + sentenceList(bits) + ".",
      packageName: h ? h.name : null,
      fromUsd: h ? h.usd : null,
      /* The hospital line has no hotel in it, and saying so is the
         difference between a quote that holds and one that surprises. */
      note: "Hospital price plus coordination. Hotel quoted separately.",
      alt: "Simulated rhinoplasty preview showing " + sentenceList(bits) + "."
    };
  }

  if (treatment === "hair") {
    if (!on(params.hairline)) return idle("hairline");
    const g = extra && extra.grafts;
    const h = hospitalTotal("FUE Hair Transplant (2-night");

    return {
      idle: false,
      service: "Hair transplant — hairline",
      detail: g && g[1]
        ? "Planned: hairline rebuilt forward, roughly " +
          g[0].toLocaleString("en-US") + "–" + g[1].toLocaleString("en-US") + " grafts."
        : "Planned: hairline rebuilt further forward.",
      packageName: h ? h.name : null,
      fromUsd: h ? h.usd : null,
      alt: "A plan drawing showing the current hairline as a dashed line and a " +
           "proposed hairline lower on the forehead" +
           (g && g[1] ? ", about " + g[0] + " to " + g[1] + " grafts." : ".")
    };
  }

  return idle("result");
}

function idle(what) {
  return {
    idle: true,
    service: "",
    detail: "Move a slider to plan your " + what + ".",
    packageName: null,
    fromUsd: null,
    alt: "Your photo, unchanged. Move a slider to see a simulated result."
  };
}
