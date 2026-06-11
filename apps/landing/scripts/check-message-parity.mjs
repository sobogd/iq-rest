#!/usr/bin/env node
// Verify every messages/<locale>.json has exactly the same key set as the
// English source (messages/en.json). Untyped JSON drifts silently — a missing
// key renders an empty string / fallback for the user. Run in CI or locally:
//   node scripts/check-message-parity.mjs
// Exits non-zero (and lists the offending keys) on any mismatch.
import { readdirSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const MESSAGES_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "messages");
const REFERENCE = "en.json";

// Flatten nested object into dotted key paths ("billing.monthly").
function flatten(obj, prefix = "") {
  const keys = new Set();
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj)) {
      const next = prefix ? `${prefix}.${k}` : k;
      for (const key of flatten(v, next)) keys.add(key);
    }
  } else {
    keys.add(prefix);
  }
  return keys;
}

const load = (file) => flatten(JSON.parse(readFileSync(join(MESSAGES_DIR, file), "utf8")));

const reference = load(REFERENCE);
const files = readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json") && f !== REFERENCE);

let failed = false;
for (const file of files) {
  const keys = load(file);
  const missing = [...reference].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !reference.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`\n✗ ${file}: ${missing.length} missing, ${extra.length} extra vs ${REFERENCE}`);
    missing.forEach((k) => console.error(`    missing: ${k}`));
    extra.forEach((k) => console.error(`    extra:   ${k}`));
  }
}

if (failed) {
  console.error(`\nMessage-key parity check FAILED. Align the keys above with ${REFERENCE}.`);
  process.exit(1);
}
console.log(`✓ All ${files.length} locales match ${REFERENCE} (${reference.size} keys).`);
