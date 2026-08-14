import { DEFAULT_PRICING_CATALOG } from "@iq-rest/pricing";

// Headline EUR prices rendered as JSON-LD `price` strings (2 decimals).
// Single source for structured data across home / pricing / feature pages —
// derived from the live à-la-carte catalog (billing-features-constructor), so
// a price change there propagates to all markup. Values are the yearly-billing
// per-month rates (the "from" price the pages advertise).
//
// The pre-constructor Free/Basic/Pro table that used to live here is retired —
// runtime prices come from the catalog via `@iq-rest/pricing` (from-price.tsx,
// pricing-quiz.tsx); nothing on the landing reads plan-tier prices anymore.
const EUR = DEFAULT_PRICING_CATALOG.currencies.EUR;

export const SCHEMA_PRICE_MENU_EUR = EUR.menu.yr.toFixed(2); // "9.90"
export const SCHEMA_PRICE_RESERVATIONS_EUR = EUR.reservations.yr.toFixed(2); // "7.00"
export const SCHEMA_PRICE_ORDERS_KDS_EUR = EUR.ordersKds.yr.toFixed(2); // "11.00"
export const SCHEMA_PRICE_DOMAIN_EUR = EUR.domain.yr.toFixed(2); // "4.00"
