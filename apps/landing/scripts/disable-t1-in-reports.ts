// Stop counting T1 — Demo Engaged in the "Conversions" reporting column.
// It already isn't a primary goal (so Smart Bidding ignores it); this just
// cleans up the dashboard so reports show only Signup / Paid.

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

  const before = await cust.query(`
    SELECT conversion_action.id, conversion_action.name,
           conversion_action.primary_for_goal,
           conversion_action.include_in_conversions_metric
    FROM conversion_action
    WHERE conversion_action.id = ${T1_ID}
  `);
  for (const r of before) {
    const a = r.conversion_action!;
    console.log(`Before: ${a.name} · primary=${a.primary_for_goal} · include_in_conv=${a.include_in_conversions_metric}`);
  }

  const res = await cust.conversionActions.update([
    {
      resource_name: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/conversionActions/${T1_ID}`,
      include_in_conversions_metric: false,
    },
  ]);
  console.log("Updated:", res.results?.[0]?.resource_name ?? "");

  const after = await cust.query(`
    SELECT conversion_action.id, conversion_action.name,
           conversion_action.primary_for_goal,
           conversion_action.include_in_conversions_metric
    FROM conversion_action
    WHERE conversion_action.id = ${T1_ID}
  `);
  for (const r of after) {
    const a = r.conversion_action!;
    console.log(`After:  ${a.name} · primary=${a.primary_for_goal} · include_in_conv=${a.include_in_conversions_metric}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
