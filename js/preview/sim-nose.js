/* Rhinoplasty preview — geometric only.

   Three sliders, matching the three things a surgeon actually discusses
   at a consultation: the dorsum (hump), the alar width, and the tip.
   Nothing here invents skin or texture; it only moves the patient's own
   pixels, which is both more honest and much harder to get visibly
   wrong.

   The ceilings on each slider are set to the outer edge of what primary
   rhinoplasty realistically achieves, expressed as a fraction of
   interocular distance so they hold at any photo size. A slider that
   can produce a nose no surgeon could build is a slider that generates
   a complaint later. */

import { IDX, pt, mid, faceScale, polygon } from "./face.js";
import { warp, borderAnchors } from "./warp.js";

/* Maximum displacement at slider = 1, as a fraction of eye-to-eye width. */
const MAX = {
  hump:  0.030,   // dorsum pulled back toward the nasion-tip line
  width: 0.055,   // each alar wing pulled toward the midline
  tip:   0.038    // tip lifted and refined
};

/**
 * @param {ImageData} src
 * @param {Array} lm
 * @param {{hump:number,width:number,tip:number}} opts  each 0..1
 */
export function applyNose(src, lm, opts) {
  const hump  = opts.hump  ?? 0;
  const width = opts.width ?? 0;
  const tip   = opts.tip   ?? 0;
  if (hump <= 0 && width <= 0 && tip <= 0) return null;

  const S = faceScale(lm);
  if (!S) return null;

  const controls = [];
  const nasion = pt(lm, IDX.nasion);
  const tipPt  = pt(lm, IDX.noseTip);

  /* ── dorsum ────────────────────────────────────────────────────────
     A hump is the bridge bowing forward of the straight line from the
     nasion to the tip. Reduction is that bow being pulled back onto the
     line — which in a front-on photo shows up as the bridge narrowing
     and its shadow softening, not as a silhouette change. Worth being
     honest with the patient about: profile is where this operation
     shows, and a selfie does not have one. */
  if (hump > 0) {
    const sigma = S * 0.16;
    IDX.bridge.forEach((idx, i) => {
      const p = pt(lm, idx);
      const t = (i + 1) / (IDX.bridge.length + 1);
      const online = {
        x: nasion.x + (tipPt.x - nasion.x) * t,
        y: nasion.y + (tipPt.y - nasion.y) * t
      };
      /* Strongest in the middle of the bridge, tapering at both ends. */
      const k = Math.sin(Math.PI * t) * hump * MAX.hump * S;
      const dx = online.x - p.x, dy = online.y - p.y;
      const len = Math.hypot(dx, dy) || 1;
      controls.push({
        ax: p.x, ay: p.y,
        bx: p.x + (dx / len) * k,
        by: p.y + (dy / len) * k,
        sigma
      });
    });
  }

  /* ── alar width ────────────────────────────────────────────────────
     Both wings move toward the nasal midline. The midline is taken from
     nasion-to-subnasale rather than image-vertical, so a head tilted in
     the photo still narrows along the correct axis. */
  if (width > 0) {
    const under = pt(lm, IDX.noseUnder);
    const axis = { x: under.x - nasion.x, y: under.y - nasion.y };
    const alen = Math.hypot(axis.x, axis.y) || 1;
    /* perpendicular to the nose axis */
    const nx = -axis.y / alen, ny = axis.x / alen;
    const k = width * MAX.width * S;
    const sigma = S * 0.13;

    const pairs = [
      [IDX.alarOuterL, IDX.alarOuterR, 1.0],
      [IDX.alarL,      IDX.alarR,      0.72],
      [IDX.nostrilL,   IDX.nostrilR,   0.62],
      [IDX.alarCreaseL,IDX.alarCreaseR,0.85]
    ];

    for (const [li, ri, scale] of pairs) {
      const L = pt(lm, li), R = pt(lm, ri);
      const centre = mid(L, R);
      /* Sign the perpendicular per side, so each wing moves inward
         regardless of which way the head is turned. */
      const sL = Math.sign((L.x - centre.x) * nx + (L.y - centre.y) * ny) || -1;
      const sR = Math.sign((R.x - centre.x) * nx + (R.y - centre.y) * ny) || 1;
      controls.push({
        ax: L.x, ay: L.y,
        bx: L.x - nx * k * scale * sL, by: L.y - ny * k * scale * sL, sigma
      });
      controls.push({
        ax: R.x, ay: R.y,
        bx: R.x - nx * k * scale * sR, by: R.y - ny * k * scale * sR, sigma
      });
    }
  }

  /* ── tip ───────────────────────────────────────────────────────────
     Rotation upward along the nose axis plus a small inward pinch, which
     is what tip refinement looks like from the front. */
  if (tip > 0) {
    const under = pt(lm, IDX.noseUnder);
    const axis = { x: tipPt.x - under.x, y: tipPt.y - under.y };
    const alen = Math.hypot(axis.x, axis.y) || 1;
    const ux = axis.x / alen, uy = axis.y / alen;
    const k = tip * MAX.tip * S;
    const sigma = S * 0.11;

    controls.push({
      ax: tipPt.x, ay: tipPt.y,
      bx: tipPt.x + ux * k, by: tipPt.y + uy * k, sigma
    });
    /* Bring the supratip in slightly so the tip reads as narrower, not
       just higher. */
    const st = pt(lm, IDX.bridge[IDX.bridge.length - 1]);
    controls.push({
      ax: st.x, ay: st.y,
      bx: st.x + ux * k * 0.35, by: st.y + uy * k * 0.35, sigma
    });
  }

  if (!controls.length) return null;

  /* ── anchors ───────────────────────────────────────────────────────
     Face outline, eye corners and mouth corners are pinned. Without the
     eye anchors in particular, narrowing the nose drags the inner
     canthi with it and the eyes drift together — the single most common
     tell in a bad nose filter. */
  const anchorSigma = S * 0.30;
  const anchors = polygon(lm, IDX.oval).map(p => ({ ...p, sigma: anchorSigma }));

  [IDX.eyeLInner, IDX.eyeRInner, IDX.eyeLOuter, IDX.eyeROuter,
   IDX.mouthL, IDX.mouthR, IDX.chin].forEach(i => {
    const p = pt(lm, i);
    anchors.push({ x: p.x, y: p.y, sigma: S * 0.17 });
  });

  anchors.push(...borderAnchors(src.width, src.height, S * 0.9));

  return warp(src, controls, anchors);
}
