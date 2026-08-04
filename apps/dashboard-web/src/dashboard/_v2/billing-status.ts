// Shared billing-status helpers for the dashboard. A single source of truth so
// the trial modal, subscription chip, billing banner and past-due modal all
// agree on what "paid", "past due" and "in grace" mean.
//
// Keep PAST_DUE_GRACE_DAYS in sync with the API entitlements helpers
// (dashboard-api / public-menu-api `entitlements.ts`) and the public-menu SPA.

const DAY_MS = 86_400_000;
export const PAST_DUE_GRACE_DAYS = 3;

// One billing interval in days (coarse — enough for a 3-day grace window). Both
// the new ad-hoc `interval` ("month"/"year") and the legacy `billingCycle`
// ("MONTHLY"/"YEARLY") map here; unknown/absent → monthly. Keep in sync with the
// API entitlements helper.
const INTERVAL_DAYS: Record<string, number> = { month: 30, MONTHLY: 30, year: 365, YEARLY: 365 };

export type BillingSub = {
  plan: string | null;
  subscriptionStatus: string | null;
  trialEndsAt?: string | null;
  currentPeriodEnd?: string | null;
  interval?: string | null;
  billingCycle?: string | null;
} | null;

function isPaidPlan(sub: BillingSub): boolean {
  return !!sub && !!sub.plan && sub.plan !== "FREE";
}

// Non-FREE plan that is either ACTIVE or PAST_DUE. Used to SUPPRESS trial UI —
// a paying customer (even one whose last payment failed) is never on a trial.
export function hasPaidPlan(sub: BillingSub): boolean {
  return (
    isPaidPlan(sub) &&
    (sub!.subscriptionStatus === "ACTIVE" || sub!.subscriptionStatus === "PAST_DUE")
  );
}

// The subscription's last renewal failed and it's a paid plan → show the
// past-due nudge instead of any trial UI.
export function isPastDue(sub: BillingSub): boolean {
  return isPaidPlan(sub) && sub!.subscriptionStatus === "PAST_DUE";
}

// Millisecond deadline of the PAST_DUE grace window, or null when not PAST_DUE.
// Anchored to the failed renewal (period START = currentPeriodEnd − one
// interval), NOT the future currentPeriodEnd Stripe leaves on the row during
// dunning — otherwise grace would never expire while the period is unpaid.
export function pastDueGraceEndMs(sub: BillingSub): number | null {
  if (!isPastDue(sub) || !sub!.currentPeriodEnd) return null;
  const key = sub!.interval ?? sub!.billingCycle;
  const days = (key && INTERVAL_DAYS[key]) || 30;
  return new Date(sub!.currentPeriodEnd).getTime() - days * DAY_MS + PAST_DUE_GRACE_DAYS * DAY_MS;
}

// True while a PAST_DUE subscription is still inside its grace window (menu +
// PRO features still live).
export function inPastDueGrace(sub: BillingSub): boolean {
  const end = pastDueGraceEndMs(sub);
  return end !== null && end > Date.now();
}

// Whole days left before the menu is blocked (0 once grace has expired).
export function pastDueDaysLeft(sub: BillingSub): number {
  const end = pastDueGraceEndMs(sub);
  if (end === null) return 0;
  return Math.max(0, Math.ceil((end - Date.now()) / DAY_MS));
}
