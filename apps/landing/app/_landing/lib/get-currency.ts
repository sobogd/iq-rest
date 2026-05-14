import { cookies } from "next/headers";
import {
  supportedCurrencies,
  type SupportedCurrency,
} from "@/lib/country-currency-map";

/** Currency comes from the `currency` cookie set by middleware (geo-derived).
 *  Reading only cookies — no headers() — keeps pages eligible for static caching
 *  beyond the first request. Falls back to EUR when the cookie is missing. */
export async function getCurrency(): Promise<SupportedCurrency> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get("currency")?.value;
  if (fromCookie && (supportedCurrencies as readonly string[]).includes(fromCookie)) {
    return fromCookie as SupportedCurrency;
  }
  return "EUR";
}
