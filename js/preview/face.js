/* Face detection wrapper.

   Everything here runs on-device via MediaPipe's WASM build, which is
   vendored in ../vendor. Nothing is fetched from a CDN and no image
   ever reaches a network call — that is a deliberate product decision,
   not an implementation detail. A patient photographing their own mouth
   is handing over health information, and the only version of this tool
   that is safe to put in an ad is the one where the photo physically
   cannot leave the handset. */

import { FilesetResolver, FaceLandmarker }
  from "../../vendor/mediapipe/vision_bundle.mjs";

let landmarker = null;

export async function initFace() {
  if (landmarker) return landmarker;
  /* Resolved against this module rather than the page, so the tool keeps
     working wherever the HTML ends up — /preview.html at the site root,
     or a subfolder, or the test harness. */
  const wasmDir = new URL("../../vendor/mediapipe/wasm", import.meta.url).href;
  const modelUrl = new URL("../../models/face_landmarker.task", import.meta.url).href;

  const fileset = await FilesetResolver.forVisionTasks(wasmDir);
  landmarker = await FaceLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: modelUrl },
    runningMode: "IMAGE",
    numFaces: 1,
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: false
  });
  return landmarker;
}

/** Detect on a canvas/image/video. Returns pixel-space points or null. */
export function detect(source, w, h) {
  if (!landmarker) return null;
  const res = landmarker.detect(source);
  if (!res.faceLandmarks || !res.faceLandmarks.length) return null;
  return res.faceLandmarks[0].map(p => ({ x: p.x * w, y: p.y * h, z: p.z }));
}

/* ── Landmark indices (MediaPipe FaceMesh, 468 points) ───────────────
   Named rather than inlined, because a bare "278" in a warp expression
   is unreadable and impossible to review. */

export const IDX = {
  /* outline of the face — used as warp anchors so effects stay local */
  oval: [10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,
         378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,
         162,21,54,103,67,109],

  /* mouth opening — the region where teeth are visible */
  lipsInner: [78,95,88,178,87,14,317,402,318,324,308,415,310,311,312,
              13,82,81,80,191],
  lipsOuter: [61,146,91,181,84,17,314,405,321,375,291,409,270,269,267,
              0,37,39,40,185],
  mouthL: 61, mouthR: 291,
  lipTopInner: 13, lipBotInner: 14,

  /* nose */
  noseTip: 4,
  noseUnder: 2,
  nasion: 168,           // bridge top, between the eyes
  bridge: [6,197,195,5],  // midline, nasion down to tip
  alarL: 129, alarR: 358,       // inner alar
  alarOuterL: 48, alarOuterR: 278, // widest points
  nostrilL: 98, nostrilR: 327,
  alarCreaseL: 64, alarCreaseR: 294,

  /* eyes — used for scale reference and as nose-warp anchors */
  eyeLOuter: 33, eyeLInner: 133,
  eyeROuter: 263, eyeRInner: 362,

  /* brows and forehead — hairline work */
  browL: [70,63,105,66,107],
  browR: [336,296,334,293,300],
  foreheadTop: 10,
  templeL: 54, templeR: 284,
  hairlineArc: [21,54,103,67,109,10,338,297,332,284,251],

  chin: 152
};

/* ── helpers ─────────────────────────────────────────────────────── */

export const pt = (lm, i) => lm[i];
export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/** Interocular distance — the stable scale reference for a face.
    Every displacement in the simulators is expressed as a fraction of
    this, so a slider means the same thing at any photo resolution or
    distance from the camera. */
export function faceScale(lm) {
  return dist(pt(lm, IDX.eyeLOuter), pt(lm, IDX.eyeROuter));
}

export function polygon(lm, indices) {
  return indices.map(i => ({ x: lm[i].x, y: lm[i].y }));
}

export function bounds(points, pad = 0) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const p of points) {
    if (p.x < x0) x0 = p.x; if (p.x > x1) x1 = p.x;
    if (p.y < y0) y0 = p.y; if (p.y > y1) y1 = p.y;
  }
  return { x0: x0 - pad, y0: y0 - pad, x1: x1 + pad, y1: y1 + pad,
           w: (x1 - x0) + pad * 2, h: (y1 - y0) + pad * 2 };
}

/** Expand a polygon outward from its centroid — used to feather masks. */
export function expand(points, factor) {
  let cx = 0, cy = 0;
  for (const p of points) { cx += p.x; cy += p.y; }
  cx /= points.length; cy /= points.length;
  return points.map(p => ({
    x: cx + (p.x - cx) * factor,
    y: cy + (p.y - cy) * factor
  }));
}

/** How open is the mouth, relative to its width.
    Below ~0.06 there is no visible tooth surface to work with and the
    dental preview would be inventing pixels out of nothing. */
export function mouthOpenRatio(lm) {
  const w = dist(pt(lm, IDX.mouthL), pt(lm, IDX.mouthR));
  const h = dist(pt(lm, IDX.lipTopInner), pt(lm, IDX.lipBotInner));
  return w > 0 ? h / w : 0;
}

/** Head yaw estimate, -1 (turned left) .. 1 (turned right), 0 = square on.
    Compares nose-tip offset against the eye midpoint. Simulations get
    unreliable past about 0.35 either way, so the camera nags first. */
export function yaw(lm) {
  const eyeMid = mid(pt(lm, IDX.eyeLOuter), pt(lm, IDX.eyeROuter));
  const s = faceScale(lm);
  return s > 0 ? (pt(lm, IDX.noseTip).x - eyeMid.x) / (s * 0.5) : 0;
}
