// Serbia-market keyword research for IQ Rest QR menu landing.
// Serbian language (1140), Serbia geo (2688). Uses Latin-script seeds primarily
// (Cyrillic Serbian also indexed under same languageConstant 1140).
//
// Usage: npx tsx scripts/keyword-research-serbia.ts

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

// Round 2: testing English tech terms which Serbians often use directly.
const SEED_KEYWORDS = [
  "qr menu",
  "qr code menu",
  "qr menu restaurant",
  "qr menu app",
  "digital menu",
  "online menu",
  "restaurant menu app",
  "qr menu maker",
  "qr menu generator",
  "menu qr code",
  "menu app",
  "restaurant menu software",
  "qr code restaurant",
  "qr scanner menu",
  "contactless menu",
  "menu online",
  "smart menu",
  "menu maker",
  "menu app restaurant",
  "menu",
];

const SERBIA_GEO = "geoTargetConstants/2688";
const SERBIAN_LANG = "languageConstants/1140";

async function main() {
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

  console.log(`\nRequesting keyword ideas — ${SEED_KEYWORDS.length} seeds, RS geo, Serbian lang...\n`);

  // Try with language first, fall back to no language if unsupported
  let ideas: any[];
  try {
    ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({
      customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
      geo_target_constants: [SERBIA_GEO],
      language: SERBIAN_LANG,
      keyword_plan_network: "GOOGLE_SEARCH",
      keyword_seed: { keywords: SEED_KEYWORDS },
      include_adult_keywords: false,
      page_size: 1000,
    });
  } catch (e: any) {
    console.log(`  Language ${SERBIAN_LANG} rejected, retrying without language constraint...`);
    ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({
      customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
      geo_target_constants: [SERBIA_GEO],
      keyword_plan_network: "GOOGLE_SEARCH",
      keyword_seed: { keywords: SEED_KEYWORDS },
      include_adult_keywords: false,
      page_size: 1000,
    });
  }

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

  console.log("=== TOP 60 by avg monthly searches ===\n");
  console.log(
    "keyword".padEnd(50) +
      "searches".padStart(10) +
      "  comp".padEnd(8) +
      "  idx".padStart(5) +
      "  low €".padStart(8) +
      "  high €".padStart(9),
  );
  console.log("-".repeat(95));
  for (const r of rows.slice(0, 60)) {
    console.log(
      r.keyword.padEnd(50).slice(0, 50) +
        String(r.searches).padStart(10) +
        ("  " + r.competition.slice(0, 6)).padEnd(8) +
        (r.competitionIdx != null ? String(r.competitionIdx).padStart(5) : "    -") +
        (r.lowCpc != null ? r.lowCpc.toFixed(2).padStart(8) : "       -") +
        (r.highCpc != null ? r.highCpc.toFixed(2).padStart(9) : "        -"),
    );
  }

  const high = rows.filter((r) => r.searches >= 1000);
  const mid = rows.filter((r) => r.searches >= 100 && r.searches < 1000);
  const low = rows.filter((r) => r.searches >= 10 && r.searches < 100);
  const micro = rows.filter((r) => r.searches < 10);
  console.log(`\n=== Bucket sizes ===`);
  console.log(`  ≥1000 searches/mo:  ${high.length}`);
  console.log(`  100-999:            ${mid.length}`);
  console.log(`  10-99:              ${low.length}`);
  console.log(`  <10:                ${micro.length}`);

  const cpcRows = rows.filter((r) => r.lowCpc != null && r.highCpc != null);
  if (cpcRows.length) {
    const avgLow = cpcRows.reduce((s, r) => s + (r.lowCpc || 0), 0) / cpcRows.length;
    const avgHigh = cpcRows.reduce((s, r) => s + (r.highCpc || 0), 0) / cpcRows.length;
    console.log(`\n=== Avg CPC across ${cpcRows.length} keywords with data ===`);
    console.log(`  Low top-of-page bid:  €${avgLow.toFixed(2)}`);
    console.log(`  High top-of-page bid: €${avgHigh.toFixed(2)}`);
  }

  const fs = await import("fs");
  const outPath = path.join(process.cwd(), "scripts/keyword-research-rs.json");
  fs.writeFileSync(outPath, JSON.stringify(rows, null, 2), "utf-8");
  console.log(`\nFull results dumped to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
