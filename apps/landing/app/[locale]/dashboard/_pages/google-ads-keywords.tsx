"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { PageHeader } from "../_ui/page-header";
import type { KeywordBid } from "@/lib/google-ads";

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

export function GoogleAdsKeywordsPage() {
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

          {keywords.length > 0 && (() => {
            let lastCampaign = "";
            return keywords.map((kw, i) => {
              const showCampaign = kw.campaignName !== lastCampaign;
              lastCampaign = kw.campaignName;
              return (
                <div key={`${kw.keyword}-${kw.matchType}-${kw.campaignName}-${i}`}>
                  {showCampaign && (
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-2 mb-1 px-1">
                      {kw.campaignName}
                    </div>
                  )}
                  <div className="rounded-2xl border border-border bg-muted/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-semibold">{kw.keyword}</span>
                      {matchTypeBadge(kw.matchType)}
                      {kw.status === "PAUSED" && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
                          Paused
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground mb-2">
                      {kw.adGroupName}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">My Bid</div>
                        <div className="text-sm font-medium">{formatMicros(kw.cpcBidMicros)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Effective</div>
                        <div className="text-sm font-medium">{formatMicros(kw.effectiveCpcBidMicros)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Avg CPC</div>
                        <div className="text-sm font-medium">{formatMicros(kw.averageCpc)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-2 pt-2 border-t border-foreground/5">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Clicks</div>
                        <div className="text-sm font-medium">{kw.clicks.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Impr.</div>
                        <div className="text-sm font-medium">{kw.impressions.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Cost</div>
                        <div className="text-sm font-medium">{formatMicros(kw.costMicros)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
