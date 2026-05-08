// Last 2 days deep-dive into the 5 active campaigns: campaign / ad group / keyword / search-term metrics.
//
// Usage:
//   npx tsx scripts/active-campaigns-2d.ts            — yesterday + today
//   npx tsx scripts/active-campaigns-2d.ts 7          — last 7 days

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

const ACTIVE = ["DE", "ES", "IT", "PL", "PT"];

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
  const inList = ACTIVE.map((n) => `'${n}'`).join(",");

  console.log(`\nWindow: ${fromDate} → ${toDate}  (${DAYS} day${DAYS === 1 ? "" : "s"})\n`);

  // Campaign-level
  console.log("========== CAMPAIGN ==========");
  const camp = await cust.query(`
    SELECT campaign.name, campaign.bidding_strategy_type,
           campaign_budget.amount_micros,
           metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions,
           metrics.conversions_value, metrics.ctr, metrics.average_cpc,
           metrics.search_impression_share, metrics.search_top_impression_share,
           metrics.search_budget_lost_impression_share,
           metrics.search_rank_lost_impression_share
    FROM campaign
    WHERE campaign.name IN (${inList})
      AND campaign.status = 'ENABLED'
      AND segments.date BETWEEN '${fromDate}' AND '${toDate}'
  `);
  for (const r of camp) {
    const m = r.metrics ?? {};
    const c2 = r.campaign ?? {};
    const b = r.campaign_budget ?? {};
    const cost = micros(m.cost_micros);
    const conv = Number(m.conversions ?? 0);
    console.log(`\n${c2.name}`);
    console.log(`  budget/day:    ${fmt(micros(b.amount_micros))}`);
    console.log(`  bid strategy:  ${c2.bidding_strategy_type}`);
    console.log(`  imp:           ${m.impressions ?? 0}`);
    console.log(`  clicks:        ${m.clicks ?? 0}`);
    console.log(`  CTR:           ${pct(m.ctr)}`);
    console.log(`  avg CPC:       ${fmt(micros(m.average_cpc))}`);
    console.log(`  cost:          ${fmt(cost)}`);
    console.log(`  conv:          ${conv.toFixed(2)}`);
    console.log(`  conv value:    ${fmt(Number(m.conversions_value ?? 0))}`);
    console.log(`  CPA:           ${conv > 0 ? fmt(cost / conv) : "—"}`);
    console.log(`  ROAS:          ${cost > 0 ? (Number(m.conversions_value ?? 0) / cost).toFixed(2) : "—"}`);
    console.log(`  IS (search):   ${pct(m.search_impression_share)}`);
    console.log(`  IS top:        ${pct(m.search_top_impression_share)}`);
    console.log(`  lost-budget:   ${pct(m.search_budget_lost_impression_share)}`);
    console.log(`  lost-rank:     ${pct(m.search_rank_lost_impression_share)}`);
  }

  // Ad-group level
  console.log("\n\n========== AD GROUPS ==========");
  const ag = await cust.query(`
    SELECT campaign.name, ad_group.name, ad_group.status,
           ad_group.cpc_bid_micros,
           metrics.impressions, metrics.clicks, metrics.cost_micros,
           metrics.conversions, metrics.ctr, metrics.average_cpc
    FROM ad_group
    WHERE campaign.name IN (${inList})
      AND campaign.status = 'ENABLED'
      AND ad_group.status = 'ENABLED'
      AND segments.date BETWEEN '${fromDate}' AND '${toDate}'
    ORDER BY campaign.name, metrics.cost_micros DESC
  `);
  let last = "";
  for (const r of ag) {
    const a = r.ad_group ?? {};
    const c2 = r.campaign ?? {};
    const m = r.metrics ?? {};
    if (c2.name !== last) {
      console.log(`\n--- ${c2.name} ---`);
      last = c2.name as string;
    }
    const cost = micros(m.cost_micros);
    const conv = Number(m.conversions ?? 0);
    console.log(
      `  ${a.name}  ·  bid ${fmt(micros(a.cpc_bid_micros))}  ·  imp ${m.impressions ?? 0}  ·  clk ${m.clicks ?? 0}  ·  CTR ${pct(m.ctr)}  ·  CPC ${fmt(micros(m.average_cpc))}  ·  cost ${fmt(cost)}  ·  conv ${conv.toFixed(2)}${conv > 0 ? `  ·  CPA ${fmt(cost / conv)}` : ""}`,
    );
  }

  // Keywords
  console.log("\n\n========== KEYWORDS ==========");
  const kw = await cust.query(`
    SELECT campaign.name, ad_group.name,
           ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
           ad_group_criterion.cpc_bid_micros, ad_group_criterion.status,
           metrics.impressions, metrics.clicks, metrics.cost_micros,
           metrics.conversions, metrics.ctr
    FROM keyword_view
    WHERE campaign.name IN (${inList})
      AND campaign.status = 'ENABLED'
      AND ad_group_criterion.status = 'ENABLED'
      AND segments.date BETWEEN '${fromDate}' AND '${toDate}'
      AND metrics.impressions > 0
    ORDER BY metrics.cost_micros DESC
    LIMIT 60
  `);
  let lastK = "";
  for (const r of kw) {
    const c2 = r.campaign?.name as string;
    const a = r.ad_group?.name as string;
    const k = r.ad_group_criterion?.keyword ?? {};
    const m = r.metrics ?? {};
    const cost = micros(m.cost_micros);
    const conv = Number(m.conversions ?? 0);
    const tag = `${c2} / ${a}`;
    if (tag !== lastK) {
      console.log(`\n[${tag}]`);
      lastK = tag;
    }
    console.log(
      `  [${k.match_type}] "${k.text}"  ·  imp ${m.impressions ?? 0}  ·  clk ${m.clicks ?? 0}  ·  CTR ${pct(m.ctr)}  ·  cost ${fmt(cost)}  ·  conv ${conv.toFixed(2)}${conv > 0 ? `  ·  CPA ${fmt(cost / conv)}` : ""}`,
    );
  }

  // Search terms (что реально искали)
  console.log("\n\n========== SEARCH TERMS (top by cost) ==========");
  const st = await cust.query(`
    SELECT campaign.name, ad_group.name,
           search_term_view.search_term, search_term_view.status,
           metrics.impressions, metrics.clicks, metrics.cost_micros,
           metrics.conversions, metrics.ctr
    FROM search_term_view
    WHERE campaign.name IN (${inList})
      AND segments.date BETWEEN '${fromDate}' AND '${toDate}'
      AND metrics.impressions > 0
    ORDER BY metrics.cost_micros DESC
    LIMIT 60
  `);
  let lastS = "";
  for (const r of st) {
    const c2 = r.campaign?.name as string;
    const a = r.ad_group?.name as string;
    const s = r.search_term_view ?? {};
    const m = r.metrics ?? {};
    const cost = micros(m.cost_micros);
    const conv = Number(m.conversions ?? 0);
    const tag = `${c2} / ${a}`;
    if (tag !== lastS) {
      console.log(`\n[${tag}]`);
      lastS = tag;
    }
    console.log(
      `  "${s.search_term}"  (${s.status})  ·  imp ${m.impressions ?? 0}  ·  clk ${m.clicks ?? 0}  ·  CTR ${pct(m.ctr)}  ·  cost ${fmt(cost)}  ·  conv ${conv.toFixed(2)}`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
