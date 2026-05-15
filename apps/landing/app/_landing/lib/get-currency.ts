import { cookies } from "next/headers";
import type { SupportedCurrency } from "@/lib/country-currency-map";

/** All marketing pages now price in EUR regardless of visitor origin.
 *  The `cookies()` call intentionally keeps the calling page dynamic —
 *  `LandingHeader` reads `useSearchParams()` for its gclid check, which
 *  requires either a Suspense boundary or a dynamic parent. The simplest
 *  way to keep that working without wrapping every landing page in
 *  <Suspense> is to leave the pages dynamic. The return value itself is
 *  a hard-coded EUR. */
export async function getCurrency(): Promise<SupportedCurrency> {
  await cookies();
  return "EUR";
}
