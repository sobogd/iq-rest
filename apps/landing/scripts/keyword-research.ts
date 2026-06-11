// Italian-market keyword research for IQ Rest QR menu landing.
// Calls Google Ads KeywordPlanIdeaService.generateKeywordIdeas with Italy geo + Italian language.
// Read-only. No campaigns created. Safe to run repeatedly.
//
// Usage: npx tsx scripts/keyword-research.ts

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const SEED_KEYWORDS = [
  // Direct intent — restaurant owner searching solution
  "qr menu ristorante",
  "menu digitale ristorante",
  "menu qr code ristorante",
  "carta menu digitale",
  "menu online per ristorante",
  "creare qr menu",
  "qr code per menu",

  // Adjacent/discovery
  "menu senza contatto",
  "menu con qr code",
  "software gestione menu ristorante",
  "menu ristorante app",
  "ordinazioni online ristorante",

  // Brand-near (competitors / alternatives — useful for negative + counter)
  "soqr menu",

  // Specific use cases
  "menu pizzeria qr",
  "menu bar digitale",
  "carta dei vini digitale",
  "menu ristorante multilingua",
  "menu ristorante traduzione",

  // Pain-point / commercial
  "alternativa volantino menu",
  "stampare menu o qr",
];

const ITALY_GEO = "geoTargetConstants/2380";
const ITALIAN_LANG = "languageConstants/1004";

async function main() {
  const required = [
    "GOOGLE_ADS_CLIENT_ID",
    "GOOGLE_ADS_CLIENT_SECRET",
    "GOOGLE_ADS_REFRESH_TOKEN",
    "GOOGLE_ADS_DEVELOPER_TOKEN",
    "GOOGLE_ADS_CUSTOMER_ID",
  ];
  for (const k of required) {
    if (!process.env[k]) {
      console.error(`Missing ${k} in .env`);
      process.exit(1);
    }
  }

  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });

  // Try LOGIN as customer first (some accounts only have a single ID and use it for both).
  const targetId =
    process.argv.includes("--login-as-customer") || !process.env.GOOGLE_ADS_CUSTOMER_ID
      ? process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!
      : process.env.GOOGLE_ADS_CUSTOMER_ID!;
  console.log(`  Using customer_id=${targetId.slice(0, 3)}***  login_customer_id=${(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "").slice(0, 3)}***`);

  const customer = client.Customer({
    customer_id: targetId,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  console.log(`\nRequesting keyword ideas — ${SEED_KEYWORDS.length} seeds, IT geo, Italian lang...\n`);

  const ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    geo_target_constants: [ITALY_GEO],
    language: ITALIAN_LANG,
    keyword_plan_network: "GOOGLE_SEARCH",
    keyword_seed: { keywords: SEED_KEYWORDS },
    include_adult_keywords: false,
    page_size: 1000,
  });

  type Row = {
    keyword: string;
    searches: number;
    competition: string;
    competitionIdx: number | null;
    lowCpc: number | null;
    highCpc: number | null;
  };

  const rows: Row[] = ideas.map((idea: any) => {
    const m = idea.keyword_idea_metrics;
    const lowMicros = m?.low_top_of_page_bid_micros ? Number(m.low_top_of_page_bid_micros) : null;
    const highMicros = m?.high_top_of_page_bid_micros ? Number(m.high_top_of_page_bid_micros) : null;
    return {
      keyword: idea.text || "",
      searches: m?.avg_monthly_searches ? Number(m.avg_monthly_searches) : 0,
      competition: m?.competition || "UNSPECIFIED",
      competitionIdx: m?.competition_index != null ? Number(m.competition_index) : null,
      lowCpc: lowMicros != null ? lowMicros / 1_000_000 : null,
      highCpc: highMicros != null ? highMicros / 1_000_000 : null,
    };
  });

  rows.sort((a, b) => b.searches - a.searches);

  console.log(`${rows.length} keyword ideas returned\n`);

  // ── Top 50 by search volume ────────────────────────────────────────────
  console.log("=== TOP 50 by avg monthly searches ===\n");
  console.log(
    "keyword".padEnd(50) +
      "searches".padStart(10) +
      "  comp".padEnd(8) +
      "  idx".padStart(5) +
      "  low €".padStart(8) +
      "  high €".padStart(9),
  );
  console.log("-".repeat(95));
  for (const r of rows.slice(0, 50)) {
    console.log(
      r.keyword.padEnd(50).slice(0, 50) +
        String(r.searches).padStart(10) +
        ("  " + r.competition.slice(0, 6)).padEnd(8) +
        (r.competitionIdx != null ? String(r.competitionIdx).padStart(5) : "    -") +
        (r.lowCpc != null ? r.lowCpc.toFixed(2).padStart(8) : "       -") +
        (r.highCpc != null ? r.highCpc.toFixed(2).padStart(9) : "        -"),
    );
  }

  // ── Buckets ────────────────────────────────────────────────────────────
  const high = rows.filter((r) => r.searches >= 1000);
  const mid = rows.filter((r) => r.searches >= 100 && r.searches < 1000);
  const low = rows.filter((r) => r.searches >= 10 && r.searches < 100);
  const micro = rows.filter((r) => r.searches < 10);
  console.log(`\n=== Bucket sizes ===`);
  console.log(`  ≥1000 searches/mo:  ${high.length}`);
  console.log(`  100-999:            ${mid.length}`);
  console.log(`  10-99:              ${low.length}`);
  console.log(`  <10:                ${micro.length}`);

  // ── Avg CPC across non-zero ─────────────────────────────────────────────
  const cpcRows = rows.filter((r) => r.lowCpc != null && r.highCpc != null);
  if (cpcRows.length) {
    const avgLow = cpcRows.reduce((s, r) => s + (r.lowCpc || 0), 0) / cpcRows.length;
    const avgHigh = cpcRows.reduce((s, r) => s + (r.highCpc || 0), 0) / cpcRows.length;
    console.log(`\n=== Avg CPC across ${cpcRows.length} keywords with data ===`);
    console.log(`  Low top-of-page bid:  €${avgLow.toFixed(2)}`);
    console.log(`  High top-of-page bid: €${avgHigh.toFixed(2)}`);
  }

  // ── Output JSON for downstream analysis ────────────────────────────────
  const fs = await import("fs");
  const outPath = path.join(process.cwd(), "scripts/keyword-research-it.json");
  fs.writeFileSync(outPath, JSON.stringify(rows, null, 2), "utf-8");
  console.log(`\nFull results dumped to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
