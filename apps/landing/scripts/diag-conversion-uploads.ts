// Diagnose offline-conversion upload health: lists per-action upload-summary
// rows (including diagnostic counts), and per-day metrics for T1/T2/T3 over
// the last 14 days so we can correlate Google Ads' "Unparseable gclid"
// warning with our own upload attempts.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.join(process.cwd(), ".env") });

const T = {
  T1: "7596477974",
  T2: "7499129024",
  T3: "7596477518",
} as const;

function ago(d: number) {
  const dt = new Date();
  dt.setUTCDate(dt.getUTCDate() - d);
  return dt.toISOString().slice(0, 10);
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

  // 1) Per-action upload diagnostic summary (covers ALL upload attempts incl. failures)
  console.log("\n========== offline_conversion_upload_client_summary ==========");
  try {
    const summary = await cust.query(`
      SELECT offline_conversion_upload_client_summary.client,
             offline_conversion_upload_client_summary.status,
             offline_conversion_upload_client_summary.total_event_count,
             offline_conversion_upload_client_summary.successful_event_count,
             offline_conversion_upload_client_summary.success_rate,
             offline_conversion_upload_client_summary.pending_event_count,
             offline_conversion_upload_client_summary.last_upload_date_time,
             offline_conversion_upload_client_summary.daily_summaries,
             offline_conversion_upload_client_summary.job_summaries,
             offline_conversion_upload_client_summary.alerts
      FROM offline_conversion_upload_client_summary
    `);
    console.log(JSON.stringify(summary, null, 2));

  } catch (e) {
    console.log("client summary err:", (e as Error).message);
  }

  console.log("\n========== per-conversion-action upload summary ==========");
  try {
    const perAction = await cust.query(`
      SELECT conversion_action.id,
             conversion_action.name,
             conversion_action.status
      FROM conversion_action
      WHERE conversion_action.status != 'REMOVED'
    `);
    const idToName = new Map<string, string>();
    for (const r of perAction) {
      const a = (r as any).conversion_action ?? {};
      idToName.set(String(a.id), a.name);
    }

    // Pull conversion_upload_diagnostic resource (per-action error detail)
    try {
      const diag = await cust.query(`
        SELECT conversion_action.id, conversion_action.name,
               conversion_action.click_through_lookback_window_days,
               conversion_action.attribution_model_settings.attribution_model
        FROM conversion_action
        WHERE conversion_action.status != 'REMOVED'
      `);
      for (const r of diag) {
        const a = (r as any).conversion_action ?? {};
        console.log(`  ${a.name} (id ${a.id}) lookback=${a.click_through_lookback_window_days}d`);
      }
    } catch (e) { console.log("diag err:", (e as Error).message); }
  } catch (e) {
    console.log("  (offline_conversion_upload_client_summary not available):", (e as Error).message);
  }

  // 2) Per-conversion-action stats over the last 14 days (segments.date)
  console.log("\n\n========== last 14d — daily totals per conversion_action ==========");
  const from = ago(13);
  const to = ago(0);
  for (const [name, id] of Object.entries(T)) {
    console.log(`\n  ${name} (${id}):`);
    const rows = await cust.query(`
      SELECT segments.date,
             segments.conversion_action,
             metrics.conversions,
             metrics.all_conversions,
             metrics.conversions_value
      FROM customer
      WHERE segments.date BETWEEN '${from}' AND '${to}'
        AND segments.conversion_action = 'customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/conversionActions/${id}'
    `);
    for (const r of rows) {
      const m = (r as any).metrics ?? {};
      console.log(`    ${(r as any).segments?.date}  conv=${Number(m.conversions ?? 0).toFixed(2)}  all=${Number(m.all_conversions ?? 0).toFixed(2)}  val=${Number(m.conversions_value ?? 0).toFixed(2)}`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
