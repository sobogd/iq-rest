// Apply bid modifiers to bad-performing hours via AD_SCHEDULE criteria.
// Bad hours (no signup, high spend over 30d): 13:00–14:00, 19:00–20:00, 21:00–23:00 → −50% (bid_modifier 0.5)
// All other hours: 1.0 (full bid). We MUST cover the whole 24h for each day —
// adding a partial schedule would restrict ads to only those slots.

import { GoogleAdsApi, enums } from "google-ads-api";
import { config } from "dotenv";
config();

const ACTIVE = ["IT", "ES", "PT"];
const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID!;

interface Slot {
  start: number; // hour 0..23
  end: number;   // hour 1..24
  modifier: number;
}
// Google Ads caps ad_schedule entries per day at 6. Merge bad-evening
// hours (19/21/22 — also pulls 20 along which had a single signup; minor loss
// vs simplicity). 5 slots/day × 7 days = 35 criteria per campaign.
const DAILY_SLOTS: Slot[] = [
  { start: 0,  end: 13, modifier: 1.0 },
  { start: 13, end: 14, modifier: 0.5 }, // bad
  { start: 14, end: 19, modifier: 1.0 },
  { start: 19, end: 23, modifier: 0.5 }, // bad block (19/21/22 + 20)
  { start: 23, end: 24, modifier: 1.0 },
];

const DAYS: { day: keyof typeof enums.DayOfWeek; label: string }[] = [
  { day: "MONDAY", label: "Mon" },
  { day: "TUESDAY", label: "Tue" },
  { day: "WEDNESDAY", label: "Wed" },
  { day: "THURSDAY", label: "Thu" },
  { day: "FRIDAY", label: "Fri" },
  { day: "SATURDAY", label: "Sat" },
  { day: "SUNDAY", label: "Sun" },
];

async function main() {
  const c = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const cust = c.Customer({
    customer_id: CUSTOMER_ID,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  // 1) Resolve campaign IDs
  const inList = ACTIVE.map((n) => `'${n}'`).join(",");
  const camps = await cust.query(`
    SELECT campaign.id, campaign.name
    FROM campaign
    WHERE campaign.name IN (${inList}) AND campaign.status = 'ENABLED'
  `);
  const campaignList: { id: string; name: string }[] = camps.map((r) => ({
    id: String(r.campaign?.id),
    name: String(r.campaign?.name),
  }));
  console.log("Target campaigns:", campaignList);

  // 2) Wipe existing AD_SCHEDULE criteria so we don't double up
  console.log("\nRemoving existing AD_SCHEDULE criteria...");
  for (const camp of campaignList) {
    const existing = await cust.query(`
      SELECT campaign_criterion.resource_name
      FROM campaign_criterion
      WHERE campaign.id = ${camp.id}
        AND campaign_criterion.type = 'AD_SCHEDULE'
        AND campaign_criterion.status != 'REMOVED'
    `);
    if (existing.length === 0) {
      console.log(`  ${camp.name}: nothing to remove`);
      continue;
    }
    const ops = existing.map((r) => r.campaign_criterion!.resource_name as string);
    try {
      await cust.campaignCriteria.remove(ops);
      console.log(`  ${camp.name}: removed ${ops.length}`);
    } catch (err) {
      console.error(`  ${camp.name}: remove failed`, err);
    }
  }

  // 3) Build new criteria: 7 days × 7 slots = 49 per campaign
  console.log("\nApplying new schedule + bid modifiers...");
  for (const camp of campaignList) {
    const ops = [];
    for (const d of DAYS) {
      for (const slot of DAILY_SLOTS) {
        ops.push({
          campaign: `customers/${CUSTOMER_ID}/campaigns/${camp.id}`,
          ad_schedule: {
            day_of_week: enums.DayOfWeek[d.day],
            start_hour: slot.start,
            start_minute: enums.MinuteOfHour.ZERO,
            end_hour: slot.end,
            end_minute: enums.MinuteOfHour.ZERO,
          },
          bid_modifier: slot.modifier,
        });
      }
    }
    try {
      const res = await cust.campaignCriteria.create(ops);
      console.log(`  ${camp.name}: created ${res.results?.length ?? ops.length} ad_schedule criteria`);
    } catch (err) {
      console.error(`  ${camp.name}: create failed`, err);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
