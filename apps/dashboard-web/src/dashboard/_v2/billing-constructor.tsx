"use client";

// billing-features-constructor — the "build your plan" constructor (card-select).
//
// Per-venue feature cards (tap to toggle) → live quote (/api/billing/quote) →
// ad-hoc card checkout or SEPA-by-invoice (yearly). Mirrors the landing quiz.
// Also renders the payer billing profile + read-only invoices. English-first.

import { useEffect, useMemo, useState } from "react";
import { UtensilsCrossed, CalendarClock, ChefHat, Globe, Check } from "lucide-react";
import { useRestaurants } from "./restaurants-context";
import {
  computeQuote,
  getPricingCatalog,
  createAdhocCheckout,
  requestSepaInvoice,
  getBillingProfile,
  saveBillingProfile,
  getInvoices,
  type BillingQuote,
  type BillingProfile,
  type InvoiceRow,
  type PricingCatalog,
  type VenueSelectionInput,
} from "./api";

type Cycle = "month" | "year";
type AddonKey = "reservations" | "ordersKds" | "domain";
type Sel = { menuOnline: boolean; reservations: boolean; ordersKds: boolean; domain: boolean };

const EMPTY_SEL: Sel = { menuOnline: true, reservations: false, ordersKds: false, domain: false };

const ADDONS: { key: AddonKey; label: string; hint: string; Icon: typeof CalendarClock }[] = [
  { key: "reservations", label: "Reservations", hint: "Table bookings", Icon: CalendarClock },
  { key: "ordersKds", label: "Orders + Kitchen", hint: "Orders & KDS", Icon: ChefHat },
  { key: "domain", label: "Custom domain", hint: "Your web address", Icon: Globe },
];

export function BillingConstructor({ currency = "EUR" }: { currency?: string }) {
  const { list } = useRestaurants();
  const [cycle, setCycle] = useState<Cycle>("year");
  const [sels, setSels] = useState<Record<string, Sel>>({});
  const [quote, setQuote] = useState<BillingQuote | null>(null);
  const [catalog, setCatalog] = useState<PricingCatalog | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getPricingCatalog().then(setCatalog);
  }, []);

  // Seed a selection per venue (menu on by default).
  useEffect(() => {
    setSels((prev) => {
      const next = { ...prev };
      for (const r of list) if (!next[r.id]) next[r.id] = { ...EMPTY_SEL };
      return next;
    });
  }, [list]);

  const selections = useMemo<VenueSelectionInput[]>(
    () => list.map((r) => ({ restaurantId: r.id, ...(sels[r.id] ?? EMPTY_SEL) })),
    [list, sels],
  );
  const activeSelections = selections.filter((s) => s.menuOnline);

  useEffect(() => {
    let alive = true;
    if (activeSelections.length === 0) {
      setQuote(null);
      return;
    }
    computeQuote(activeSelections, cycle, currency).then((q) => alive && setQuote(q));
    return () => {
      alive = false;
    };
  }, [selections, cycle, currency]);

  const toggle = (id: string, key: keyof Sel) =>
    setSels((prev) => ({ ...prev, [id]: { ...(prev[id] ?? EMPTY_SEL), [key]: !(prev[id] ?? EMPTY_SEL)[key] } }));

  const price = catalog?.currencies[currency] ?? catalog?.currencies.EUR ?? null;
  const k = cycle === "year" ? "yr" : "mo";
  const money = (v: number) => `${currency === "EUR" ? "€" : ""}${v}${currency !== "EUR" ? " " + currency : ""}`;

  const payCard = async () => {
    if (busy || activeSelections.length === 0) return;
    setBusy(true);
    const url = await createAdhocCheckout(activeSelections, cycle, currency);
    if (url) window.location.assign(url);
    else setBusy(false);
  };
  const payInvoice = async () => {
    if (busy || activeSelections.length === 0) return;
    setBusy(true);
    const res = await requestSepaInvoice(activeSelections, currency);
    setBusy(false);
    if (res?.success) alert("Request received — we'll email you an invoice to pay by SEPA transfer.");
  };

  const single = list.length === 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">Build your plan</h3>
          <p className="text-xs text-muted-foreground">Pay only for what you use.</p>
        </div>
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          {(["month", "year"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCycle(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                cycle === c ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {c === "month" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>
      </div>

      {list.map((r) => {
        const s = sels[r.id] ?? EMPTY_SEL;
        return (
          <div key={r.id} className="flex flex-col gap-3">
            {!single && (
              <div className="text-sm font-medium text-foreground truncate">{r.title || r.slug || r.id}</div>
            )}
            <div className="flex flex-col gap-2.5">
              {/* Menu — toggle whether this venue is billed at all */}
              <button
                type="button"
                onClick={() => toggle(r.id, "menuOnline")}
                className={`flex items-center gap-3 text-left rounded-xl border-2 p-3.5 transition-colors ${
                  s.menuOnline ? "border-primary bg-primary/5" : "border-border bg-card opacity-60 hover:opacity-100"
                }`}
              >
                <UtensilsCrossed className={`h-6 w-6 shrink-0 ${s.menuOnline ? "text-primary" : "text-muted-foreground"}`} />
                <div className="min-w-0 flex-1 text-sm font-semibold text-foreground">Digital menu</div>
                {price && (
                  <div className="shrink-0 text-sm font-medium tabular-nums text-foreground">{money(price.menu[k])}/mo</div>
                )}
                <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" />
                </span>
              </button>

              {ADDONS.map(({ key, label, Icon }) => {
                const on = s[key];
                const disabled = !s.menuOnline;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={disabled}
                    onClick={() => toggle(r.id, key)}
                    className={`flex items-center gap-3 text-left rounded-xl border-2 p-3.5 transition-colors disabled:opacity-40 ${
                      on ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-input"
                    }`}
                  >
                    <Icon className={`h-6 w-6 shrink-0 ${on ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="min-w-0 flex-1 text-sm font-semibold text-foreground">{label}</div>
                    {price && (
                      <div className={`shrink-0 text-sm font-medium tabular-nums ${on ? "text-primary" : "text-muted-foreground"}`}>
                        +{money(price[key][k])}/mo
                      </div>
                    )}
                    <span
                      className={`shrink-0 flex h-5 w-5 items-center justify-center rounded-full border ${
                        on ? "border-primary bg-primary text-primary-foreground" : "border-input"
                      }`}
                    >
                      {on ? <Check className="h-3.5 w-3.5" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Price bar — inline (not sticky) so it never covers the cards on mobile.
          Stacks on phones; sub-line has a fixed height to avoid layout shift. */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
          <div className="min-w-0 sm:flex-1">
            <div className="whitespace-nowrap">
              {quote ? (
                <>
                  <span className="text-2xl font-semibold tabular-nums">{money(quote.amountMajor)}</span>
                  <span className="text-sm text-muted-foreground"> /{cycle === "year" ? "year" : "month"}</span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">Select at least one menu</span>
              )}
            </div>
            <div className="text-sm h-5 leading-5">
              {quote && quote.discount > 0 ? (
                <span className="text-emerald-500 font-medium">
                  {Math.round(quote.discount * 100)}% volume discount · {quote.billingVenues} venues
                </span>
              ) : quote ? (
                <span className="text-muted-foreground">{cycle === "year" ? "Billed once a year" : "Billed monthly"}</span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {cycle === "year" && (
              <button
                type="button"
                onClick={payInvoice}
                disabled={busy || !quote}
                className="flex-1 sm:flex-none h-11 px-4 text-sm font-medium rounded-xl border border-input text-foreground disabled:opacity-50"
              >
                SEPA invoice
              </button>
            )}
            <button
              type="button"
              onClick={payCard}
              disabled={busy || !quote}
              className="flex-1 sm:flex-none h-11 px-5 text-sm font-semibold rounded-xl text-primary-foreground bg-primary disabled:opacity-50"
            >
              Pay by card
            </button>
          </div>
        </div>
      </div>

      <BillingProfileForm />
      <InvoicesList />
    </div>
  );
}

function BillingProfileForm() {
  const [profile, setProfile] = useState<BillingProfile>({ legalName: "", taxId: "", address: "", billingEmail: "" });
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    getBillingProfile().then((p) => p && setProfile(p));
  }, []);
  const save = async () => setSaved(await saveBillingProfile(profile));
  const field = (key: keyof BillingProfile, label: string) => (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        className="h-10 rounded-lg border border-input bg-card px-3 text-sm"
        value={profile[key]}
        onChange={(e) => {
          setSaved(false);
          setProfile((p) => ({ ...p, [key]: e.target.value }));
        }}
      />
    </label>
  );
  return (
    <details className="rounded-2xl border border-border bg-card p-4">
      <summary className="text-sm font-medium cursor-pointer">Billing details (for invoices)</summary>
      <div className="flex flex-col gap-3 mt-3">
        {field("legalName", "Name / company")}
        {field("taxId", "Tax number")}
        {field("address", "Address")}
        {field("billingEmail", "Invoice email")}
        <button type="button" onClick={save} className="h-10 px-4 text-sm font-medium rounded-lg border border-input self-start">
          {saved ? "Saved ✓" : "Save"}
        </button>
      </div>
    </details>
  );
}

function InvoicesList() {
  const [rows, setRows] = useState<InvoiceRow[]>([]);
  useEffect(() => {
    getInvoices().then(setRows);
  }, []);
  if (rows.length === 0) return null;
  return (
    <details className="rounded-2xl border border-border bg-card p-4">
      <summary className="text-sm font-medium cursor-pointer">My invoices ({rows.length})</summary>
      <ul className="flex flex-col gap-1.5 mt-3">
        {rows.map((r) => (
          <li key={r.id}>
            <a href={r.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-primary">
              {r.number || r.id}
              {r.issuedAt ? ` — ${new Date(r.issuedAt).toLocaleDateString()}` : ""}
              {r.amount != null ? ` — ${r.amount} ${r.currency ?? ""}` : ""}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
