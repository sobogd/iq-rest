"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { Label } from "@/components/ui/label";
import { Eye, Calendar, CalendarDays, Users, Monitor, Globe, Smartphone, RefreshCw } from "lucide-react";
import { track, DashboardEvent } from "@/lib/dashboard-events";

interface DeviceStatsItem {
  name: string;
  count: number;
}

interface AnalyticsData {
  plan: string;
  limit: number | null;
  monthlyViews: number;
  weeklyViews: number;
  todayViews: number;
  uniqueSessions: number;
  viewsByPage: { page: string; count: number }[];
  viewsByLanguage: { language: string; count: number }[];
  viewsByDay: { date: string; count: number }[];
  deviceStats?: {
    devices: DeviceStatsItem[];
    browsers: DeviceStatsItem[];
    os: DeviceStatsItem[];
  };
}

function AnimatedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 700;
    const steps = 30;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={className}>{displayValue.toLocaleString()}</span>
  );
}

const statIcons = {
  today: Eye,
  week: Calendar,
  month: CalendarDays,
  unique: Users,
};

const PAGE_ORDER = ["home", "menu", "contacts", "reserve", "language"];

const SKELETON_HEIGHTS = [60, 40, 75, 25, 50, 35, 65];

function DeviceStatsCard({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ElementType;
  items: DeviceStatsItem[];
}) {
  const maxCount = Math.max(...items.map((i) => i.count), 1);

  return (
    <div className="p-4 bg-muted/30 rounded-xl space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </div>
      <div className="space-y-2">
        {items.map((item) => {
          const percentage = (item.count / maxCount) * 100;
          return (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{item.name}</span>
                <span className="text-muted-foreground">{item.count}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary/70 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface AnalyticsPageProps {
  initialData: AnalyticsData | null;
}

export function AnalyticsPage({ initialData }: AnalyticsPageProps) {
  const { translations } = useDashboard();
  const t = translations.analytics;
  const [data, setData] = useState<AnalyticsData | null>(initialData);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/dashboard/analytics");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // silently fail
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    track(DashboardEvent.SHOWED_ANALYTICS);
  }, []);

  const maxDayViews = data ? Math.max(...data.viewsByDay.map((v) => v.count), 1) : 1;

  const dayHeights = useMemo(() => {
    if (!data) return SKELETON_HEIGHTS;
    return data.viewsByDay.map((item) => {
      const percent = item.count / maxDayViews;
      return Math.max(12, Math.round(percent * 88));
    });
  }, [data, maxDayViews]);

  if (!data) {
    return (
      <div className="p-6">
        <div className="text-destructive">Failed to load analytics</div>
      </div>
    );
  }

  const stats = [
    { key: "today", label: t.todayViews, icon: statIcons.today },
    { key: "week", label: t.weeklyViews, icon: statIcons.week },
    { key: "month", label: t.monthlyViews, icon: statIcons.month },
    { key: "unique", label: t.uniqueVisitors, icon: statIcons.unique },
  ];

  const getStatValue = (key: string) => {
    if (!data) return 0;
    switch (key) {
      case "today": return data.todayViews;
      case "week": return data.weeklyViews;
      case "month": return data.monthlyViews;
      case "unique": return data.uniqueSessions;
      default: return 0;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.analytics}>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
      <div className="max-w-lg mx-auto space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const value = getStatValue(stat.key);
          return (
            <div
              key={stat.key}
              className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <stat.icon className="h-5 w-5 text-primary mb-3" />
              <AnimatedNumber
                value={value}
                className="text-3xl font-bold tracking-tight tabular-nums block"
              />
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <Label className="text-base">{t.dailyViews}</Label>
        <div
          className="bg-muted/30 rounded-xl flex items-end justify-around gap-2 sm:gap-4 overflow-hidden"
          style={{ height: "180px", padding: "40px 12px 24px" }}
        >
          {(data.viewsByDay || []).map((item, index) => {
            const height = dayHeights[index];
            const dayLabel = new Date(item.date + "T12:00:00").toLocaleDateString(undefined, { weekday: "short" });

            return (
              <div
                key={index}
                className="group"
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div style={{ height: "16px", marginBottom: "8px" }}>
                  <span className="text-xs text-muted-foreground">
                    {item.count}
                  </span>
                </div>
                <div
                  className="transition-all duration-700 ease-out bg-primary/80 hover:bg-primary"
                  style={{ width: "32px", minWidth: "24px", height: `${height}px`, borderRadius: "4px" }}
                />
                <span className="text-xs text-muted-foreground" style={{ marginTop: "8px" }}>
                  {dayLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">{t.viewsByPage}</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PAGE_ORDER.map((pageKey) => {
            const pageData = data?.viewsByPage.find((v) => v.page === pageKey);
            const count = pageData?.count || 0;
            return (
              <div
                key={pageKey}
                className="p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <AnimatedNumber
                  value={count}
                  className="text-xl font-bold tracking-tight tabular-nums block"
                />
                <div className="text-sm text-muted-foreground">{t.pageNames[pageKey] || pageKey}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">{t.viewsByLanguage}</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {(data?.viewsByLanguage || [])
            .sort((a, b) => b.count - a.count)
            .map((item) => (
              <div
                key={item.language}
                className="p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <AnimatedNumber
                  value={item.count}
                  className="text-xl font-bold tracking-tight tabular-nums block"
                />
                <div className="text-sm text-muted-foreground">{t.languageNames[item.language] || item.language}</div>
              </div>
            ))}
        </div>
      </div>
      {data.deviceStats && (data.deviceStats.devices.length > 0 || data.deviceStats.browsers.length > 0 || data.deviceStats.os.length > 0) && (
        <div className="space-y-4">
          <Label className="text-base">{t.deviceStats || "Devices & Browsers"}</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.deviceStats.devices.length > 0 && (
              <DeviceStatsCard
                title={t.devices || "Devices"}
                icon={Smartphone}
                items={data.deviceStats.devices}
              />
            )}
            {data.deviceStats.browsers.length > 0 && (
              <DeviceStatsCard
                title={t.browsers || "Browsers"}
                icon={Globe}
                items={data.deviceStats.browsers}
              />
            )}
            {data.deviceStats.os.length > 0 && (
              <DeviceStatsCard
                title={t.os || "OS"}
                icon={Monitor}
                items={data.deviceStats.os}
              />
            )}
          </div>
        </div>
      )}
      </div>
      </div>
    </div>
  );
}
