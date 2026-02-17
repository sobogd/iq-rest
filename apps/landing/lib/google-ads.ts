// Google Ads API - Offline Conversion Upload via gclid

const GOOGLE_ADS_API_VERSION = "v23";

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get access token: ${text}`);
  }

  const data: TokenResponse = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

/**
 * Upload a click conversion to Google Ads
 * @param gclid - Google Click ID
 * @param conversionDateTime - ISO string of when the conversion happened
 * @param conversionAction - Conversion action resource name (customers/{id}/conversionActions/{id})
 */
export async function uploadClickConversion(
  gclid: string,
  conversionDateTime: string,
  conversionValue?: number
): Promise<{ success: boolean; error?: string }> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;

  const missing = [
    !customerId && "GOOGLE_ADS_CUSTOMER_ID",
    !developerToken && "GOOGLE_ADS_DEVELOPER_TOKEN",
    !conversionActionId && "GOOGLE_ADS_CONVERSION_ACTION_ID",
  ].filter(Boolean);
  if (missing.length > 0) {
    return { success: false, error: `Missing: ${missing.join(", ")}` };
  }

  try {
    const accessToken = await getAccessToken();

    // Format datetime as required by Google Ads: "yyyy-mm-dd hh:mm:ss+|-hh:mm"
    const dt = new Date(conversionDateTime);
    const formatted = dt
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d{3}Z$/, "+00:00");

    const url = `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${customerId}:uploadClickConversions`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": developerToken!,
        "Content-Type": "application/json",
        ...(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID && {
          "login-customer-id": process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
        }),
      },
      body: JSON.stringify({
        conversions: [
          {
            gclid,
            conversionAction: `customers/${customerId}/conversionActions/${conversionActionId}`,
            conversionDateTime: formatted,
            ...(conversionValue !== undefined && {
              conversionValue,
              currencyCode: "EUR",
            }),
          },
        ],
        partialFailure: true,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[Google Ads] Upload failed:", res.status, text);
      // Parse JSON error if possible, otherwise show status
      try {
        const errJson = JSON.parse(text);
        const msg = errJson?.error?.message || errJson?.error?.status || text;
        return { success: false, error: `Google Ads ${res.status}: ${msg}` };
      } catch {
        return { success: false, error: `Google Ads API error ${res.status}` };
      }
    }

    const data = await res.json();

    // Check for partial failure errors
    if (data.partialFailureError) {
      console.error(
        "[Google Ads] Partial failure:",
        JSON.stringify(data.partialFailureError)
      );
      return {
        success: false,
        error: data.partialFailureError.message || "Partial failure",
      };
    }

    console.log("[Google Ads] Conversion uploaded for gclid:", gclid.slice(0, 12) + "...");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Google Ads] Error uploading conversion:", message);
    return { success: false, error: message };
  }
}
