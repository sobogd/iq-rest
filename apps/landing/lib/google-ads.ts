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
  conversions: number;
}

export interface AdGroupHourly {
  campaignName: string;
  adGroupName: string;
  hours: HourlyData[];
  totalClicks: number;
  totalImpressions: number;
  totalCostMicros: number;
  totalConversions: number;
}

export async function getAdGroupsHourly(date: string): Promise<AdGroupHourly[]> {
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
      campaign.name,
      ad_group.name,
      segments.hour,
      metrics.clicks,
      metrics.impressions,
      metrics.cost_micros,
      metrics.average_cpc,
      metrics.conversions
    FROM ad_group
    WHERE campaign.status = 'ENABLED'
      AND ad_group.status != 'REMOVED'
      AND segments.date = '${date}'
  `);

  const map = new Map<string, { campaignName: string; adGroupName: string; hours: HourlyData[] }>();

  for (const row of results) {
    const campaignName = String(row.campaign?.name ?? "");
    const adGroupName = String(row.ad_group?.name ?? "");
    const key = `${campaignName}|${adGroupName}`;

    const entry = map.get(key) || { campaignName, adGroupName, hours: [] };
    entry.hours.push({
      hour: Number(row.segments?.hour ?? 0),
      clicks: Number(row.metrics?.clicks ?? 0),
      impressions: Number(row.metrics?.impressions ?? 0),
      costMicros: Number(row.metrics?.cost_micros ?? 0),
      averageCpcMicros: row.metrics?.average_cpc != null ? Number(row.metrics.average_cpc) : null,
      conversions: Number(row.metrics?.conversions ?? 0),
    });
    map.set(key, entry);
  }

  return Array.from(map.values()).map((entry) => {
    const sorted = entry.hours.sort((a, b) => a.hour - b.hour);
    return {
      ...entry,
      hours: sorted,
      totalClicks: sorted.reduce((s, h) => s + h.clicks, 0),
      totalImpressions: sorted.reduce((s, h) => s + h.impressions, 0),
      totalCostMicros: sorted.reduce((s, h) => s + h.costMicros, 0),
      totalConversions: sorted.reduce((s, h) => s + h.conversions, 0),
    };
  });
}

export interface WeeklyHourData {
  hour: number;
  avgClicks: number;
  avgImpressions: number;
  avgCostMicros: number;
  avgCpcMicros: number | null;
  minAvgCpcMicros: number | null;
  maxAvgCpcMicros: number | null;
  avgConversions: number;
}

export interface AdGroupWeekly {
  campaignName: string;
  adGroupName: string;
  hours: WeeklyHourData[];
  totalClicks: number;
  totalImpressions: number;
  totalCostMicros: number;
  totalConversions: number;
  minAvgCpcMicros: number | null;
  maxAvgCpcMicros: number | null;
}

export async function getAdGroupsWeekly(): Promise<AdGroupWeekly[]> {
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
      campaign.name,
      ad_group.name,
      segments.date,
      segments.hour,
      metrics.clicks,
      metrics.impressions,
      metrics.cost_micros,
      metrics.average_cpc,
      metrics.conversions
    FROM ad_group
    WHERE campaign.status = 'ENABLED'
      AND ad_group.status != 'REMOVED'
      AND segments.date DURING LAST_7_DAYS
  `);

  // Group: adGroup -> hour -> array of daily values
  const map = new Map<string, {
    campaignName: string;
    adGroupName: string;
    hourData: Map<number, { clicks: number; impressions: number; costMicros: number; cpc: number | null; conversions: number }[]>;
  }>();

  for (const row of results) {
    const campaignName = String(row.campaign?.name ?? "");
    const adGroupName = String(row.ad_group?.name ?? "");
    const key = `${campaignName}|${adGroupName}`;
    const hour = Number(row.segments?.hour ?? 0);

    const entry = map.get(key) || { campaignName, adGroupName, hourData: new Map() };
    const hourList = entry.hourData.get(hour) || [];
    hourList.push({
      clicks: Number(row.metrics?.clicks ?? 0),
      impressions: Number(row.metrics?.impressions ?? 0),
      costMicros: Number(row.metrics?.cost_micros ?? 0),
      cpc: row.metrics?.average_cpc != null ? Number(row.metrics.average_cpc) : null,
      conversions: Number(row.metrics?.conversions ?? 0),
    });
    entry.hourData.set(hour, hourList);
    map.set(key, entry);
  }

  return Array.from(map.values()).map((entry) => {
    const hours: WeeklyHourData[] = [];
    let totalClicks = 0;
    let totalImpressions = 0;
    let totalCostMicros = 0;
    let totalConversions = 0;
    const allCpcs: number[] = [];

    for (let h = 0; h < 24; h++) {
      const samples = entry.hourData.get(h) || [];
      const n = samples.length || 1;
      const sumClicks = samples.reduce((s, d) => s + d.clicks, 0);
      const sumImpr = samples.reduce((s, d) => s + d.impressions, 0);
      const sumCost = samples.reduce((s, d) => s + d.costMicros, 0);
      const sumConv = samples.reduce((s, d) => s + d.conversions, 0);
      const cpcs = samples.map((d) => d.cpc).filter((v): v is number => v != null && v > 0);

      totalClicks += sumClicks;
      totalImpressions += sumImpr;
      totalCostMicros += sumCost;
      totalConversions += sumConv;
      allCpcs.push(...cpcs);

      const avgCpc = cpcs.length > 0
        ? Math.round(cpcs.reduce((s, v) => s + v, 0) / cpcs.length)
        : null;

      hours.push({
        hour: h,
        avgClicks: Math.round((sumClicks / n) * 10) / 10,
        avgImpressions: Math.round((sumImpr / n) * 10) / 10,
        avgCostMicros: Math.round(sumCost / n),
        avgCpcMicros: avgCpc,
        minAvgCpcMicros: cpcs.length > 0 ? Math.min(...cpcs) : null,
        maxAvgCpcMicros: cpcs.length > 0 ? Math.max(...cpcs) : null,
        avgConversions: Math.round((sumConv / n) * 100) / 100,
      });
    }

    return {
      campaignName: entry.campaignName,
      adGroupName: entry.adGroupName,
      hours,
      totalClicks,
      totalImpressions,
      totalCostMicros,
      totalConversions,
      minAvgCpcMicros: allCpcs.length > 0 ? Math.min(...allCpcs) : null,
      maxAvgCpcMicros: allCpcs.length > 0 ? Math.max(...allCpcs) : null,
    };
  });
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
