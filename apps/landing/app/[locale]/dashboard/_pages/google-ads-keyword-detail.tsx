"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { PageHeader } from "../_ui/page-header";
import { PageLoader } from "../_ui/page-loader";
import { toast } from "sonner";
import type { KeywordDailyStats } from "@/lib/google-ads";

function formatMicros(micros: number | null): string {
  if (micros == null) return "—";
  return (micros / 1_000_000).toFixed(2) + " €";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" });
}

export function GoogleAdsKeywordDetailPage({ resourceName, keyword }: { resourceName: string; keyword: string }) {
  const [days, setDays] = useState<KeywordDailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/google-ads/keywords/daily?resourceName=${encodeURIComponent(resourceName)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setDays(data.days);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [resourceName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <PageLoader />;

  const totalClicks = days.reduce((s, d) => s + d.clicks, 0);
  const totalCost = days.reduce((s, d) => s + d.costMicros, 0);
  const totalImpressions = days.reduce((s, d) => s + d.impressions, 0);
  const totalConversions = days.reduce((s, d) => s + d.conversions, 0);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={keyword} backHref="/dashboard/google-ads/keywords">
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
        <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
          {/* Totals */}
          <div className="grid grid-cols-4 gap-3">
            <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
              <div className="text-[10px] text-muted-foreground uppercase">Clicks</div>
              <div className="text-lg font-semibold tabular-nums">{totalClicks}</div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
              <div className="text-[10px] text-muted-foreground uppercase">Cost</div>
              <div className="text-lg font-semibold tabular-nums">{formatMicros(totalCost)}</div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
              <div className="text-[10px] text-muted-foreground uppercase">Impr.</div>
              <div className="text-lg font-semibold tabular-nums">{totalImpressions}</div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
              <div className="text-[10px] text-muted-foreground uppercase">Conv.</div>
              <div className="text-lg font-semibold tabular-nums">{totalConversions}</div>
            </div>
          </div>

          {/* Daily breakdown */}
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
            <div className="text-xs font-semibold px-3 py-2 border-b border-foreground/5">
              Last 7 days
            </div>
            {days.length === 0 ? (
              <div className="text-center text-muted-foreground py-8 text-sm">
                No data
              </div>
            ) : (
              <div className="divide-y divide-foreground/5">
                {/* Header */}
                <div className="grid grid-cols-[1fr_50px_50px_70px_70px] gap-1 px-3 py-1.5 text-[10px] text-muted-foreground uppercase">
                  <span>Date</span>
                  <span className="text-right">Clicks</span>
                  <span className="text-right">Impr.</span>
                  <span className="text-right">Avg CPC</span>
                  <span className="text-right">Cost</span>
                </div>
                {days.map((day) => (
                  <div
                    key={day.date}
                    className="grid grid-cols-[1fr_50px_50px_70px_70px] gap-1 px-3 py-2 text-xs"
                  >
                    <span className="font-medium">{formatDate(day.date)}</span>
                    <span className="text-right tabular-nums">{day.clicks}</span>
                    <span className="text-right tabular-nums text-muted-foreground">{day.impressions}</span>
                    <span className="text-right tabular-nums text-muted-foreground">
                      {formatMicros(day.averageCpcMicros)}
                    </span>
                    <span className="text-right tabular-nums font-medium">
                      {formatMicros(day.costMicros)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
