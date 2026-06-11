// Adds the negatives produced by propose-pt-negatives.ts to the Portugal
// campaign as campaign-level negative keywords. Idempotent: skips items that
// already exist on the campaign (by lower-cased text + match type).

import * as fs from "fs";
import * as path from "path";
import { GoogleAdsApi, enums } from "google-ads-api";
import * as dotenv from "dotenv";
dotenv.config();

const PORTUGAL_CAMPAIGN_ID = "23869785814";

interface Proposal {
  items: Array<{ text: string; match: number }>;
}

function matchEnum(m: number): number {
  // Google Ads API match-type ints match our dump's encoding directly.
  // 2=EXACT 3=PHRASE 4=BROAD.
  return m;
}

async function main() {
  const file = path.resolve(__dirname, "../tmp-pt-negatives-proposal.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as Proposal;

  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  });
  const customer = client.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  });

  // Fetch existing negatives on the Portugal campaign so we can dedup.
  const existingRows = await customer.query(`
    SELECT campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
    FROM campaign_criterion
    WHERE campaign.id = ${PORTUGAL_CAMPAIGN_ID}
      AND campaign_criterion.negative = TRUE
      AND campaign_criterion.type = 'KEYWORD'
      AND campaign_criterion.status != 'REMOVED'
  `);
  const seen = new Set(
    existingRows.map((r: any) => {
      const text = String(r.campaign_criterion.keyword.text || "").toLowerCase();
      const m = r.campaign_criterion.keyword.match_type as number;
      return `${m}|${text}`;
    }),
  );

  const ops: Array<{ create: any }> = [];
  for (const it of data.items) {
    const text = it.text.trim();
    if (!text) continue;
    const key = `${matchEnum(it.match)}|${text.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    ops.push({
      create: {
        campaign: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaigns/${PORTUGAL_CAMPAIGN_ID}`,
        negative: true,
        keyword: { text, match_type: matchEnum(it.match) },
      },
    });
  }

  console.log(`Existing on Portugal: ${existingRows.length}`);
  console.log(`Adding ${ops.length} new negatives`);
  if (ops.length === 0) return;

  // Google Ads mutate accepts up to 5000 operations; chunk modest for safety.
  const CHUNK = 200;
  let added = 0;
  for (let i = 0; i < ops.length; i += CHUNK) {
    const slice = ops.slice(i, i + CHUNK);
    const res = await customer.campaignCriteria.create(
      slice.map((o) => o.create),
      { validate_only: false, partial_failure: true },
    );
    added += slice.length;
    process.stdout.write(`  + ${added}/${ops.length}\r`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = res;
  }
  console.log(`\nDone. Added ${added} campaign negatives to Portugal (${PORTUGAL_CAMPAIGN_ID}).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
// keep enums import used (silences unused warning if no enum used directly)
void enums;
