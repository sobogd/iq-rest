"use client";

import { currencyInfo, supportedCurrencies } from "@/lib/country-currency-map";
import { useCurrency } from "../lib/currency-context";

// The one client island in the footer — reading the active currency needs
// `document.cookie` (see the "why not read cookies() server-side" thread:
// that would force every page rendering the footer out of static
// rendering). Shares CurrencyProvider with the pricing page's own selector,
// so changing it here updates there too without a reload.
export function FooterCurrency({ heading }: { heading: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-foreground">{heading}</p>
      {/* div, not nav — these are stateful action buttons (pick a currency),
          not links to other pages, so <nav> would misrepresent them. */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {supportedCurrencies.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setCurrency(code, `Footer currency ${code}`)}
            className={`text-sm transition-colors hover:text-foreground ${
              code === currency ? "font-medium text-foreground" : "text-muted-foreground"
            }`}
          >
            {currencyInfo[code].name}
          </button>
        ))}
      </div>
    </div>
  );
}
