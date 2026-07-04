/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — hero scene
   A slow field of golden silk + drifting gold dust. THREE r128.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  if (typeof THREE === "undefined") return;
  var canvas = document.getElementById("silk");
  if (!canvas) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xf7f3eb, 0.028);

  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.6, 11);

  /* ── the silk: displaced plane with hand-rolled simplex noise ── */
  var silkUniforms = {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color(0xf6efe1) },
    uColorB: { value: new THREE.Color(0xe2d3b4) },
    uGold:   { value: new THREE.Color(0xc9a96a) }
  };

  var silkMat = new THREE.ShaderMaterial({
    uniforms: silkUniforms,
    side: THREE.DoubleSide,
    transparent: true,
    vertexShader: [
      "uniform float uTime;",
      "varying float vElev;",
      "varying vec2 vUv;",
      // simplex-ish noise (iq style value noise, cheap + smooth)
      "vec2 hash(vec2 p){ p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return -1.0 + 2.0 * fract(sin(p) * 43758.5453123); }",
      "float noise(in vec2 p){",
      "  const float K1 = 0.366025404; const float K2 = 0.211324865;",
      "  vec2 i = floor(p + (p.x + p.y) * K1);",
      "  vec2 a = p - i + (i.x + i.y) * K2;",
      "  vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);",
      "  vec2 b = a - o + K2; vec2 c = a - 1.0 + 2.0 * K2;",
      "  vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);",
      "  vec3 n = h*h*h*h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));",
      "  return dot(n, vec3(70.0));",
      "}",
      "void main(){",
      "  vUv = uv;",
      "  vec3 pos = position;",
      "  float t = uTime * 0.14;",
      "  float e = noise(pos.xy * 0.32 + vec2(t, t * 0.6)) * 1.15;",
      "  e += noise(pos.xy * 0.85 + vec2(-t * 0.7, t)) * 0.35;",
      "  pos.z += e;",
      "  vElev = e;",
      "  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);",
      "}"
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 uColorA; uniform vec3 uColorB; uniform vec3 uGold;",
      "varying float vElev; varying vec2 vUv;",
      "void main(){",
      "  float m = smoothstep(-1.0, 1.4, vElev);",
      "  vec3 col = mix(uColorB, uColorA, m);",
      "  col = mix(col, uGold, smoothstep(0.55, 1.35, vElev) * 0.45);",       // gold catches the ridges
      "  float edge = smoothstep(0.0, 0.24, vUv.y) * smoothstep(1.0, 0.72, vUv.y);", // fade top/bottom
      "  float alpha = edge * 0.9;",
      "  gl_FragColor = vec4(col, alpha);",
      "}"
    ].join("\n")
  });

  // silk plane retired — the Mediterranean photo carries the hero now;
  // the canvas adds only drifting sea-light sparkle (mix-blend: screen).
  var silk = new THREE.Mesh(new THREE.PlaneGeometry(34, 18, 150, 90), silkMat);
  silk.visible = false;

  /* ── gold dust ── */
  function makeSprite() {
    var c = document.createElement("canvas");
    c.width = c.height = 64;
    var ctx = c.getContext("2d");
    var g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(220, 255, 250, 1)");
    g.addColorStop(0.35, "rgba(190, 240, 235, 0.55)");
    g.addColorStop(1, "rgba(190, 240, 235, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    var tex = new THREE.CanvasTexture(c);
    return tex;
  }

  var COUNT = 700;
  var positions = new Float32Array(COUNT * 3);
  var seeds = new Float32Array(COUNT);
  for (var i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14 + 1;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    seeds[i] = Math.random() * Math.PI * 2;
  }
  var dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  var dustMat = new THREE.PointsMaterial({
    size: 0.16,
    map: makeSprite(),
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0x9fe8e0
  });
  var dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  /* ── interaction ── */
  var mouse = { x: 0, y: 0 }, target = { x: 0, y: 0 };
  window.addEventListener("mousemove", function (e) {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // main.js sets this from ScrollTrigger (0..1 over the hero)
  window.__heroScroll = 0;

  function resize() {
    var w = canvas.clientWidth || window.innerWidth;
    var h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  var clock = new THREE.Clock();
  var running = true;

  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running) { clock.getDelta(); loop(); }
  });

  function loop() {
    if (!running) return;
    requestAnimationFrame(loop);

    var t = clock.getElapsedTime();
    silkUniforms.uTime.value = reduced ? 0 : t;

    // gentle dust drift
    if (!reduced) {
      var pos = dustGeo.attributes.position.array;
      for (var i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += Math.sin(t * 0.35 + seeds[i]) * 0.0016;
        pos[i * 3]     += Math.cos(t * 0.22 + seeds[i]) * 0.0011;
      }
      dustGeo.attributes.position.needsUpdate = true;
      dust.rotation.y = t * 0.012;
    }

    // mouse parallax + scroll dolly
    mouse.x += (target.x - mouse.x) * 0.035;
    mouse.y += (target.y - mouse.y) * 0.035;
    var s = window.__heroScroll || 0;
    camera.position.x = mouse.x * 0.9;
    camera.position.y = 0.6 - mouse.y * 0.45 - s * 2.2;
    camera.position.z = 11 + s * 2.5;
    camera.lookAt(0, -0.4 - s * 1.4, 0);

    renderer.render(scene, camera);
  }
  loop();
})();
