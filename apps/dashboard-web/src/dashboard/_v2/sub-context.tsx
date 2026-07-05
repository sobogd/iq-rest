"use client";

import { createContext, useContext, ReactNode } from "react";

export type Sub = {
  plan: string | null;
  subscriptionStatus: string | null;
  trialEndsAt: string | null;
  aiImagesUsed?: number;
  aiImagesLimit?: number | null;
  // False when the active restaurant is managed for another company via grant;
  // the billing tab/UI is hidden in that case. Defaults to true (owner).
  canManageBilling?: boolean;
} | null;

const SubContext = createContext<Sub>(null);

export function SubProvider({ sub, children }: { sub: Sub; children: ReactNode }) {
  return <SubContext.Provider value={sub}>{children}</SubContext.Provider>;
}

export function useSub(): Sub {
  return useContext(SubContext);
}

export type AiImageAccess =
  | { kind: "unlimited" }
  | { kind: "limited"; used: number; limit: number; remaining: number }
  | { kind: "exhausted"; used: number; limit: number };

export function useAiImageAccess(): AiImageAccess {
  const sub = useSub();
  // Mirror backend `isPaidActive` (ai-quota.ts): a restaurant is unlocked when it
  // has an ACTIVE non-FREE subscription OR is inside its 14-day trial window.
  // Without the trial check the UI showed "5/5 exhausted" while the backend still
  // generated unlimited images for trial users.
  const subActive =
    !!sub && sub.subscriptionStatus === "ACTIVE" && !!sub.plan && sub.plan !== "FREE";
  const inTrial = !!sub?.trialEndsAt && new Date(sub.trialEndsAt) > new Date();
  if (subActive || inTrial) return { kind: "unlimited" };
  const used = sub?.aiImagesUsed ?? 0;
  const limit = sub?.aiImagesLimit ?? 5;
  const remaining = Math.max(0, limit - used);
  if (remaining === 0) return { kind: "exhausted", used, limit };
  return { kind: "limited", used, limit, remaining };
}
