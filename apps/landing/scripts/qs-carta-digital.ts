// Snapshot QS + 2-day metrics for every enabled keyword that mentions
// "carta digital" across active campaigns. Pulled directly from Google Ads
// so we see what Google's keyword diagnostic actually reports right now.
//
// Usage:
//   npx tsx scripts/qs-carta-digital.ts          — yesterday + today
//   npx tsx scripts/qs-carta-digital.ts 7        — last 7 days

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

const DAYS = parseInt(process.argv[2] || "2", 10);

function micros(n: unknown): number {
  return Number(n ?? 0) / 1_000_000;
}
function fmt(eur: number): string {
  return `€${eur.toFixed(2)}`;
}
function pct(n: unknown): string {
  return `${(Number(n ?? 0) * 100).toFixed(1)}%`;
}
function dateOffset(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

async function main() {
  const c = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const cust = c.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  const fromDate = dateOffset(DAYS - 1);
  const toDate = dateOffset(0);
  console.log(`\nWindow: ${fromDate} → ${toDate}\n`);

  // Active enabled keywords matching carta digital, with QS + creative QS + last-N-day metrics.
  const rows = await cust.query(`
    SELECT campaign.name, ad_group.name,
           ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
           ad_group_criterion.status, ad_group_criterion.final_urls,
           ad_group_criterion.cpc_bid_micros, ad_group_criterion.effective_cpc_bid_micros,
           ad_group_criterion.quality_info.quality_score,
           ad_group_criterion.quality_info.creative_quality_score,
           ad_group_criterion.quality_info.post_click_quality_score,
           ad_group_criterion.quality_info.search_predicted_ctr,
           metrics.impressions, metrics.clicks, metrics.cost_micros,
           metrics.conversions, metrics.ctr, metrics.average_cpc
    FROM keyword_view
    WHERE campaign.status = 'ENABLED'
      AND ad_group.status = 'ENABLED'
      AND ad_group_criterion.status = 'ENABLED'
      AND ad_group_criterion.keyword.text LIKE '%carta digital%'
      AND segments.date BETWEEN '${fromDate}' AND '${toDate}'
  `);

  if (rows.length === 0) {
    console.log("No matching keyword rows in window.");
    return;
  }

  for (const r of rows) {
    const m = r.metrics ?? {};
    const a = r.ad_group ?? {};
    const c2 = r.campaign ?? {};
    const k = r.ad_group_criterion ?? {};
    const kw = k.keyword ?? {};
    const qi = k.quality_info ?? {};
    const cost = micros(m.cost_micros);
    const conv = Number(m.conversions ?? 0);
    console.log(`\nCampaign: ${c2.name}`);
    console.log(`AdGroup:  ${a.name}`);
    console.log(`Keyword:  "${kw.text}"  [${kw.match_type}]`);
    console.log(`Final URLs: ${(k.final_urls || []).join(", ") || "—"}`);
    console.log(`Quality Score:        ${qi.quality_score ?? "—"} / 10`);
    console.log(`  Creative QS:        ${qi.creative_quality_score ?? "—"}`);
    console.log(`  Post-click QS:      ${qi.post_click_quality_score ?? "—"}`);
    console.log(`  Predicted CTR:      ${qi.search_predicted_ctr ?? "—"}`);
    console.log(`Bids:    cpc ${fmt(micros(k.cpc_bid_micros))}  eff ${fmt(micros(k.effective_cpc_bid_micros))}`);
    console.log(`Last ${DAYS}d: imp ${m.impressions ?? 0}  clk ${m.clicks ?? 0}  CTR ${pct(m.ctr)}  avgCPC ${fmt(micros(m.average_cpc))}  cost ${fmt(cost)}  conv ${conv.toFixed(2)}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
