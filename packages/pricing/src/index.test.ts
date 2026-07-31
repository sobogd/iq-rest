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

describe("owner's exact Basic examples (EUR)", () => {
  it("6 restaurants yearly = 248.4/yr, monthly = 44.55/mo", () => {
    const venues = Array.from({ length: 6 }, () => menuOnly);
    expect(computeAccountQuote(cat, "EUR", venues, "year").amountMajor).toBe(248.4);
    expect(computeAccountQuote(cat, "EUR", venues, "month").amountMajor).toBe(44.55);
  });
  it("3 restaurants yearly = 186.3/yr, monthly = 25.245/mo", () => {
    const venues = Array.from({ length: 3 }, () => menuOnly);
    expect(computeAccountQuote(cat, "EUR", venues, "year").amountMajor).toBe(186.3);
    // 29.7 × 0.85 = 25.245
    expect(computeAccountQuote(cat, "EUR", venues, "month").perMonthAfterDiscount).toBe(25.25);
  });
  it("1 restaurant → no volume discount", () => {
    expect(computeAccountQuote(cat, "EUR", [menuOnly], "month").discount).toBe(0);
    expect(computeAccountQuote(cat, "EUR", [menuOnly], "month").amountMajor).toBe(9.9);
    expect(computeAccountQuote(cat, "EUR", [menuOnly], "year").amountMajor).toBe(82.8);
  });
});

describe("à-la-carte add-ons (EUR)", () => {
  it("per-venue price = menu + selected add-ons", () => {
    expect(computeVenuePrice(cat.currencies.EUR, menuOnly, "month")).toBe(9.9);
    expect(
      computeVenuePrice(cat.currencies.EUR, { ...menuOnly, reservations: true }, "month"),
    ).toBe(18.9);
    expect(computeVenuePrice(cat.currencies.EUR, { ...menuOnly, ordersKds: true }, "month")).toBe(22.9);
    expect(computeVenuePrice(cat.currencies.EUR, { ...menuOnly, domain: true }, "month")).toBe(14.9);
  });

  it("Pro (menu+reservations+ordersKds) reconstructs the old 31.9/24.9", () => {
    const pro: VenueSelection = { menuOnline: true, reservations: true, ordersKds: true, domain: false };
    expect(computeVenuePrice(cat.currencies.EUR, pro, "month")).toBe(31.9);
    expect(computeVenuePrice(cat.currencies.EUR, pro, "year")).toBe(24.9);
  });

  it("mixed venues: A=reservations, B=ordersKds, C=menu; N=3 monthly ×0.85", () => {
    const venues: VenueSelection[] = [
      { ...menuOnly, reservations: true },
      { ...menuOnly, ordersKds: true },
      menuOnly,
    ];
    // (18.9 + 22.9 + 9.9) = 51.7 × 0.85 = 43.945 → 43.95
    expect(computeAccountQuote(cat, "EUR", venues, "month").perMonthAfterDiscount).toBe(43.95);
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
  it("flagsFromSelection provisions orders+kds+ai together", () => {
    expect(
      flagsFromSelection({ menuOnline: true, reservations: false, ordersKds: true, domain: false }),
    ).toEqual({
      featMenuOnline: true,
      featOrders: true,
      featKds: true,
      featReservations: false,
      featCustomDomain: false,
      featAiUnlimited: true,
    });
  });
});

describe("default catalog covers the 14 billing currencies", () => {
  it("has all anchors", () => {
    for (const c of ["EUR", "NOK", "SEK", "DKK", "MXN", "USD", "AUD", "GBP", "PLN", "CZK", "HUF", "ISK", "CHF", "RSD"]) {
      expect(cat.currencies[c]).toBeTruthy();
      expect(cat.currencies[c].menu.mo).toBeGreaterThan(0);
    }
  });
});
