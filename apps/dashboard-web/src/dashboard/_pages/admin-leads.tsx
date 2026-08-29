"use client";

// Admin: Meta Lead Ads leads, pulled live from the Graph API. Shows every
// lead with its form answers (venue type etc.) and campaign/ad, and lets the
// admin create the account + send the personal welcome (with the auto-login
// link) by hand — deliberately manual so the email lands during working
// hours and reads as human, not templated.

import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";
import { Page } from "../_v2/page";

interface LeadRow {
  leadgenId: string;
  createdTime: string | null;
  formName: string | null;
  campaignName: string | null;
  adName: string | null;
  email: string | null;
  fields: Record<string, string>;
  accountExists: boolean;
  hasRestaurant: boolean;
  welcomeSentAt: string | null;
}

export function AdminLeadsPage() {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("/api/admin/leads"), { credentials: "include" });
      if (!res.ok) {
        setError(`Failed to load leads (${res.status})`);
        return;
      }
      const data = (await res.json()) as { leads: LeadRow[] };
      setRows(data.leads);
    } catch {
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRows();
  }, [fetchRows]);

  const sendWelcome = useCallback(
    async (lead: LeadRow) => {
      if (!window.confirm(`Create account + send the personal welcome to ${lead.email}?`)) return;
      setSendingId(lead.leadgenId);
      try {
        const res = await fetch(apiUrl(`/api/admin/leads/${lead.leadgenId}/send-welcome`), {
          method: "POST",
          credentials: "include",
        });
        const data = (await res.json().catch(() => null)) as { message?: string } | null;
        if (!res.ok) {
          window.alert(data?.message ?? `Send failed (${res.status})`);
          return;
        }
        await fetchRows();
      } finally {
        setSendingId(null);
      }
    },
    [fetchRows],
  );

  return (
      <Page title="Leads">
        {error ? <div className="text-xs text-red-500 py-2 text-center">{error}</div> : null}
        {loading && rows.length === 0 ? (
          <div className="text-xs text-muted-foreground py-8 text-center">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="text-xs text-muted-foreground py-8 text-center">No leads</div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
            {rows.map((lead) => {
              const isExpanded = expandedId === lead.leadgenId;
              const sent = Boolean(lead.welcomeSentAt);
              return (
                <div key={lead.leadgenId}>
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : lead.leadgenId)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left hover:bg-muted/40 transition-colors"
                  >
                    <span className={"font-medium truncate flex-1 " + (sent ? "text-emerald-600" : "text-foreground")}>
                      {lead.email ?? "(no email)"}
                    </span>
                    <span className="inline-flex items-center gap-2 text-[10px] text-muted-foreground shrink-0">
                      {lead.fields.venue_type ? <span>{lead.fields.venue_type}</span> : null}
                      {sent ? (
                        <span className="text-emerald-600" title={`Welcome sent ${lead.welcomeSentAt}`}>
                          ✓ sent
                        </span>
                      ) : lead.accountExists ? (
                        <span title="Account already exists">has account</span>
                      ) : (
                        <span className="text-orange-500">new</span>
                      )}
                    </span>
                    <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">
                      {lead.createdTime ? new Date(lead.createdTime).toLocaleString("en-CA") : "—"}
                    </span>
                  </button>
                  {isExpanded ? (
                    <div className="px-4 py-2 bg-muted/30 border-t border-border space-y-2">
                      <div className="text-[11px] text-muted-foreground space-y-0.5">
                        {Object.entries(lead.fields).map(([k, v]) => (
                          <div key={k}>
                            <span className="font-medium text-foreground">{k}:</span> {v}
                          </div>
                        ))}
                        {lead.campaignName ? (
                          <div>
                            <span className="font-medium text-foreground">campaign:</span> {lead.campaignName}
                            {lead.adName ? ` · ${lead.adName}` : ""}
                          </div>
                        ) : null}
                        {lead.formName ? (
                          <div>
                            <span className="font-medium text-foreground">form:</span> {lead.formName}
                          </div>
                        ) : null}
                        {lead.welcomeSentAt ? (
                          <div>
                            <span className="font-medium text-foreground">welcome sent:</span>{" "}
                            {new Date(lead.welcomeSentAt).toLocaleString("en-CA")}
                          </div>
                        ) : null}
                      </div>
                      {!sent && lead.email ? (
                        <button
                          type="button"
                          disabled={sendingId === lead.leadgenId}
                          onClick={() => void sendWelcome(lead)}
                          className="text-xs font-medium bg-primary text-primary-foreground rounded-lg px-3 py-1.5 disabled:opacity-50"
                        >
                          {sendingId === lead.leadgenId
                            ? "Sending…"
                            : lead.accountExists
                              ? "Send welcome (account exists)"
                              : "Create account + send welcome"}
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </Page>
  );
}
