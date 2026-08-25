/* Pull every visitor-facing sentence out of js/packages-data.js.
   Runs the file rather than regexing it, so a comma or a "+" joined
   string can never fool it.

   node tools/collect-package-strings.mjs        -> prints them
   node tools/collect-package-strings.mjs --json -> writes tools/_package-strings.json */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(ROOT, "js", "packages-data.js"), "utf8"), sandbox);
const DATA = sandbox.window.MM_DATA;

// Fields a visitor actually reads. Anything not named here — ids, prices,
// currency codes, image paths — stays out.
const VISIBLE = new Set([
  "name",
  "tag",
  "desc",
  "days",
  "feeName",
  "city",
  "label",
  "title",
  "note",
  "blurb",
  "subtitle",
  "heading",
  "text",
]);

// Deliberately English: brand, place and product names a translation would
// only damage. Kept in step with tools/keep-english.json in spirit.
const KEEP = new Set(["Antalya", "Istanbul", "MedMatch", "MedMatch Global"]);

const found = new Set();

function walk(node, key) {
  if (typeof node === "string") {
    const s = node.trim();
    if (!s || KEEP.has(s)) return;
    if (!/[a-z]/i.test(s)) return; // pure numbers/symbols
    if (VISIBLE.has(key)) found.add(s);
    return;
  }
  if (Array.isArray(node)) {
    // `includes: [...]` is a list of sentences with no key of its own, so the
    // array inherits its parent's key.
    const inherited = key === "includes" ? "label" : key;
    for (const v of node) walk(v, inherited);
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) walk(v, k);
  }
}

walk(DATA, null);

const list = [...found].sort((a, b) => a.localeCompare(b));

if (process.argv.includes("--json")) {
  writeFileSync(join(ROOT, "tools", "_package-strings.json"), JSON.stringify(list, null, 1), "utf8");
  console.log(`Wrote ${list.length} strings to tools/_package-strings.json`);
} else {
  for (const s of list) console.log(s);
  console.log(`\n${list.length} visitor-facing strings.`);
}
