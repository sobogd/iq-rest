"use client";

// billing-features-constructor — the "build your plan" constructor as a stepper.
//   Step 1 Plan     — per-venue feature cards + cycle → live price
//   Step 2 Details  — payer billing profile (legal data)
//   Step 3 Payment  — inline Stripe PaymentElement (saved cards + add-new,
//                     SCA handled), or SEPA-by-invoice (yearly)
// No hosted Checkout, no Stripe portal, no separate card modal. English-first.

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { UtensilsCrossed, CalendarClock, ChefHat, Globe, Check } from "lucide-react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getStripe } from "./stripe";
import { useRestaurants } from "./restaurants-context";
import {
  computeQuote,
  getPricingCatalog,
  subscribeCustom,
  requestSepaInvoice,
  cancelSubscription,
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
type Step = 1 | 2 | 3;

const EMPTY_SEL: Sel = { menuOnline: true, reservations: false, ordersKds: false, domain: false };

const ADDONS: { key: AddonKey; label: string; Icon: typeof CalendarClock }[] = [
  { key: "reservations", label: "Reservations", Icon: CalendarClock },
  { key: "ordersKds", label: "Kitchen display", Icon: ChefHat },
  { key: "domain", label: "Custom domain", Icon: Globe },
];

export function BillingConstructor({ currency = "EUR" }: { currency?: string }) {
  const { list } = useRestaurants();
  const [step, setStep] = useState<Step>(1);
  const [cycle, setCycle] = useState<Cycle>("year");
  const [sels, setSels] = useState<Record<string, Sel>>({});
  const [quote, setQuote] = useState<BillingQuote | null>(null);
  const [catalog, setCatalog] = useState<PricingCatalog | null>(null);
  const [profile, setProfile] = useState<BillingProfile>({ legalName: "", taxId: "", address: "", billingEmail: "" });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPricingCatalog().then(setCatalog);
    getBillingProfile().then((p) => p && setProfile(p));
  }, []);

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

  const price = catalog?.currencies[currency] ?? catalog?.currencies.EUR ?? null;
  const k = cycle === "year" ? "yr" : "mo";
  const money = (v: number) => `${currency === "EUR" ? "€" : ""}${v}${currency !== "EUR" ? " " + currency : ""}`;
  const toggle = (id: string, key: keyof Sel) =>
    setSels((prev) => ({ ...prev, [id]: { ...(prev[id] ?? EMPTY_SEL), [key]: !(prev[id] ?? EMPTY_SEL)[key] } }));
  const single = list.length === 1;

  // Step 2 → 3: save the billing profile, create the subscription, get the
  // PaymentIntent client secret for the inline PaymentElement.
  const goToPayment = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    await saveBillingProfile(profile);
    const res = await subscribeCustom(activeSelections, cycle);
    setBusy(false);
    if (!res) {
      setError("Could not start the subscription. Try again.");
      return;
    }
    if (res.changed) {
      alert("Subscription updated.");
      setStep(1);
      return;
    }
    if (res.clientSecret) {
      setClientSecret(res.clientSecret);
      setStep(3);
    } else {
      setError("No payment required.");
    }
  };

  const payInvoice = async () => {
    if (busy || activeSelections.length === 0) return;
    setBusy(true);
    const res = await requestSepaInvoice(activeSelections, currency);
    setBusy(false);
    if (res?.success) alert("Request received — we'll email you an invoice to pay by SEPA transfer.");
  };
  const doCancel = async () => {
    if (!confirm("Cancel the subscription at the end of the current period?")) return;
    if (await cancelSubscription(true)) alert("Your subscription will cancel at the end of the period.");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stepper header */}
      <div className="flex items-center gap-2 text-xs">
        {(["Plan", "Details", "Payment"] as const).map((label, i) => {
          const n = (i + 1) as Step;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                  active ? "bg-primary text-primary-foreground" : done ? "bg-primary/20 text-primary" : "bg-accent text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : n}
              </span>
              <span className={active ? "font-medium text-foreground" : "text-muted-foreground"}>{label}</span>
              {i < 2 ? <span className="w-6 h-px bg-border" /> : null}
            </div>
          );
        })}
      </div>

      {error ? <div className="text-sm text-red-600">{error}</div> : null}

      {/* ── Step 1: Plan ── */}
      {step === 1 && (
        <>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">Build your plan</h3>
              <p className="text-xs text-muted-foreground">Pay only for what you use.</p>
            </div>
            <div className="inline-flex rounded-full border border-border bg-accent p-1">
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
              <div key={r.id} className="flex flex-col gap-2.5">
                {!single && <div className="text-sm font-medium text-foreground truncate">{r.title || r.slug || r.id}</div>}
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggle(r.id, "menuOnline")}
                    className={`flex items-center gap-3 text-left rounded-xl border-2 p-4 transition-colors ${
                      s.menuOnline ? "border-primary bg-primary/5" : "border-border bg-card opacity-60 hover:opacity-100"
                    }`}
                  >
                    <UtensilsCrossed className={`h-6 w-6 shrink-0 ${s.menuOnline ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="min-w-0 flex-1 text-sm font-semibold text-foreground">Digital menu</div>
                    {price && <div className="shrink-0 text-sm font-medium tabular-nums text-foreground">{money(price.menu[k])}/mo</div>}
                  </button>
                  {ADDONS.map(({ key, label, Icon }) => {
                    const on = s[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={!s.menuOnline}
                        onClick={() => toggle(r.id, key)}
                        className={`flex items-center gap-3 text-left rounded-xl border-2 p-4 transition-colors disabled:opacity-40 ${
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

          <PriceBar quote={quote} cycle={cycle} money={money}>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!quote}
              className="h-11 px-6 text-sm font-semibold rounded-xl text-primary-foreground bg-primary disabled:opacity-50"
            >
              Continue
            </button>
          </PriceBar>
          <button type="button" onClick={doCancel} className="text-xs text-muted-foreground self-start">
            Cancel current subscription
          </button>
        </>
      )}

      {/* ── Step 2: Details ── */}
      {step === 2 && (
        <>
          <h3 className="text-base font-semibold text-foreground">Billing details</h3>
          <p className="text-xs text-muted-foreground -mt-4">For your invoices. Optional — fill what you have.</p>
          {(
            [
              ["legalName", "Name / company"],
              ["taxId", "Tax number"],
              ["address", "Address"],
              ["billingEmail", "Invoice email"],
            ] as [keyof BillingProfile, string][]
          ).map(([key, label]) => (
            <label key={key} className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">{label}</span>
              <input
                className="h-10 rounded-lg border border-input bg-card px-3 text-sm"
                value={profile[key]}
                onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
              />
            </label>
          ))}
          <div className="flex items-center justify-between gap-2">
            <button type="button" onClick={() => setStep(1)} className="h-11 px-4 text-sm rounded-xl border border-input">
              Back
            </button>
            <button
              type="button"
              onClick={goToPayment}
              disabled={busy}
              className="h-11 px-6 text-sm font-semibold rounded-xl text-primary-foreground bg-primary disabled:opacity-50"
            >
              {busy ? "…" : "Continue to payment"}
            </button>
          </div>
        </>
      )}

      {/* ── Step 3: Payment ── */}
      {step === 3 && clientSecret && (
        <>
          <h3 className="text-base font-semibold text-foreground">Payment</h3>
          {quote && (
            <div className="text-sm text-muted-foreground -mt-4">
              {money(quote.amountMajor)} / {cycle === "year" ? "year" : "month"}
            </div>
          )}
          <Elements stripe={getStripe()} options={{ clientSecret, appearance: { theme: "stripe" } }}>
            <PaymentForm onBack={() => setStep(2)} onDone={() => { setStep(1); alert("Payment received — activating…"); }} />
          </Elements>
          {cycle === "year" && (
            <button type="button" onClick={payInvoice} disabled={busy} className="text-xs text-muted-foreground self-start">
              Or pay by SEPA invoice instead
            </button>
          )}
        </>
      )}

      <InvoicesList />
    </div>
  );
}

// Inline price summary bar (not sticky).
function PriceBar({
  quote,
  cycle,
  money,
  children,
}: {
  quote: BillingQuote | null;
  cycle: Cycle;
  money: (v: number) => string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="min-w-0 sm:flex-1">
        {quote ? (
          <>
            <div className="whitespace-nowrap">
              <span className="text-2xl font-semibold tabular-nums">{money(quote.amountMajor)}</span>
              <span className="text-sm text-muted-foreground"> /{cycle === "year" ? "year" : "month"}</span>
            </div>
            <div className="text-sm h-5 leading-5">
              {quote.discount > 0 ? (
                <span className="text-emerald-500 font-medium">
                  {Math.round(quote.discount * 100)}% volume discount · {quote.billingVenues} venues
                </span>
              ) : (
                <span className="text-muted-foreground">{cycle === "year" ? "Billed once a year" : "Billed monthly"}</span>
              )}
            </div>
          </>
        ) : (
          <span className="text-sm text-muted-foreground">Select at least one menu</span>
        )}
      </div>
      {children}
    </div>
  );
}

// Inline card form (PaymentElement). Optional Stripe fields hidden.
function PaymentForm({ onDone, onBack }: { onDone: () => void; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = async () => {
    if (!stripe || !elements || busy) return;
    setBusy(true);
    setError(null);
    const { error } = await stripe.confirmPayment({ elements, redirect: "if_required" });
    if (error) {
      setError(error.message || "Payment failed");
      setBusy(false);
      return;
    }
    onDone();
  };

  return (
    <div className="flex flex-col gap-4">
      <PaymentElement options={{ fields: { billingDetails: { address: "never" } } }} />
      {error ? <div className="text-sm text-red-600">{error}</div> : null}
      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={onBack} className="h-11 px-4 text-sm rounded-xl border border-input">
          Back
        </button>
        <button
          type="button"
          onClick={pay}
          disabled={busy || !stripe}
          className="h-11 px-6 text-sm font-semibold rounded-xl text-primary-foreground bg-primary disabled:opacity-50"
        >
          {busy ? "Processing…" : "Pay"}
        </button>
      </div>
    </div>
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
