// Keep only EEA countries + UK (GB) as positive location targets; remove the rest.
// EEA = EU27 + Iceland, Liechtenstein, Norway. UK kept explicitly per request.
// Dry run by default; --apply to remove.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

const C = "23927315038";
const APPLY = process.argv.includes("--apply");

const EEA = new Set([
  // EU 27
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT",
  "LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE",
  // EEA non-EU
  "IS","LI","NO",
]);
const KEEP_EXTRA = new Set(["GB"]); // UK
const ALLOWED = new Set([...EEA, ...KEEP_EXTRA]);

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

  // current positive location criteria
  const cur = await cust.query(`
    SELECT campaign_criterion.criterion_id, campaign_criterion.location.geo_target_constant
    FROM campaign_criterion
    WHERE campaign.id = ${C} AND campaign_criterion.type = 'LOCATION' AND campaign_criterion.negative = false`);
  const ids = (cur as any[]).map((r) => r.campaign_criterion.location.geo_target_constant.split("/")[1]);
  const g = await cust.query(`
    SELECT geo_target_constant.id, geo_target_constant.name, geo_target_constant.country_code
    FROM geo_target_constant WHERE geo_target_constant.id IN (${ids.join(",")})`);
  const code: Record<string, { name: string; cc: string }> = {};
  for (const r of g as any[]) code[String(r.geo_target_constant.id)] = { name: r.geo_target_constant.name, cc: r.geo_target_constant.country_code };

  const remove: { crit: string; geoId: string; label: string }[] = [];
  const keep: string[] = [];
  for (const r of cur as any[]) {
    const geoId = r.campaign_criterion.location.geo_target_constant.split("/")[1];
    const info = code[geoId];
    const cc = info?.cc ?? "?";
    const label = `${info?.name ?? geoId} (${cc})`;
    if (ALLOWED.has(cc)) keep.push(label);
    else remove.push({ crit: String(r.campaign_criterion.criterion_id), geoId, label });
  }

  console.log(`\n=== TRIM TO EEA + UK on ${C} ===`);
  console.log(`KEEP (${keep.length}): ${keep.sort().join(", ")}`);
  console.log(`\nREMOVE (${remove.length}): ${remove.map((r) => r.label).sort().join(", ")}`);

  if (!APPLY) { console.log(`\n(dry run — pass --apply)\n`); return; }

  const names = remove.map((r) => `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaignCriteria/${C}~${r.crit}`);
  await cust.campaignCriteria.remove(names);
  console.log(`\nremoved ${names.length}. Now ${keep.length} positive country targets.`);
}

main().catch((e) => { console.error(JSON.stringify(e, null, 2)); process.exit(1); });
