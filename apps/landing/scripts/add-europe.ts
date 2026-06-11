// Add ALL European countries as positive location targets to the campaign.
// Dry run by default; --apply to add missing ones.

import { GoogleAdsApi } from "google-ads-api";
import { config } from "dotenv";
config();

const C = "23927315038";
const APPLY = process.argv.includes("--apply");

// All European sovereign states + a few dependencies (ISO-2).
const EUROPE = [
  "AL","AD","AT","BY","BE","BA","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR",
  "HU","IS","IE","IT","XK","LV","LI","LT","LU","MT","MD","MC","ME","NL","MK","NO",
  "PL","PT","RO","RU","SM","RS","SK","SI","ES","SE","CH","UA","GB","VA","GI","FO",
];

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

  // resolve ISO codes -> country geo_target_constants
  const codes = EUROPE.map((x) => `'${x}'`).join(",");
  const g = await cust.query(`
    SELECT geo_target_constant.id, geo_target_constant.name, geo_target_constant.country_code,
           geo_target_constant.target_type, geo_target_constant.status
    FROM geo_target_constant
    WHERE geo_target_constant.country_code IN (${codes}) AND geo_target_constant.target_type = 'Country'`);
  const wanted = new Map<string, string>(); // id -> "Name (CC)"
  for (const r of g as any[]) {
    if (r.geo_target_constant.status === 2 || r.geo_target_constant.status === "ENABLED" || true)
      wanted.set(String(r.geo_target_constant.id), `${r.geo_target_constant.name} (${r.geo_target_constant.country_code})`);
  }
  const foundCodes = new Set((g as any[]).map((r) => r.geo_target_constant.country_code));
  const noConstant = EUROPE.filter((x) => !foundCodes.has(x));

  // current targets/exclusions on campaign
  const cur = await cust.query(`
    SELECT campaign_criterion.location.geo_target_constant, campaign_criterion.negative
    FROM campaign_criterion WHERE campaign.id = ${C} AND campaign_criterion.type = 'LOCATION'`);
  const already = new Set<string>();
  const negSet = new Set<string>();
  for (const r of cur as any[]) {
    const id = r.campaign_criterion.location.geo_target_constant.split("/")[1];
    if (r.campaign_criterion.negative) negSet.add(id); else already.add(id);
  }

  const toAdd = [...wanted.keys()].filter((id) => !already.has(id));
  const reEnableFromNeg = toAdd.filter((id) => negSet.has(id));

  console.log(`\n=== ADD EUROPE to campaign ${C} ===`);
  console.log(`Europe constants resolved: ${wanted.size}`);
  if (noConstant.length) console.log(`no Country constant for: ${noConstant.join(", ")}`);
  console.log(`already targeted: ${[...wanted.keys()].filter((id) => already.has(id)).length}`);
  console.log(`MISSING to add: ${toAdd.length}`);
  console.log(`  -> ${toAdd.map((id) => wanted.get(id)).sort().join(", ")}`);
  if (reEnableFromNeg.length) console.log(`(note: ${reEnableFromNeg.length} of these are currently EXCLUDED and will be added as positive while exclusion remains — none expected)`);

  if (!APPLY) { console.log(`\n(dry run — pass --apply)\n`); return; }

  const campRes = `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaigns/${C}`;
  const ops = toAdd.map((id) => ({ campaign: campRes, location: { geo_target_constant: `geoTargetConstants/${id}` } }));
  await cust.campaignCriteria.create(ops);
  console.log(`\nadded ${ops.length} country targets.`);

  const after = await cust.query(`
    SELECT campaign_criterion.negative FROM campaign_criterion
    WHERE campaign.id = ${C} AND campaign_criterion.type = 'LOCATION'`);
  const pos = (after as any[]).filter((r) => !r.campaign_criterion.negative).length;
  console.log(`campaign now has ${pos} positive country targets.`);
}

main().catch((e) => { console.error(JSON.stringify(e, null, 2)); process.exit(1); });
