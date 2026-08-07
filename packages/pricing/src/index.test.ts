import { describe, it, expect } from "vitest";
import {
  DEFAULT_PRICING_CATALOG,
  computeAccountQuote,
  computeVenuePrice,
  volumeDiscount,
  selectionFromFlags,
  flagsFromSelection,
  type VenueSelection,
} from "./index";

const cat = DEFAULT_PRICING_CATALOG;
const menuOnly: VenueSelection = { menuOnline: true, reservations: false, ordersKds: false, domain: false };

describe("volumeDiscount", () => {
  it("tiers per §Q1", () => {
    expect(volumeDiscount(cat.volumeDiscounts, 1, "year")).toBe(0);
    expect(volumeDiscount(cat.volumeDiscounts, 1, "month")).toBe(0);
    expect(volumeDiscount(cat.volumeDiscounts, 3, "year")).toBe(0.25);
    expect(volumeDiscount(cat.volumeDiscounts, 3, "month")).toBe(0.15);
    expect(volumeDiscount(cat.volumeDiscounts, 6, "year")).toBe(0.5);
    expect(volumeDiscount(cat.volumeDiscounts, 6, "month")).toBe(0.25);
  });
});

describe("owner's exact Basic examples (EUR — base 14.9/9.9)", () => {
  it("6 restaurants: yearly 9.9×6×12×0.5=356.4, monthly 14.9×6×0.75=67.05", () => {
    const venues = Array.from({ length: 6 }, () => menuOnly);
    expect(computeAccountQuote(cat, "EUR", venues, "year").amountMajor).toBe(356.4);
    expect(computeAccountQuote(cat, "EUR", venues, "month").amountMajor).toBe(67.05);
  });
  it("3 restaurants: yearly 9.9×3×12×0.75=267.3, monthly 14.9×3×0.85=38.00", () => {
    const venues = Array.from({ length: 3 }, () => menuOnly);
    expect(computeAccountQuote(cat, "EUR", venues, "year").amountMajor).toBe(267.3);
    expect(computeAccountQuote(cat, "EUR", venues, "month").perMonthAfterDiscount).toBe(38);
  });
  it("1 restaurant → no volume discount", () => {
    expect(computeAccountQuote(cat, "EUR", [menuOnly], "month").discount).toBe(0);
    expect(computeAccountQuote(cat, "EUR", [menuOnly], "month").amountMajor).toBe(14.9);
    expect(computeAccountQuote(cat, "EUR", [menuOnly], "year").amountMajor).toBe(118.8);
  });
});

describe("à-la-carte add-ons (EUR)", () => {
  it("per-venue price = menu + selected add-ons", () => {
    expect(computeVenuePrice(cat.currencies.EUR, menuOnly, "month")).toBe(14.9);
    expect(
      computeVenuePrice(cat.currencies.EUR, { ...menuOnly, reservations: true }, "month"),
    ).toBe(23.9);
    expect(computeVenuePrice(cat.currencies.EUR, { ...menuOnly, ordersKds: true }, "month")).toBe(27.9);
    expect(computeVenuePrice(cat.currencies.EUR, { ...menuOnly, domain: true }, "month")).toBe(19.9);
  });

  it("Pro (menu+reservations+ordersKds) = 36.9/27.9", () => {
    const pro: VenueSelection = { menuOnline: true, reservations: true, ordersKds: true, domain: false };
    expect(computeVenuePrice(cat.currencies.EUR, pro, "month")).toBe(36.9);
    expect(computeVenuePrice(cat.currencies.EUR, pro, "year")).toBe(27.9);
  });

  it("mixed venues: A=reservations, B=ordersKds, C=menu; N=3 monthly ×0.85", () => {
    const venues: VenueSelection[] = [
      { ...menuOnly, reservations: true },
      { ...menuOnly, ordersKds: true },
      menuOnly,
    ];
    // (23.9 + 27.9 + 14.9) = 66.7 × 0.85 = 56.695 → 56.70
    expect(computeAccountQuote(cat, "EUR", venues, "month").perMonthAfterDiscount).toBe(56.7);
  });
});

describe("flags ⇄ selection bridge", () => {
  it("selectionFromFlags maps orders/kds → single ordersKds add-on", () => {
    expect(selectionFromFlags({ featMenuOnline: true, featOrders: true, featKds: false })).toEqual({
      menuOnline: true,
      reservations: false,
      ordersKds: true,
      domain: false,
    });
  });
  it("flagsFromSelection provisions orders+kds together", () => {
    expect(
      flagsFromSelection({ menuOnline: true, reservations: false, ordersKds: true, domain: false }),
    ).toEqual({
      featMenuOnline: true,
      featOrders: true,
      featKds: true,
      featReservations: false,
      featCustomDomain: false,
    });
  });
});

describe("default catalog covers all 21 currencies", () => {
  it("has every currency", () => {
    const all = ["EUR", "USD", "GBP", "CHF", "NOK", "SEK", "DKK", "PLN", "CZK", "HUF", "ISK", "MXN", "AUD", "RSD", "BRL", "COP", "CLP", "PEN", "UYU", "ARS", "TRY"];
    expect(all.length).toBe(21);
    for (const c of all) {
      expect(cat.currencies[c]).toBeTruthy();
      expect(cat.currencies[c].menu.mo).toBeGreaterThan(0);
    }
  });
});
