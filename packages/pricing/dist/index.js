"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// @iq-rest/pricing — à-la-carte price catalog + volume-discount + quote compute.
//
// The SINGLE source of truth for prices (billing-features-constructor). The live
// catalog is stored in the DB (PricingConfig singleton) and edited from the
// dashboard admin; DEFAULT_PRICING_CATALOG here is the seed + fallback. The
// landing quiz, the dashboard constructor and Stripe ad-hoc checkout all compute
// amounts through computeAccountQuote so they can never drift.
//
// Model (Model A): venue price = menu(base) + Σ selected add-ons. Account total =
// Σ venue prices × (1 − volumeDiscount(N)), where N = number of billing venues.
// Amounts in the catalog are MAJOR units (e.g. 9.9); checkout converts to cents.
// ─────────────────────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PRICING_CATALOG = exports.DEFAULT_VOLUME_DISCOUNTS = void 0;
exports.volumeDiscount = volumeDiscount;
exports.computeVenuePriceCents = computeVenuePriceCents;
exports.computeVenuePrice = computeVenuePrice;
exports.computeAccountQuote = computeAccountQuote;
exports.selectionFromFlags = selectionFromFlags;
exports.flagsFromSelection = flagsFromSelection;
// ─── Volume discount (§Q1) ───────────────────────────────────────────────────
// N=1 → 0%. 2–4 → yr 25% / mo 15%. 5+ → yr 50% / mo 25%.
exports.DEFAULT_VOLUME_DISCOUNTS = {
    "2-4": { mo: 0.15, yr: 0.25 },
    "5+": { mo: 0.25, yr: 0.5 },
};
function volumeDiscount(discounts, n, cycle) {
    const key = cycle === "year" ? "yr" : "mo";
    if (n >= 5)
        return discounts["5+"][key];
    if (n >= 2)
        return discounts["2-4"][key];
    return 0;
}
// ─── Default catalog (seed / fallback) ───────────────────────────────────────
// Explicit per-currency prices (owner-approved). EUR is the reference; the rest
// mirror its value at ≈ local FX, rounded to nice psychological numbers. 21
// currencies. All editable later in the dashboard admin (PricingConfig row).
// High-inflation currencies (ARS/TRY/COP/CLP) need periodic manual refresh.
const p = (mo, yr) => ({ mo, yr });
const cur = (menu, reservations, ordersKds, domain) => ({
    menu: p(menu[0], menu[1]),
    reservations: p(reservations[0], reservations[1]),
    ordersKds: p(ordersKds[0], ordersKds[1]),
    domain: p(domain[0], domain[1]),
});
const DEFAULT_CURRENCIES = {
    // code:            menu          reservations   ordersKds      domain      (mo, yr)
    EUR: cur([14.9, 9.9], [9, 7], [13, 11], [5, 4]),
    USD: cur([15.9, 10.9], [9.9, 7.9], [14.9, 11.9], [5.9, 4.9]),
    GBP: cur([12.9, 8.9], [7.9, 5.9], [11.9, 8.9], [4.9, 3.9]),
    CHF: cur([14.9, 9.9], [9, 7], [13, 11], [5, 4]),
    NOK: cur([169, 109], [99, 79], [149, 119], [59, 44]),
    SEK: cur([169, 109], [99, 79], [149, 119], [59, 44]),
    DKK: cur([109, 79], [69, 54], [99, 84], [39, 29]),
    PLN: cur([59, 45], [39, 29], [55, 45], [25, 19]),
    CZK: cur([379, 249], [229, 179], [329, 269], [129, 99]),
    HUF: cur([5900, 3900], [3490, 2790], [4990, 3990], [1990, 1490]),
    ISK: cur([2290, 1490], [1290, 990], [1990, 1490], [690, 490]),
    MXN: cur([299, 199], [129, 89], [189, 129], [79, 49]),
    AUD: cur([24.9, 16.9], [14.9, 10.9], [19.9, 16.9], [8.9, 5.9]),
    RSD: cur([1790, 1190], [990, 790], [1490, 1190], [590, 390]),
    BRL: cur([89, 59], [49, 39], [79, 59], [29, 19]),
    COP: cur([64900, 42900], [38900, 29900], [55900, 46900], [21900, 16900]),
    CLP: cur([15900, 9900], [9900, 6900], [13900, 11900], [4900, 3900]),
    PEN: cur([59, 39], [35, 29], [49, 44], [19, 15]),
    UYU: cur([649, 429], [399, 299], [559, 469], [219, 169]),
    ARS: cur([16900, 10900], [9900, 7900], [14900, 11900], [5900, 3900]),
    TRY: cur([549, 369], [349, 269], [499, 419], [189, 149]),
};
exports.DEFAULT_PRICING_CATALOG = {
    currencies: DEFAULT_CURRENCIES,
    volumeDiscounts: exports.DEFAULT_VOLUME_DISCOUNTS,
};
// ─── Quote computation ───────────────────────────────────────────────────────
// Per-venue price/month IN CENTS for the chosen cycle. Integer cents throughout
// keeps the arithmetic exact (a discount like ×0.85 on a 2-decimal price would
// otherwise lose a half-cent to float error). A menuOnline=false venue → 0.
function computeVenuePriceCents(pricing, sel, cycle) {
    if (!sel.menuOnline)
        return 0;
    const k = cycle === "year" ? "yr" : "mo";
    const c = (v) => Math.round(v * 100);
    let p = c(pricing.menu[k]);
    if (sel.reservations)
        p += c(pricing.reservations[k]);
    if (sel.ordersKds)
        p += c(pricing.ordersKds[k]);
    if (sel.domain)
        p += c(pricing.domain[k]);
    return p;
}
// Per-venue price/month in MAJOR units (for display).
function computeVenuePrice(pricing, sel, cycle) {
    return computeVenuePriceCents(pricing, sel, cycle) / 100;
}
// The whole-account quote: sum venues, apply the volume discount for N billing
// venues, produce the amount Stripe charges per interval (and its cents value).
function computeAccountQuote(catalog, currency, venues, cycle) {
    const pricing = catalog.currencies[currency] ?? catalog.currencies.EUR;
    const billing = venues.filter((v) => v.menuOnline);
    const n = billing.length;
    const subtotalCents = billing.reduce((sum, v) => sum + computeVenuePriceCents(pricing, v, cycle), 0);
    const discount = volumeDiscount(catalog.volumeDiscounts, n, cycle);
    // Integer cents: subtotal × (1 − d) is exact to the half-cent; round half-up.
    const perMonthAfterCents = Math.round(subtotalCents * (1 - discount));
    const amountCents = cycle === "year" ? Math.round(subtotalCents * (1 - discount) * 12) : perMonthAfterCents;
    return {
        currency,
        cycle,
        interval: cycle,
        billingVenues: n,
        discount,
        subtotalPerMonth: subtotalCents / 100,
        perMonthAfterDiscount: perMonthAfterCents / 100,
        amountMajor: amountCents / 100,
        amountCents,
    };
}
// ─── Restaurant feature flags ⇄ VenueSelection ───────────────────────────────
// Bridge between the persisted Restaurant.feat* columns and the pricing model.
function selectionFromFlags(flags) {
    return {
        menuOnline: flags.featMenuOnline ?? true,
        reservations: !!flags.featReservations,
        // orders + KDS are one add-on; either flag means the add-on is bought.
        ordersKds: !!flags.featOrders || !!flags.featKds,
        domain: !!flags.featCustomDomain,
    };
}
// The feature flags a VenueSelection provisions (orders + kds move together;
// aiUnlimited rides with the ordersKds/Pro add-on).
function flagsFromSelection(sel) {
    return {
        featMenuOnline: sel.menuOnline,
        featOrders: sel.ordersKds,
        featKds: sel.ordersKds,
        featReservations: sel.reservations,
        featCustomDomain: sel.domain,
        featAiUnlimited: sel.ordersKds,
    };
}
