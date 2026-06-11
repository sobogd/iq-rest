// Reconstruct what ran on a specific calendar day from performance metrics.
// change_event only reaches back 30 days, so for older dates we infer the
// setup from segments.date metrics: anything with rows on that date was live.
//
// Usage:
//   npx tsx scripts/snapshot-date.ts 2026-04-20
//
// Caveat: campaign.status / bidding_strategy_type / budget are CURRENT values,
// not historical. Metrics (cost/clicks/imp) are exact for the given date.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

const DATE = process.argv[2];
if (!DATE || !/^\d{4}-\d{2}-\d{2}$/.test(DATE)) {
  console.error("Pass a date: npx tsx scripts/snapshot-date.ts YYYY-MM-DD");
  process.exit(1);
}

const micros = (n: unknown) => Number(n ?? 0) / 1_000_000;
const fmt = (eur: number) => `€${eur.toFixed(2)}`;
const pct = (n: unknown) => `${(Number(n ?? 0) * 100).toFixed(1)}%`;

const BID: Record<number, string> = {
  0: "UNSPECIFIED", 1: "UNKNOWN", 2: "COMMISSION", 3: "MANUAL_CPC", 4: "MANUAL_CPM",
  5: "MANUAL_CPV", 6: "TARGET_CPA", 7: "TARGET_ROAS", 8: "PAGE_ONE_PROMOTED",
  9: "TARGET_SPEND", 10: "MAXIMIZE_CONVERSIONS", 11: "MAXIMIZE_CONVERSION_VALUE",
  12: "TARGET_IMPRESSION_SHARE", 13: "TARGET_CPM",
};

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

  console.log(`\n===== SNAPSHOT ${DATE} (customer ${process.env.GOOGLE_ADS_CUSTOMER_ID}) =====`);
  console.log(`(status/budget/bidding = CURRENT values; metrics = exact for date)\n`);

  // ---- CAMPAIGN ----
  console.log("========== CAMPAIGNS WITH ACTIVITY ==========");
  const camp = await cust.query(`
    SELECT campaign.id, campaign.name, campaign.status,
           campaign.advertising_channel_type, campaign.bidding_strategy_type,
           campaign.bidding_strategy, campaign_budget.amount_micros,
           campaign_budget.explicitly_shared,
           metrics.impressions, metrics.clicks, metrics.cost_micros,
           metrics.conversions, metrics.ctr, metrics.average_cpc
    FROM campaign
    WHERE segments.date = '${DATE}'
    ORDER BY metrics.cost_micros DESC
  `);
  if (camp.length === 0) console.log("  (no campaign rows on this date)");
  for (const r of camp) {
    const m = r.metrics ?? {};
    const c2 = r.campaign ?? {};
    const b = r.campaign_budget ?? {};
    console.log(`\n[${c2.id}] ${c2.name}`);
    console.log(`  current status:  ${c2.status}`);
    console.log(`  channel:         ${c2.advertising_channel_type}`);
    console.log(`  bid strategy:    ${BID[Number(c2.bidding_strategy_type)] ?? c2.bidding_strategy_type}`);
    if (c2.bidding_strategy) console.log(`  portfolio:       ${c2.bidding_strategy}`);
    console.log(`  budget/day(now): ${fmt(micros(b.amount_micros))}${b.explicitly_shared ? " (shared)" : ""}`);
    console.log(`  imp/clicks:      ${m.impressions ?? 0} / ${m.clicks ?? 0}   CTR ${pct(m.ctr)}`);
    console.log(`  avg CPC:         ${fmt(micros(m.average_cpc))}`);
    console.log(`  cost:            ${fmt(micros(m.cost_micros))}   conv ${Number(m.conversions ?? 0).toFixed(2)}`);
  }

  // ---- AD GROUP ----
  console.log("\n========== AD GROUPS WITH ACTIVITY ==========");
  const ag = await cust.query(`
    SELECT campaign.name, ad_group.id, ad_group.name, ad_group.status,
           ad_group.cpc_bid_micros,
           metrics.impressions, metrics.clicks, metrics.cost_micros
    FROM ad_group
    WHERE segments.date = '${DATE}'
    ORDER BY metrics.cost_micros DESC
  `);
  if (ag.length === 0) console.log("  (none)");
  for (const r of ag) {
    const m = r.metrics ?? {};
    const a = r.ad_group ?? {};
    console.log(`  ${r.campaign?.name} › ${a.name} [${a.id}] (${a.status}) bid ${fmt(micros(a.cpc_bid_micros))} | imp ${m.impressions ?? 0} clk ${m.clicks ?? 0} cost ${fmt(micros(m.cost_micros))}`);
  }

  // ---- KEYWORDS ----
  console.log("\n========== KEYWORDS WITH ACTIVITY ==========");
  const kw = await cust.query(`
    SELECT campaign.name, ad_group.name,
           ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
           ad_group_criterion.status, ad_group_criterion.cpc_bid_micros,
           metrics.impressions, metrics.clicks, metrics.cost_micros
    FROM keyword_view
    WHERE segments.date = '${DATE}'
    ORDER BY metrics.cost_micros DESC
  `);
  if (kw.length === 0) console.log("  (none)");
  for (const r of kw) {
    const m = r.metrics ?? {};
    const k = r.ad_group_criterion?.keyword ?? {};
    console.log(`  ${r.campaign?.name} › ${r.ad_group?.name} › "${k.text}" [${k.match_type}] ${r.ad_group_criterion?.status} bid ${fmt(micros(r.ad_group_criterion?.cpc_bid_micros))} | imp ${m.impressions ?? 0} clk ${m.clicks ?? 0} cost ${fmt(micros(m.cost_micros))}`);
  }

  console.log("");
}

main().catch((e) => { console.error(e); process.exit(1); });
