"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { RefreshCw, Loader2, Check, ChevronRight } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PageHeader } from "../_ui/page-header";
import type { KeywordBid, HourlyData } from "@/lib/google-ads";

function encodeResourceName(resourceName: string): string {
  return btoa(resourceName).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function formatMicros(micros: number | null): string {
  if (micros == null) return "—";
  return (micros / 1_000_000).toFixed(2) + " €";
}

function matchTypeBadge(matchType: string) {
  const labels: Record<string, { text: string; className: string }> = {
    EXACT: { text: "Exact", className: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
    PHRASE: { text: "Phrase", className: "bg-purple-500/15 text-purple-600 dark:text-purple-400" },
    BROAD: { text: "Broad", className: "bg-orange-500/15 text-orange-600 dark:text-orange-400" },
  };
  const badge = labels[matchType] || { text: matchType, className: "bg-muted text-muted-foreground" };
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${badge.className}`}>
      {badge.text}
    </span>
  );
}

function KeywordCard({ kw, onDetail }: { kw: KeywordBid; onDetail: () => void }) {
  const initialBid = kw.cpcBidMicros != null ? (kw.cpcBidMicros / 1_000_000).toFixed(2) : "";
  const [bidValue, setBidValue] = useState(initialBid);
  const [saving, setSaving] = useState(false);

  const isDirty = bidValue !== initialBid;

  async function handleUpdateBid() {
    const euros = parseFloat(bidValue);
    if (isNaN(euros) || euros < 0) {
      toast.error("Invalid bid");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/google-ads/keywords", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceName: kw.resourceName,
          cpcBidMicros: Math.round(euros * 1_000_000),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      toast.success(`${kw.keyword} → ${euros.toFixed(2)} €`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update bid");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      {/* Header: keyword name + badges */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium truncate min-w-0 flex-1">
          {kw.keyword}
        </span>
        {matchTypeBadge(kw.matchType)}
        {kw.status === "PAUSED" && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
            Paused
          </span>
        )}
      </div>

      {/* Today metrics */}
      <div className="grid grid-cols-4 gap-x-3 gap-y-1 mb-2">
        <div>
          <div className="text-[10px] text-muted-foreground">Clicks</div>
          <div className="text-xs font-medium tabular-nums">{kw.clicks}</div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground">Cost</div>
          <div className="text-xs font-medium tabular-nums">{formatMicros(kw.costMicros)}</div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground">Avg CPC</div>
          <div className="text-xs font-medium tabular-nums">{formatMicros(kw.averageCpc)}</div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground">1st Page</div>
          <div className="text-xs font-medium tabular-nums">{formatMicros(kw.firstPageCpcMicros)}</div>
        </div>
      </div>

      {/* Yesterday hourly table */}
      {kw.yesterdayHours.length > 0 && (
        <div className="mb-3 border border-foreground/5 rounded-lg overflow-hidden">
          <div className="text-[10px] font-semibold text-muted-foreground uppercase px-2 py-1 bg-muted/40">
            Yesterday by hour
          </div>
          <div className="divide-y divide-foreground/5">
            {kw.yesterdayHours.map((h: HourlyData) => (
              <div key={h.hour} className="grid grid-cols-[36px_1fr_1fr_1fr] gap-1 px-2 py-1 text-[11px]">
                <span className="tabular-nums text-muted-foreground">{h.hour.toString().padStart(2, "0")}:00</span>
                <span className="text-right tabular-nums">{h.clicks > 0 ? `${h.clicks} cl` : <span className="text-muted-foreground/30">—</span>}</span>
                <span className="text-right tabular-nums text-muted-foreground">{h.impressions > 0 ? `${h.impressions} im` : <span className="text-muted-foreground/30">—</span>}</span>
                <span className="text-right tabular-nums font-medium">{h.costMicros > 0 ? formatMicros(h.costMicros) : <span className="text-muted-foreground/30">—</span>}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bid input + detail link */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground shrink-0">Bid €</span>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={bidValue}
          onChange={(e) => setBidValue(e.target.value)}
          className="h-8 text-xs flex-1"
        />
        <button
          onClick={handleUpdateBid}
          disabled={saving || !isDirty}
          className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground disabled:opacity-40 shrink-0"
        >
          {saving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
        </button>
        <button
          onClick={onDetail}
          className="flex items-center justify-center h-8 w-8 rounded-md bg-muted hover:bg-muted/80 shrink-0"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function GoogleAdsKeywordsPage() {
  const router = useRouter();
  const [keywords, setKeywords] = useState<KeywordBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKeywords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/google-ads/keywords");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      const sorted = (data.keywords as KeywordBid[]).sort((a, b) => {
        const cmp = a.campaignName.localeCompare(b.campaignName);
        if (cmp !== 0) return cmp;
        return a.keyword.localeCompare(b.keyword);
      });
      setKeywords(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  const grouped = useMemo(() => {
    const map = new Map<string, KeywordBid[]>();
    for (const kw of keywords) {
      const list = map.get(kw.campaignName) || [];
      list.push(kw);
      map.set(kw.campaignName, list);
    }
    return Array.from(map.entries());
  }, [keywords]);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Ads Bids" backHref="/dashboard">
        <button
          onClick={fetchKeywords}
          disabled={loading}
          className="flex items-center justify-center h-10 w-10"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCw className="h-5 w-5" />
          )}
        </button>
      </PageHeader>

      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="w-full max-w-lg mx-auto flex flex-col gap-3">
          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {!loading && !error && keywords.length === 0 && (
            <div className="text-center text-muted-foreground py-12 text-sm">
              No keywords found
            </div>
          )}

          {grouped.map(([campaignName, kws]) => (
            <div key={campaignName}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-2 mb-2 px-1">
                {campaignName}
              </h3>
              <div className="flex flex-col gap-2">
                {kws.map((kw) => (
                  <KeywordCard
                    key={kw.resourceName}
                    kw={kw}
                    onDetail={() =>
                      router.push(`/dashboard/google-ads/keywords/${encodeResourceName(kw.resourceName)}?kw=${encodeURIComponent(kw.keyword)}`)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
