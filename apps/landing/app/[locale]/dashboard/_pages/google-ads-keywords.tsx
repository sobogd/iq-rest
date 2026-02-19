"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { PageHeader } from "../_ui/page-header";
import type { AdGroupHourly, HourlyData } from "@/lib/google-ads";

function formatMicros(micros: number | null): string {
  if (micros == null) return "—";
  return (micros / 1_000_000).toFixed(2) + " €";
}

function AdGroupCard({ ag }: { ag: AdGroupHourly }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-foreground/5">
        <span className="text-sm font-medium truncate">{ag.adGroupName}</span>
        <div className="flex gap-3 text-[10px] text-muted-foreground shrink-0">
          <span>{ag.totalClicks} clicks</span>
          <span>{ag.totalImpressions} impr</span>
          <span>{formatMicros(ag.totalCostMicros)}</span>
        </div>
      </div>
      <table className="w-full text-[11px]">
        <thead>
          <tr className="border-b border-foreground/5 text-[10px] text-muted-foreground">
            <th className="text-left font-medium px-3 py-1 w-[52px]">Hour</th>
            <th className="text-right font-medium px-3 py-1">Clicks</th>
            <th className="text-right font-medium px-3 py-1">Impr</th>
            <th className="text-right font-medium px-3 py-1">Cost</th>
            <th className="text-right font-medium px-3 py-1">Avg CPC</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-foreground/5">
          {ag.hours.map((h: HourlyData) => (
            <tr key={h.hour}>
              <td className="px-3 py-1 tabular-nums text-muted-foreground">
                {h.hour.toString().padStart(2, "0")}:00
              </td>
              <td className="px-3 py-1 text-right tabular-nums">
                {h.clicks > 0 ? h.clicks : <span className="text-muted-foreground/30">0</span>}
              </td>
              <td className="px-3 py-1 text-right tabular-nums text-muted-foreground">
                {h.impressions > 0 ? h.impressions : <span className="text-muted-foreground/30">0</span>}
              </td>
              <td className="px-3 py-1 text-right tabular-nums font-medium">
                {h.costMicros > 0 ? formatMicros(h.costMicros) : <span className="text-muted-foreground/30">—</span>}
              </td>
              <td className="px-3 py-1 text-right tabular-nums text-muted-foreground">
                {h.averageCpcMicros != null && h.averageCpcMicros > 0
                  ? formatMicros(h.averageCpcMicros)
                  : <span className="text-muted-foreground/30">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GoogleAdsKeywordsPage() {
  const [adGroups, setAdGroups] = useState<AdGroupHourly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/google-ads/keywords");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setAdGroups(data.adGroups as AdGroupHourly[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const grouped = useMemo(() => {
    const map = new Map<string, AdGroupHourly[]>();
    for (const ag of adGroups) {
      const list = map.get(ag.campaignName) || [];
      list.push(ag);
      map.set(ag.campaignName, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [adGroups]);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Ads — Yesterday" backHref="/dashboard">
        <button
          onClick={fetchData}
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

          {!loading && !error && adGroups.length === 0 && (
            <div className="text-center text-muted-foreground py-12 text-sm">
              No data for yesterday
            </div>
          )}

          {grouped.map(([campaignName, ags]) => (
            <div key={campaignName}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-2 mb-2 px-1">
                {campaignName}
              </h3>
              <div className="flex flex-col gap-2">
                {ags.map((ag) => (
                  <AdGroupCard key={ag.adGroupName} ag={ag} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
