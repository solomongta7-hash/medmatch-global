/* Displacement-field image warping.

   Every shape change in this tool (nose narrowing, bridge straightening,
   tip rotation) is expressed as a list of control points that say
   "this landmark moves from A to B". This module turns that sparse list
   into a smooth displacement field and resamples the photo through it.

   Why a field and not a triangle mesh: a mesh built from the 468-point
   face graph gives visible seams along triangle edges as soon as the
   displacement gets past a few pixels, and every seam reads as "fake"
   in exactly the region people look hardest at. A Gaussian-weighted
   field has no edges at all, so a strong warp still degrades into
   softness rather than into faceting.

   Anchors (control points that move nowhere) are what keep the warp
   local: without them the whole photo drifts toward the average
   displacement. Callers pass the face outline and image corners as
   anchors so the effect dies out before it reaches the ears. */

/* The field is solved on a coarse lattice and bilinearly interpolated
   up to full resolution. Displacement fields built from Gaussians are
   smooth by construction, so a 6px lattice is visually identical to
   solving per-pixel and roughly 30x cheaper. */
const GRID = 6;

/**
 * @param {ImageData} src        source pixels
 * @param {Array}     controls   [{ax,ay,bx,by,sigma}] — point moves A(source) to B(destination)
 * @param {Array}     anchors    [{x,y,sigma}] — pinned points, zero displacement
 * @returns {ImageData} new image data, same dimensions
 */
export function warp(src, controls, anchors = []) {
  const { width: w, height: h } = src;
  const out = new ImageData(w, h);

  if (!controls.length) {
    out.data.set(src.data);
    return out;
  }

  /* Flatten controls + anchors into typed arrays. Anchors are just
     controls whose displacement is (0,0), so the solver has one path. */
  const n = controls.length + anchors.length;
  const px = new Float32Array(n);   // weight centre (destination side)
  const py = new Float32Array(n);
  const dx = new Float32Array(n);   // displacement to add to reach the source
  const dy = new Float32Array(n);
  const inv2s2 = new Float32Array(n);

  for (let i = 0; i < controls.length; i++) {
    const c = controls[i];
    const s = Math.max(c.sigma, 1);
    px[i] = c.bx; py[i] = c.by;
    dx[i] = c.ax - c.bx;
    dy[i] = c.ay - c.by;
    inv2s2[i] = 1 / (2 * s * s);
  }
  for (let j = 0; j < anchors.length; j++) {
    const a = anchors[j], i = controls.length + j;
    const s = Math.max(a.sigma, 1);
    px[i] = a.x; py[i] = a.y;
    dx[i] = 0; dy[i] = 0;
    inv2s2[i] = 1 / (2 * s * s);
  }

  /* Solve the lattice. */
  const gw = Math.ceil(w / GRID) + 1;
  const gh = Math.ceil(h / GRID) + 1;
  const fx = new Float32Array(gw * gh);
  const fy = new Float32Array(gw * gh);

  for (let gy = 0; gy < gh; gy++) {
    const y = gy * GRID;
    for (let gx = 0; gx < gw; gx++) {
      const x = gx * GRID;
      let ox = 0, oy = 0, den = 0;
      for (let i = 0; i < n; i++) {
        const ddx = x - px[i], ddy = y - py[i];
        /* exp() dominates the cost here. Cutting the tail at 4 sigma
           costs nothing visually (weight < 0.0003) and skips most of
           the anchor set for any given pixel. */
        const e = (ddx * ddx + ddy * ddy) * inv2s2[i];
        if (e > 8) continue;
        const wgt = Math.exp(-e);
        ox += wgt * dx[i];
        oy += wgt * dy[i];
        den += wgt;
      }
      const k = gy * gw + gx;
      if (den > 1e-6) { fx[k] = ox / den; fy[k] = oy / den; }
    }
  }

  /* Resample: for each destination pixel, look up where it came from. */
  const s = src.data, d = out.data;
  const invG = 1 / GRID;

  for (let y = 0; y < h; y++) {
    const gy = y * invG;
    const gy0 = gy | 0, ty = gy - gy0;
    const r0 = gy0 * gw, r1 = (gy0 + 1) * gw;

    for (let x = 0; x < w; x++) {
      const gx = x * invG;
      const gx0 = gx | 0, tx = gx - gx0;

      /* bilinear lookup of the displacement field */
      const a = r0 + gx0, b = r1 + gx0;
      const ox = (fx[a] * (1 - tx) + fx[a + 1] * tx) * (1 - ty)
               + (fx[b] * (1 - tx) + fx[b + 1] * tx) * ty;
      const oy = (fy[a] * (1 - tx) + fy[a + 1] * tx) * (1 - ty)
               + (fy[b] * (1 - tx) + fy[b + 1] * tx) * ty;

      const sx = x + ox, sy = y + oy;
      const o = (y * w + x) << 2;

      /* Outside the frame, fall back to the untouched pixel rather than
         to black — a black rim around a warped nose is worse than a
         slightly stiff edge. */
      if (sx < 0 || sy < 0 || sx >= w - 1 || sy >= h - 1) {
        d[o] = s[o]; d[o + 1] = s[o + 1]; d[o + 2] = s[o + 2]; d[o + 3] = s[o + 3];
        continue;
      }

      /* bilinear sample of the source photo */
      const x0 = sx | 0, y0 = sy | 0;
      const fxr = sx - x0, fyr = sy - y0;
      const i00 = (y0 * w + x0) << 2;
      const i10 = i00 + 4;
      const i01 = i00 + (w << 2);
      const i11 = i01 + 4;
      const w00 = (1 - fxr) * (1 - fyr), w10 = fxr * (1 - fyr);
      const w01 = (1 - fxr) * fyr,       w11 = fxr * fyr;

      d[o]     = s[i00]     * w00 + s[i10]     * w10 + s[i01]     * w01 + s[i11]     * w11;
      d[o + 1] = s[i00 + 1] * w00 + s[i10 + 1] * w10 + s[i01 + 1] * w01 + s[i11 + 1] * w11;
      d[o + 2] = s[i00 + 2] * w00 + s[i10 + 2] * w10 + s[i01 + 2] * w01 + s[i11 + 2] * w11;
      d[o + 3] = 255;
    }
  }

  return out;
}

/* Ring of pinned points around the image border, so the warp can never
   drag the background in from outside the frame. */
export function borderAnchors(w, h, sigma) {
  const out = [];
  const step = Math.max(w, h) / 6;
  for (let x = 0; x <= w; x += step) { out.push({ x, y: 0, sigma }, { x, y: h, sigma }); }
  for (let y = 0; y <= h; y += step) { out.push({ x: 0, y, sigma }, { x: w, y, sigma }); }
  return out;
}
