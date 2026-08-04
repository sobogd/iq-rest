import { describe, it, expect } from "vitest";
import {
  PAST_DUE_GRACE_DAYS,
  pastDueGraceEndMs,
  inPastDueGrace,
  hasProFeatures,
  hasPaidProFeatures,
  isTrialActive,
  isProActive,
  isBasicActive,
  getRestaurantCaps,
  getAccountCaps,
  hasVenueAccess,
  defaultFeatureFlagsForNewVenue,
  accountStateFromLegacyRestaurant,
  type AccountState,
} from "./index";

const DAY = 86_400_000;
const future = (days = 30) => new Date(Date.now() + days * DAY);
const past = (days = 30) => new Date(Date.now() - days * DAY);
// currentPeriodEnd for a MONTHLY sub whose renewal failed `days` ago. Stripe
// advances current_period_end to the (unpaid) new period on the failed renewal,
// so it sits ~30d AFTER the failure. Grace is anchored to the failure, not here.
const monthlyCpeFailedDaysAgo = (days: number) => new Date(Date.now() - days * DAY + 30 * DAY);

// ─── Layer 1: legacy per-restaurant helpers (behaviour-preserving) ───────────

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
    // Failed 1d ago → still in the 3-day grace; failed 10d ago → expired. Note
    // both use a FUTURE currentPeriodEnd (Stripe's dunning behaviour) — the old
    // code, keyed on currentPeriodEnd, wrongly kept these online the whole period.
    expect(inPastDueGrace({ subscriptionStatus: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(1) })).toBe(true);
    expect(inPastDueGrace({ subscriptionStatus: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(10) })).toBe(
      false,
    );
  });
});

describe("hasProFeatures", () => {
  it("legacyFullAccess wins regardless of plan", () => {
    expect(hasProFeatures({ plan: "FREE", subscriptionStatus: null, legacyFullAccess: true })).toBe(true);
  });
  it("active PRO is entitled", () => {
    expect(hasProFeatures({ plan: "PRO", subscriptionStatus: "ACTIVE" })).toBe(true);
  });
  it("PRO in PAST_DUE grace is entitled; past grace is not", () => {
    expect(hasProFeatures({ plan: "PRO", subscriptionStatus: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(1) })).toBe(true);
    expect(hasProFeatures({ plan: "PRO", subscriptionStatus: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(10) })).toBe(false);
  });
  it("unexpired trial is entitled; expired is not", () => {
    expect(hasProFeatures({ plan: "FREE", subscriptionStatus: null, trialEndsAt: future() })).toBe(true);
    expect(hasProFeatures({ plan: "FREE", subscriptionStatus: null, trialEndsAt: past() })).toBe(false);
  });
  it("BASIC active is NOT PRO-entitled", () => {
    expect(hasProFeatures({ plan: "BASIC", subscriptionStatus: "ACTIVE" })).toBe(false);
  });
});

describe("hasPaidProFeatures (no trial branch)", () => {
  it("trial does NOT count as paid", () => {
    expect(hasPaidProFeatures({ plan: "FREE", subscriptionStatus: null })).toBe(false);
    expect(hasProFeatures({ plan: "FREE", subscriptionStatus: null, trialEndsAt: future() })).toBe(true);
  });
  it("paid PRO / legacy count", () => {
    expect(hasPaidProFeatures({ plan: "PRO", subscriptionStatus: "ACTIVE" })).toBe(true);
    expect(hasPaidProFeatures({ plan: "FREE", subscriptionStatus: null, legacyFullAccess: true })).toBe(true);
  });
});

// ─── Layer 2: target capability resolver (§3) ────────────────────────────────

const acct = (over: Partial<AccountState>): AccountState => ({
  venueLimit: 4,
  restaurantCount: 1,
  subscription: null,
  ...over,
});

describe("tier predicates", () => {
  it("isTrialActive", () => {
    expect(isTrialActive({ trialEndsAt: future() })).toBe(true);
    expect(isTrialActive({ trialEndsAt: past() })).toBe(false);
    expect(isTrialActive({ trialEndsAt: null })).toBe(false);
  });
  it("isProActive incl grace", () => {
    expect(isProActive({ plan: "PRO", status: "ACTIVE" })).toBe(true);
    expect(isProActive({ plan: "PRO", status: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(1) })).toBe(true);
    expect(isProActive({ plan: "PRO", status: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(10) })).toBe(false);
    expect(isProActive({ plan: "BASIC", status: "ACTIVE" })).toBe(false);
    expect(isProActive(null)).toBe(false);
  });
  it("isBasicActive incl grace", () => {
    expect(isBasicActive({ plan: "BASIC", status: "ACTIVE" })).toBe(true);
    expect(isBasicActive({ plan: "BASIC", status: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(1) })).toBe(true);
    expect(isBasicActive({ plan: "BASIC", status: "PAST_DUE", currentPeriodEnd: monthlyCpeFailedDaysAgo(10) })).toBe(false);
    expect(isBasicActive({ plan: "PRO", status: "ACTIVE" })).toBe(false);
  });
});

describe("getRestaurantCaps", () => {
  it("planOverride='PRO' → full PRO regardless of subscription", () => {
    const caps = getRestaurantCaps(acct({ subscription: null }), { id: "r1", planOverride: "PRO" });
    expect(caps).toEqual({
      menuOnline: true,
      orders: true,
      kds: true,
      reservations: true,
      aiUnlimited: true,
      customDomain: false,
    });
  });

  // MANDATORY golden case from the plan (§3 / Phase 0): a BASIC-paying venue
  // that carries the legacy PRO bypass must resolve to FULL PRO caps.
  it("BASIC subscription + planOverride='PRO' → full PRO (legacy bypass wins)", () => {
    const account = acct({
      subscription: { plan: "BASIC", status: "ACTIVE", appliesToRestaurantId: "r1" },
    });
    const caps = getRestaurantCaps(account, { id: "r1", planOverride: "PRO" });
    expect(caps.menuOnline).toBe(true);
    expect(caps.orders).toBe(true);
    expect(caps.kds).toBe(true);
    expect(caps.reservations).toBe(true);
    expect(caps.aiUnlimited).toBe(true);
  });

  it("trial active → full PRO but NOT unlimited AI, for every venue", () => {
    const account = acct({ trialEndsAt: future(), subscription: null });
    const caps = getRestaurantCaps(account, { id: "r1", planOverride: null });
    expect(caps).toEqual({
      menuOnline: true,
      orders: true,
      kds: true,
      reservations: true,
      aiUnlimited: false,
      customDomain: false,
    });
  });

  it("PRO active → full PRO for every venue", () => {
    const account = acct({ subscription: { plan: "PRO", status: "ACTIVE" } });
    expect(getRestaurantCaps(account, { id: "rX", planOverride: null })).toEqual({
      menuOnline: true,
      orders: true,
      kds: true,
      reservations: true,
      aiUnlimited: true,
      customDomain: false,
    });
  });

  it("BASIC active → BASIC caps only on the applied venue, others inactive", () => {
    const account = acct({
      restaurantCount: 3,
      subscription: { plan: "BASIC", status: "ACTIVE", appliesToRestaurantId: "chosen" },
    });
    expect(getRestaurantCaps(account, { id: "chosen", planOverride: null })).toEqual({
      menuOnline: true,
      orders: false,
      kds: false,
      reservations: false,
      aiUnlimited: false,
      customDomain: false,
    });
    expect(getRestaurantCaps(account, { id: "other", planOverride: null })).toEqual({
      menuOnline: false,
      orders: false,
      kds: false,
      reservations: false,
      aiUnlimited: false,
      customDomain: false,
    });
  });

  it("no subscription + expired/absent trial → inactive (menu offline)", () => {
    const account = acct({ trialEndsAt: past(), subscription: null });
    expect(getRestaurantCaps(account, { id: "r1", planOverride: null }).menuOnline).toBe(false);
  });

  it("BASIC beyond grace → inactive even on the applied venue", () => {
    const account = acct({
      subscription: { plan: "BASIC", status: "PAST_DUE", currentPeriodEnd: past(10), appliesToRestaurantId: "r1" },
    });
    expect(getRestaurantCaps(account, { id: "r1", planOverride: null }).menuOnline).toBe(false);
  });
});

describe("getAccountCaps", () => {
  it("PRO active under limit → canAddVenue true", () => {
    expect(getAccountCaps(acct({ restaurantCount: 2, subscription: { plan: "PRO", status: "ACTIVE" } })).canAddVenue).toBe(
      true,
    );
  });
  it("PRO active AT limit → canAddVenue false", () => {
    expect(
      getAccountCaps(acct({ restaurantCount: 4, subscription: { plan: "PRO", status: "ACTIVE" } })).canAddVenue,
    ).toBe(false);
  });
  it("trial active under limit → canAddVenue true", () => {
    expect(getAccountCaps(acct({ restaurantCount: 1, trialEndsAt: future() })).canAddVenue).toBe(true);
  });
  it("BASIC → cannot add venue", () => {
    expect(
      getAccountCaps(acct({ restaurantCount: 1, subscription: { plan: "BASIC", status: "ACTIVE" } })).canAddVenue,
    ).toBe(false);
  });
  it("no subscription → cannot add venue", () => {
    expect(getAccountCaps(acct({ restaurantCount: 1, subscription: null })).canAddVenue).toBe(false);
  });
  it("passes through venueLimit (enterprise raise)", () => {
    expect(getAccountCaps(acct({ venueLimit: 10 })).venueLimit).toBe(10);
  });
});

// ─── billing-features-constructor: flag-driven "which" set ───────────────────

describe("hasVenueAccess (the 'whether' gate)", () => {
  it("granted by override / manual / trial / PRO / pinned-BASIC", () => {
    expect(hasVenueAccess(acct({ subscription: null }), { id: "r", planOverride: "PRO" })).toBe(true);
    expect(hasVenueAccess(acct({ subscription: null }), { id: "r", manualAccess: true })).toBe(true);
    expect(hasVenueAccess(acct({ trialEndsAt: future() }), { id: "r" })).toBe(true);
    expect(hasVenueAccess(acct({ subscription: { plan: "PRO", status: "ACTIVE" } }), { id: "r" })).toBe(true);
    expect(
      hasVenueAccess(acct({ subscription: { plan: "BASIC", status: "ACTIVE", appliesToRestaurantId: "r" } }), {
        id: "r",
      }),
    ).toBe(true);
  });
  it("denied for a BASIC venue that isn't the pinned one, and for no-sub", () => {
    expect(
      hasVenueAccess(acct({ subscription: { plan: "BASIC", status: "ACTIVE", appliesToRestaurantId: "other" } }), {
        id: "r",
      }),
    ).toBe(false);
    expect(hasVenueAccess(acct({ subscription: null }), { id: "r" })).toBe(false);
  });
});

describe("getRestaurantCaps with explicit flags", () => {
  const proAcct = acct({ subscription: { plan: "PRO", status: "ACTIVE" } });

  it("flags are authoritative once access is granted (à-la-carte)", () => {
    // A PRO account (access granted) whose venue only bought reservations + domain.
    expect(
      getRestaurantCaps(proAcct, {
        id: "r",
        featMenuOnline: true,
        featOrders: false,
        featKds: false,
        featReservations: true,
        featCustomDomain: true,
        featAiUnlimited: false,
      }),
    ).toEqual({
      menuOnline: true,
      orders: false,
      kds: false,
      reservations: true,
      aiUnlimited: false,
      customDomain: true,
    });
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
        featAiUnlimited: true,
      }),
    ).toEqual({
      menuOnline: false,
      orders: false,
      kds: false,
      reservations: false,
      aiUnlimited: false,
      customDomain: false,
    });
  });

  it("manualAccess grants access; flags then decide the set (free comp)", () => {
    expect(
      getRestaurantCaps(acct({ subscription: null }), {
        id: "r",
        manualAccess: true,
        featMenuOnline: true,
        featOrders: true,
        featKds: true,
        featReservations: true,
        featCustomDomain: false,
        featAiUnlimited: true,
      }),
    ).toEqual({
      menuOnline: true,
      orders: true,
      kds: true,
      reservations: true,
      aiUnlimited: true,
      customDomain: false,
    });
  });

  it("flag-less row falls back to tier caps (backward compat)", () => {
    expect(getRestaurantCaps(proAcct, { id: "r" })).toEqual({
      menuOnline: true,
      orders: true,
      kds: true,
      reservations: true,
      aiUnlimited: true,
      customDomain: false,
    });
  });
});

describe("defaultFeatureFlagsForNewVenue", () => {
  it("PRO account → full incl unlimited AI", () => {
    expect(defaultFeatureFlagsForNewVenue(acct({ subscription: { plan: "PRO", status: "ACTIVE" } }))).toEqual({
      featMenuOnline: true,
      featOrders: true,
      featKds: true,
      featReservations: true,
      featAiUnlimited: true,
      featCustomDomain: false,
    });
  });
  it("trial account → operational features but NOT unlimited AI", () => {
    expect(defaultFeatureFlagsForNewVenue(acct({ trialEndsAt: future() }))).toEqual({
      featMenuOnline: true,
      featOrders: true,
      featKds: true,
      featReservations: true,
      featAiUnlimited: false,
      featCustomDomain: false,
    });
  });
  it("no active tier → menu only", () => {
    expect(defaultFeatureFlagsForNewVenue(acct({ subscription: null }))).toEqual({
      featMenuOnline: true,
      featOrders: false,
      featKds: false,
      featReservations: false,
      featAiUnlimited: false,
      featCustomDomain: false,
    });
  });
});

describe("accountStateFromLegacyRestaurant adapter parity with hasProFeatures", () => {
  const rows = [
    { id: "a", plan: "PRO", subscriptionStatus: "ACTIVE" },
    { id: "b", plan: "BASIC", subscriptionStatus: "ACTIVE" },
    { id: "c", plan: "FREE", subscriptionStatus: null, trialEndsAt: future() },
    { id: "d", plan: "FREE", subscriptionStatus: null, trialEndsAt: past() },
    { id: "e", plan: "FREE", subscriptionStatus: null, legacyFullAccess: true },
    { id: "f", plan: "PRO", subscriptionStatus: "PAST_DUE", currentPeriodEnd: past(1) },
  ];
  it("menuOnline via resolver agrees the venue is at least active whenever legacy says PRO OR BASIC-active OR trial", () => {
    for (const r of rows) {
      const { account, restaurant } = accountStateFromLegacyRestaurant(r);
      const caps = getRestaurantCaps(account, restaurant);
      // Legacy: is the venue's own row entitled to a live menu?
      // PRO/trial/legacy → hasProFeatures true; BASIC active → menu online too.
      const legacyMenuOnline =
        hasProFeatures(r) || (r.plan === "BASIC" && r.subscriptionStatus === "ACTIVE");
      expect(caps.menuOnline).toBe(legacyMenuOnline);
    }
  });
  it("legacyFullAccess maps to planOverride='PRO'", () => {
    const { restaurant } = accountStateFromLegacyRestaurant({
      id: "e",
      plan: "FREE",
      subscriptionStatus: null,
      legacyFullAccess: true,
    });
    expect(restaurant.planOverride).toBe("PRO");
  });
});
