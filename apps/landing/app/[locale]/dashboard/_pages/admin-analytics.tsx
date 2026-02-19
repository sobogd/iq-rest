"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Globe,
  Monitor,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";

interface FunnelStep {
  event: string;
  label: string;
  count: number;
}

interface GeoStatsItem {
  name: string;
  count: number;
}

interface GeoStats {
  countries: GeoStatsItem[];
  devices: GeoStatsItem[];
  browsers: GeoStatsItem[];
}

interface AnalyticsData {
  funnels: {
    sections: FunnelStep[];
    marketing: FunnelStep[];
    dashboard: FunnelStep[];
    conversion: FunnelStep[];
  };
  stats: {
    totalEvents: number;
    uniqueSessions: number;
    linkedSessions: number;
  };
  geoStats: GeoStats;
  dateRange: {
    from: string;
    to: string;
  };
}

// Convert country code to flag emoji
function countryToFlag(countryCode: string): string {
  const code = countryCode.toUpperCase();
  if (code.length !== 2) return "";
  const offset = 0x1f1e6 - 65;
  return String.fromCodePoint(
    code.charCodeAt(0) + offset,
    code.charCodeAt(1) + offset
  );
}

type TimeRange = "today" | "yesterday" | "7d";

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "7d", label: "7 days" },
];

function getDateRange(range: TimeRange): { from: string; to: string } {
  const now = new Date();
  const to = now.toISOString();

  switch (range) {
    case "today": {
      const from = new Date(now);
      from.setHours(0, 0, 0, 0);
      return { from: from.toISOString(), to };
    }
    case "yesterday": {
      const from = new Date(now);
      from.setDate(from.getDate() - 1);
      from.setHours(0, 0, 0, 0);
      const end = new Date(now);
      end.setHours(0, 0, 0, 0);
      return { from: from.toISOString(), to: end.toISOString() };
    }
    case "7d": {
      const from = new Date(now);
      from.setDate(from.getDate() - 6);
      from.setHours(0, 0, 0, 0);
      return { from: from.toISOString(), to };
    }
  }
}

function FunnelCard({ title, steps }: { title: string; steps: FunnelStep[] }) {
  const maxCount = Math.max(...steps.map((s) => s.count), 1);
  const firstCount = steps[0]?.count || 0;

  return (
    <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-foreground/5">
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="px-4 py-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {steps.map((step, index) => {
            const percentage = maxCount > 0 ? (step.count / maxCount) * 100 : 0;
            const conversionPct = firstCount > 0 ? ((step.count / firstCount) * 100).toFixed(0) : "0";

            return (
              <div key={step.event} className="flex flex-col items-center w-16">
                <div className="text-center mb-1">
                  {index > 0 && (
                    <p className="text-[9px] text-muted-foreground">{conversionPct}%</p>
                  )}
                </div>
                <div className="h-20 w-full flex items-end justify-center">
                  <div
                    className="w-10 rounded-t bg-primary/70"
                    style={{ height: `${Math.max(percentage, 4)}%` }}
                  />
                </div>
                <div className="mt-1 text-center">
                  <p className="text-xs font-medium">{step.count}</p>
                  <p className="text-[9px] text-muted-foreground leading-tight h-6 overflow-hidden">
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatsListCard({
  title,
  items,
  icon: Icon,
  showFlag = false,
}: {
  title: string;
  items: GeoStatsItem[];
  icon: React.ElementType;
  showFlag?: boolean;
}) {
  const total = items.reduce((sum, i) => sum + i.count, 0);

  return (
    <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-foreground/5 flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      {items.length === 0 ? (
        <div className="px-4 py-6 text-center text-sm text-muted-foreground">
          No data
        </div>
      ) : (
        <div className="divide-y divide-foreground/5">
          {items.map((item) => {
            const pct = total > 0 ? ((item.count / total) * 100).toFixed(0) : "0";
            const barPct = total > 0 ? (item.count / items[0].count) * 100 : 0;
            const flag = showFlag ? countryToFlag(item.name) : "";
            return (
              <div key={item.name} className="px-4 py-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs">
                    {flag ? `${flag} ${item.name}` : item.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.count} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>("today");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { from, to } = getDateRange(timeRange);
      const params = new URLSearchParams({ from, to });
      const res = await fetch(`/api/admin/analytics?${params}`);
      if (!res.ok) {
        setError(res.status === 403 ? "Access denied" : "Failed to load data");
        return;
      }
      const json = await res.json();
      setData(json);
      setError(null);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading && !data) return <PageLoader />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Analytics" backHref="/dashboard/admin">
        <button
          onClick={fetchData}
          disabled={loading}
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Time Range */}
          <div className="flex gap-2">
            {TIME_RANGES.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                disabled={loading}
                className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                  timeRange === range.value
                    ? "border-primary bg-primary/10 font-medium"
                    : "border-border hover:bg-muted/30"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Funnels — full width each */}
          <FunnelCard title="Landing Sections" steps={data.funnels.sections} />
          <FunnelCard title="Marketing Pages" steps={data.funnels.marketing} />
          <FunnelCard title="Dashboard Pages" steps={data.funnels.dashboard} />
          <FunnelCard title="Conversion Funnel" steps={data.funnels.conversion} />

          {/* Countries */}
          <StatsListCard
            title="Countries"
            items={data.geoStats.countries}
            icon={Globe}
            showFlag
          />

          {/* Devices & Browsers */}
          <StatsListCard
            title="Devices"
            items={data.geoStats.devices}
            icon={Monitor}
          />
          <StatsListCard
            title="Browsers"
            items={data.geoStats.browsers}
            icon={Globe}
          />
        </div>
      </div>
    </div>
  );
}
