import { NextRequest, NextResponse } from "next/server";
import { asSupportedCurrency } from "@/lib/country-currency-map";

// First API route in this app — everything else in the geo/currency flow
// lives in middleware.ts. This one exists so the pricing page's currency
// selector (and the footer's) can persist an explicit pick into the same
// `geo_currency` cookie middleware seeds from IP geo, without a full page
// reload.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const currency = asSupportedCurrency(body?.currency);

  const response = NextResponse.json({ currency });
  response.cookies.set("geo_currency", currency, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
  return response;
}
