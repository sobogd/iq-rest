// Google Ads API - Offline Conversion Upload via gclid + Click Lookup
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

export interface ClickInfo {
  gclid: string;
  campaignName: string;
  campaignId: string;
  adGroupName: string;
  adGroupId: string;
  keyword: string;
  matchType: string;
  clickType: string;
  device: string;
  adNetworkType: string;
  date: string;
  areaOfInterest: string;
  locationOfPresence: string;
}

export async function getClickInfo(gclid: string, date: string): Promise<ClickInfo | null> {
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
      click_view.gclid,
      campaign.name,
      campaign.id,
      ad_group.name,
      ad_group.id,
      click_view.keyword,
      click_view.keyword_info.text,
      click_view.keyword_info.match_type,
      click_view.area_of_interest.city,
      click_view.area_of_interest.country,
      click_view.area_of_interest.region,
      click_view.location_of_presence.city,
      click_view.location_of_presence.country,
      click_view.location_of_presence.region,
      segments.click_type,
      segments.device,
      segments.ad_network_type,
      segments.date
    FROM click_view
    WHERE segments.date = '${date}'
      AND click_view.gclid = '${gclid}'
  `);

  if (results.length === 0) return null;

  const row = results[0];

  const aoi = row.click_view?.area_of_interest;
  const lop = row.click_view?.location_of_presence;

  return {
    gclid: String(row.click_view?.gclid ?? ""),
    campaignName: String(row.campaign?.name ?? ""),
    campaignId: String(row.campaign?.id ?? ""),
    adGroupName: String(row.ad_group?.name ?? ""),
    adGroupId: String(row.ad_group?.id ?? ""),
    keyword: String(row.click_view?.keyword_info?.text ?? row.click_view?.keyword ?? ""),
    matchType: String(row.click_view?.keyword_info?.match_type ?? ""),
    clickType: String(row.segments?.click_type ?? ""),
    device: String(row.segments?.device ?? ""),
    adNetworkType: String(row.segments?.ad_network_type ?? ""),
    date: String(row.segments?.date ?? ""),
    areaOfInterest: [aoi?.city, aoi?.region, aoi?.country].filter(Boolean).join(", "),
    locationOfPresence: [lop?.city, lop?.region, lop?.country].filter(Boolean).join(", "),
  };
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
