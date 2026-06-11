// Keyword research for the new "online ordering" feature page positioning.
// Focus: restaurant owners researching internal table-ordering tools (NOT
// delivery aggregator competition). Real fit: QR menu → customer adds to
// cart → order lands on kitchen/manager tablet or goes to the restaurant
// WhatsApp number. Stripe payment is opt-in custom integration.
//
// Geo: US. Lang: English. Read-only. Safe to re-run.
// Usage: npx tsx scripts/keyword-research-online-ordering-en.ts

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as fs from "fs";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const SEED_KEYWORDS = [
  // QR + table ordering — closest fit
  "qr code ordering",
  "qr menu ordering",
  "scan to order",
  "table ordering system",
  "tableside ordering",
  "order at the table",
  "self order kiosk",
  // Internal order management / kitchen display
  "restaurant order management",
  "kitchen display system",
  "tablet ordering for restaurants",
  // Channel: WhatsApp
  "whatsapp ordering for restaurants",
  "whatsapp menu ordering",
  // Commission-free positioning
  "online ordering without commission",
  "commission free online ordering",
  "online ordering for restaurants",
  // QR menu adjacent
  "qr code menu for restaurant",
  "digital menu with ordering",
  "qr menu with ordering",
  // Direct-to-restaurant ordering
  "direct online ordering for restaurants",
];

const US_GEO = "geoTargetConstants/2840";
const ENGLISH_LANG = "languageConstants/1000";

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

  const customer = client.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  const ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    geo_target_constants: [US_GEO],
    language: ENGLISH_LANG,
    keyword_plan_network: 2,
    keyword_seed: { keywords: SEED_KEYWORDS },
    include_adult_keywords: false,
  });

  const rows = ideas.map((r) => {
    const m = r.keyword_idea_metrics;
    return {
      keyword: r.text,
      avgMonthlySearches: Number(m?.avg_monthly_searches ?? 0),
      competition: m?.competition,
      competitionIndex: Number(m?.competition_index ?? 0),
      lowTopBidMicros: Number(m?.low_top_of_page_bid_micros ?? 0),
      highTopBidMicros: Number(m?.high_top_of_page_bid_micros ?? 0),
    };
  });

  rows.sort((a, b) => b.avgMonthlySearches - a.avgMonthlySearches);

  const outPath = path.join(
    process.cwd(),
    "scripts/keyword-research-online-ordering-en.json",
  );
  fs.writeFileSync(outPath, JSON.stringify(rows, null, 2));

  console.log(`\nWrote ${rows.length} ideas → ${outPath}\n`);
  console.log("Top 30 by volume:\n");
  console.log(
    "kw".padEnd(50) +
      "  vol".padStart(8) +
      "  comp".padStart(6) +
      "  idx".padStart(5) +
      "  lowEUR".padStart(8) +
      "  highEUR".padStart(8),
  );
  for (const r of rows.slice(0, 30)) {
    console.log(
      String(r.keyword ?? "").padEnd(50).slice(0, 50) +
        "  " +
        String(r.avgMonthlySearches).padStart(6) +
        "  " +
        String(r.competition ?? "").padStart(4) +
        "  " +
        String(r.competitionIndex).padStart(3) +
        "  " +
        (r.lowTopBidMicros / 1_000_000).toFixed(2).padStart(6) +
        "  " +
        (r.highTopBidMicros / 1_000_000).toFixed(2).padStart(6),
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
