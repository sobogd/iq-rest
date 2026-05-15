import type { SupportedCurrency } from "@/lib/country-currency-map";

/** All marketing pages now price in EUR regardless of visitor origin.
 *  Kept as `async` returning a Promise<SupportedCurrency> so every existing
 *  `const currency = await getCurrency()` callsite stays valid without
 *  touching dozens of locale pages. Crucially, no `cookies()`/`headers()`
 *  call → callers stay eligible for static prerender. */
export async function getCurrency(): Promise<SupportedCurrency> {
  return "EUR";
}
