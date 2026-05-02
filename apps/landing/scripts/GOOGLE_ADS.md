# Google Ads automation scripts

CLI tooling for managing IQ Rest paid Search campaigns via Google Ads API.
All scripts read credentials from `.env` (`GOOGLE_ADS_*` keys). Run with `npx tsx`.

## Auth setup

`.env` must contain (already provisioned for prod):

```
GOOGLE_ADS_CLIENT_ID
GOOGLE_ADS_CLIENT_SECRET
GOOGLE_ADS_REFRESH_TOKEN
GOOGLE_ADS_DEVELOPER_TOKEN
GOOGLE_ADS_CUSTOMER_ID         # 6803239831  — IT/DE/FR/ES ad account
GOOGLE_ADS_LOGIN_CUSTOMER_ID   # 3424878580  — MCC manager
GOOGLE_ADS_CONVERSION_ACTION_ID
GOOGLE_ADS_CONVERSION_ACTION_ID_VIEWS
GOOGLE_ADS_CONVERSION_ACTION_ID_SUBSCRIPTION
```

Customer IDs: 10 digits, no dashes. `LOGIN_CUSTOMER_ID` = MCC; `CUSTOMER_ID` = the
child ad account where campaigns live.

---

## Diagnostic

### `list-accessible-customers.ts`
Lists every Google Ads customer the OAuth refresh token can access. Use when you
hit "No customer found" errors to verify which IDs are reachable.

```bash
npx tsx scripts/list-accessible-customers.ts
```

---

## Keyword research

One script per market. Each script:

- Calls Google Ads `KeywordPlanIdeaService.generateKeywordIdeas`
- Up to 20 seed keywords per request (API limit)
- Targets country geo + language constant
- Prints top-60 ideas sorted by avg monthly searches
- Dumps full result to `scripts/keyword-research-<cc>.json` for later reuse by
  campaign-creation scripts (per-keyword bid lookup)

| Market   | Script                              | Output                             |
| -------- | ----------------------------------- | ---------------------------------- |
| Italy    | `keyword-research.ts`               | `keyword-research-it.json`         |
| Germany  | `keyword-research-germany.ts`       | `keyword-research-de.json`         |
| France   | `keyword-research-france.ts`        | `keyword-research-fr.json`         |
| Spain    | `keyword-research-spain.ts`         | `keyword-research-es.json`         |
| Croatia  | `keyword-research-croatia.ts`       | `keyword-research-hr.json`         |
| Serbia   | `keyword-research-serbia.ts`        | `keyword-research-rs.json`         |

Run example:

```bash
npx tsx scripts/keyword-research-france.ts
```

To research a new market: clone one of the scripts, change country geo
(`geoTargetConstants/<id>`), language (`languageConstants/<id>`), seed keywords.
Common geo/language IDs:

- IT geo `2380` lang `1004`
- DE geo `2276` lang `1001`
- FR geo `2250` lang `1002`
- ES geo `2724` lang `1003`
- HR geo `2191` lang `1039` (often rejected — script falls back to no-language)
- RS geo `2688` lang `1140` (often rejected)

---

## Campaign creation

One script per market. Creates a Search campaign with:

- 4 ad groups (QR Intent, Digital Menu, Create Intent, Verticals)
- Per-keyword bids = `low_top_of_page_bid × 1.10`, floor €0.20, billable-unit rounded
- Heavy negative-keyword list (chains, free-seekers, templates, fast-food)
- 3 RSAs per group, all with localized "from €6.90/month" pinned at HEADLINE_2
- 4 sitelink assets pointing at landing anchors (`#features`, `#how`, `#pricing`, `#faq`)
- 8 callout assets

| Market  | Script                            | Campaign name                         |
| ------- | --------------------------------- | ------------------------------------- |
| Italy   | `create-italy-campaign.ts`        | `IT — Search — QR Menu (auto)`        |
| Germany | `create-germany-campaign.ts`      | `DE — Search — QR Speisekarte (auto)` |
| France  | `create-france-campaign.ts`       | `FR — Search — Menu QR (auto)`        |
| Spain   | `create-spain-campaign.ts`        | `ES — Search — Carta QR (auto)`       |

Defaults:
- Budget: €15/day (Italy €12) — adjust later via `set-all-budgets.ts`
- Status: `ENABLED` on create — runs LIVE immediately
- Targeting: PRESENCE_OR_INTEREST country, PRESENCE for negative
- Bidding: Manual CPC, no Enhanced CPC

Run:

```bash
# Dry-run first to see structure
npx tsx scripts/create-france-campaign.ts --dry-run

# Live
npx tsx scripts/create-france-campaign.ts
```

Pre-flight check aborts if a campaign with the same name already exists. Either
delete the old one in Google Ads UI, or change `CAMPAIGN_NAME` in the script.

---

## Updates / maintenance

### `set-all-budgets.ts`
Sets the daily budget on every campaign in `CAMPAIGN_NAMES`.

```bash
npx tsx scripts/set-all-budgets.ts          # €10/day default
npx tsx scripts/set-all-budgets.ts 7        # €7/day
npx tsx scripts/set-all-budgets.ts 25       # €25/day
```

Skips campaigns already at the requested amount.

### `report-search-terms.ts`
Search-terms report — actual queries that triggered ad impressions across
all 4 campaigns over the last N days. Sorted by clicks descending. Highlights
top wasted-spend candidates (≥2 clicks, 0 conversions) at the bottom.

```bash
npx tsx scripts/report-search-terms.ts             # last 7 days
npx tsx scripts/report-search-terms.ts 30          # last 30 days
npx tsx scripts/report-search-terms.ts 7 --no-conv # only zero-conv queries
```

**Run weekly.** Review wasted-spend candidates → feed irrelevant terms into
`add-shared-negatives.ts`.

### `add-shared-negatives.ts`
Adds a hardcoded list of negative keywords (PHRASE match) to all 4 campaigns at
once. Idempotent — checks existing negatives first, only adds missing ones.

Edit `NEW_NEGATIVES` array in the script before running. Workflow:

1. `npx tsx scripts/report-search-terms.ts 7` → spot bad queries
2. Edit `NEW_NEGATIVES` in `add-shared-negatives.ts`
3. `npx tsx scripts/add-shared-negatives.ts` → applied to all 4 campaigns

Note: PHRASE-match negatives are token-based — `gratuit` won't catch
`gratuitement`. Add every morphological form explicitly.

### `update-italy-bids-low.ts`
Lowers all ad-group default bids in IT campaign to "low top-of-page" range.
Was used to switch from top-1 placement bidding to page-1-bottom. Effectively
historical — superseded by per-keyword bidding below.

### `update-italy-perkeyword-bids.ts`
Sets per-keyword bid override = `low_top_of_page_bid × 1.10` for every keyword
in the IT campaign that has CPC data in `keyword-research-it.json`. Keywords
without CPC data keep the ad-group default. Re-runnable.

```bash
npx tsx scripts/update-italy-perkeyword-bids.ts
```

To do the same for other markets: clone the script, change `CAMPAIGN_NAME` and
`RESEARCH_PATH`. Italy/Germany/France/Spain campaigns are already created with
per-keyword bids inline (see the create-* scripts), so this is mainly for
re-applying after re-running keyword research.

### `update-italy-ads-pin-price.ts`
Removes existing RSAs in the IT campaign and replaces them with new ones that
pin "Da €6,90/mese" at HEADLINE_2 across every ad. Was used once to retrofit
pricing into RSAs. New campaigns (DE/FR/ES) already have price pinned by the
create-* script.

---

## Common gotchas

- **EUR billable unit is 10 000 micros (€0.01).** Any bid_micros must be a
  multiple of 10 000 or the API rejects with `VALUE_NOT_MULTIPLE_OF_BILLABLE_UNIT`.
  All scripts round via `Math.round(eur * 1_000_000 / 10_000) * 10_000`.

- **EU campaigns require `contains_eu_political_advertising`** field on create.
  Set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING`.

- **Keyword Planner caps at 20 seed keywords** per call. Pick the highest-signal
  seeds — Google generates hundreds of related ideas from each.

- **Croatian (1039) and Serbian (1140) language constants are often rejected** by
  the Keyword Planner. Scripts fall back to no-language constraint when they hit
  the error.

- **Customer ID must NOT have dashes.** Format: `6803239831` (10 digits).

- **Pre-existing scripts are excluded from `tsc` build** via `tsconfig.json`
  exclude — they have type-mismatch with `google-ads-api` lib that doesn't matter
  at runtime but breaks `next build`. Don't move them out of `scripts/`.

---

## Typical workflow for a new market

1. Pick country geo + language constants from Google Ads docs.
2. Edit `keyword-research.ts` template into `keyword-research-<cc>.ts`. Set
   geo/lang and 20 seed keywords (mix native lang + English tech terms).
3. Run it. Inspect output. If too thin (< ~500 monthly relevant searches),
   market not ready for paid Search — skip or test with €3/day.
4. Clone `create-italy-campaign.ts` to `create-<market>-campaign.ts`.
   Edit campaign name, geo, language, landing URL, native price headline,
   ad-group structure, RSAs in target language, negatives list.
5. Run with `--dry-run` first. Verify ad-group / keyword / negatives counts.
6. Run for real. Default `ENABLED` status — campaign goes LIVE immediately.
7. Monitor in Google Ads UI: `https://ads.google.com/aw/campaigns?ocid=6803239831`
8. Adjust budget across all campaigns at once via `set-all-budgets.ts`.
