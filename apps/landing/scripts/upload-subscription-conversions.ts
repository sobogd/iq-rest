// Manually upload Subscribe/Purchase click conversions (T3 — Paid Subscription)
// for the given gclids. The auto-send cron intentionally does not handle this
// tier — the owner uploads real subscriptions by hand.
//
// No value is passed: the action's default (€80) applies.
//
// Usage: npx tsx scripts/upload-subscription-conversions.ts <gclid> [<gclid> ...]

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), "..", "..", ".env") });

/** "yyyy-MM-dd HH:mm:ss+HH:MM" in Europe/Madrid (the account timezone). */
function madridDateTime(ms: number): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).formatToParts(new Date(ms));
  const p = (t: string) => parts.find((x) => x.type === t)!.value;
  const asUtc = Date.UTC(+p("year"), +p("month") - 1, +p("day"), +p("hour") === 24 ? 0 : +p("hour"), +p("minute"), +p("second"));
  const offMin = Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
  const sign = offMin >= 0 ? "+" : "-";
  const abs = Math.abs(offMin);
  const oh = String(Math.floor(abs / 60)).padStart(2, "0");
  const om = String(abs % 60).padStart(2, "0");
  const hh = p("hour") === "24" ? "00" : p("hour");
  return `${p("year")}-${p("month")}-${p("day")} ${hh}:${p("minute")}:${p("second")}${sign}${oh}:${om}`;
}

async function main() {
  const gclids = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  if (gclids.length === 0) {
    console.error("Usage: npx tsx scripts/upload-subscription-conversions.ts <gclid> [<gclid> ...]");
    process.exit(1);
  }

  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const actionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID_SUBSCRIPTION!;
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const customer = client.Customer({
    customer_id: cid,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  const when = madridDateTime(Date.now());
  const conversions = gclids.map((gclid) => ({
    gclid,
    conversion_action: `customers/${cid}/conversionActions/${actionId}`,
    conversion_date_time: when,
  }));

  console.log(`Uploading ${conversions.length} Subscription conversion(s) at ${when} …`);
  const res = await customer.conversionUploads.uploadClickConversions({
    customer_id: cid,
    conversions,
    partial_failure: true,
  } as never);

  const pf = (res as { partial_failure_error?: unknown }).partial_failure_error;
  if (pf) {
    console.error("PARTIAL FAILURE:");
    console.error(JSON.stringify(pf, null, 2));
  }
  console.log("Results:");
  console.log(JSON.stringify((res as { results?: unknown }).results ?? [], null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
