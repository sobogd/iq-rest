import type { Request } from "express";
import { getCurrencyByCountry, type SupportedCurrency } from "./stripe";
import { getMenuCurrencyByCountry } from "./menu-currency";

/**
 * Country resolution mirrors the original Next.js middleware:
 *   1. URL query param `?country=XX` (manual override, two letters)
 *   2. Cloudflare `cf-ipcountry` request header
 * No IP-based geo lookup — Cloudflare is the source of truth in production.
 *
 * `trusted: true` DROPS the `?country` override and reads Cloudflare only.
 * Use it on the money path (billing currency) — otherwise a client could force
 * a cheap-currency catalog (e.g. `?country=AR`) and pay a fraction of the price,
 * with the currency then locking onto the account.
 */
export function getRequestCountry(req: Request, opts?: { trusted?: boolean }): string | null {
  if (!opts?.trusted) {
    const urlCountry =
      typeof req.query?.country === "string" ? req.query.country.toUpperCase() : null;
    if (urlCountry && /^[A-Z]{2}$/.test(urlCountry)) return urlCountry;
  }

  const cf = req.headers["cf-ipcountry"];
  if (typeof cf === "string" && /^[A-Za-z]{2}$/.test(cf)) return cf.toUpperCase();

  return null;
}

/** Public-menu currency for a new restaurant — broad, geo-based, any ISO code. */
export function getRequestCurrency(req: Request): string {
  return getMenuCurrencyByCountry(getRequestCountry(req));
}

/** IQ Rest billing currency. A primitive, hardcoded country→currency map
 *  (see stripe.ts `BILLING_CURRENCY_BY_COUNTRY`). We intentionally do NOT read
 *  the nginx `x-currency` header or the `geo_currency` cookie — currency is a
 *  direct function of the detected country only, so it can't drift away from it
 *  (that drift is how a Swedish visitor got billed in USD). Always one of
 *  SUPPORTED_CURRENCIES; defaults to EUR. */
export function getRequestBillingCurrency(req: Request): SupportedCurrency {
  return getCurrencyByCountry(getRequestCountry(req));
}

/** Billing currency for the money path — same map, but the country is read from
 *  Cloudflare only (no `?country` override), so it can't be spoofed to bill in a
 *  cheaper currency. Use this anywhere a charge/subscription currency is set. */
export function getTrustedBillingCurrency(req: Request): SupportedCurrency {
  return getCurrencyByCountry(getRequestCountry(req, { trusted: true }));
}
