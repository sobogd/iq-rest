// 1) Drop daily budget to €20 for IT/ES/PT campaigns (was €30).
// 2) Report conversions by hour of day for the active campaigns over last 30d
//    and last 7d so you can spot the best performing hours.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

const ACTIVE = ["IT", "ES", "PT"];
const NEW_BUDGET_EUR = 20;

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
  const inList = ACTIVE.map((n) => `'${n}'`).join(",");

  // 1) Find each campaign's budget resource and current amount
  console.log("\n========== BUDGETS BEFORE ==========");
  const budgetRows = await cust.query(`
    SELECT campaign.name, campaign.id, campaign_budget.id,
           campaign_budget.resource_name, campaign_budget.amount_micros
    FROM campaign
    WHERE campaign.name IN (${inList}) AND campaign.status = 'ENABLED'
  `);

  const budgetUpdates: { resource_name: string; name: string }[] = [];
  for (const r of budgetRows) {
    const name = r.campaign?.name as string;
    const cur = micros(r.campaign_budget?.amount_micros);
    const rn = r.campaign_budget?.resource_name as string;
    console.log(`  ${name} → ${fmt(cur)}/day (${rn})`);
    budgetUpdates.push({ resource_name: rn, name });
  }

  // 2) Push new budget
  console.log(`\n========== APPLYING ${fmt(NEW_BUDGET_EUR)}/day ==========`);
  for (const b of budgetUpdates) {
    try {
      const res = await cust.campaignBudgets.update([
        { resource_name: b.resource_name, amount_micros: NEW_BUDGET_EUR * 1_000_000 },
      ]);
      console.log(`✓ ${b.name} budget set to ${fmt(NEW_BUDGET_EUR)}/day`, res.results?.[0]?.resource_name ?? "");
    } catch (err) {
      console.error(`✗ ${b.name}`, err);
    }
  }

  // 3) Conversions by hour — last 30d
  for (const days of [30, 7]) {
    const from = dateOffset(days - 1);
    const to = dateOffset(0);
    console.log(`\n\n========== CONVERSIONS BY HOUR · last ${days}d (${from}–${to}) ==========`);
    const convRows = await cust.query(`
      SELECT segments.hour, segments.conversion_action_name, metrics.conversions
      FROM customer
      WHERE segments.date BETWEEN '${from}' AND '${to}'
        AND metrics.conversions > 0
    `);
    const convMap = new Map<number, Record<string, number>>();
    for (const r of convRows) {
      const h = Number(r.segments?.hour ?? 0);
      const name = String(r.segments?.conversion_action_name);
      const conv = Number(r.metrics?.conversions ?? 0);
      const cur = convMap.get(h) ?? {};
      cur[name] = (cur[name] ?? 0) + conv;
      convMap.set(h, cur);
    }
    const ccRows = await cust.query(`
      SELECT segments.hour, metrics.clicks, metrics.cost_micros
      FROM customer
      WHERE segments.date BETWEEN '${from}' AND '${to}'
        AND metrics.impressions > 0
    `);
    const ccMap = new Map<number, { clicks: number; cost: number }>();
    for (const r of ccRows) {
      const h = Number(r.segments?.hour ?? 0);
      const cur = ccMap.get(h) ?? { clicks: 0, cost: 0 };
      cur.clicks += Number(r.metrics?.clicks ?? 0);
      cur.cost += micros(r.metrics?.cost_micros);
      ccMap.set(h, cur);
    }
    console.log(`  hour | T1 demo | T2 signup | clicks | cost     | CPA(T2)`);
    for (let h = 0; h < 24; h++) {
      const b = convMap.get(h) ?? {};
      const cc = ccMap.get(h) ?? { clicks: 0, cost: 0 };
      const t1 = b["T1 — Demo Engaged"] ?? 0;
      const t2 = b["T2 — Signup Verified"] ?? 0;
      if (t1 + t2 + cc.clicks === 0) continue;
      const cpaT2 = t2 > 0 ? fmt(cc.cost / t2) : "—";
      console.log(`  ${String(h).padStart(2, "0")}:00 | ${t1.toFixed(1).padStart(7)} | ${t2.toFixed(1).padStart(9)} | ${String(cc.clicks).padStart(6)} | ${fmt(cc.cost).padEnd(8)} | ${cpaT2}`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
