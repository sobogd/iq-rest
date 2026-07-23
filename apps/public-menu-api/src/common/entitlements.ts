// PRO-feature entitlement (diner side). Mirrors the dashboard-api helper:
// orders + reservations are PRO-only. A restaurant is entitled when it has an
// ACTIVE PRO subscription, is inside its trial window, is a PRO plan still in
// its post-payment-failure grace window, or carries the `legacyFullAccess`
// grandfather flag. BASIC = view-only menu.

// After a payment fails the subscription goes PAST_DUE; the restaurant keeps
// full access (menu online + PRO features) for this many days past the failed
// renewal (`currentPeriodEnd`) before the menu is blocked. Keep in sync with
// the dashboard-api copy and the public-menu SPA (__root.tsx).
export const PAST_DUE_GRACE_DAYS = 3;
const DAY_MS = 86_400_000;

// Millisecond deadline of the PAST_DUE grace window, or null when not PAST_DUE.
export function pastDueGraceEndMs(r: {
  subscriptionStatus: string | null;
  currentPeriodEnd?: Date | null;
}): number | null {
  if (r.subscriptionStatus !== "PAST_DUE" || !r.currentPeriodEnd) return null;
  return new Date(r.currentPeriodEnd).getTime() + PAST_DUE_GRACE_DAYS * DAY_MS;
}

// True while a PAST_DUE subscription is still inside its grace window.
export function inPastDueGrace(r: {
  subscriptionStatus: string | null;
  currentPeriodEnd?: Date | null;
}): boolean {
  const end = pastDueGraceEndMs(r);
  return end !== null && end > Date.now();
}

export function hasProFeatures(r: {
  plan: string | null;
  subscriptionStatus: string | null;
  trialEndsAt?: Date | null;
  currentPeriodEnd?: Date | null;
  legacyFullAccess?: boolean | null;
}): boolean {
  if (r.legacyFullAccess) return true;
  if (r.subscriptionStatus === "ACTIVE" && r.plan === "PRO") return true;
  // A PRO plan whose renewal just failed keeps its PRO features during grace.
  if (r.plan === "PRO" && inPastDueGrace(r)) return true;
  return !!r.trialEndsAt && r.trialEndsAt > new Date();
}

export const PRO_FEATURE_SELECT = {
  plan: true,
  subscriptionStatus: true,
  trialEndsAt: true,
  currentPeriodEnd: true,
  legacyFullAccess: true,
} as const;
