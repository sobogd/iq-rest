// Google Ads API - Offline Conversion Upload via gclid + Keyword Bids
import { GoogleAdsApi } from "google-ads-api";

let client: GoogleAdsApi | null = null;

function getClient(): GoogleAdsApi {
  if (!client) {
    client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
    });
  }
  return client;
}

export interface HourlyData {
  hour: number;
  clicks: number;
  impressions: number;
  costMicros: number;
  averageCpcMicros: number | null;
}

export interface KeywordBid {
  resourceName: string;
  keyword: string;
  matchType: string;
  campaignName: string;
  adGroupName: string;
  status: string;
  cpcBidMicros: number | null;
  effectiveCpcBidMicros: number | null;
  averageCpc: number | null;
  clicks: number;
  impressions: number;
  costMicros: number;
  conversions: number;
  firstPageCpcMicros: number | null;
  topOfPageCpcMicros: number | null;
  firstPositionCpcMicros: number | null;
  estimatedAddClicksAtFirstPosition: number | null;
  estimatedAddCostAtFirstPosition: number | null;
  yesterdayHours: HourlyData[];
}

export async function getKeywordBids(
  dateRange: string = "LAST_30_DAYS"
): Promise<{ keywords: KeywordBid[]; yesterdayError: string | null }> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "");

  if (!customerId) {
    throw new Error("Missing GOOGLE_ADS_CUSTOMER_ID");
  }

  const api = getClient();
  const customer = api.Customer({
    customer_id: customerId,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    login_customer_id: loginCustomerId || undefined,
  });

  const mainQuery = customer.query(`
    SELECT
      ad_group_criterion.resource_name,
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      ad_group_criterion.cpc_bid_micros,
      ad_group_criterion.effective_cpc_bid_micros,
      ad_group_criterion.status,
      campaign.name,
      ad_group.name,
      ad_group_criterion.position_estimates.first_page_cpc_micros,
      ad_group_criterion.position_estimates.top_of_page_cpc_micros,
      ad_group_criterion.position_estimates.first_position_cpc_micros,
      ad_group_criterion.position_estimates.estimated_add_clicks_at_first_position_cpc,
      ad_group_criterion.position_estimates.estimated_add_cost_at_first_position_cpc,
      metrics.average_cpc,
      metrics.clicks,
      metrics.impressions,
      metrics.cost_micros,
      metrics.conversions
    FROM keyword_view
    WHERE campaign.status = 'ENABLED'
      AND ad_group_criterion.status != 'REMOVED'
      AND segments.date DURING ${dateRange}
  `);

  const results = await mainQuery;

  // Yesterday hourly via keyword_view with segments.hour
  // eslint-disable-next-line
  let yesterdayResults: any[] = [];
  let yesterdayError: string | null = null;
  try {
    yesterdayResults = await customer.query(`
      SELECT
        ad_group_criterion.keyword.text,
        ad_group_criterion.keyword.match_type,
        campaign.name,
        ad_group.name,
        segments.hour,
        segments.date,
        metrics.clicks,
        metrics.impressions,
        metrics.cost_micros,
        metrics.average_cpc
      FROM keyword_view
      WHERE campaign.status = 'ENABLED'
        AND segments.date DURING YESTERDAY
        AND metrics.clicks > 0
    `);
  } catch (err) {
    yesterdayError = err instanceof Error ? err.message : JSON.stringify(err);
    console.error("[Google Ads] Yesterday hourly query failed:", yesterdayError);
  }

  // Build yesterday hourly map: key -> HourlyData[]
  const yesterdayMap = new Map<string, HourlyData[]>();
  for (const row of yesterdayResults) {
    const keyword = String(row.ad_group_criterion?.keyword?.text ?? "");
    const matchType = String(row.ad_group_criterion?.keyword?.match_type ?? "UNKNOWN");
    const campaignName = String(row.campaign?.name ?? "");
    const adGroupName = String(row.ad_group?.name ?? "");
    const key = `${keyword}|${matchType}|${campaignName}|${adGroupName}`;
    const list = yesterdayMap.get(key) || [];
    list.push({
      hour: Number(row.segments?.hour ?? 0),
      clicks: Number(row.metrics?.clicks ?? 0),
      impressions: Number(row.metrics?.impressions ?? 0),
      costMicros: Number(row.metrics?.cost_micros ?? 0),
      averageCpcMicros: row.metrics?.average_cpc != null ? Number(row.metrics.average_cpc) : null,
    });
    yesterdayMap.set(key, list);
  }

  // keyword_view returns one row per keyword per day — aggregate into totals
  const map = new Map<string, KeywordBid>();

  for (const row of results) {
    const keyword = String(row.ad_group_criterion?.keyword?.text ?? "");
    const matchType = String(row.ad_group_criterion?.keyword?.match_type ?? "UNKNOWN");
    const campaignName = String(row.campaign?.name ?? "");
    const adGroupName = String(row.ad_group?.name ?? "");
    const key = `${keyword}|${matchType}|${campaignName}|${adGroupName}`;

    const existing = map.get(key);
    const clicks = Number(row.metrics?.clicks ?? 0);
    const impressions = Number(row.metrics?.impressions ?? 0);
    const costMicros = Number(row.metrics?.cost_micros ?? 0);
    const conversions = Number(row.metrics?.conversions ?? 0);

    if (existing) {
      existing.clicks += clicks;
      existing.impressions += impressions;
      existing.costMicros += costMicros;
      existing.conversions += conversions;
    } else {
      const ydHours = (yesterdayMap.get(key) || []).sort((a, b) => a.hour - b.hour);
      map.set(key, {
        resourceName: String(row.ad_group_criterion?.resource_name ?? ""),
        keyword,
        matchType,
        campaignName,
        adGroupName,
        status: String(row.ad_group_criterion?.status ?? "UNKNOWN"),
        cpcBidMicros: row.ad_group_criterion?.cpc_bid_micros != null
          ? Number(row.ad_group_criterion.cpc_bid_micros)
          : null,
        effectiveCpcBidMicros: row.ad_group_criterion?.effective_cpc_bid_micros != null
          ? Number(row.ad_group_criterion.effective_cpc_bid_micros)
          : null,
        averageCpc: null, // will compute below
        clicks,
        impressions,
        costMicros,
        conversions,
        firstPageCpcMicros: row.ad_group_criterion?.position_estimates?.first_page_cpc_micros != null
          ? Number(row.ad_group_criterion.position_estimates.first_page_cpc_micros)
          : null,
        topOfPageCpcMicros: row.ad_group_criterion?.position_estimates?.top_of_page_cpc_micros != null
          ? Number(row.ad_group_criterion.position_estimates.top_of_page_cpc_micros)
          : null,
        firstPositionCpcMicros: row.ad_group_criterion?.position_estimates?.first_position_cpc_micros != null
          ? Number(row.ad_group_criterion.position_estimates.first_position_cpc_micros)
          : null,
        estimatedAddClicksAtFirstPosition: row.ad_group_criterion?.position_estimates?.estimated_add_clicks_at_first_position_cpc != null
          ? Number(row.ad_group_criterion.position_estimates.estimated_add_clicks_at_first_position_cpc)
          : null,
        estimatedAddCostAtFirstPosition: row.ad_group_criterion?.position_estimates?.estimated_add_cost_at_first_position_cpc != null
          ? Number(row.ad_group_criterion.position_estimates.estimated_add_cost_at_first_position_cpc)
          : null,
        yesterdayHours: ydHours,
      });
    }
  }

  // Compute average CPC from total cost / total clicks
  for (const kw of map.values()) {
    kw.averageCpc = kw.clicks > 0 ? Math.round(kw.costMicros / kw.clicks) : null;
  }

  return { keywords: Array.from(map.values()), yesterdayError };
}

export interface KeywordHourlyStats {
  date: string;
  hour: number;
  clicks: number;
  impressions: number;
  averageCpcMicros: number | null;
  costMicros: number;
  conversions: number;
}

export async function getKeywordHourlyStats(
  resourceName: string,
  dateRange: string = "LAST_7_DAYS"
): Promise<KeywordHourlyStats[]> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "");

  if (!customerId) {
    throw new Error("Missing GOOGLE_ADS_CUSTOMER_ID");
  }

  const api = getClient();
  const customer = api.Customer({
    customer_id: customerId,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    login_customer_id: loginCustomerId || undefined,
  });

  const results = await customer.query(`
    SELECT
      segments.date,
      segments.hour,
      metrics.clicks,
      metrics.impressions,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions
    FROM keyword_view
    WHERE ad_group_criterion.resource_name = '${resourceName}'
      AND segments.date DURING ${dateRange}
  `);

  return results.map((row) => ({
    date: String(row.segments?.date ?? ""),
    hour: Number(row.segments?.hour ?? 0),
    clicks: Number(row.metrics?.clicks ?? 0),
    impressions: Number(row.metrics?.impressions ?? 0),
    averageCpcMicros: row.metrics?.average_cpc != null ? Number(row.metrics.average_cpc) : null,
    costMicros: Number(row.metrics?.cost_micros ?? 0),
    conversions: Number(row.metrics?.conversions ?? 0),
  }));
}

export async function updateKeywordBid(
  resourceName: string,
  cpcBidMicros: number
): Promise<{ success: boolean; error?: string }> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "");

  if (!customerId) {
    return { success: false, error: "Missing GOOGLE_ADS_CUSTOMER_ID" };
  }

  try {
    const api = getClient();
    const customer = api.Customer({
      customer_id: customerId,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      login_customer_id: loginCustomerId || undefined,
    });

    await customer.mutateResources([
      {
        entity: "ad_group_criterion",
        operation: "update",
        resource: {
          resource_name: resourceName,
          cpc_bid_micros: cpcBidMicros,
        },
      },
    ]);

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err, null, 2);
    console.error("[Google Ads] Update bid error:", message);
    return { success: false, error: message };
  }
}

export async function batchUpdateKeywordBids(
  updates: { resourceName: string; cpcBidMicros: number }[]
): Promise<{ success: boolean; error?: string }> {
  if (updates.length === 0) return { success: true };

  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "");

  if (!customerId) {
    return { success: false, error: "Missing GOOGLE_ADS_CUSTOMER_ID" };
  }

  try {
    const api = getClient();
    const customer = api.Customer({
      customer_id: customerId,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      login_customer_id: loginCustomerId || undefined,
    });

    await customer.mutateResources(
      updates.map((u) => ({
        entity: "ad_group_criterion" as const,
        operation: "update" as const,
        resource: {
          resource_name: u.resourceName,
          cpc_bid_micros: u.cpcBidMicros,
        },
      }))
    );

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err, null, 2);
    console.error("[Google Ads] Batch update bids error:", message);
    return { success: false, error: message };
  }
}

export async function uploadClickConversion(
  gclid: string,
  conversionDateTime: string,
  conversionValue?: number,
  customConversionActionId?: string
): Promise<{ success: boolean; error?: string; details?: string }> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "");
  const conversionActionId = customConversionActionId || process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;

  const missing = [
    !process.env.GOOGLE_ADS_CLIENT_ID && "GOOGLE_ADS_CLIENT_ID",
    !process.env.GOOGLE_ADS_CLIENT_SECRET && "GOOGLE_ADS_CLIENT_SECRET",
    !process.env.GOOGLE_ADS_REFRESH_TOKEN && "GOOGLE_ADS_REFRESH_TOKEN",
    !process.env.GOOGLE_ADS_DEVELOPER_TOKEN && "GOOGLE_ADS_DEVELOPER_TOKEN",
    !customerId && "GOOGLE_ADS_CUSTOMER_ID",
    !conversionActionId && "Conversion Action ID",
  ].filter(Boolean);
  if (missing.length > 0) {
    return { success: false, error: `Missing: ${missing.join(", ")}` };
  }

  try {
    const api = getClient();
    const customer = api.Customer({
      customer_id: customerId!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      login_customer_id: loginCustomerId || undefined,
    });

    // Format datetime: "yyyy-mm-dd hh:mm:ss+|-hh:mm"
    const dt = new Date(conversionDateTime);
    const formatted = dt
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d{3}Z$/, "+00:00");

    const response = await customer.conversionUploads.uploadClickConversions({
      customer_id: customerId!,
      conversions: [
        {
          gclid,
          conversion_action: `customers/${customerId}/conversionActions/${conversionActionId}`,
          conversion_date_time: formatted,
          ...(conversionValue !== undefined && {
            conversion_value: conversionValue,
            currency_code: "EUR",
          }),
        },
      ],
      partial_failure: true,
      validate_only: false,
    } as Parameters<typeof customer.conversionUploads.uploadClickConversions>[0]);

    if (response.partial_failure_error) {
      const raw = response.partial_failure_error.message;
      const msg =
        typeof raw === "string" ? raw : JSON.stringify(response.partial_failure_error, null, 2);
      console.error("[Google Ads] Partial failure:", msg);
      return {
        success: false,
        error: msg,
        details: JSON.stringify(response, null, 2),
      };
    }

    console.log(
      "[Google Ads] Conversion uploaded for gclid:",
      gclid.slice(0, 12) + "..."
    );
    return {
      success: true,
      details: JSON.stringify(response.results || response, null, 2),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err, null, 2);
    console.error("[Google Ads] Error:", message);
    return { success: false, error: message, details: message };
  }
}
