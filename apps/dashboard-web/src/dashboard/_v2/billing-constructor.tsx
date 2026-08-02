"use client";

// billing-features-constructor — billing UI.
//   No active sub → accordion: (1) pick features + cycle → Continue collapses to
//     a summary card and (2) opens the billing-details card → Continue creates
//     the subscription and redirects to Stripe's hosted payment page (all methods).
//   Active sub → current-plan card + Change plan / Manage (Stripe portal).
// English-first.

import { useEffect, useMemo, useState } from "react";
import { UtensilsCrossed, CalendarClock, ChefHat, Globe, Check, Loader2, Pencil } from "lucide-react";
import { useRestaurants } from "./restaurants-context";
import {
  computeQuote,
  getPricingCatalog,
  subscribeCustom,
  fetchSubscriptionStatus,
  openBillingPortal,
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
type Phase = "options" | "details";

const EMPTY_SEL: Sel = { menuOnline: true, reservations: false, ordersKds: false, domain: false };
const ADDONS: { key: AddonKey; label: string; Icon: typeof CalendarClock }[] = [
  { key: "reservations", label: "Reservations", Icon: CalendarClock },
  { key: "ordersKds", label: "Kitchen display", Icon: ChefHat },
  { key: "domain", label: "Custom domain", Icon: Globe },
];

export function BillingConstructor({ currency = "EUR" }: { currency?: string }) {
  const { list } = useRestaurants();
  const [cycle, setCycle] = useState<Cycle>("year");
  const [sels, setSels] = useState<Record<string, Sel>>({});
  const [quote, setQuote] = useState<BillingQuote | null>(null);
  const [catalog, setCatalog] = useState<PricingCatalog | null>(null);
  const [profile, setProfile] = useState<BillingProfile>({ legalName: "", taxId: "", address: "", billingEmail: "" });
  const [phase, setPhase] = useState<Phase>("options");
  const [changing, setChanging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sub, setSub] = useState<{ plan: string | null; status: string | null; currentPeriodEnd: string | null; cycle: string | null } | null>(null);

  const refreshSub = () =>
    fetchSubscriptionStatus().then((s) =>
      setSub(s ? { plan: s.plan, status: s.subscriptionStatus, currentPeriodEnd: s.currentPeriodEnd, cycle: s.billingCycle } : null),
    );

  useEffect(() => {
    getPricingCatalog().then(setCatalog);
    getBillingProfile().then((p) => p && setProfile(p));
    refreshSub();
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
    if (activeSelections.length === 0) return setQuote(null);
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
  const subActive = sub?.status === "ACTIVE" || sub?.status === "PAST_DUE";

  // Details → create the subscription, then redirect to Stripe to pay. The button
  // stays in the loading state right up to the navigation.
  const confirmAndPay = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    await saveBillingProfile(profile);
    const res = await subscribeCustom(activeSelections, cycle);
    if (!res) {
      setBusy(false);
      setError("Could not start the subscription. Try again.");
      return;
    }
    if (res.changed) {
      setBusy(false);
      setChanging(false);
      setPhase("options");
      setNotice("Subscription updated.");
      refreshSub();
      return;
    }
    if (res.redirectUrl) {
      // Keep busy=true — we're leaving the page.
      window.location.assign(res.redirectUrl);
      return;
    }
    setBusy(false);
    setError("Could not open the payment page. Try again.");
  };

  const manage = async () => {
    const url = await openBillingPortal();
    if (url) window.location.assign(url);
  };

  // ── Active subscription → current plan + manage (unless changing) ──
  if (subActive && !changing) {
    return (
      <div className="flex flex-col gap-4">
        {notice ? <Notice text={notice} onClose={() => setNotice(null)} /> : null}
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-5">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-emerald-600">
              {sub?.status === "PAST_DUE" ? "Past due" : "Active"}
            </div>
            <div className="text-base font-medium text-foreground mt-0.5">
              {sub?.plan}
              {sub?.cycle ? ` · ${sub.cycle.toLowerCase()}` : ""}
            </div>
            {sub?.currentPeriodEnd ? (
              <div className="text-xs text-muted-foreground mt-0.5">Renews {new Date(sub.currentPeriodEnd).toLocaleDateString()}</div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => { setChanging(true); setPhase("options"); }}
            className="h-11 px-5 text-sm font-semibold rounded-xl text-primary-foreground bg-primary"
          >
            Change plan
          </button>
          <button type="button" onClick={manage} className="h-11 px-5 text-sm rounded-xl border border-input">
            Manage subscription
          </button>
        </div>
        <InvoicesList />
      </div>
    );
  }

  // ── No sub (or changing) → accordion ──
  return (
    <div className="flex flex-col gap-4">
      {notice ? <Notice text={notice} onClose={() => setNotice(null)} /> : null}
      {error ? <div className="text-sm text-red-600">{error}</div> : null}

      {/* Card 1 — options */}
      {phase === "options" ? (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-end">
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
            );
          })}

          <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
            <div>
              {quote ? (
                <>
                  <span className="text-2xl font-semibold tabular-nums">{money(quote.amountMajor)}</span>
                  <span className="text-sm text-muted-foreground"> /{cycle === "year" ? "year" : "month"}</span>
                  {quote.discount > 0 ? (
                    <div className="text-xs text-emerald-500 font-medium">
                      {Math.round(quote.discount * 100)}% volume discount · {quote.billingVenues} venues
                    </div>
                  ) : null}
                </>
              ) : (
                <span className="text-sm text-muted-foreground">Select at least one menu</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setPhase("details")}
              disabled={!quote}
              className="h-11 px-6 text-sm font-semibold rounded-xl text-primary-foreground bg-primary disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        // Collapsed summary of the chosen plan
        <button
          type="button"
          onClick={() => { if (!busy) setPhase("options"); }}
          className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 text-left"
        >
          <div>
            <div className="text-xs text-muted-foreground">Your plan</div>
            <div className="text-sm font-medium text-foreground">
              {quote ? `${money(quote.amountMajor)} / ${cycle === "year" ? "year" : "month"}` : "—"}
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-primary">
            <Pencil className="h-3.5 w-3.5" /> Edit
          </span>
        </button>
      )}

      {/* Card 2 — billing details (only after options confirmed) */}
      {phase === "details" && (
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
          <div className="text-sm font-semibold text-foreground">Billing details</div>
          <p className="text-xs text-muted-foreground -mt-2">For your invoices. Optional — fill what you have.</p>
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
          <button
            type="button"
            onClick={confirmAndPay}
            disabled={busy}
            className="mt-1 h-11 px-6 text-sm font-semibold rounded-xl text-primary-foreground bg-primary disabled:opacity-70 inline-flex items-center justify-center gap-2"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Preparing payment…
              </>
            ) : (
              "Continue to payment"
            )}
          </button>
        </div>
      )}

      <InvoicesList />
    </div>
  );
}

function Notice({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
      <span>{text}</span>
      <button type="button" onClick={onClose} className="text-emerald-700">✕</button>
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
