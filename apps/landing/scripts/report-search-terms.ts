// Search-terms report — actual queries that triggered ad impressions across
// all 4 campaigns over the last N days. Sorted by clicks descending.
//
// Use to spot wasted spend (lots of clicks, no conversions, irrelevant query)
// and feed those into scripts/add-shared-negatives.ts.
//
// Usage:
//   npx tsx scripts/report-search-terms.ts            — last 7 days
//   npx tsx scripts/report-search-terms.ts 30         — last 30 days
//   npx tsx scripts/report-search-terms.ts 7 --no-conv — only show queries
//                                                       with 0 conversions
//                                                       (negative candidates)

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const DAYS = parseInt(process.argv[2] || "7", 10);
const NO_CONV = process.argv.includes("--no-conv");

const CAMPAIGN_NAMES = [
  "IT — Search — QR Menu (auto)",
  "DE — Search — QR Speisekarte (auto)",
  "FR — Search — Menu QR (auto)",
  "ES — Search — Carta QR (auto)",
];

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

  console.log(`\nSearch-terms report — last ${DAYS} days${NO_CONV ? " (zero-conv only)" : ""}\n`);

  // Quote-escape campaign names for IN clause
  const inList = CAMPAIGN_NAMES.map((n) => `'${n.replace(/'/g, "\\'")}'`).join(", ");

  const rows = await customer.query(
    `SELECT
       campaign.name,
       ad_group.name,
       search_term_view.search_term,
       search_term_view.status,
       metrics.impressions,
       metrics.clicks,
       metrics.cost_micros,
       metrics.conversions,
       metrics.ctr
     FROM search_term_view
     WHERE campaign.name IN (${inList})
       AND segments.date DURING LAST_${DAYS === 7 ? "7" : DAYS === 14 ? "14" : DAYS === 30 ? "30" : "7"}_DAYS
     ORDER BY metrics.clicks DESC
     LIMIT 500`,
  );

  type Row = {
    campaign: string;
    adGroup: string;
    term: string;
    status: string;
    impressions: number;
    clicks: number;
    costEur: number;
    conversions: number;
    ctr: number;
  };

  const data: Row[] = rows.map((r: any) => ({
    campaign: r.campaign?.name || "",
    adGroup: r.ad_group?.name || "",
    term: r.search_term_view?.search_term || "",
    status: r.search_term_view?.status || "",
    impressions: Number(r.metrics?.impressions || 0),
    clicks: Number(r.metrics?.clicks || 0),
    costEur: Number(r.metrics?.cost_micros || 0) / 1_000_000,
    conversions: Number(r.metrics?.conversions || 0),
    ctr: Number(r.metrics?.ctr || 0),
  }));

  const filtered = NO_CONV ? data.filter((d) => d.conversions === 0 && d.clicks > 0) : data;

  if (filtered.length === 0) {
    console.log("No data");
    return;
  }

  console.log(
    "search term".padEnd(50) +
      "impr".padStart(7) +
      "clicks".padStart(8) +
      "  €cost".padStart(9) +
      "  conv".padStart(7) +
      "  cmp".padEnd(5) +
      "  group".padEnd(15),
  );
  console.log("-".repeat(110));

  let totalImpr = 0,
    totalClicks = 0,
    totalCost = 0,
    totalConv = 0;

  for (const r of filtered) {
    const cmp = r.campaign.match(/^(\w\w)/)?.[1] || "??";
    console.log(
      r.term.padEnd(50).slice(0, 50) +
        String(r.impressions).padStart(7) +
        String(r.clicks).padStart(8) +
        ("€" + r.costEur.toFixed(2)).padStart(9) +
        r.conversions.toFixed(0).padStart(7) +
        ("  " + cmp).padEnd(5) +
        ("  " + r.adGroup).padEnd(15).slice(0, 15),
    );
    totalImpr += r.impressions;
    totalClicks += r.clicks;
    totalCost += r.costEur;
    totalConv += r.conversions;
  }

  console.log("-".repeat(110));
  console.log(
    `${filtered.length} rows`.padEnd(50) +
      String(totalImpr).padStart(7) +
      String(totalClicks).padStart(8) +
      ("€" + totalCost.toFixed(2)).padStart(9) +
      totalConv.toFixed(1).padStart(7),
  );

  // Highlight high-cost zero-conv queries as candidates for negatives
  const candidates = data
    .filter((d) => d.clicks >= 2 && d.conversions === 0)
    .sort((a, b) => b.costEur - a.costEur)
    .slice(0, 20);

  if (candidates.length > 0 && !NO_CONV) {
    console.log(`\n=== Top wasted-spend candidates (≥2 clicks, 0 conv) ===\n`);
    for (const c of candidates) {
      console.log(`  €${c.costEur.toFixed(2).padStart(6)} ${String(c.clicks).padStart(3)}cl  "${c.term}"`);
    }
    console.log(`\nReview these. Add as PHRASE negatives via scripts/add-shared-negatives.ts.`);
  }
}

main().catch((e) => {
  console.error("FAILED:", e);
  if (e?.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
