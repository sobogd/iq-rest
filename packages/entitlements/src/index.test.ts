import { describe, it, expect } from "vitest";
import {
  PAST_DUE_GRACE_DAYS,
  pastDueGraceEndMs,
  inPastDueGrace,
  isTrialActive,
  isPaidActive,
  getRestaurantCaps,
  getAccountCaps,
  hasVenueAccess,
  defaultFeatureFlagsForNewVenue,
  type AccountState,
} from "./index";

const DAY = 86_400_000;
const future = (days = 30) => new Date(Date.now() + days * DAY);
const past = (days = 30) => new Date(Date.now() - days * DAY);
// currentPeriodEnd for a MONTHLY sub whose renewal failed `days` ago. Stripe
// advances current_period_end to the (unpaid) new period on the failed renewal,
// so it sits ~30d AFTER the failure. Grace is anchored to the failure, not here.
const monthlyCpeFailedDaysAgo = (days: number) => new Date(Date.now() - days * DAY + 30 * DAY);

// ─── PAST_DUE grace window ───────────────────────────────────────────────────

describe("PAST_DUE grace", () => {
  it("returns null when not PAST_DUE", () => {
    expect(pastDueGraceEndMs({ subscriptionStatus: "ACTIVE", currentPeriodEnd: future() })).toBeNull();
    expect(pastDueGraceEndMs({ subscriptionStatus: "PAST_DUE", currentPeriodEnd: null })).toBeNull();
  });
  it("anchors grace to the failed renewal (currentPeriodEnd − one interval + grace)", () => {
    const cpe = new Date("2026-02-01T00:00:00Z");
    // monthly: period start = cpe − 30d, grace ends 3d after that.
    expect(pastDueGraceEndMs({ subscriptionStatus: "PAST_DUE", currentPeriodEnd: cpe, interval: "month" })).toBe(
      cpe.getTime() - 30 * DAY + PAST_DUE_GRACE_DAYS * DAY,
    );
    // yearly subtracts 365d; legacy "MONTHLY"/"YEARLY" map the same; unknown → monthly.
    expect(pastDueGraceEndMs({ subscriptionStatus: "PAST_DUE", currentPeriodEnd: cpe, interval: "year" })).toBe(
      cpe.getTime() - 365 * DAY + PAST_DUE_GRACE_DAYS * DAY,
    );
    expect(pastDueGraceEndMs({ subscriptionStatus: "PAST_DUE", currentPeriodEnd: cpe })).toBe(
      cpe.getTime() - 30 * DAY + PAST_DUE_GRACE_DAYS * DAY,
    );
  });
  it("inPastDueGrace true just inside, false past the window", () => {
    expect(inPastDueGrace({ subscriptionStatus: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(1) })).toBe(true);
    expect(inPastDueGrace({ subscriptionStatus: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(10) })).toBe(
      false,
    );
  });
  it("pastDueSince (exact) takes priority over the interval heuristic", () => {
    const failed = new Date("2026-02-01T00:00:00Z");
    expect(
      pastDueGraceEndMs({
        subscriptionStatus: "PAST_DUE",
        pastDueSince: failed,
        currentPeriodEnd: future(20),
        interval: "year",
      }),
    ).toBe(failed.getTime() + PAST_DUE_GRACE_DAYS * DAY);
    expect(
      inPastDueGrace({ subscriptionStatus: "PAST_DUE", pastDueSince: past(1), currentPeriodEnd: future(20) }),
    ).toBe(true);
    expect(
      inPastDueGrace({ subscriptionStatus: "PAST_DUE", pastDueSince: past(10), currentPeriodEnd: future(20) }),
    ).toBe(false);
  });
  it("falls back to the interval heuristic when pastDueSince is absent (un-backfilled)", () => {
    const cpe = new Date("2026-02-01T00:00:00Z");
    expect(
      pastDueGraceEndMs({ subscriptionStatus: "PAST_DUE", pastDueSince: null, currentPeriodEnd: cpe, interval: "month" }),
    ).toBe(cpe.getTime() - 30 * DAY + PAST_DUE_GRACE_DAYS * DAY);
  });
});

// ─── Access predicates (status-gated, no plan tier) ──────────────────────────

const acct = (over: Partial<AccountState>): AccountState => ({
  venueLimit: 4,
  restaurantCount: 1,
  subscription: null,
  ...over,
});

describe("access predicates", () => {
  it("isTrialActive", () => {
    expect(isTrialActive({ trialEndsAt: future() })).toBe(true);
    expect(isTrialActive({ trialEndsAt: past() })).toBe(false);
    expect(isTrialActive({ trialEndsAt: null })).toBe(false);
  });
  it("isPaidActive: ACTIVE, or PAST_DUE only inside grace", () => {
    expect(isPaidActive({ status: "ACTIVE" })).toBe(true);
    expect(isPaidActive({ status: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(1) })).toBe(true);
    expect(isPaidActive({ status: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(10) })).toBe(false);
    expect(isPaidActive({ status: "CANCELED" })).toBe(false);
    expect(isPaidActive({ status: "PAST_DUE", pastDueSince: past(10), currentPeriodEnd: future(20) })).toBe(false);
    expect(isPaidActive(null)).toBe(false);
  });
});

describe("getRestaurantCaps (tier fallback for flag-less rows)", () => {
  it("planOverride='PRO' → full PRO regardless of subscription", () => {
    const caps = getRestaurantCaps(acct({ subscription: null }), { id: "r1", planOverride: "PRO" });
    expect(caps).toEqual({ menuOnline: true, orders: true, kds: true, reservations: true, customDomain: false });
  });

  it("trial active → full operational caps for every venue", () => {
    const account = acct({ trialEndsAt: future(), subscription: null });
    expect(getRestaurantCaps(account, { id: "r1", planOverride: null })).toEqual({
      menuOnline: true, orders: true, kds: true, reservations: true, customDomain: false,
    });
  });

  it("paid subscription → full caps for every venue", () => {
    const account = acct({ subscription: { status: "ACTIVE" } });
    expect(getRestaurantCaps(account, { id: "rX", planOverride: null })).toEqual({
      menuOnline: true, orders: true, kds: true, reservations: true, customDomain: false,
    });
  });

  it("no subscription + expired/absent trial → inactive (menu offline)", () => {
    const account = acct({ trialEndsAt: past(), subscription: null });
    expect(getRestaurantCaps(account, { id: "r1", planOverride: null }).menuOnline).toBe(false);
  });

  it("past-due beyond grace → inactive", () => {
    const account = acct({ subscription: { status: "PAST_DUE", pastDueSince: past(10), currentPeriodEnd: future(20) } });
    expect(getRestaurantCaps(account, { id: "r1", planOverride: null }).menuOnline).toBe(false);
  });
});

describe("getAccountCaps", () => {
  it("paid active under limit → canAddVenue true", () => {
    expect(getAccountCaps(acct({ restaurantCount: 2, subscription: { status: "ACTIVE" } })).canAddVenue).toBe(true);
  });
  it("paid active AT limit → canAddVenue false", () => {
    expect(getAccountCaps(acct({ restaurantCount: 4, subscription: { status: "ACTIVE" } })).canAddVenue).toBe(false);
  });
  it("trial active under limit → canAddVenue true", () => {
    expect(getAccountCaps(acct({ restaurantCount: 1, trialEndsAt: future() })).canAddVenue).toBe(true);
  });
  it("no subscription → cannot add venue", () => {
    expect(getAccountCaps(acct({ restaurantCount: 1, subscription: null })).canAddVenue).toBe(false);
  });
  it("passes through venueLimit (enterprise raise)", () => {
    expect(getAccountCaps(acct({ venueLimit: 10 })).venueLimit).toBe(10);
  });
});

describe("hasVenueAccess (the 'whether' gate)", () => {
  it("granted by override / trial / paid subscription", () => {
    expect(hasVenueAccess(acct({ subscription: null }), { id: "r", planOverride: "PRO" })).toBe(true);
    expect(hasVenueAccess(acct({ trialEndsAt: future() }), { id: "r" })).toBe(true);
    expect(hasVenueAccess(acct({ subscription: { status: "ACTIVE" } }), { id: "r" })).toBe(true);
  });
  it("denied for no subscription / canceled", () => {
    expect(hasVenueAccess(acct({ subscription: null }), { id: "r" })).toBe(false);
    expect(hasVenueAccess(acct({ subscription: { status: "CANCELED" } }), { id: "r" })).toBe(false);
  });
});

describe("getRestaurantCaps with explicit flags", () => {
  const paidAcct = acct({ subscription: { status: "ACTIVE" } });

  it("flags are authoritative once access is granted (à-la-carte)", () => {
    expect(
      getRestaurantCaps(paidAcct, {
        id: "r",
        featMenuOnline: true,
        featOrders: false,
        featKds: false,
        featReservations: true,
        featCustomDomain: true,
      }),
    ).toEqual({ menuOnline: true, orders: false, kds: false, reservations: true, customDomain: true });
  });

  it("no access → INACTIVE regardless of flags (flags never leak to unpaid venue)", () => {
    expect(
      getRestaurantCaps(acct({ subscription: null }), {
        id: "r",
        featMenuOnline: true,
        featOrders: true,
        featKds: true,
        featReservations: true,
        featCustomDomain: true,
      }),
    ).toEqual({ menuOnline: false, orders: false, kds: false, reservations: false, customDomain: false });
  });

  it("flag-less row falls back to access-derived caps (backward compat)", () => {
    expect(getRestaurantCaps(paidAcct, { id: "r" })).toEqual({
      menuOnline: true, orders: true, kds: true, reservations: true, customDomain: false,
    });
  });
});

describe("defaultFeatureFlagsForNewVenue", () => {
  it("paid account → full operational set", () => {
    expect(defaultFeatureFlagsForNewVenue(acct({ subscription: { status: "ACTIVE" } }))).toEqual({
      featMenuOnline: true, featOrders: true, featKds: true, featReservations: true, featCustomDomain: false,
    });
  });
  it("trial account → operational features", () => {
    expect(defaultFeatureFlagsForNewVenue(acct({ trialEndsAt: future() }))).toEqual({
      featMenuOnline: true, featOrders: true, featKds: true, featReservations: true, featCustomDomain: false,
    });
  });
  it("no active access → menu only", () => {
    expect(defaultFeatureFlagsForNewVenue(acct({ subscription: null }))).toEqual({
      featMenuOnline: true, featOrders: false, featKds: false, featReservations: false, featCustomDomain: false,
    });
  });
});
