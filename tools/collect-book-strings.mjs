/* Pull every visitor-facing sentence out of book.html's inline script.
 *
 * The nine questions are built by JavaScript, so — exactly like the package
 * catalogue before it — they have no element to hang a hash on and never
 * reached the dictionaries. A Spanish visitor gets a Spanish site and then
 * nine questions in English, on the page the whole funnel runs through.
 *
 * Runs the data rather than regexing it, so a comma or a joined string cannot
 * fool it. Only the data structures are evaluated, never the DOM code.
 *
 *   node tools/collect-book-strings.mjs           -> print them
 *   node tools/collect-book-strings.mjs --json    -> tools/_book-strings.json
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(ROOT, "book.html"), "utf8");

// The inline block is the last <script> with no src.
const block = html.slice(html.lastIndexOf("<script>") + "<script>".length, html.lastIndexOf("</script>"));

// Take only the top-level data declarations. Everything after `var answers`
// is behaviour and touches the DOM, which we must not run here.
const NAMES = ["TREATMENTS", "QUESTIONS", "HEALTH_COMMON", "HEALTH_EXTRA", "FLAG_REASON", "COPY"];
const sandbox = {};
vm.createContext(sandbox);

for (const name of NAMES) {
  const start = block.indexOf(`var ${name}`);
  if (start === -1) {
    console.error(`  ! ${name} not found — book.html has changed shape.`);
    process.exit(1);
  }
  // Read to the semicolon that closes the declaration, tracking bracket depth
  // so a `};` inside the literal does not end it early.
  let depth = 0, i = start, end = -1, inStr = null;
  for (; i < block.length; i++) {
    const c = block[i], prev = block[i - 1];
    if (inStr) { if (c === inStr && prev !== "\\") inStr = null; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") depth--;
    else if (c === ";" && depth === 0) { end = i + 1; break; }
  }
  if (end === -1) { console.error(`  ! could not find the end of ${name}.`); process.exit(1); }
  vm.runInContext(block.slice(start, end), sandbox);
}

/* Keys a visitor actually reads. `t` and `s` are an option's title and
   subtitle; `v` is its stored value and must never be translated. */
const VISIBLE = new Set(["label", "title", "help", "t", "s", "stay", "text", "note", "body", "head", "why",
  "tag", "h", "lede"]);  // COPY verdicts use tag/h/lede
const SKIP_VALUES = new Set(["", "varies"]);

const found = new Set();
function walk(node, key) {
  if (typeof node === "string") {
    const s = node.trim();
    if (!s || SKIP_VALUES.has(s) || !/[a-z]{3}/i.test(s)) return;
    if (VISIBLE.has(key)) found.add(s);
    return;
  }
  if (Array.isArray(node)) {
    // A bare array of sentences inherits its parent's key (HEALTH_COMMON).
    for (const v of node) walk(v, key === "HEALTH_COMMON" || key === undefined ? "text" : key);
    return;
  }
  if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) walk(v, k);
}

for (const name of NAMES) walk(sandbox[name], name === "HEALTH_COMMON" ? "HEALTH_COMMON" : undefined);

const list = [...found].sort((a, b) => a.localeCompare(b));
if (process.argv.includes("--json")) {
  writeFileSync(join(ROOT, "tools", "_book-strings.json"), JSON.stringify(list, null, 1), "utf8");
  console.log(`Wrote ${list.length} strings to tools/_book-strings.json`);
} else {
  for (const s of list) console.log(s);
  console.log(`\n${list.length} visitor-facing strings in book.html's script.`);
}
