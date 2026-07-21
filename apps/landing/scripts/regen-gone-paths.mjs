// Regenerate lib/gone-paths.ts from lib/gone-paths-raw.txt.
// Add deleted page URLs (locale-prefixed, en at root) to the raw file — one
// per line — then run: node scripts/regen-gone-paths.mjs
// middleware.ts serves these as 410 Gone so search engines deindex them.
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "lib");
const raw = path.join(dir, "gone-paths-raw.txt");
const out = path.join(dir, "gone-paths.ts");

const lines = fs
  .readFileSync(raw, "utf8")
  .split("\n")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
const uniq = [...new Set(lines)].sort();

// Normalize the raw file too (sorted, deduped, lowercased).
fs.writeFileSync(raw, uniq.join("\n") + "\n");

const body = uniq.map((p) => `  ${JSON.stringify(p)},`).join("\n");
fs.writeFileSync(
  out,
  `// Auto-generated from lib/gone-paths-raw.txt. Re-run scripts/regen-gone-paths.mjs after removing pages.
export const GONE_PATHS = new Set<string>([
${body}
]);

export function isGone(pathname: string): boolean {
  const p = pathname.replace(/\\/$/, "").toLowerCase();
  if (!p) return false;
  return GONE_PATHS.has(p);
}
`
);

console.log(`gone-paths: ${uniq.length} entries`);
