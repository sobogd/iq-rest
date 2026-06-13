// PRO-feature entitlement (diner side). Mirrors the dashboard-api helper:
// orders + reservations are PRO-only. A restaurant is entitled when it has an
// ACTIVE PRO subscription, is inside its trial window, or carries the
// `legacyFullAccess` grandfather flag. BASIC = view-only menu.
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

export const PRO_FEATURE_SELECT = {
  plan: true,
  subscriptionStatus: true,
  trialEndsAt: true,
  legacyFullAccess: true,
} as const;
