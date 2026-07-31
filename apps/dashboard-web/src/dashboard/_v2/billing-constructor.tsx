"use client";

// billing-features-constructor — the "build your own plan" constructor.
//
// Self-contained: mount it in the billing settings tab. Per-venue feature
// selection → live quote (/api/billing/quote) → ad-hoc card checkout or a
// SEPA-by-invoice request (yearly only). Also renders the payer billing profile
// and the read-only invoices list. Strings are English-first (wire i18n later).

import { useEffect, useMemo, useState } from "react";
import { useRestaurants } from "./restaurants-context";
import {
  computeQuote,
  createAdhocCheckout,
  requestSepaInvoice,
  getBillingProfile,
  saveBillingProfile,
  getInvoices,
  type BillingQuote,
  type BillingProfile,
  type InvoiceRow,
  type VenueSelectionInput,
} from "./api";

type Cycle = "month" | "year";
type Sel = { menuOnline: boolean; reservations: boolean; ordersKds: boolean; domain: boolean };

const EMPTY_SEL: Sel = { menuOnline: true, reservations: false, ordersKds: false, domain: false };

export function BillingConstructor({ currency = "EUR" }: { currency?: string }) {
  const { list } = useRestaurants();
  const [cycle, setCycle] = useState<Cycle>("year");
  const [sels, setSels] = useState<Record<string, Sel>>({});
  const [quote, setQuote] = useState<BillingQuote | null>(null);
  const [busy, setBusy] = useState(false);

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

  // Recompute the quote whenever the selection or cycle changes.
  useEffect(() => {
    let alive = true;
    const active = selections.filter((s) => s.menuOnline);
    if (active.length === 0) {
      setQuote(null);
      return;
    }
    computeQuote(active, cycle, currency).then((q) => {
      if (alive) setQuote(q);
    });
    return () => {
      alive = false;
    };
  }, [selections, cycle, currency]);

  const toggle = (id: string, key: keyof Sel) =>
    setSels((prev) => ({ ...prev, [id]: { ...(prev[id] ?? EMPTY_SEL), [key]: !(prev[id] ?? EMPTY_SEL)[key] } }));

  const activeSelections = selections.filter((s) => s.menuOnline);

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
    if (res?.success) {
      alert("Request received — we'll email you an invoice to pay by SEPA transfer.");
    }
  };

  return (
    <div className="billing-constructor" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <strong>Build your plan</strong>
        <span style={{ marginLeft: "auto" }} />
        <button type="button" onClick={() => setCycle("month")} aria-pressed={cycle === "month"} disabled={cycle === "month"}>
          Monthly
        </button>
        <button type="button" onClick={() => setCycle("year")} aria-pressed={cycle === "year"} disabled={cycle === "year"}>
          Yearly
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Restaurant</th>
            <th>Menu</th>
            <th>Reservations</th>
            <th>Orders + KDS</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => {
            const s = sels[r.id] ?? EMPTY_SEL;
            return (
              <tr key={r.id}>
                <td style={{ textAlign: "left" }}>{r.title || r.slug || r.id}</td>
                <td>
                  <input type="checkbox" checked={s.menuOnline} onChange={() => toggle(r.id, "menuOnline")} />
                </td>
                <td>
                  <input type="checkbox" checked={s.reservations} disabled={!s.menuOnline} onChange={() => toggle(r.id, "reservations")} />
                </td>
                <td>
                  <input type="checkbox" checked={s.ordersKds} disabled={!s.menuOnline} onChange={() => toggle(r.id, "ordersKds")} />
                </td>
                <td>
                  <input type="checkbox" checked={s.domain} disabled={!s.menuOnline} onChange={() => toggle(r.id, "domain")} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          {quote ? (
            <>
              <strong>
                {quote.amountMajor} {quote.currency}
              </strong>{" "}
              / {cycle === "year" ? "year" : "month"}
              {quote.discount > 0 && (
                <span style={{ marginLeft: 8, opacity: 0.7 }}>
                  ({Math.round(quote.discount * 100)}% volume discount, {quote.billingVenues} venues)
                </span>
              )}
            </>
          ) : (
            <span style={{ opacity: 0.6 }}>Select at least one restaurant’s menu</span>
          )}
        </div>
        <span style={{ marginLeft: "auto" }} />
        <button type="button" onClick={payCard} disabled={busy || !quote}>
          Pay by card
        </button>
        {cycle === "year" && (
          <button type="button" onClick={payInvoice} disabled={busy || !quote}>
            Pay by SEPA invoice
          </button>
        )}
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
  const save = async () => {
    const ok = await saveBillingProfile(profile);
    setSaved(ok);
  };
  const field = (key: keyof BillingProfile, label: string) => (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 12, opacity: 0.7 }}>{label}</span>
      <input
        value={profile[key]}
        onChange={(e) => {
          setSaved(false);
          setProfile((p) => ({ ...p, [key]: e.target.value }));
        }}
      />
    </label>
  );
  return (
    <details>
      <summary>Billing details (for invoices)</summary>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
        {field("legalName", "Name / company")}
        {field("taxId", "Tax number")}
        {field("address", "Address")}
        {field("billingEmail", "Invoice email")}
        <button type="button" onClick={save}>
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
    <details>
      <summary>My invoices ({rows.length})</summary>
      <ul style={{ marginTop: 8 }}>
        {rows.map((r) => (
          <li key={r.id}>
            <a href={r.fileUrl} target="_blank" rel="noreferrer">
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
