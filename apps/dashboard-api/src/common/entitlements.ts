// Central PRO-feature entitlement check.
//
// As of the PRO-gating change, the operational features — order taking
// (Orders + waiter kiosk), the kitchen display (KDS), and reservations — are
// PRO-only. BASIC is a "live digital menu" tier with no order/kitchen/booking
// surface and no kiosks.
//
// A restaurant gets these features when ANY of:
//   - it has an ACTIVE PRO subscription, OR
//   - it is inside its 14-day trial window (`trialEndsAt > now`), OR
//   - it is a PRO plan still inside the post-payment-failure grace window
//     (PAST_DUE, `currentPeriodEnd + PAST_DUE_GRACE_DAYS` not yet passed), OR
//   - it carries the `legacyFullAccess` grandfather flag (a few pre-gating
//     BASIC venues that already relied on orders/kitchen/reservations).
//
// Distinct from `isPaidActive` (ai-quota.ts), which gates the menu staying
// online + AI image generation and still treats BASIC as paid. Keep the two
// separate: BASIC keeps its menu, but loses the operational features.

// After a payment fails the subscription goes PAST_DUE; the restaurant keeps
// full access (menu online + PRO features) for this many days past the failed
// renewal (`currentPeriodEnd`) before the menu is blocked. Keep in sync with
// the public-menu-api copy and the public-menu SPA (__root.tsx).
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

// Prisma `select` fragment for the fields `hasProFeatures` needs. Spread into
// any restaurant query that gates a PRO feature so the shape stays in sync.
export const PRO_FEATURE_SELECT = {
  plan: true,
  subscriptionStatus: true,
  trialEndsAt: true,
  currentPeriodEnd: true,
  legacyFullAccess: true,
} as const;
