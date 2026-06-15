// One-time setup of the Google Ads offline (upload) conversion actions for the
// gclid-upload pipeline (mirror of Meta CAPI). Creates the two missing actions
// (ViewContent secondary, InitiateCheckout primary) and sets default values on
// the existing Registration (T2) + Purchase (T3) actions.
//
//   View         — UPLOAD_CLICKS, secondary (stats only), no value
//   Checkout     — UPLOAD_CLICKS, PRIMARY, default €1 (always)
//   Registration — existing T2, PRIMARY, default €5 (always)
//   Purchase     — existing T3, PRIMARY, default €80 (NOT forced — user uploads real value)
//
// Usage: npx tsx scripts/setup-google-conversion-actions.ts [--dry-run]

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), "..", "..", ".env") });

const DRY = process.argv.includes("--dry-run");

const T2_REGISTRATION = "7499129024"; // existing "T2 — Signup Verified"
const T3_PURCHASE = "7596477518";     // existing "T3 — Paid Subscription"

const eur = (n: number) => Math.round(n * 1_000_000);

async function main() {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const customer = client.Customer({
    customer_id: cid,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  console.log(DRY ? "\nDRY-RUN\n" : "\nLIVE\n");

  // Guard: don't duplicate View / Checkout if they already exist.
  const existing = await customer.query(
    `SELECT conversion_action.id, conversion_action.name FROM conversion_action WHERE conversion_action.status != 'REMOVED'`,
  );
  const byName = new Map<string, string>();
  for (const x of existing) byName.set(String((x as any).conversion_action.name), String((x as any).conversion_action.id));

  // 1. ViewContent — secondary, stats only
  const VIEW_NAME = "G — ViewContent (upload)";
  if (byName.has(VIEW_NAME)) {
    console.log(`View already exists: id ${byName.get(VIEW_NAME)}`);
  } else if (!DRY) {
    const r = await customer.conversionActions.create([{
      name: VIEW_NAME,
      type: enums.ConversionActionType.UPLOAD_CLICKS,
      category: enums.ConversionActionCategory.PAGE_VIEW,
      status: enums.ConversionActionStatus.ENABLED,
      primary_for_goal: false,
      counting_type: enums.ConversionActionCountingType.ONE_PER_CLICK,
      click_through_lookback_window_days: 90,
    }]);
    console.log(`View created: ${r.results[0].resource_name}`);
  } else console.log("[DRY] would create View (secondary, no value)");

  // 2. InitiateCheckout — primary, default €1 (always)
  const CHK_NAME = "G — InitiateCheckout (upload)";
  if (byName.has(CHK_NAME)) {
    console.log(`Checkout already exists: id ${byName.get(CHK_NAME)}`);
  } else if (!DRY) {
    const r = await customer.conversionActions.create([{
      name: CHK_NAME,
      type: enums.ConversionActionType.UPLOAD_CLICKS,
      category: enums.ConversionActionCategory.BEGIN_CHECKOUT,
      status: enums.ConversionActionStatus.ENABLED,
      primary_for_goal: true,
      counting_type: enums.ConversionActionCountingType.ONE_PER_CLICK,
      click_through_lookback_window_days: 90,
      value_settings: { default_value: 1, always_use_default_value: true },
    }]);
    console.log(`Checkout created: ${r.results[0].resource_name}`);
  } else console.log("[DRY] would create Checkout (primary, €1 always)");

  // 3. Registration (T2) — default €5 always
  // 4. Purchase (T3) — default €80, NOT forced (user uploads real value)
  if (!DRY) {
    await customer.conversionActions.update([
      {
        resource_name: `customers/${cid}/conversionActions/${T2_REGISTRATION}`,
        primary_for_goal: true,
        value_settings: { default_value: 5, always_use_default_value: true },
      },
      {
        resource_name: `customers/${cid}/conversionActions/${T3_PURCHASE}`,
        primary_for_goal: true,
        value_settings: { default_value: 80, always_use_default_value: false },
      },
    ]);
    console.log(`Registration (T2 ${T2_REGISTRATION}) → €5 always; Purchase (T3 ${T3_PURCHASE}) → €80 default (not forced)`);
  } else console.log("[DRY] would set T2=€5 always, T3=€80 default");

  // Final: print all upload-type actions + ids for env wiring
  const after = await customer.query(
    `SELECT conversion_action.id, conversion_action.name, conversion_action.type, conversion_action.status, conversion_action.primary_for_goal, conversion_action.value_settings.default_value, conversion_action.value_settings.always_use_default_value FROM conversion_action WHERE conversion_action.status != 'REMOVED' ORDER BY conversion_action.name`,
  );
  console.log("\n=== conversion actions now ===");
  for (const x of after) {
    const a = (x as any).conversion_action;
    console.log(`id ${a.id} | "${a.name}" | type=${a.type} primary=${a.primary_for_goal} value=${a.value_settings?.default_value} always=${a.value_settings?.always_use_default_value}`);
  }
}

main().catch((e) => { console.error("\nFAILED:", e?.errors ? JSON.stringify(e.errors, null, 2) : e); process.exit(1); });
