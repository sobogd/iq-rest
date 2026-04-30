import { cookies, headers } from "next/headers";
import {
  getCurrencyByCountry,
  supportedCurrencies,
  type SupportedCurrency,
} from "@/lib/country-currency-map";

export async function getCurrency(): Promise<SupportedCurrency> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get("currency")?.value;
  if (fromCookie && (supportedCurrencies as readonly string[]).includes(fromCookie)) {
    return fromCookie as SupportedCurrency;
  }
  const hdrs = await headers();
  const country = hdrs.get("cf-ipcountry");
  return getCurrencyByCountry(country);
}
