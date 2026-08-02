"use client";

// billing-features-constructor — billing UI (dashboard-styled, landing content).
//   No active sub → accordion: pick features + restaurants count + cycle →
//     Continue collapses to a summary and opens the billing-details card →
//     Skip/Continue creates the subscription and redirects to Stripe Checkout.
//     A full-screen loader covers the prep; Back from Stripe = initial state.
//   Active sub → current-plan card + Change plan / Manage (Stripe portal).
// One uniform plan × N restaurant slots (N = purchased venue capacity).

import { useEffect, useState } from "react";
import { UtensilsCrossed, CalendarClock, ChefHat, Globe, Check, Pencil, Minus, Plus } from "lucide-react";
import { useTranslations, useLocale } from "@/lib/i18n-compat";
import { useRestaurants } from "./restaurants-context";
import { inputClass, labelClass, primaryBtn, secondaryBtn } from "./tokens";
import {
  computeQuote,
  getPricingCatalog,
  subscribeCustom,
  fetchChangePreview,
  fetchSubscriptionStatus,
  openBillingPortal,
  syncBilling,
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

const ADDONS: { key: AddonKey; labelKey: string; hintKey: string; Icon: typeof CalendarClock }[] = [
  { key: "reservations", labelKey: "featReservations", hintKey: "featReservationsHint", Icon: CalendarClock },
  { key: "ordersKds", labelKey: "featKds", hintKey: "featKdsHint", Icon: ChefHat },
  { key: "domain", labelKey: "featDomain", hintKey: "featDomainHint", Icon: Globe },
];

export function BillingConstructor({ currency = "EUR" }: { currency?: string }) {
  const tb = useTranslations("dashboard.settings.billing");
  const locale = useLocale();
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
  // Set while awaiting confirmation of the immediate proration charge on an
  // active-plan change (null immediateMajor = amount couldn't be previewed).
  const [pendingCharge, setPendingCharge] = useState<{ immediateMajor: number | null; currency: string } | null>(null);
  // False until the subscription status is known once. Prevents the constructor
  // (the sub===null default) flashing before an active/canceling plan loads.
  const [subLoaded, setSubLoaded] = useState(false);
  const [sub, setSub] = useState<{
    status: string | null;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
    features?: { menuOnline: boolean; reservations: boolean; ordersKds: boolean; customDomain: boolean };
    amount?: number | null;
    currency?: string | null;
    interval?: string | null;
    venueLimit?: number | null;
  } | null>(null);

  // Count ONLY the venues of the active account (owned). `list` also contains
  // venues managed for other companies via grant (`owned === false`); including
  // those would force the owner to buy — and pay for — slots they don't have in
  // this account. The server bills by account venue count, so this must match.
  const ownedCount = list.filter((r) => r.owned !== false).length;
  const minCount = Math.max(1, ownedCount);

  const refreshSub = () =>
    fetchSubscriptionStatus().then((s) =>
      setSub(
        s
          ? {
              status: s.subscriptionStatus,
              currentPeriodEnd: s.currentPeriodEnd,
              cancelAtPeriodEnd: !!s.cancelAtPeriodEnd,
              features: s.features,
              amount: s.amount,
              currency: s.currency,
              interval: s.interval,
              venueLimit: s.venueLimit,
            }
          : null,
      ),
    );

  useEffect(() => {
    getPricingCatalog().then(setCatalog);
    getBillingProfile().then((p) => p && setProfile(p));
    // Read our DB FIRST (fast) and mark loaded → the correct card/constructor
    // renders straight away, no flash. Then reconcile with Stripe in the
    // background (covers a missed webhook) and refresh silently.
    refreshSub().finally(() => setSubLoaded(true));
    syncBilling().then(refreshSub);
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) {
      setNotice(tb("paymentReceived"));
      setTimeout(() => syncBilling().then(refreshSub), 1500);
      // Strip ?success (and ?canceled) so a refresh doesn't replay the notice.
      params.delete("success");
      params.delete("canceled");
      const qs = params.toString();
      window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // Proper currency formatting (symbol placement, decimals, thousands
  // separators, zero-decimal currencies) via Intl instead of raw concatenation.
  const fmtMoney = (v: number, cur: string) => {
    try {
      return new Intl.NumberFormat(locale || "en", { style: "currency", currency: cur }).format(v);
    } catch {
      return `${v} ${cur}`;
    }
  };
  const money = (v: number) => fmtMoney(v, currency);
  const subActive = sub?.status === "ACTIVE" || sub?.status === "PAST_DUE";
  const venueCountLabel = (n: number) => (n === 1 ? tb("restaurantOne") : tb("restaurantsMany", { count: n }));

  const doCharge = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    setPendingCharge(null);
    await saveBillingProfile(profile);
    const res = await subscribeCustom(feat, count, cycle);
    if (!res) {
      setBusy(false);
      setError(tb("errStartSubscription"));
      return;
    }
    if (res.changed) {
      setBusy(false);
      setChanging(false);
      setPhase("options");
      setNotice(tb("subscriptionUpdated"));
      refreshSub();
      return;
    }
    if (res.redirectUrl) {
      window.location.assign(res.redirectUrl); // busy stays true — leaving the page
      return;
    }
    setBusy(false);
    setError(tb("errOpenPayment"));
  };

  const confirmAndPay = async () => {
    if (busy) return;
    // Changing an ACTIVE subscription bills the saved card immediately
    // (proration). Preview the exact amount and require an explicit confirm
    // before charging. A brand-new subscription is paid at hosted Checkout,
    // where Stripe shows the amount — no extra step needed.
    if (subActive) {
      setBusy(true);
      setError(null);
      const preview = await fetchChangePreview(feat, count, cycle);
      setBusy(false);
      setPendingCharge(
        preview ? { immediateMajor: preview.immediateMajor, currency: preview.currency } : { immediateMajor: null, currency },
      );
      return;
    }
    await doCharge();
  };

  const manage = async () => {
    const url = await openBillingPortal();
    if (url) window.location.assign(url);
  };

  const overlay = busy ? (
    <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-10 h-10 border-[3px] border-input border-t-foreground rounded-full animate-spin" />
        <div className="text-xs text-muted-foreground">{tb("preparing")}</div>
      </div>
    </div>
  ) : null;

  // Immediate-charge confirmation before an in-place (proration) plan change.
  const chargeDialog = pendingCharge ? (
    <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-lg flex flex-col gap-3">
        <div className="text-sm font-semibold text-foreground">{tb("confirmChangeTitle")}</div>
        <div className="text-sm text-muted-foreground">
          {pendingCharge.immediateMajor == null
            ? tb("confirmChangeUnknown")
            : pendingCharge.immediateMajor < 0
              ? tb("confirmChangeCredit", { amount: money(Math.abs(pendingCharge.immediateMajor)) })
              : tb("confirmChargeNow", { amount: money(pendingCharge.immediateMajor) })}
        </div>
        {quote ? (
          <div className="text-xs text-muted-foreground">
            {tb("confirmThenRecurring", {
              amount: money(quote.amountMajor),
              period: cycle === "year" ? tb("perYearWord") : tb("perMonthWord"),
            })}
          </div>
        ) : null}
        <div className="flex items-center gap-2 mt-1">
          <button type="button" onClick={() => setPendingCharge(null)} className={secondaryBtn} disabled={busy}>
            {tb("cancel")}
          </button>
          <button type="button" onClick={doCharge} className={primaryBtn} disabled={busy}>
            {tb("confirmPay")}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  // Until the subscription status is known, show a skeleton — never the
  // constructor — so an active/canceling plan doesn't flash the builder first.
  if (!subLoaded) {
    return (
      <div className="flex flex-col gap-4" aria-busy="true">
        <div className="h-24 rounded-xl border border-border bg-card animate-pulse" />
        <div className="h-9 w-40 rounded-lg bg-accent animate-pulse" />
      </div>
    );
  }

  // ── Active subscription → current plan + manage ──
  if (subActive && !changing) {
    return (
      <div className="flex flex-col gap-4">
        {notice ? <Notice text={notice} onClose={() => setNotice(null)} /> : null}
        <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4">
          <div>
            <div
              className={`text-xs font-medium uppercase tracking-wide ${
                sub?.cancelAtPeriodEnd ? "text-amber-600 dark:text-amber-400" : sub?.status === "PAST_DUE" ? "text-red-600 dark:text-red-400" : "text-emerald-600"
              }`}
            >
              {sub?.cancelAtPeriodEnd ? tb("statusCanceling") : sub?.status === "PAST_DUE" ? tb("statusPastDue") : tb("active")}
            </div>
            <div className="text-sm font-medium text-foreground mt-0.5">
              {[
                tb("featMenuShort"),
                sub?.features?.reservations ? tb("featReservations") : null,
                sub?.features?.ordersKds ? tb("featKds") : null,
                sub?.features?.customDomain ? tb("featDomain") : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {sub?.venueLimit ? venueCountLabel(sub.venueLimit) : ""}
              {sub?.amount != null
                ? ` · ${fmtMoney(sub.amount, sub.currency || currency)}/${sub.interval === "year" ? tb("perYearWord") : tb("perMonthWord")}`
                : ""}
            </div>
            {sub?.currentPeriodEnd ? (
              <div className="text-xs text-muted-foreground mt-0.5">
                {sub.cancelAtPeriodEnd
                  ? tb("cancelsOn", { date: fmtDate(sub.currentPeriodEnd, locale) })
                  : tb("renews", { date: fmtDate(sub.currentPeriodEnd, locale) })}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              // Pre-fill the constructor with the current subscription.
              if (sub?.features) {
                setFeat({
                  reservations: !!sub.features.reservations,
                  ordersKds: !!sub.features.ordersKds,
                  domain: !!sub.features.customDomain,
                });
              }
              if (sub?.venueLimit) setCount(Math.max(minCount, sub.venueLimit));
              if (sub?.interval) setCycle(sub.interval === "year" ? "year" : "month");
              setChanging(true);
              setPhase("options");
            }}
            className={primaryBtn}
          >
            {tb("changePlan")}
          </button>
          <button type="button" onClick={manage} className={secondaryBtn}>
            {tb("manageSubscription")}
          </button>
        </div>
        <InvoicesList />
        <EnterpriseCard />
        {overlay}
        {chargeDialog}
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
                <div className="text-sm font-medium text-foreground">{tb("featMenu")}</div>
                <div className="text-xs text-muted-foreground leading-snug">{tb("featMenuHint")}</div>
              </div>
              {price && <div className="shrink-0 text-sm tabular-nums text-foreground">{money(price.menu[k])}{tb("perMo")}</div>}
            </div>
            {ADDONS.map(({ key, labelKey, hintKey, Icon }) => {
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
                    <div className="text-sm font-medium text-foreground">{tb(labelKey)}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{tb(hintKey)}</div>
                  </div>
                  {price && (
                    <div className={`shrink-0 text-sm tabular-nums ${on ? "text-primary" : "text-muted-foreground"}`}>
                      +{money(price[key][k])}{tb("perMo")}
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
              <span className="text-sm font-medium text-foreground">{tb("restaurantsLabel")}</span>
              {ownedCount > 0 ? <span className="text-xs text-muted-foreground ml-1">({tb("youHave", { count: ownedCount })})</span> : null}
            </div>
            <div className="inline-flex items-center rounded-full border border-border bg-accent p-0.5">
              <button
                type="button"
                aria-label={tb("fewer")}
                onClick={() => setCount((c) => Math.max(minCount, c - 1))}
                disabled={count <= minCount}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                <Minus className="h-3 w-3" strokeWidth={2.75} />
              </button>
              <span className="inline-block w-8 text-center text-xs font-medium tabular-nums">{count}</span>
              <button
                type="button"
                aria-label={tb("more")}
                onClick={() => setCount((c) => Math.min(99, c + 1))}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-3 w-3" strokeWidth={2.75} />
              </button>
            </div>
          </div>

          {/* Billing period */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground">{tb("billingPeriod")}</span>
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
                  {c === "month" ? tb("monthly") : tb("yearly")}
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
                  <span className="text-xs text-muted-foreground"> /{cycle === "year" ? tb("perYearWord") : tb("perMonthWord")}</span>
                  <div className="text-xs mt-0.5 h-4 leading-4">
                    {cycle === "month" && yearlySaving > 0 ? (
                      <span className="text-emerald-500 font-medium">{tb("saveYearly", { amount: money(yearlySaving) })}</span>
                    ) : quote.discount > 0 ? (
                      <span className="text-emerald-500 font-medium">
                        {tb("volumeDiscountLine", { percent: Math.round(quote.discount * 100), count: quote.billingVenues })}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{tb("saveUpToHint")}</span>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">…</span>
              )}
            </div>
            <button type="button" onClick={() => setPhase("details")} disabled={!quote} className={primaryBtn + " disabled:opacity-50"}>
              {tb("continue")}
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
            <div className="text-xs text-muted-foreground">{tb("yourPlanSummary")} · {venueCountLabel(count)}</div>
            <div className="text-sm font-medium text-foreground">
              {quote ? `${money(quote.amountMajor)} / ${cycle === "year" ? tb("perYearWord") : tb("perMonthWord")}` : "—"}
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <Pencil className="h-3 w-3" /> {tb("edit")}
          </span>
        </button>
      )}

      {phase === "details" && (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:p-5">
          <div>
            <div className="text-sm font-medium text-foreground">{tb("billingDetails")}</div>
            <p className="text-xs text-muted-foreground mt-0.5">{tb("billingDetailsHint")}</p>
          </div>
          {(
            [
              ["legalName", tb("fieldLegalName")],
              ["taxId", tb("fieldTaxId")],
              ["address", tb("fieldAddress")],
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
              {tb("skip")}
            </button>
            <button type="button" onClick={confirmAndPay} disabled={busy} className={primaryBtn}>
              {tb("continue")}
            </button>
          </div>
        </div>
      )}

      <InvoicesList />
      <EnterpriseCard />
      {overlay}
        {chargeDialog}
    </div>
  );
}

function EnterpriseCard() {
  const tb = useTranslations("dashboard.settings.billing");
  const wa =
    "https://wa.me/998948663743?text=" +
    encodeURIComponent(tb("customPlanWa"));
  return (
    <a
      href={wa}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl border border-dashed border-border bg-card p-4 hover:border-input transition-colors"
    >
      <div className="text-sm font-medium text-foreground">{tb("customPlanTitle")}</div>
      <div className="text-xs text-muted-foreground leading-snug">
        {tb("customPlanBody")}
      </div>
    </a>
  );
}

function fmtDate(iso: string, locale?: string): string {
  return new Date(iso).toLocaleDateString(locale || "en-US", { day: "numeric", month: "long", year: "numeric" });
}

function Notice({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-600 dark:text-emerald-400">
      <span>{text}</span>
      <button type="button" onClick={onClose} className="text-emerald-600 dark:text-emerald-400 opacity-70 hover:opacity-100">
        ✕
      </button>
    </div>
  );
}

function InvoicesList() {
  const tb = useTranslations("dashboard.settings.billing");
  const locale = useLocale();
  const [rows, setRows] = useState<InvoiceRow[]>([]);
  useEffect(() => {
    getInvoices().then(setRows);
  }, []);
  if (rows.length === 0) return null;
  return (
    <details className="rounded-xl border border-border bg-card p-4">
      <summary className="text-sm font-medium cursor-pointer">{tb("myInvoices", { count: rows.length })}</summary>
      <ul className="flex flex-col gap-1.5 mt-3">
        {rows.map((r) => (
          <li key={r.id}>
            <a href={r.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-primary">
              {r.number || r.id}
              {r.issuedAt ? ` — ${fmtDate(r.issuedAt, locale)}` : ""}
              {r.amount != null ? ` — ${r.amount} ${r.currency ?? ""}` : ""}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
