// Verifies the deployed site, not the local copy: loads pages from
// medmatchglobal.info in headless Chrome at a phone width and re-checks the
// specific things the audit fixed.
//   node tools/live-check.mjs
import { spawn } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://medmatchglobal.info';
const WIDTH = 375, HEIGHT = 812;

async function freePort(from) {
  for (let p = from; p < from + 60; p++) {
    try { await fetch('http://127.0.0.1:' + p + '/json/version', { signal: AbortSignal.timeout(300) }); }
    catch { return p; }
  }
  throw new Error('no free port');
}
const PORT = await freePort(9500 + (process.pid % 300));
const profile = join(HERE, '.live-profile-' + process.pid);

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find(existsSync);

const chrome = spawn(CHROME, [
  '--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile,
  '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  'about:blank',
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function target() {
  for (let i = 0; i < 80; i++) {
    try {
      const l = await (await fetch('http://127.0.0.1:' + PORT + '/json/list')).json();
      const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (p) return p.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error('no target');
}
const ws = new WebSocket(await target());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
const send = (m, p = {}) => new Promise(r => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method: m, params: p })); });
const evalIn = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.value;

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: WIDTH, height: HEIGHT, deviceScaleFactor: 2, mobile: true,
  screenWidth: WIDTH, screenHeight: HEIGHT,
});
await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });

const CHECKS = [
  ['/', 'burger is on screen at full size', `(()=>{const b=document.querySelector('.nav__burger');const r=b.getBoundingClientRect();
      return r.width>=44&&r.height>=44&&r.right<=innerWidth?'ok '+Math.round(r.width)+'x'+Math.round(r.height):'FAIL '+JSON.stringify(r)})()`],
  ['/', 'burger opens the menu', `(()=>{const b=document.querySelector('#burger');b.click();const m=document.querySelector('#mmenu');
      m.getAnimations().forEach(a=>a.finish());return m.classList.contains('is-open')&&getComputedStyle(m).visibility==='visible'
      ?'ok '+m.querySelectorAll('a').length+' links':'FAIL'})()`],
  ['/', 'form fields are 16px (no iOS zoom)', `(()=>{const bad=[...document.querySelectorAll('input,select,textarea')]
      .filter(e=>{const s=getComputedStyle(e);if(s.display==='none')return false;
      if(['checkbox','radio','range','hidden','submit','button'].includes(e.type))return false;
      if(e.getBoundingClientRect().width<20)return false;return parseFloat(s.fontSize)<16;})
      .map(e=>(e.id||e.tagName)+' '+getComputedStyle(e).fontSize);return bad.length?'FAIL '+bad.join(', '):'ok'})()`],
  ['/', '"See My Price" fully tappable', `(()=>{const a=[...document.querySelectorAll('.hero__cta a')][0];const r=a.getBoundingClientRect();
      let bad=0,n=0;for(let x=r.left+8;x<r.right-8;x+=12){n++;const e=document.elementFromPoint(x,r.top+r.height/2);
      if(!(e&&(e===a||a.contains(e))))bad++;}return bad?'FAIL '+bad+'/'+n+' blocked':'ok'})()`],
  ['/', '"Ask on WhatsApp" fully tappable', `(()=>{const a=[...document.querySelectorAll('.hero__cta a')][1];const r=a.getBoundingClientRect();
      if(r.bottom>innerHeight)return 'skip below the fold on this screen';
      let bad=0,n=0;for(let x=r.left+8;x<r.right-8;x+=12){n++;const e=document.elementFromPoint(x,r.top+r.height/2);
      if(!(e&&(e===a||a.contains(e))))bad++;}return bad?'FAIL '+bad+'/'+n+' blocked':'ok'})()`],
  ['/', 'sticky bar waits for the hero', `(()=>{const b=document.querySelector('.mobilebar');
      const off=b.getBoundingClientRect().top>=innerHeight-1;
      if(!off)return 'FAIL bar is over the hero at top='+Math.round(b.getBoundingClientRect().top);
      scrollTo(0,1200);return new Promise(r=>setTimeout(()=>{const t=b.getBoundingClientRect().top;
      r(t<innerHeight-1?'ok hidden on hero, back at '+Math.round(t):'FAIL never came back');},900))})()`],
  ['/', 'no horizontal overflow', `(()=>{const w=document.documentElement.clientWidth;
      return document.body.scrollWidth<=w+1?'ok '+w+'px':'FAIL body '+document.body.scrollWidth+' vs '+w})()`],
  ['/', 'A/A active letter is visible', `(()=>{const b=document.querySelector('.textsize__btn[aria-pressed="true"]');
      const s=getComputedStyle(b.querySelector('span'));
      return s.mixBlendMode==='normal'&&s.filter==='none'?'ok '+s.color+' on '+getComputedStyle(b).backgroundColor:'FAIL '+s.mixBlendMode+'/'+s.filter})()`],
  ['/answers/dental-implants-turkey-cost-canada.html', 'read-next links are 44px', `(()=>{const a=[...document.querySelectorAll('.article-related a')];
      const bad=a.filter(x=>x.getBoundingClientRect().height<43.5);
      return a.length&&!bad.length?'ok '+a.length+' links':'FAIL '+bad.length+'/'+a.length})()`],
  ['/answers/dental-implants-turkey-cost-canada.html', 'no horizontal overflow', `(()=>{const w=document.documentElement.clientWidth;
      return document.body.scrollWidth<=w+1?'ok '+w+'px':'FAIL body '+document.body.scrollWidth+' vs '+w})()`],
  ['/true-cost.html', 'no horizontal overflow', `(()=>{const w=document.documentElement.clientWidth;
      return document.body.scrollWidth<=w+1?'ok '+w+'px':'FAIL body '+document.body.scrollWidth+' vs '+w})()`],
  ['/book.html', 'no horizontal overflow', `(()=>{const w=document.documentElement.clientWidth;
      return document.body.scrollWidth<=w+1?'ok '+w+'px':'FAIL body '+document.body.scrollWidth+' vs '+w})()`],
];

let fails = 0;
console.log('LIVE CHECK — ' + BASE + ' @ ' + WIDTH + 'px\n' + '='.repeat(58));
// Reload before every check: one of them opens the mobile menu, which covers
// the whole page, and the next check would then measure the menu, not the hero.
for (const [path, name, expr] of CHECKS) {
  await send('Page.navigate', { url: BASE + path });
  await sleep(3000);
  const r = await evalIn(expr);
  const bad = String(r).startsWith('FAIL');
  if (bad) fails++;
  console.log((bad ? '  FAIL  ' : '  ok    ') + path.padEnd(42) + name + '  [' + r + ']');
}
console.log('='.repeat(58));
console.log(fails ? fails + ' CHECK(S) FAILED' : 'all ' + CHECKS.length + ' checks passed on the live site');

ws.close(); chrome.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch {}
process.exit(fails ? 1 : 0);
