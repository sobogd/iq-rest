// Conversions broken down by action over the last N days.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

const DAYS = parseInt(process.argv[2] || "2", 10);
function dateOffset(d: number) {
  const dt = new Date();
  dt.setUTCDate(dt.getUTCDate() - d);
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
}
function micros(n: unknown) { return Number(n ?? 0) / 1_000_000; }
function fmt(eur: number) { return `€${eur.toFixed(2)}`; }

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

  const from = dateOffset(DAYS - 1);
  const to = dateOffset(0);
  console.log(`\nWindow: ${from} → ${to}\n`);

  // Per campaign × conversion_action
  console.log("========== CONV BREAKDOWN BY CAMPAIGN × ACTION ==========");
  const rows = await cust.query(`
    SELECT campaign.name,
           segments.conversion_action_name,
           segments.conversion_action_category,
           metrics.conversions,
           metrics.conversions_value,
           metrics.all_conversions,
           metrics.all_conversions_value
    FROM campaign
    WHERE campaign.status = 'ENABLED'
      AND segments.date BETWEEN '${from}' AND '${to}'
      AND metrics.conversions > 0
    ORDER BY campaign.name, segments.conversion_action_name
  `);
  for (const r of rows) {
    const m = r.metrics ?? {};
    console.log(`  ${r.campaign?.name?.padEnd(8)} · ${String(r.segments?.conversion_action_name).padEnd(35)} · conv ${Number(m.conversions ?? 0).toFixed(2)} · value ${fmt(Number(m.conversions_value ?? 0))} · all_conv ${Number(m.all_conversions ?? 0).toFixed(2)}`);
  }

  console.log("\n\n========== TOTALS BY ACTION ==========");
  const tot = await cust.query(`
    SELECT segments.conversion_action_name,
           metrics.conversions,
           metrics.conversions_value,
           metrics.all_conversions,
           metrics.all_conversions_value
    FROM customer
    WHERE segments.date BETWEEN '${from}' AND '${to}'
      AND metrics.conversions > 0
  `);
  const agg = new Map<string, { c: number; v: number; ac: number; av: number }>();
  for (const r of tot) {
    const name = String(r.segments?.conversion_action_name);
    const m = r.metrics ?? {};
    const cur = agg.get(name) ?? { c: 0, v: 0, ac: 0, av: 0 };
    cur.c += Number(m.conversions ?? 0);
    cur.v += Number(m.conversions_value ?? 0);
    cur.ac += Number(m.all_conversions ?? 0);
    cur.av += Number(m.all_conversions_value ?? 0);
    agg.set(name, cur);
  }
  for (const [name, x] of agg) {
    console.log(`  ${name.padEnd(40)} · primary_conv ${x.c.toFixed(2)} · value ${fmt(x.v)} · all_conv ${x.ac.toFixed(2)} · all_value ${fmt(x.av)}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
