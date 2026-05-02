// Set daily budget for all 4 campaigns to a uniform amount.
// Usage: npx tsx scripts/set-all-budgets.ts                — defaults €10/day
//        npx tsx scripts/set-all-budgets.ts 7              — €7/day

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const NEW_BUDGET_EUR = parseFloat(process.argv[2] || "10");

const CAMPAIGN_NAMES = [
  "IT — Search — QR Menu (auto)",
  "DE — Search — QR Speisekarte (auto)",
  "FR — Search — Menu QR (auto)",
  "ES — Search — Carta QR (auto)",
];

async function main() {
  if (Number.isNaN(NEW_BUDGET_EUR) || NEW_BUDGET_EUR <= 0) {
    console.error("Invalid budget");
    process.exit(1);
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

  console.log(`Setting daily budget to €${NEW_BUDGET_EUR.toFixed(2)} on ${CAMPAIGN_NAMES.length} campaigns\n`);

  for (const name of CAMPAIGN_NAMES) {
    const rows = await customer.query(
      `SELECT campaign.id, campaign.name, campaign_budget.resource_name, campaign_budget.amount_micros
       FROM campaign
       WHERE campaign.name = '${name.replace(/'/g, "\\'")}'`,
    );
    if (rows.length === 0) {
      console.log(`  skip "${name}" — not found`);
      continue;
    }
    const r: any = rows[0];
    const oldEur = Number(r.campaign_budget.amount_micros) / 1_000_000;
    const newMicros = Math.round((NEW_BUDGET_EUR * 1_000_000) / 10_000) * 10_000;

    if (Math.round(oldEur * 100) === Math.round(NEW_BUDGET_EUR * 100)) {
      console.log(`  "${name}": €${oldEur.toFixed(2)} (already)`);
      continue;
    }

    await customer.campaignBudgets.update([
      { resource_name: r.campaign_budget.resource_name, amount_micros: newMicros },
    ]);
    console.log(`  "${name}": €${oldEur.toFixed(2)} → €${NEW_BUDGET_EUR.toFixed(2)} ✓`);
  }

  console.log(`\n✓ Done.`);
}

main().catch((e) => {
  console.error("FAILED:", e);
  if (e?.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
