// Mobile audit: drives headless Chrome over every page at a phone width and
// reports what a patient on a phone would actually hit — content past the
// right edge, tap targets under 44px, type under the 12.5px floor, media
// wider than the screen, and inputs small enough to make iOS zoom on focus.
//
//   node tools/mobile-audit.mjs                 -> every page at 375px
//   node tools/mobile-audit.mjs --width 320
//   node tools/mobile-audit.mjs --shot index.html
//
// Assumes serve.ps1 is already running on :4173.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
// A Chrome already listening on the port hands back ITS viewport rather than
// the one we asked for, so a leftover browser silently reports the wrong
// width. Take a port nothing answers on, and a profile of our own.
async function freePort(from) {
  for (let p = from; p < from + 60; p++) {
    try {
      const c = AbortSignal.timeout(300);
      await fetch('http://127.0.0.1:' + p + '/json/version', { signal: c });
    } catch { return p; }
  }
  throw new Error('no free debugging port');
}
const PORT = await freePort(9347 + (process.pid % 300));
const BASE = 'http://localhost:4173';

const argv = process.argv.slice(2);
const arg = (f, d) => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : d; };
const WIDTH = +arg('--width', 375);
const HEIGHT = +arg('--height', 812);
const SHOT = arg('--shot', null);

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find(existsSync);
if (!CHROME) { console.error('Chrome not found.'); process.exit(1); }

const SKIP_DIRS = ['_archive', 'node_modules', '.git', 'vendor', 'models',
  'graphify-out', 'media', 'img', 'js', 'css', 'video', 'tools', 'favicon'];

function pages() {
  const out = [];
  const walk = (rel) => {
    for (const f of readdirSync(rel ? join(ROOT, rel) : ROOT)) {
      const r = rel ? rel + '/' + f : f;
      if (statSync(join(ROOT, r)).isDirectory()) {
        if (SKIP_DIRS.includes(f) || f.startsWith('.')) continue;
        walk(r);
      } else if (f.endsWith('.html') && !f.startsWith('google')) out.push(r);
    }
  };
  walk('');
  return out.sort();
}

const LIST = SHOT ? [SHOT] : pages();

const profile = join(HERE, '.audit-profile-' + process.pid);
const chrome = spawn(CHROME, [
  '--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile,
  '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  '--disable-background-timer-throttling', '--force-color-profile=srgb',
  'about:blank',
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function targetUrl() {
  for (let i = 0; i < 80; i++) {
    try {
      const list = await (await fetch('http://127.0.0.1:' + PORT + '/json/list')).json();
      const p = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (p) return p.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error('Chrome did not expose a debug target.');
}

const ws = new WebSocket(await targetUrl());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
  else if (m.method) events.push(m);
};
const send = (method, params = {}) => new Promise(res => {
  const n = ++id; pending.set(n, res); ws.send(JSON.stringify({ id: n, method, params }));
});

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: WIDTH, height: HEIGHT, deviceScaleFactor: 2, mobile: true,
  screenWidth: WIDTH, screenHeight: HEIGHT,
});
await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });

// Runs inside the page. Returns JSON so nothing is lost crossing the bridge.
const AUDIT = [
  '(function(){',
  // clientWidth, not innerWidth: Chrome's mobile emulation inflates innerWidth
  // when the document overflows, so innerWidth flatters exactly the pages that
  // have a problem. clientWidth is the real CSS viewport.
  '  var vw = document.documentElement.clientWidth;',
  '  var nm = function(e){ var c=(e.className&&e.className.toString?e.className.toString():"").trim().split(/\\s+/)[0];',
  '    return e.tagName.toLowerCase()+(c?"."+c:(e.id?"#"+e.id:"")); };',
  '  var vis = function(e){ var s=getComputedStyle(e);',
  '    if(s.display==="none"||s.visibility==="hidden"||+s.opacity===0) return false;',
  '    var r=e.getBoundingClientRect(); return r.width>0&&r.height>0; };',
  // an ancestor that clips or scrolls horizontally makes the overflow deliberate
  '  var inScroller = function(e){ for(var p=e.parentElement;p;p=p.parentElement){',
  '    var ox=getComputedStyle(p).overflowX;',
  '    if(ox==="auto"||ox==="scroll") return true;',
  // A clipping <body> hides the symptom rather than fixing it, and exempting it
  // would excuse every element on the page — which is how a burger sitting 9px
  // off the right edge went unreported.
  '    if(ox==="hidden"&&p!==document.body&&p!==document.documentElement) return true; } return false; };',
  '  var all = [].slice.call(document.body.querySelectorAll("*"));',
  '  var bleed=[], small=[], tiny=[], media=[], zoom=[], collide=[];',
  '  all.forEach(function(e){ if(!vis(e))return; var r=e.getBoundingClientRect();',
  '    if(r.right>vw+1 && !inScroller(e)) bleed.push(nm(e)+" \\u2192"+Math.round(r.right)); });',
  // Text that has outgrown its own box only matters if it then leaves the
  // screen or lands on the thing beside it. A big decorative word that spills a
  // little inside its own row is fine, so both tests below have to be explicit.
  '  all.forEach(function(e){ if(!vis(e))return;',
  '    if(!/^(SPAN|A|H1|H2|H3|H4|P|LABEL|BUTTON|LI|TD|STRONG|EM)$/.test(e.tagName))return;',
  '    var r=e.getBoundingClientRect(); var cs=getComputedStyle(e);',
  '    if(cs.overflow!=="visible"||cs.whiteSpace.indexOf("nowrap")<0)return;',
  '    if(e.scrollWidth<=Math.ceil(r.width)+1)return;',
  // an oversized word cropped on purpose by a clipping parent is a design, not
  // a defect — but a clip on <body> is masking, so it does not earn the pass
  '    if(inScroller(e))return;',
  '    var textRight=r.left+e.scrollWidth;',
  '    if(textRight>vw+1){ collide.push(nm(e)+" text runs to "+Math.round(textRight)+" on a "+vw+"px screen"); return; }',
  // find the flex row this sits in and see if the spill reaches the next item
  '    var node=e, row=e.parentElement;',
  '    while(row&&getComputedStyle(row).display.indexOf("flex")<0){ node=row; row=row.parentElement; }',
  '    if(!row)return;',
  '    var sibs=[].slice.call(row.children).filter(vis);',
  '    var idx=sibs.indexOf(node);',
  '    if(idx<0||idx+1>=sibs.length)return;',
  '    var next=sibs[idx+1].getBoundingClientRect();',
  '    if(textRight>next.left+1)',
  '      collide.push(nm(e)+" spills to "+Math.round(textRight)+" onto "+nm(sibs[idx+1])+" at "+Math.round(next.left)); });',
  // siblings in a flex row that have run into one another
  '  [].slice.call(document.querySelectorAll("header,.nav,.nav__right,.mobilebar,.jump,.topbar,.portal-top,.auth-top")).forEach(function(row){',
  '    var rd=getComputedStyle(row).display;',
  '    if(rd.indexOf("flex")<0&&rd.indexOf("grid")<0)return;',
  '    var ks=[].slice.call(row.children).filter(vis);',
  '    for(var i=0;i<ks.length;i++) for(var j=i+1;j<ks.length;j++){',
  '      var a=ks[i].getBoundingClientRect(), b=ks[j].getBoundingClientRect();',
  '      if(a.width===0||b.width===0)continue;',
  '      if(getComputedStyle(ks[i]).position==="absolute"||getComputedStyle(ks[j]).position==="absolute")continue;',
  '      if(a.right>b.left+1 && b.right>a.left+1 && a.bottom>b.top+1 && b.bottom>a.top+1)',
  '        collide.push(nm(ks[i])+" overlaps "+nm(ks[j])); } });',
  '  [].slice.call(document.querySelectorAll("a[href],button,select,input,[role=button],summary")).forEach(function(e){',
  '    if(!vis(e))return; var s=getComputedStyle(e); if(s.display==="inline"||s.pointerEvents==="none")return;',
  // links sitting inside running text are exempt by design
  '    if(e.tagName==="A"&&e.closest("p,li,td,.prose,.answer"))return;',
  // a small box inside a big <label> is fine — the label is the real target,
  // and a honeypot is meant to be unhittable
  '    if(e.tagName==="INPUT"){',
  '      if(/honey|hp|_gotcha/i.test((e.className||"")+" "+(e.name||"")))return;',
  '      var lab=e.closest("label");',
  '      if(lab){ var lr=lab.getBoundingClientRect(); if(lr.height>=43.5&&lr.width>=24) return; }',
  '    }',
  '    var r=e.getBoundingClientRect();',
  '    if(r.height<43.5||r.width<24) small.push(nm(e)+" "+Math.round(r.width)+"x"+Math.round(r.height)+" \\""+(e.textContent||e.value||"").trim().slice(0,16)+"\\""); });',
  '  all.forEach(function(e){ if(!vis(e))return; var t="";',
  '    for(var i=0;i<e.childNodes.length;i++) if(e.childNodes[i].nodeType===3) t+=e.childNodes[i].textContent;',
  '    t=t.trim(); if(!t)return; var fs=parseFloat(getComputedStyle(e).fontSize);',
  '    if(fs<12.4) tiny.push(nm(e)+" "+fs.toFixed(1)+"px \\""+t.slice(0,20)+"\\""); });',
  '  [].slice.call(document.querySelectorAll("img,video,iframe,table,pre")).forEach(function(e){',
  '    if(!vis(e))return; var r=e.getBoundingClientRect();',
  '    if(r.width>vw+1&&!inScroller(e)) media.push(nm(e)+" w"+Math.round(r.width)); });',
  '  [].slice.call(document.querySelectorAll("input,select,textarea")).forEach(function(e){',
  '    if(!vis(e))return; if(["checkbox","radio","range","hidden","submit","button"].indexOf(e.type)>=0)return;',
  '    var fs=parseFloat(getComputedStyle(e).fontSize); if(fs<16) zoom.push(nm(e)+" "+fs+"px"); });',
  '  var hdr=document.querySelector("header.nav,.nav,.portal-top,header");',
  '  var navH=(hdr&&getComputedStyle(hdr).position==="fixed")?Math.round(hdr.getBoundingClientRect().height):0;',
  '  var mb=document.querySelector(".mobilebar"); var bar=(mb&&vis(mb))?Math.round(mb.getBoundingClientRect().height):0;',
  '  var pad=parseFloat(getComputedStyle(document.body).paddingBottom)||0;',
  '  var brg=document.querySelector(".nav__burger,.jump__menu");',
  '  var u=function(a){return a.filter(function(v,i){return a.indexOf(v)===i;});};',
  '  return JSON.stringify({ vw:vw, scrollW:document.documentElement.scrollWidth,',
  '    bleed:u(bleed).slice(0,10), smallTaps:u(small).slice(0,10), tinyType:u(tiny).slice(0,10),',
  '    wideMedia:u(media).slice(0,6), inputsZoom:u(zoom).slice(0,6), collide:u(collide).slice(0,8),',
  '    navH:navH, barH:bar, bodyPad:pad, barCovers: bar>0 && pad<bar-4,',
  '    clippedBy: document.body.scrollWidth>vw+1 ? document.body.scrollWidth : 0,',
  '    burger: (brg&&vis(brg)) ? Math.round(brg.getBoundingClientRect().width)+"x"+Math.round(brg.getBoundingClientRect().height) : (brg?"hidden":"none") });',
  '})()',
].join('\n');

const results = [];
for (const rel of LIST) {
  events.length = 0;
  await send('Page.navigate', { url: BASE + '/' + rel });
  await sleep(2200);
  const r = await send('Runtime.evaluate', { expression: AUDIT, returnByValue: true });
  let data = {};
  try { data = JSON.parse(r.result.value); }
  catch { data = { error: String(r.result && r.result.value).slice(0, 140) }; }
  const errs = events
    .filter(e => e.method === 'Log.entryAdded' && e.params.entry.level === 'error')
    .map(e => e.params.entry.text.slice(0, 100));
  data.page = rel;
  data.consoleErrors = [...new Set(errs)].slice(0, 4);
  results.push(data);

  if (SHOT) {
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    mkdirSync(join(HERE, 'shots'), { recursive: true });
    const out = join(HERE, 'shots', rel.replace(/\//g, '_').replace('.html', '') + '-' + WIDTH + '.png');
    writeFileSync(out, Buffer.from(shot.data, 'base64'));
    console.log('shot: ' + out);
  }
}

ws.close();
chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch {}

// If the numbers below were measured at a width other than the one asked for,
// every conclusion drawn from them is wrong — so say so loudly rather than
// printing a tidy report over bad data.
const measured = [...new Set(results.map(r => r.vw).filter(Boolean))];
if (measured.length !== 1 || measured[0] !== WIDTH) {
  console.error('ABORT: asked for ' + WIDTH + 'px but the page reported ' + measured.join('/') + 'px.');
  console.error('A stale Chrome probably swallowed the launch. Close Chrome and re-run.');
  results.filter(r => r.vw !== WIDTH).slice(0, 6).forEach(r => console.error('   ' + r.page + ' -> ' + r.vw));
  process.exit(2);
}

writeFileSync(join(HERE, 'audit-' + WIDTH + '.json'), JSON.stringify(results, null, 2));

const bar = '='.repeat(58);
let findings = 0;
console.log('\nMOBILE AUDIT @ ' + WIDTH + 'px — ' + results.length + ' pages\n' + bar);
for (const r of results) {
  const lines = [];
  if (r.error) lines.push('  ! audit failed: ' + r.error);
  if (r.scrollW > r.vw + 1) lines.push('  HORIZONTAL SCROLL: page is ' + r.scrollW + 'px wide on a ' + r.vw + 'px screen');
  if (r.clippedBy) lines.push('  overflow MASKED by the body clip: content is ' + r.clippedBy + 'px on a ' + r.vw + 'px screen');
  if (r.bleed && r.bleed.length) lines.push('  past right edge (' + r.bleed.length + '): ' + r.bleed.join(', '));
  if (r.collide && r.collide.length) lines.push('  OVERLAP / spilled text (' + r.collide.length + '): ' + r.collide.join(', '));
  if (r.wideMedia && r.wideMedia.length) lines.push('  media wider than screen: ' + r.wideMedia.join(', '));
  if (r.smallTaps && r.smallTaps.length) lines.push('  tap under 44px (' + r.smallTaps.length + '): ' + r.smallTaps.join(', '));
  if (r.tinyType && r.tinyType.length) lines.push('  type under 12.5px (' + r.tinyType.length + '): ' + r.tinyType.join(', '));
  if (r.inputsZoom && r.inputsZoom.length) lines.push('  iOS zooms on focus: ' + r.inputsZoom.join(', '));
  if (r.barCovers) lines.push('  bottom bar (' + r.barH + 'px) covers content — body padding-bottom is only ' + r.bodyPad + 'px');
  if (r.consoleErrors && r.consoleErrors.length) lines.push('  console: ' + r.consoleErrors.join(' | '));
  if (lines.length) {
    findings += lines.length;
    console.log('\n' + r.page + '  [nav ' + r.navH + 'px, burger ' + r.burger + ']');
    console.log(lines.join('\n'));
  }
}
const clean = results.filter(r => !r.error && r.scrollW <= r.vw + 1
  && !(r.bleed || []).length && !(r.smallTaps || []).length && !(r.tinyType || []).length
  && !(r.wideMedia || []).length && !(r.inputsZoom || []).length && !r.barCovers
  && !(r.collide || []).length && !r.clippedBy
  && !(r.consoleErrors || []).length);
console.log('\n' + bar);
console.log('clean: ' + clean.length + '/' + results.length + ' pages    findings: ' + findings);
