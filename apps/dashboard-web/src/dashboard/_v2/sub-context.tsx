"use client";

import { createContext, useContext, ReactNode } from "react";

export type Sub = {
  plan: string | null;
  subscriptionStatus: string | null;
  trialEndsAt: string | null;
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
