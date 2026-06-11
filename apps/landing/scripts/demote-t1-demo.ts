// Move "T1 — Demo Engaged" from primary to secondary (observation only) so
// Smart Bidding optimises towards T2 Signup / T3 Paid instead.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

const T1_ID = "7596477974";

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

  console.log("Before:");
  const before = await cust.query(`
    SELECT conversion_action.id, conversion_action.name, conversion_action.primary_for_goal
    FROM conversion_action
    WHERE conversion_action.status = 'ENABLED'
  `);
  for (const r of before) {
    const a = r.conversion_action!;
    console.log(`  [${a.primary_for_goal ? "PRIMARY" : "secondary"}] ${a.name} (id ${a.id})`);
  }

  console.log("\nUpdating T1 → primary_for_goal=false ...");
  try {
    const res = await cust.conversionActions.update([
      {
        resource_name: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/conversionActions/${T1_ID}`,
        primary_for_goal: false,
      },
    ]);
    console.log(`  ✓ updated`, res.results?.[0]?.resource_name ?? "");
  } catch (err) {
    console.error(`  ✗ failed`, err);
    process.exit(1);
  }

  console.log("\nAfter:");
  const after = await cust.query(`
    SELECT conversion_action.id, conversion_action.name, conversion_action.primary_for_goal
    FROM conversion_action
    WHERE conversion_action.status = 'ENABLED'
  `);
  for (const r of after) {
    const a = r.conversion_action!;
    console.log(`  [${a.primary_for_goal ? "PRIMARY" : "secondary"}] ${a.name} (id ${a.id})`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
