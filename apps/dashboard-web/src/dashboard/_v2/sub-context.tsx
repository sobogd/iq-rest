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
  // Only an ACTIVE non-FREE subscription unlocks unlimited AI images. Trial and
  // FREE restaurants share the free quota of 5 — mirror backend `isPaidActive`.
  const isPaid =
    !!sub && sub.subscriptionStatus === "ACTIVE" && !!sub.plan && sub.plan !== "FREE";
  // The server sends `aiImagesLimit: null` for any venue entitled to unlimited
  // AI — including a PRO owner's account-covered secondary venue whose OWN row
  // is FREE. Honor that instead of re-deriving from the own plan (which would
  // wrongly cap a covered venue at 5).
  const rawLimit = sub?.aiImagesLimit;
  if (isPaid || rawLimit === null) return { kind: "unlimited" };
  const used = sub?.aiImagesUsed ?? 0;
  const limit = rawLimit ?? 5;
  const remaining = Math.max(0, limit - used);
  if (remaining === 0) return { kind: "exhausted", used, limit };
  return { kind: "limited", used, limit, remaining };
}
