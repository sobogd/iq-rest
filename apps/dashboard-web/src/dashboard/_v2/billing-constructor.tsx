"use client";

// billing-features-constructor — billing UI (dashboard-styled, landing content).
//   No active sub → accordion: pick features + restaurants count + cycle →
//     Continue collapses to a summary and opens the billing-details card →
//     Skip/Continue creates the subscription and redirects to Stripe Checkout.
//     A full-screen loader covers the prep; Back from Stripe = initial state.
//   Active sub → current-plan card + Change plan / Manage (Stripe portal).
// One uniform plan × N restaurant slots (N = purchased venue capacity).

import { useEffect, useMemo, useState } from "react";
import { UtensilsCrossed, CalendarClock, ChefHat, Globe, Check, Pencil, Minus, Plus } from "lucide-react";
import { useRestaurants } from "./restaurants-context";
import { inputClass, labelClass, primaryBtn, secondaryBtn } from "./tokens";
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
} from "./api";

type Cycle = "month" | "year";
type AddonKey = "reservations" | "ordersKds" | "domain";
type Feat = { reservations: boolean; ordersKds: boolean; domain: boolean };
type Phase = "options" | "details";

const ADDONS: { key: AddonKey; label: string; hint: string; Icon: typeof CalendarClock }[] = [
  { key: "reservations", label: "Reservations", hint: "Table bookings", Icon: CalendarClock },
  { key: "ordersKds", label: "Kitchen display", hint: "Orders on a kitchen screen", Icon: ChefHat },
  { key: "domain", label: "Custom domain", hint: "Your own web address", Icon: Globe },
];

export function BillingConstructor({ currency = "EUR" }: { currency?: string }) {
  const { list } = useRestaurants();
  const [cycle, setCycle] = useState<Cycle>("year");
  const [feat, setFeat] = useState<Feat>({ reservations: false, ordersKds: false, domain: false });
  const [count, setCount] = useState(1);
  const [catalog, setCatalog] = useState<PricingCatalog | null>(null);
  const [monthQuote, setMonthQuote] = useState<BillingQuote | null>(null);
  const [yearQuote, setYearQuote] = useState<BillingQuote | null>(null);
  const [profile, setProfile] = useState<BillingProfile>({ legalName: "", taxId: "", address: "", billingEmail: "" });
  const [phase, setPhase] = useState<Phase>("options");
  const [changing, setChanging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sub, setSub] = useState<{ plan: string | null; status: string | null; currentPeriodEnd: string | null; cycle: string | null } | null>(null);

  const minCount = Math.max(1, list.length);

  const refreshSub = () =>
    fetchSubscriptionStatus().then((s) =>
      setSub(s ? { plan: s.plan, status: s.subscriptionStatus, currentPeriodEnd: s.currentPeriodEnd, cycle: s.billingCycle } : null),
    );

  useEffect(() => {
    getPricingCatalog().then(setCatalog);
    getBillingProfile().then((p) => p && setProfile(p));
    refreshSub();
    if (new URLSearchParams(window.location.search).get("success")) {
      setNotice("Payment received — activating your subscription…");
      setTimeout(refreshSub, 1500);
    }
  }, []);

  // Never buy fewer slots than the restaurants you already have.
  useEffect(() => setCount((c) => Math.max(c, minCount)), [minCount]);

  // Amounts via the API (same @iq-rest/pricing engine server-side → identical to
  // the landing). Fetch both cycles so the monthly→yearly saving can be shown.
  useEffect(() => {
    let alive = true;
    const venues = Array.from({ length: Math.max(1, count) }, (_, i) => ({
      restaurantId: String(i),
      menuOnline: true,
      reservations: feat.reservations,
      ordersKds: feat.ordersKds,
      domain: feat.domain,
    }));
    Promise.all([computeQuote(venues, "month", currency), computeQuote(venues, "year", currency)]).then(([m, y]) => {
      if (!alive) return;
      setMonthQuote(m);
      setYearQuote(y);
    });
    return () => {
      alive = false;
    };
  }, [feat, count, currency]);

  const quote = cycle === "year" ? yearQuote : monthQuote;
  const yearlySaving =
    monthQuote && yearQuote ? Math.max(0, Math.round((monthQuote.amountMajor * 12 - yearQuote.amountMajor) * 100) / 100) : 0;

  const price = catalog?.currencies[currency] ?? catalog?.currencies.EUR ?? null;
  const k = cycle === "year" ? "yr" : "mo";
  const money = (v: number) => `${currency === "EUR" ? "€" : ""}${v}${currency !== "EUR" ? " " + currency : ""}`;
  const subActive = sub?.status === "ACTIVE" || sub?.status === "PAST_DUE";

  const confirmAndPay = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    await saveBillingProfile(profile);
    const res = await subscribeCustom(feat, count, cycle);
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
      window.location.assign(res.redirectUrl); // busy stays true — leaving the page
      return;
    }
    setBusy(false);
    setError("Could not open the payment page. Try again.");
  };

  const manage = async () => {
    const url = await openBillingPortal();
    if (url) window.location.assign(url);
  };

  const overlay = busy ? (
    <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-10 h-10 border-[3px] border-input border-t-foreground rounded-full animate-spin" />
        <div className="text-xs text-muted-foreground">Preparing your subscription…</div>
      </div>
    </div>
  ) : null;

  // ── Active subscription → current plan + manage ──
  if (subActive && !changing) {
    return (
      <div className="flex flex-col gap-4">
        {notice ? <Notice text={notice} onClose={() => setNotice(null)} /> : null}
        <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-emerald-600">
              {sub?.status === "PAST_DUE" ? "Past due" : "Active"}
            </div>
            <div className="text-sm font-medium text-foreground mt-0.5">
              {sub?.plan}
              {sub?.cycle ? ` · ${sub.cycle.toLowerCase()}` : ""}
            </div>
            {sub?.currentPeriodEnd ? (
              <div className="text-xs text-muted-foreground mt-0.5">Renews {new Date(sub.currentPeriodEnd).toLocaleDateString()}</div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => { setChanging(true); setPhase("options"); }} className={primaryBtn}>
            Change plan
          </button>
          <button type="button" onClick={manage} className={secondaryBtn}>
            Manage subscription
          </button>
        </div>
        <InvoicesList />
        <EnterpriseCard />
        {overlay}
      </div>
    );
  }

  const toggleFeat = (key: AddonKey) => setFeat((f) => ({ ...f, [key]: !f[key] }));

  // ── No sub (or changing) → accordion ──
  return (
    <div className="flex flex-col gap-4">
      {notice ? <Notice text={notice} onClose={() => setNotice(null)} /> : null}
      {error ? <div className="text-sm text-red-600">{error}</div> : null}

      {phase === "options" ? (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 md:p-5">
          {/* Feature cards (menu always included) */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 rounded-lg border border-primary bg-primary/5 p-3">
              <UtensilsCrossed className="h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-foreground">Digital menu</div>
                <div className="text-xs text-muted-foreground leading-snug">QR menu diners scan</div>
              </div>
              {price && <div className="shrink-0 text-sm tabular-nums text-foreground">{money(price.menu[k])}/mo</div>}
            </div>
            {ADDONS.map(({ key, label, hint, Icon }) => {
              const on = feat[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleFeat(key)}
                  className={`flex items-center gap-3 text-left rounded-lg border p-3 transition-colors ${
                    on ? "border-primary bg-primary/5" : "border-border bg-card hover:border-input"
                  }`}
                >
                  <Icon className={`h-5 w-5 shrink-0 ${on ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground">{label}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{hint}</div>
                  </div>
                  {price && (
                    <div className={`shrink-0 text-sm tabular-nums ${on ? "text-primary" : "text-muted-foreground"}`}>
                      +{money(price[key][k])}/mo
                    </div>
                  )}
                  <span
                    className={`shrink-0 flex h-4 w-4 items-center justify-center rounded-full border ${
                      on ? "border-primary bg-primary text-primary-foreground" : "border-input"
                    }`}
                  >
                    {on ? <Check className="h-3 w-3" /> : null}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Restaurants count */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-sm font-medium text-foreground">Restaurants</span>
              {list.length > 0 ? <span className="text-xs text-muted-foreground ml-1">(you have {list.length})</span> : null}
            </div>
            <div className="inline-flex items-center rounded-full border border-border bg-accent p-0.5">
              <button
                type="button"
                aria-label="Fewer"
                onClick={() => setCount((c) => Math.max(minCount, c - 1))}
                disabled={count <= minCount}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                <Minus className="h-3 w-3" strokeWidth={2.75} />
              </button>
              <span className="inline-block w-8 text-center text-xs font-medium tabular-nums">{count}</span>
              <button
                type="button"
                aria-label="More"
                onClick={() => setCount((c) => Math.min(99, c + 1))}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-3 w-3" strokeWidth={2.75} />
              </button>
            </div>
          </div>

          {/* Billing period */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground">Billing period</span>
            <div className="inline-flex rounded-full border border-border bg-accent p-0.5">
              {(["month", "year"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCycle(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    cycle === c ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {c === "month" ? "Monthly" : "Yearly"}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Continue */}
          <div className="flex items-center justify-between gap-3">
            <div>
              {quote ? (
                <>
                  <span className="text-xl font-semibold tabular-nums text-foreground">{money(quote.amountMajor)}</span>
                  <span className="text-xs text-muted-foreground"> /{cycle === "year" ? "year" : "month"}</span>
                  <div className="text-xs mt-0.5 h-4 leading-4">
                    {cycle === "month" && yearlySaving > 0 ? (
                      <span className="text-emerald-500 font-medium">Save {money(yearlySaving)} a year with yearly billing</span>
                    ) : quote.discount > 0 ? (
                      <span className="text-emerald-500 font-medium">
                        {Math.round(quote.discount * 100)}% volume discount · {quote.billingVenues} restaurants
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Save up to 50% with 5+ restaurants</span>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">…</span>
              )}
            </div>
            <button type="button" onClick={() => setPhase("details")} disabled={!quote} className={primaryBtn + " disabled:opacity-50"}>
              Continue
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => { if (!busy) setPhase("options"); }}
          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 text-left"
        >
          <div>
            <div className="text-xs text-muted-foreground">Your plan · {count} restaurant{count > 1 ? "s" : ""}</div>
            <div className="text-sm font-medium text-foreground">
              {quote ? `${money(quote.amountMajor)} / ${cycle === "year" ? "year" : "month"}` : "—"}
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <Pencil className="h-3 w-3" /> Edit
          </span>
        </button>
      )}

      {phase === "details" && (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:p-5">
          <div>
            <div className="text-sm font-medium text-foreground">Billing details</div>
            <p className="text-xs text-muted-foreground mt-0.5">Optional — for your invoices. Skip if you don't have them.</p>
          </div>
          {(
            [
              ["legalName", "Name / company"],
              ["taxId", "Tax number"],
              ["address", "Address"],
            ] as [keyof BillingProfile, string][]
          ).map(([key, label]) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <input
                className={inputClass}
                value={profile[key]}
                onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
              />
            </div>
          ))}
          <div className="flex items-center justify-end gap-2 mt-1">
            <button type="button" onClick={confirmAndPay} disabled={busy} className={secondaryBtn}>
              Skip
            </button>
            <button type="button" onClick={confirmAndPay} disabled={busy} className={primaryBtn}>
              Continue
            </button>
          </div>
        </div>
      )}

      <InvoicesList />
      <EnterpriseCard />
      {overlay}
    </div>
  );
}

function EnterpriseCard() {
  const wa =
    "https://wa.me/998948663743?text=" +
    encodeURIComponent("Hi! I'd like a custom plan for my restaurants.");
  return (
    <a
      href={wa}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl border border-dashed border-border bg-card p-4 hover:border-input transition-colors"
    >
      <div className="text-sm font-medium text-foreground">Need a custom plan?</div>
      <div className="text-xs text-muted-foreground leading-snug">
        Many restaurants or special requirements — message us and we'll tailor a plan for you.
      </div>
    </a>
  );
}

function Notice({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
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
    <details className="rounded-xl border border-border bg-card p-4">
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
