"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { PageHeader } from "../_ui/page-header";
import type { AdGroupHourly, AdGroupWeekly, HourlyData, DailyData } from "@/lib/google-ads";

function formatMicros(micros: number | null): string {
  if (micros == null) return "—";
  return (micros / 1_000_000).toFixed(2) + " €";
}

function formatDateISO(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function formatTabLabel(daysAgo: number): string {
  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" });
}

type Tab = { key: string; label: string };

const DATE_TABS: Tab[] = [
  { key: "week", label: "Week" },
  ...Array.from({ length: 6 }, (_, i) => ({
    key: formatDateISO(i),
    label: formatTabLabel(i),
  })),
];

const ALL_HOURS = Array.from({ length: 24 }, (_, i) => i);

function AdGroupCard({ ag }: { ag: AdGroupHourly }) {
  const hourMap = useMemo(() => {
    const m = new Map<number, HourlyData>();
    for (const h of ag.hours) m.set(h.hour, h);
    return m;
  }, [ag.hours]);

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
          {ALL_HOURS.map((hour) => {
            const h = hourMap.get(hour);
            return (
              <tr key={hour}>
                <td className="px-3 py-1 tabular-nums text-muted-foreground">
                  {hour.toString().padStart(2, "0")}:00
                </td>
                <td className="px-3 py-1 text-right tabular-nums">
                  {h && h.clicks > 0 ? h.clicks : <span className="text-muted-foreground/30">—</span>}
                </td>
                <td className="px-3 py-1 text-right tabular-nums text-muted-foreground">
                  {h && h.impressions > 0 ? h.impressions : <span className="text-muted-foreground/30">—</span>}
                </td>
                <td className="px-3 py-1 text-right tabular-nums font-medium">
                  {h && h.costMicros > 0 ? formatMicros(h.costMicros) : <span className="text-muted-foreground/30">—</span>}
                </td>
                <td className="px-3 py-1 text-right tabular-nums text-muted-foreground">
                  {h?.averageCpcMicros != null && h.averageCpcMicros > 0
                    ? formatMicros(h.averageCpcMicros)
                    : <span className="text-muted-foreground/30">—</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function AdGroupWeeklyCard({ ag }: { ag: AdGroupWeekly }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-foreground/5">
        <span className="text-sm font-medium truncate">{ag.adGroupName}</span>
        <div className="flex gap-3 text-[10px] text-muted-foreground shrink-0">
          <span>{ag.totalClicks} clicks</span>
          <span>{formatMicros(ag.totalCostMicros)}</span>
        </div>
      </div>
      <div className="flex gap-4 px-3 py-1.5 border-b border-foreground/5 text-[10px] text-muted-foreground">
        <span>Min CPC: <span className="text-foreground font-medium">{formatMicros(ag.minAvgCpcMicros)}</span></span>
        <span>Max CPC: <span className="text-foreground font-medium">{formatMicros(ag.maxAvgCpcMicros)}</span></span>
      </div>
      <table className="w-full text-[11px]">
        <thead>
          <tr className="border-b border-foreground/5 text-[10px] text-muted-foreground">
            <th className="text-left font-medium px-3 py-1">Day</th>
            <th className="text-right font-medium px-3 py-1">Clicks</th>
            <th className="text-right font-medium px-3 py-1">Impr</th>
            <th className="text-right font-medium px-3 py-1">Cost</th>
            <th className="text-right font-medium px-3 py-1">Avg CPC</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-foreground/5">
          {ag.days.map((d: DailyData) => (
            <tr key={d.date}>
              <td className="px-3 py-1 text-muted-foreground">
                {formatShortDate(d.date)}
              </td>
              <td className="px-3 py-1 text-right tabular-nums">
                {d.clicks > 0 ? d.clicks : <span className="text-muted-foreground/30">0</span>}
              </td>
              <td className="px-3 py-1 text-right tabular-nums text-muted-foreground">
                {d.impressions > 0 ? d.impressions : <span className="text-muted-foreground/30">0</span>}
              </td>
              <td className="px-3 py-1 text-right tabular-nums font-medium">
                {d.costMicros > 0 ? formatMicros(d.costMicros) : <span className="text-muted-foreground/30">—</span>}
              </td>
              <td className="px-3 py-1 text-right tabular-nums text-muted-foreground">
                {d.averageCpcMicros != null && d.averageCpcMicros > 0
                  ? formatMicros(d.averageCpcMicros)
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
  const [selectedTab, setSelectedTab] = useState("week");
  const [adGroups, setAdGroups] = useState<AdGroupHourly[]>([]);
  const [weeklyGroups, setWeeklyGroups] = useState<AdGroupWeekly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isWeek = selectedTab === "week";

  const fetchData = useCallback(async (tab: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = tab === "week"
        ? "/api/admin/google-ads/keywords?period=week"
        : `/api/admin/google-ads/keywords?date=${tab}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      if (tab === "week") {
        setWeeklyGroups(data.adGroups as AdGroupWeekly[]);
      } else {
        setAdGroups(data.adGroups as AdGroupHourly[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedTab);
  }, [fetchData, selectedTab]);

  const groupedHourly = useMemo(() => {
    const map = new Map<string, AdGroupHourly[]>();
    for (const ag of adGroups) {
      const list = map.get(ag.campaignName) || [];
      list.push(ag);
      map.set(ag.campaignName, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [adGroups]);

  const groupedWeekly = useMemo(() => {
    const map = new Map<string, AdGroupWeekly[]>();
    for (const ag of weeklyGroups) {
      const list = map.get(ag.campaignName) || [];
      list.push(ag);
      map.set(ag.campaignName, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [weeklyGroups]);

  const grouped = isWeek ? groupedWeekly : groupedHourly;
  const isEmpty = isWeek ? weeklyGroups.length === 0 : adGroups.length === 0;

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Ads" backHref="/dashboard">
        <button
          onClick={() => fetchData(selectedTab)}
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

      <div className="flex gap-1 px-6 pt-3 pb-1 overflow-x-auto">
        {DATE_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedTab === tab.key
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto px-6 pt-3 pb-6">
        <div className="w-full max-w-lg mx-auto flex flex-col gap-3">
          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {!loading && !error && isEmpty && (
            <div className="text-center text-muted-foreground py-12 text-sm">
              No data
            </div>
          )}

          {grouped.map(([campaignName, ags]) => (
            <div key={campaignName}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-2 mb-2 px-1">
                {campaignName}
              </h3>
              <div className="flex flex-col gap-2">
                {isWeek
                  ? (ags as AdGroupWeekly[]).map((ag) => (
                      <AdGroupWeeklyCard key={ag.adGroupName} ag={ag} />
                    ))
                  : (ags as AdGroupHourly[]).map((ag) => (
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
