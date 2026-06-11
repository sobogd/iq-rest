// Deep-dive on conversion attribution: per-action lookback windows, attribution
// model, all_conversions vs primary conversions over a wider window so a delayed
// signup credit becomes visible.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

function micros(n: unknown) { return Number(n ?? 0) / 1_000_000; }
function fmt(eur: number) { return `€${eur.toFixed(2)}`; }
function dateOffset(d: number) {
  const dt = new Date();
  dt.setUTCDate(dt.getUTCDate() - d);
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
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

  // 1) Conversion-action settings
  console.log("\n========== CONVERSION ACTION SETTINGS ==========");
  const ca = await cust.query(`
    SELECT conversion_action.id, conversion_action.name,
           conversion_action.type, conversion_action.category,
           conversion_action.status, conversion_action.primary_for_goal,
           conversion_action.attribution_model_settings.attribution_model,
           conversion_action.attribution_model_settings.data_driven_model_status,
           conversion_action.click_through_lookback_window_days,
           conversion_action.view_through_lookback_window_days,
           conversion_action.counting_type,
           conversion_action.value_settings.default_value,
           conversion_action.value_settings.always_use_default_value,
           conversion_action.include_in_conversions_metric
    FROM conversion_action
    WHERE conversion_action.status != 'REMOVED'
  `);
  for (const r of ca) {
    const a = r.conversion_action ?? {};
    const v = a.value_settings ?? {};
    const att = a.attribution_model_settings ?? {};
    console.log(`\n  ${a.name}  (id ${a.id})`);
    console.log(`    primary_for_goal:       ${a.primary_for_goal}`);
    console.log(`    counting_type:          ${a.counting_type}`);
    console.log(`    click lookback days:    ${a.click_through_lookback_window_days}`);
    console.log(`    view lookback days:     ${a.view_through_lookback_window_days}`);
    console.log(`    attribution model:      ${att.attribution_model}  (data_driven status: ${att.data_driven_model_status})`);
    console.log(`    default value:          ${v.default_value}  (always_use_default: ${v.always_use_default_value})`);
    console.log(`    include_in_conv:        ${a.include_in_conversions_metric}`);
  }

  // 2) Wider window — last 30 days, by action, with all_conversions
  console.log("\n\n========== LAST 30 DAYS — primary vs all_conversions ==========");
  const from30 = dateOffset(29);
  const to0 = dateOffset(0);
  const totRows = await cust.query(`
    SELECT segments.conversion_action_name,
           metrics.conversions,
           metrics.conversions_value,
           metrics.all_conversions,
           metrics.all_conversions_value,
           metrics.view_through_conversions
    FROM customer
    WHERE segments.date BETWEEN '${from30}' AND '${to0}'
      AND metrics.all_conversions > 0
  `);
  const agg = new Map<string, { c: number; v: number; ac: number; av: number; vt: number }>();
  for (const r of totRows) {
    const name = String(r.segments?.conversion_action_name);
    const m = r.metrics ?? {};
    const cur = agg.get(name) ?? { c: 0, v: 0, ac: 0, av: 0, vt: 0 };
    cur.c += Number(m.conversions ?? 0);
    cur.v += Number(m.conversions_value ?? 0);
    cur.ac += Number(m.all_conversions ?? 0);
    cur.av += Number(m.all_conversions_value ?? 0);
    cur.vt += Number(m.view_through_conversions ?? 0);
    agg.set(name, cur);
  }
  for (const [name, x] of agg) {
    console.log(`  ${name.padEnd(40)} · primary ${x.c.toFixed(2)} · value ${fmt(x.v)} · all_conv ${x.ac.toFixed(2)} · all_value ${fmt(x.av)} · view-thru ${x.vt.toFixed(2)}`);
  }

  // 3) Last 7 days breakdown by day × action — see if delayed credit lands later
  console.log("\n\n========== LAST 7 DAYS — daily by action ==========");
  const from7 = dateOffset(6);
  const dayRows = await cust.query(`
    SELECT segments.date, segments.conversion_action_name,
           metrics.conversions, metrics.all_conversions
    FROM customer
    WHERE segments.date BETWEEN '${from7}' AND '${to0}'
      AND metrics.all_conversions > 0
    ORDER BY segments.date
  `);
  for (const r of dayRows) {
    const m = r.metrics ?? {};
    console.log(`  ${r.segments?.date} · ${String(r.segments?.conversion_action_name).padEnd(35)} · primary ${Number(m.conversions ?? 0).toFixed(2)} · all_conv ${Number(m.all_conversions ?? 0).toFixed(2)}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
