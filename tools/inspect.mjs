// One-off inspector: loads a page in headless Chrome at a phone width and runs
// an arbitrary expression from a file, so a question can be asked without
// re-typing the CDP plumbing.
//   node tools/inspect.mjs <page.html> <expr-file.js> [--width 375]
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
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
const PORT = await freePort(9351 + (process.pid % 300));
const BASE = 'http://localhost:4173';
const argv = process.argv.slice(2);
const PAGE = argv[0];
const EXPR_FILE = argv[1];
const wi = argv.indexOf('--width');
const WIDTH = wi >= 0 ? +argv[wi + 1] : 375;
const hi = argv.indexOf('--height');
const HEIGHT = hi >= 0 ? +argv[hi + 1] : 812;

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find(existsSync);

const chrome = spawn(CHROME, [
  '--headless=new', '--remote-debugging-port=' + PORT,
  '--user-data-dir=' + join(HERE, '.audit-profile-' + process.pid),
  '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
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
  throw new Error('no debug target');
}

const ws = new WebSocket(await targetUrl());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0;
const pending = new Map();
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
};
const send = (method, params = {}) => new Promise(res => {
  const n = ++id; pending.set(n, res); ws.send(JSON.stringify({ id: n, method, params }));
});

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: WIDTH, height: HEIGHT, deviceScaleFactor: 2, mobile: true,
  screenWidth: WIDTH, screenHeight: HEIGHT,
});
await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
await send('Page.navigate', { url: BASE + '/' + PAGE });
await sleep(2500);

const expr = readFileSync(join(HERE, EXPR_FILE), 'utf8');
const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
console.log(JSON.stringify(r.result?.value ?? r.exceptionDetails ?? r, null, 2));

ws.close();
chrome.kill();
