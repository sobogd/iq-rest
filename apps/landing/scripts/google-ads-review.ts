// Read-only audit of the Google Ads account.
//
// Lists: customer info, campaigns (status, type, channel, budget, bidding
// strategy), ad groups, keyword counts, top keywords by spend, last-30-days
// metrics per campaign, active conversion actions.
//
// Usage:
//   npx tsx scripts/google-ads-review.ts

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

function micros(n: unknown): number {
  return Number(n ?? 0) / 1_000_000;
}

function fmtMoney(eur: number): string {
  return `€${eur.toFixed(2)}`;
}

async function main() {
  const required = [
    "GOOGLE_ADS_CLIENT_ID",
    "GOOGLE_ADS_CLIENT_SECRET",
    "GOOGLE_ADS_DEVELOPER_TOKEN",
    "GOOGLE_ADS_CUSTOMER_ID",
    "GOOGLE_ADS_REFRESH_TOKEN",
  ];
  for (const k of required) {
    if (!process.env[k]) {
      console.error(`Missing ${k}`);
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

  // ---- Customer info -----------------------------------------------------
  console.log("\n========== CUSTOMER ==========");
  const custRows = await customer.query(`
    SELECT customer.id, customer.descriptive_name, customer.currency_code,
           customer.time_zone, customer.auto_tagging_enabled
    FROM customer
    LIMIT 1
  `);
  for (const r of custRows) {
    const c = r.customer ?? {};
    console.log(`Customer ID:   ${c.id}`);
    console.log(`Name:          ${c.descriptive_name}`);
    console.log(`Currency:      ${c.currency_code}`);
    console.log(`Time zone:     ${c.time_zone}`);
    console.log(`Auto-tagging:  ${c.auto_tagging_enabled}`);
  }

  // ---- Campaigns ---------------------------------------------------------
  console.log("\n========== CAMPAIGNS ==========");
  const campaignRows = await customer.query(`
    SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type,
           campaign.advertising_channel_sub_type, campaign.bidding_strategy_type,
           campaign.target_cpa.target_cpa_micros,
           campaign.maximize_conversions.target_cpa_micros,
           campaign.target_roas.target_roas,
           campaign.manual_cpc.enhanced_cpc_enabled,
           campaign_budget.amount_micros, campaign_budget.delivery_method,
           campaign_budget.name,
           metrics.impressions, metrics.clicks, metrics.cost_micros,
           metrics.conversions, metrics.ctr, metrics.average_cpc
    FROM campaign
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY metrics.cost_micros DESC
  `);

  if (campaignRows.length === 0) {
    console.log("(no campaigns)");
  }
  const seen = new Set<number>();
  for (const r of campaignRows) {
    const c = r.campaign ?? {};
    if (seen.has(Number(c.id))) continue;
    seen.add(Number(c.id));
    const b = r.campaign_budget ?? {};
    const m = r.metrics ?? {};
    console.log(`\n[${c.status}] ${c.name}`);
    console.log(`  ID:               ${c.id}`);
    console.log(`  Channel:          ${c.advertising_channel_type}${c.advertising_channel_sub_type ? ` / ${c.advertising_channel_sub_type}` : ""}`);
    console.log(`  Bidding strategy: ${c.bidding_strategy_type}`);
    if (c.target_cpa?.target_cpa_micros) {
      console.log(`    target CPA:     ${fmtMoney(micros(c.target_cpa.target_cpa_micros))}`);
    }
    if (c.maximize_conversions?.target_cpa_micros) {
      console.log(`    max-conv target CPA: ${fmtMoney(micros(c.maximize_conversions.target_cpa_micros))}`);
    }
    if (c.target_roas?.target_roas) {
      console.log(`    target ROAS:    ${c.target_roas.target_roas}`);
    }
    if (typeof c.manual_cpc?.enhanced_cpc_enabled === "boolean") {
      console.log(`    enhanced CPC:   ${c.manual_cpc.enhanced_cpc_enabled}`);
    }
    if (b.amount_micros) {
      console.log(`  Daily budget:     ${fmtMoney(micros(b.amount_micros))} (${b.delivery_method}) [${b.name}]`);
    }
    console.log(`  Last 30d:         imp ${m.impressions ?? 0} · clicks ${m.clicks ?? 0} · CTR ${(Number(m.ctr ?? 0) * 100).toFixed(2)}% · avg CPC ${fmtMoney(micros(m.average_cpc))} · cost ${fmtMoney(micros(m.cost_micros))} · conv ${Number(m.conversions ?? 0).toFixed(2)}`);
  }

  // ---- Ad groups ---------------------------------------------------------
  console.log("\n\n========== AD GROUPS ==========");
  const adGroupRows = await customer.query(`
    SELECT campaign.name, ad_group.id, ad_group.name, ad_group.status,
           ad_group.type, ad_group.cpc_bid_micros,
           metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
    FROM ad_group
    WHERE segments.date DURING LAST_30_DAYS
    ORDER BY campaign.name, metrics.cost_micros DESC
  `);
  let lastCampaign = "";
  for (const r of adGroupRows) {
    const ag = r.ad_group ?? {};
    const c = r.campaign ?? {};
    const m = r.metrics ?? {};
    if (c.name !== lastCampaign) {
      console.log(`\n--- ${c.name} ---`);
      lastCampaign = c.name as string;
    }
    console.log(`  [${ag.status}] ${ag.name} (id ${ag.id}) · cpc bid ${fmtMoney(micros(ag.cpc_bid_micros))} · imp ${m.impressions ?? 0} · clicks ${m.clicks ?? 0} · cost ${fmtMoney(micros(m.cost_micros))} · conv ${Number(m.conversions ?? 0).toFixed(2)}`);
  }

  // ---- Keywords (top 30 by cost) -----------------------------------------
  console.log("\n\n========== TOP KEYWORDS (last 30 days, by cost) ==========");
  const kwRows = await customer.query(`
    SELECT campaign.name, ad_group.name,
           ad_group_criterion.keyword.text,
           ad_group_criterion.keyword.match_type,
           ad_group_criterion.status,
           ad_group_criterion.cpc_bid_micros,
           metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.ctr
    FROM keyword_view
    WHERE segments.date DURING LAST_30_DAYS
      AND ad_group_criterion.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
    LIMIT 30
  `);
  for (const r of kwRows) {
    const k = r.ad_group_criterion?.keyword ?? {};
    const m = r.metrics ?? {};
    const c = r.campaign?.name ?? "?";
    const ag = r.ad_group?.name ?? "?";
    console.log(`  [${k.match_type}] "${k.text}"  · ${c} / ${ag}`);
    console.log(`     imp ${m.impressions ?? 0} · clicks ${m.clicks ?? 0} · CTR ${(Number(m.ctr ?? 0) * 100).toFixed(2)}% · cost ${fmtMoney(micros(m.cost_micros))} · conv ${Number(m.conversions ?? 0).toFixed(2)} · bid ${fmtMoney(micros(r.ad_group_criterion?.cpc_bid_micros))}`);
  }

  // ---- Keyword counts per campaign --------------------------------------
  console.log("\n\n========== KEYWORD COUNTS BY CAMPAIGN ==========");
  const kwCountRows = await customer.query(`
    SELECT campaign.name, ad_group_criterion.status
    FROM keyword_view
  `);
  const byCampaignStatus = new Map<string, Map<string, number>>();
  for (const r of kwCountRows) {
    const cn = (r.campaign?.name as string) ?? "?";
    const st = (r.ad_group_criterion?.status as string) ?? "?";
    if (!byCampaignStatus.has(cn)) byCampaignStatus.set(cn, new Map());
    const inner = byCampaignStatus.get(cn)!;
    inner.set(st, (inner.get(st) ?? 0) + 1);
  }
  for (const [cn, inner] of byCampaignStatus) {
    const parts = [...inner.entries()].map(([s, n]) => `${s}: ${n}`).join(", ");
    console.log(`  ${cn} → ${parts}`);
  }

  // ---- Conversion actions -----------------------------------------------
  console.log("\n\n========== CONVERSION ACTIONS ==========");
  const convRows = await customer.query(`
    SELECT conversion_action.id, conversion_action.name, conversion_action.status,
           conversion_action.type, conversion_action.category,
           conversion_action.primary_for_goal,
           conversion_action.counting_type,
           conversion_action.value_settings.default_value,
           conversion_action.click_through_lookback_window_days
    FROM conversion_action
    WHERE conversion_action.status != 'REMOVED'
  `);
  for (const r of convRows) {
    const ca = r.conversion_action ?? {};
    console.log(`  [${ca.status}] ${ca.name} (id ${ca.id}) · type ${ca.type} · category ${ca.category} · primary-for-goal ${ca.primary_for_goal} · lookback ${ca.click_through_lookback_window_days}d · default value ${ca.value_settings?.default_value ?? "—"}`);
  }

  // ---- Shared sets / negatives -----------------------------------------
  console.log("\n\n========== SHARED NEGATIVE LISTS ==========");
  const sharedRows = await customer.query(`
    SELECT shared_set.id, shared_set.name, shared_set.type, shared_set.status, shared_set.member_count
    FROM shared_set
    WHERE shared_set.status != 'REMOVED'
  `);
  for (const r of sharedRows) {
    const s = r.shared_set ?? {};
    console.log(`  [${s.status}] ${s.name} (${s.type}) — ${s.member_count} terms (id ${s.id})`);
  }

  // ---- Bidding strategies portfolio ------------------------------------
  console.log("\n\n========== PORTFOLIO BIDDING STRATEGIES ==========");
  const bsRows = await customer.query(`
    SELECT bidding_strategy.id, bidding_strategy.name, bidding_strategy.status,
           bidding_strategy.type, bidding_strategy.target_cpa.target_cpa_micros,
           bidding_strategy.target_roas.target_roas, bidding_strategy.campaign_count
    FROM bidding_strategy
    WHERE bidding_strategy.status != 'REMOVED'
  `);
  if (bsRows.length === 0) {
    console.log("(no portfolio strategies — campaigns use standard strategies inline)");
  }
  for (const r of bsRows) {
    const b = r.bidding_strategy ?? {};
    const tcpa = b.target_cpa?.target_cpa_micros ? fmtMoney(micros(b.target_cpa.target_cpa_micros)) : "—";
    const troas = b.target_roas?.target_roas ?? "—";
    console.log(`  [${b.status}] ${b.name} · type ${b.type} · campaigns ${b.campaign_count} · tCPA ${tcpa} · tROAS ${troas}`);
  }

  // ---- Account-level totals (last 30 days) -----------------------------
  console.log("\n\n========== ACCOUNT TOTALS (last 30 days) ==========");
  const totRows = await customer.query(`
    SELECT metrics.impressions, metrics.clicks, metrics.cost_micros,
           metrics.conversions, metrics.average_cpc
    FROM customer
    WHERE segments.date DURING LAST_30_DAYS
  `);
  for (const r of totRows) {
    const m = r.metrics ?? {};
    const cost = micros(m.cost_micros);
    const conv = Number(m.conversions ?? 0);
    console.log(`  Imp:        ${m.impressions ?? 0}`);
    console.log(`  Clicks:     ${m.clicks ?? 0}`);
    console.log(`  Spend:      ${fmtMoney(cost)}`);
    console.log(`  Avg CPC:    ${fmtMoney(micros(m.average_cpc))}`);
    console.log(`  Conv:       ${conv.toFixed(2)}`);
    console.log(`  CPA:        ${conv > 0 ? fmtMoney(cost / conv) : "—"}`);
  }

  console.log("\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
