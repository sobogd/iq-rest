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
//   - it carries the `legacyFullAccess` grandfather flag (a few pre-gating
//     BASIC venues that already relied on orders/kitchen/reservations).
//
// BASIC keeps its menu online but loses the operational (PRO) features —
// orders / kitchen / reservations gate on this flag.
export function hasProFeatures(r: {
  plan: string | null;
  subscriptionStatus: string | null;
  trialEndsAt?: Date | null;
  legacyFullAccess?: boolean | null;
}): boolean {
  if (r.legacyFullAccess) return true;
  if (r.subscriptionStatus === "ACTIVE" && r.plan === "PRO") return true;
  return !!r.trialEndsAt && r.trialEndsAt > new Date();
}

// Prisma `select` fragment for the fields `hasProFeatures` needs. Spread into
// any restaurant query that gates a PRO feature so the shape stays in sync.
export const PRO_FEATURE_SELECT = {
  plan: true,
  subscriptionStatus: true,
  trialEndsAt: true,
  legacyFullAccess: true,
} as const;
