"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { PageHeader } from "../_ui/page-header";
import { PageLoader } from "../_ui/page-loader";
import { toast } from "sonner";
import type { KeywordHourlyStats } from "@/lib/google-ads";

function formatMicros(micros: number | null): string {
  if (micros == null) return "—";
  return (micros / 1_000_000).toFixed(2) + " €";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" });
}

function formatHour(hour: number): string {
  return `${hour.toString().padStart(2, "0")}:00`;
}

interface DayGroup {
  date: string;
  hours: KeywordHourlyStats[];
  totalClicks: number;
  totalImpressions: number;
  totalCost: number;
  totalConversions: number;
}

export function GoogleAdsKeywordDetailPage({ resourceName, keyword }: { resourceName: string; keyword: string }) {
  const [data, setData] = useState<KeywordHourlyStats[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/google-ads/keywords/daily?resourceName=${encodeURIComponent(resourceName)}`
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load");
      setData(json.hours);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [resourceName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const days = useMemo<DayGroup[]>(() => {
    const map = new Map<string, KeywordHourlyStats[]>();
    for (const h of data) {
      const list = map.get(h.date) || [];
      list.push(h);
      map.set(h.date, list);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, hours]) => ({
        date,
        hours: hours.sort((a, b) => a.hour - b.hour),
        totalClicks: hours.reduce((s, h) => s + h.clicks, 0),
        totalImpressions: hours.reduce((s, h) => s + h.impressions, 0),
        totalCost: hours.reduce((s, h) => s + h.costMicros, 0),
        totalConversions: hours.reduce((s, h) => s + h.conversions, 0),
      }));
  }, [data]);

  const totalClicks = days.reduce((s, d) => s + d.totalClicks, 0);
  const totalCost = days.reduce((s, d) => s + d.totalCost, 0);
  const totalImpressions = days.reduce((s, d) => s + d.totalImpressions, 0);
  const totalConversions = days.reduce((s, d) => s + d.totalConversions, 0);

  if (loading) return <PageLoader />;

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

          {/* Days with hourly breakdown */}
          {days.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 text-sm">
              No data
            </div>
          ) : (
            days.map((day) => (
              <div key={day.date} className="rounded-xl border border-border bg-muted/30 overflow-hidden">
                {/* Day header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-foreground/5">
                  <span className="text-xs font-semibold">{formatDate(day.date)}</span>
                  <div className="flex gap-3 text-[10px] text-muted-foreground">
                    <span>{day.totalClicks} clicks</span>
                    <span>{formatMicros(day.totalCost)}</span>
                  </div>
                </div>

                {/* Hourly rows */}
                <div className="divide-y divide-foreground/5">
                  {day.hours.map((h) => (
                    <div
                      key={h.hour}
                      className="grid grid-cols-[45px_1fr_1fr_1fr_1fr] gap-1 px-3 py-1.5 text-xs"
                    >
                      <span className="font-medium tabular-nums text-muted-foreground">
                        {formatHour(h.hour)}
                      </span>
                      <span className="text-right tabular-nums">
                        {h.clicks > 0 ? h.clicks : <span className="text-muted-foreground/40">0</span>}
                      </span>
                      <span className="text-right tabular-nums text-muted-foreground">
                        {h.impressions > 0 ? h.impressions : <span className="text-muted-foreground/40">0</span>}
                      </span>
                      <span className="text-right tabular-nums text-muted-foreground">
                        {h.averageCpcMicros ? formatMicros(h.averageCpcMicros) : <span className="text-muted-foreground/40">—</span>}
                      </span>
                      <span className="text-right tabular-nums font-medium">
                        {h.costMicros > 0 ? formatMicros(h.costMicros) : <span className="text-muted-foreground/40">—</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
