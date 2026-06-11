// Croatia keyword research. Croatian = "meni" (colloquial) or "jelovnik" (formal).
// Mix Croatian + English seeds since Balkans often use English tech terms.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const SEED_KEYWORDS = [
  // Croatian formal (jelovnik)
  "digitalni jelovnik",
  "qr jelovnik",
  "qr kod jelovnik",
  "jelovnik qr kod",
  "elektronski jelovnik",
  "online jelovnik restoran",
  // Croatian colloquial (meni)
  "qr meni restoran",
  "digitalni meni",
  "qr kod meni",
  "meni za restoran",
  // Create-intent
  "napraviti qr meni",
  "napraviti digitalni jelovnik",
  // Verticals
  "qr meni kafic",
  "qr jelovnik pizzeria",
  "vinska karta digitalna",
  // English (tech terms)
  "qr menu",
  "qr code menu",
  "digital menu",
  "qr menu restaurant",
  "online menu",
];

const CROATIA_GEO = "geoTargetConstants/2191";
const CROATIAN_LANG = "languageConstants/1039";

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

  console.log(`\n${SEED_KEYWORDS.length} seeds, HR geo, Croatian lang...\n`);

  let ideas: any[];
  try {
    ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({
      customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
      geo_target_constants: [CROATIA_GEO],
      language: CROATIAN_LANG,
      keyword_plan_network: "GOOGLE_SEARCH",
      keyword_seed: { keywords: SEED_KEYWORDS },
      include_adult_keywords: false,
      page_size: 1000,
    });
  } catch (e: any) {
    console.log(`  Croatian language rejected, retrying without lang...`);
    ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({
      customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
      geo_target_constants: [CROATIA_GEO],
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

  console.log("=== TOP 60 by searches ===\n");
  console.log("keyword".padEnd(50) + "searches".padStart(10) + "  comp".padEnd(8) + "  idx".padStart(5) + "  low €".padStart(8) + "  high €".padStart(9));
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
  console.log(`\n  ≥1000/mo: ${high.length}  |  100-999: ${mid.length}  |  10-99: ${low.length}`);

  const cpcRows = rows.filter((r) => r.lowCpc != null && r.highCpc != null);
  if (cpcRows.length) {
    const avgLow = cpcRows.reduce((s, r) => s + (r.lowCpc || 0), 0) / cpcRows.length;
    const avgHigh = cpcRows.reduce((s, r) => s + (r.highCpc || 0), 0) / cpcRows.length;
    console.log(`  Avg CPC: €${avgLow.toFixed(2)} - €${avgHigh.toFixed(2)} (${cpcRows.length} kws)`);
  }

  const fs = await import("fs");
  fs.writeFileSync(path.join(process.cwd(), "scripts/keyword-research-hr.json"), JSON.stringify(rows, null, 2));
  console.log(`\nDumped to scripts/keyword-research-hr.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
