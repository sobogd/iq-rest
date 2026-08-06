export type Cycle = "month" | "year";
export type ItemPrice = {
    mo: number;
    yr: number;
};
export type CurrencyPricing = {
    menu: ItemPrice;
    reservations: ItemPrice;
    ordersKds: ItemPrice;
    domain: ItemPrice;
};
export type VolumeDiscounts = {
    "2-4": {
        mo: number;
        yr: number;
    };
    "5+": {
        mo: number;
        yr: number;
    };
};
export type PricingCatalog = {
    currencies: Record<string, CurrencyPricing>;
    volumeDiscounts: VolumeDiscounts;
};
export type VenueSelection = {
    menuOnline: boolean;
    reservations: boolean;
    ordersKds: boolean;
    domain: boolean;
};
export declare const DEFAULT_VOLUME_DISCOUNTS: VolumeDiscounts;
export declare function volumeDiscount(discounts: VolumeDiscounts, n: number, cycle: Cycle): number;
export declare const DEFAULT_PRICING_CATALOG: PricingCatalog;
export declare function computeVenuePriceCents(pricing: CurrencyPricing, sel: VenueSelection, cycle: Cycle): number;
export declare function computeVenuePrice(pricing: CurrencyPricing, sel: VenueSelection, cycle: Cycle): number;
export type AccountQuote = {
    currency: string;
    cycle: Cycle;
    interval: Cycle;
    billingVenues: number;
    discount: number;
    subtotalPerMonth: number;
    perMonthAfterDiscount: number;
    amountMajor: number;
    amountCents: number;
};
export declare function computeAccountQuote(catalog: PricingCatalog, currency: string, venues: VenueSelection[], cycle: Cycle): AccountQuote;
export declare function selectionFromFlags(flags: {
    featMenuOnline?: boolean | null;
    featOrders?: boolean | null;
    featKds?: boolean | null;
    featReservations?: boolean | null;
    featCustomDomain?: boolean | null;
}): VenueSelection;
export declare function flagsFromSelection(sel: VenueSelection): {
    featMenuOnline: boolean;
    featOrders: boolean;
    featKds: boolean;
    featReservations: boolean;
    featCustomDomain: boolean;
};
