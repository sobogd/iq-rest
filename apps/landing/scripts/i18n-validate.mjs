// Recursive key-parity + placeholder check for every translated locale against
// the EN master. Read-only, no LLM calls — pure structural QA.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(ROOT, "..", "app");
const SLUGS = JSON.parse(fs.readFileSync(path.join(ROOT, "i18n-slugs.json"), "utf8"));

const TARGETS = [
  "de", "nl", "pl", "uk", "sv", "da", "no", "fi", "cs", "el",
  "tr", "ro", "hu", "bg", "hr", "sk", "sl", "et", "lv", "lt",
  "sr", "ca", "ga", "is", "fa", "ar", "ja", "ko", "zh",
];

const FILES = [
  { key: "texts", enPath: () => path.join(APP, "(en)", "texts.json"), targetPath: (l) => path.join(APP, l, "texts.json") },
  { key: "cro", enPath: () => path.join(APP, "(en)", "cro.json"), targetPath: (l) => path.join(APP, l, "cro.json") },
  { key: "digitalMenu", enPath: () => path.join(APP, "(en)", SLUGS["digital-menu"].en, "content.json"), targetPath: (l) => path.join(APP, l, SLUGS["digital-menu"][l], "content.json") },
  { key: "orderTaking", enPath: () => path.join(APP, "(en)", SLUGS["order-taking"].en, "content.json"), targetPath: (l) => path.join(APP, l, SLUGS["order-taking"][l], "content.json") },
  { key: "bookings", enPath: () => path.join(APP, "(en)", SLUGS["bookings"].en, "content.json"), targetPath: (l) => path.join(APP, l, SLUGS["bookings"][l], "content.json") },
  { key: "kitchenDisplay", enPath: () => path.join(APP, "(en)", SLUGS["kitchen-display"].en, "content.json"), targetPath: (l) => path.join(APP, l, SLUGS["kitchen-display"][l], "content.json") },
  { key: "menuQrCode", enPath: () => path.join(APP, "(en)", SLUGS["menu-qr-code"].en, "content.json"), targetPath: (l) => path.join(APP, l, SLUGS["menu-qr-code"][l], "content.json") },
  { key: "pricing", enPath: () => path.join(APP, "(en)", SLUGS["pricing"].en, "pricing.json"), targetPath: (l) => path.join(APP, l, SLUGS["pricing"][l], "pricing.json") },
  { key: "about", enPath: () => path.join(APP, "(en)", SLUGS["about"].en, "about.json"), targetPath: (l) => path.join(APP, l, SLUGS["about"][l] ?? "about", "about.json") },
];

function diffKeys(source, target, pathPrefix = "") {
  const problems = [];
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) { problems.push(`${pathPrefix}: expected array`); return problems; }
    if (source.length !== target.length) problems.push(`${pathPrefix}: array length ${source.length} -> ${target.length}`);
    const n = Math.min(source.length, target.length);
    for (let i = 0; i < n; i++) problems.push(...diffKeys(source[i], target[i], `${pathPrefix}[${i}]`));
    return problems;
  }
  if (source !== null && typeof source === "object") {
    if (target === null || typeof target !== "object" || Array.isArray(target)) {
      problems.push(`${pathPrefix}: expected object`);
      return problems;
    }
    for (const k of Object.keys(source)) {
      if (!(k in target)) { problems.push(`${pathPrefix}.${k}: MISSING`); continue; }
      problems.push(...diffKeys(source[k], target[k], `${pathPrefix}.${k}`));
    }
    return problems;
  }
  if (typeof source === "string") {
    if (typeof target !== "string") { problems.push(`${pathPrefix}: expected string`); return problems; }
    if (target.trim() === "") problems.push(`${pathPrefix}: EMPTY`);
    const srcPh = (source.match(/\{[a-zA-Z]+\}/g) || []).sort().join(",");
    const tgtPh = (target.match(/\{[a-zA-Z]+\}/g) || []).sort().join(",");
    if (srcPh !== tgtPh) problems.push(`${pathPrefix}: placeholder [${srcPh}] -> [${tgtPh}]`);
  }
  return problems;
}

let totalProblems = 0;
for (const locale of TARGETS) {
  const localeProblems = [];
  for (const f of FILES) {
    const en = JSON.parse(fs.readFileSync(f.enPath(), "utf8"));
    const targetPath = f.targetPath(locale);
    if (!fs.existsSync(targetPath)) { localeProblems.push(`${f.key}: FILE MISSING (${targetPath})`); continue; }
    const target = JSON.parse(fs.readFileSync(targetPath, "utf8"));
    const problems = diffKeys(en, target, f.key);
    localeProblems.push(...problems);
  }
  if (localeProblems.length > 0) {
    console.log(`\n${locale}: ${localeProblems.length} problem(s)`);
    for (const p of localeProblems.slice(0, 15)) console.log(`  ${p}`);
    totalProblems += localeProblems.length;
  } else {
    console.log(`${locale}: OK`);
  }
}
console.log(`\nTotal problems: ${totalProblems}`);
process.exitCode = totalProblems > 0 ? 1 : 0;
