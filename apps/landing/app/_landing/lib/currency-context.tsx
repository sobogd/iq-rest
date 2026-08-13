"use client";

// Single client-side source of truth for the billing currency, so every
// consumer (pricing quiz, footer currency list, ...) updates in lockstep
// instead of each holding its own local `useState` that only reads the
// cookie once on mount. Purely a UI-reactivity fix — the actual persisted
// value is still just the `geo_currency` cookie (written via POST
// /api/currency), so there's no new server state and no SEO impact: a
// crawler without the cookie sees the same geo-default it always did.

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { analytics } from "@/lib/analytics";
import { readBillingCurrencyFromDocument, type SupportedCurrency } from "@/lib/country-currency-map";

interface CurrencyContextValue {
  currency: SupportedCurrency;
  setCurrency: (next: SupportedCurrency, trackLabel?: string) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>("EUR");

  useEffect(() => {
    setCurrencyState(readBillingCurrencyFromDocument());
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency: (next, trackLabel) => {
        if (trackLabel) analytics.track("Click", trackLabel);
        setCurrencyState(next);
        fetch("/api/currency", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currency: next }),
        }).catch(() => undefined);
      },
    }),
    [currency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
