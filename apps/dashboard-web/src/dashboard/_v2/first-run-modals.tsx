"use client";

import { useState } from "react";
import { OnboardingModals } from "./onboarding-modals";
import { TrialModal } from "./trial-modal";
import { PastDueModal } from "./past-due-modal";

type TrialSub = {
  plan: string | null;
  subscriptionStatus: string | null;
  trialEndsAt: string | null;
  currentPeriodEnd?: string | null;
  pastDueSince?: string | null;
  interval?: string | null;
} | null;

/**
 * Sequences the first-run modals: the onboarding modals (name → fill → scan)
 * run first; only once they're resolved does the daily billing nudge appear —
 * either the trial reminder or, for a PAST_DUE paid plan, the past-due nudge
 * (the two are mutually exclusive, each self-decides). Mount with
 * `key={restaurant.id}` so switching restaurants re-evaluates everything.
 */
export function FirstRunModals({
  restaurantName,
  onboardingNameDone,
  onboardingFillDone,
  existingRealItemsCount,
  onRefresh,
  sub,
  accountCreatedAt,
}: {
  restaurantName: string;
  onboardingNameDone: boolean;
  onboardingFillDone: boolean;
  existingRealItemsCount: number;
  onRefresh: () => void | Promise<void>;
  sub: TrialSub;
  accountCreatedAt?: string | null;
}) {
  const [onboardingResolved, setOnboardingResolved] = useState(false);

  return (
    <>
      <OnboardingModals
        restaurantName={restaurantName}
        onboardingNameDone={onboardingNameDone}
        onboardingFillDone={onboardingFillDone}
        existingRealItemsCount={existingRealItemsCount}
        onRefresh={onRefresh}
        onResolved={() => setOnboardingResolved(true)}
      />
      {onboardingResolved ? <TrialModal sub={sub} accountCreatedAt={accountCreatedAt} /> : null}
      {onboardingResolved ? <PastDueModal sub={sub} /> : null}
    </>
  );
}
