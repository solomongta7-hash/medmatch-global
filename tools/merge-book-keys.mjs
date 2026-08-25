/* Merge the two sources of book.html's translatable copy into one key list.
 *
 *   1. the data structures (QUESTIONS, COPY, …) — from collect-book-strings.mjs
 *   2. the literals written directly into T("…") / Tf("…") by the patch
 *
 * Both are needed: a question's title lives in data, but "Continue" and
 * "Question {n} of {total}" only exist inside the render code. The T() literals
 * are the exact strings the running page will look up, so they are read out of
 * the source rather than retyped.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(ROOT, "book.html"), "utf8");
const block = html.slice(html.lastIndexOf("<script>"), html.lastIndexOf("</script>"));

const keys = new Set();
// T("…") or Tf("…"), double- or single-quoted, escapes respected.
const re = /\bTf?\(\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g;
let m;
while ((m = re.exec(block))) {
  const raw = m[1];
  let text;
  if (raw[0] === '"') {
    text = JSON.parse(raw);
  } else {
    // single-quoted: convert to a JSON string safely
    text = JSON.parse('"' + raw.slice(1, -1).replace(/\\'/g, "'").replace(/"/g, '\\"') + '"');
  }
  if (text.trim()) keys.add(text);
}

/* reasons() pushes its sentences as bare literals inside a function, so neither
   the data walk nor the T() scan sees them — but render() passes each one
   through T(), so the dictionary still needs them as keys. Some carry inline
   <strong> and <a href>; that is fine, the dictionaries already hold markup. */
const pushRe = /out\.push\(\s*("(?:[^"\\]|\\.)*")/g;
while ((m = pushRe.exec(block))) {
  const text = JSON.parse(m[1]);
  if (text.trim()) keys.add(text);
}
// The region verdict returns its single reason rather than pushing it.
const returnRe = /return \[\s*("(?:[^"\\]|\\.)*")\s*\]/g;
while ((m = returnRe.exec(block))) {
  const text = JSON.parse(m[1]);
  if (text.trim()) keys.add(text);
}

const dataStrings = JSON.parse(readFileSync(join(ROOT, "tools", "_book-strings.json"), "utf8"));
const all = [...new Set([...dataStrings, ...keys])].sort((a, b) => a.localeCompare(b));
writeFileSync(join(ROOT, "tools", "_book-strings.json"), JSON.stringify(all, null, 1), "utf8");

console.log(`data structures: ${dataStrings.length}`);
console.log(`inline T() keys: ${keys.size}`);
console.log(`merged total   : ${all.length}`);
