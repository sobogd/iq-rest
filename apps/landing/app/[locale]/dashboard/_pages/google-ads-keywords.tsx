"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";
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

function encodeResourceName(resourceName: string): string {
  return btoa(resourceName).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
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
        <div className="w-full max-w-lg mx-auto flex flex-col gap-1">
          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive mb-2">
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
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-3 mb-1.5 px-1">
                {campaignName}
              </h3>
              <div className="flex flex-col gap-1">
                {kws.map((kw) => (
                  <button
                    key={kw.resourceName}
                    onClick={() =>
                      router.push(
                        `/dashboard/google-ads/keywords/${encodeResourceName(kw.resourceName)}`
                      )
                    }
                    className="flex items-center h-12 bg-muted/30 rounded-xl px-3 gap-2 hover:bg-muted/60 transition-colors text-left w-full"
                  >
                    <span className="text-sm font-medium truncate min-w-0 flex-1">
                      {kw.keyword}
                    </span>
                    {matchTypeBadge(kw.matchType)}
                    {kw.status === "PAUSED" && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
                        Paused
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                      {kw.clicks}
                    </span>
                    <span className="text-xs text-muted-foreground tabular-nums w-14 text-right">
                      {formatMicros(kw.firstPageCpcMicros)}
                    </span>
                    <span className="text-xs font-medium tabular-nums w-14 text-right">
                      {formatMicros(kw.cpcBidMicros)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
