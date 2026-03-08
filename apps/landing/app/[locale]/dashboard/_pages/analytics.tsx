"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { Eye, Calendar, CalendarDays, Users, Monitor, Globe, Smartphone, RefreshCw } from "lucide-react";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { DashboardContent } from "../_ui/dashboard-content";

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
    if (!data) return [];
    return data.viewsByDay.map((item) => {
      const percent = item.count / maxDayViews;
      return Math.max(12, Math.round(percent * 88));
    });
  }, [data, maxDayViews]);

  if (!data) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader title={translations.pages.analytics} />
        <div className="flex-1 flex items-center justify-center px-6">
          <p className="text-sm text-destructive">Failed to load analytics</p>
        </div>
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
          className="flex items-center justify-center h-10 w-10 -mr-2"
        >
          <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-6">

          {/* Stats */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{"Overview"}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              {stats.map((stat, index) => {
                const value = getStatValue(stat.key);
                return (
                  <div key={stat.key}>
                    {index > 0 && <div className="border-t border-border mx-4" />}
                    <div className="flex items-center h-11 px-4">
                      <stat.icon className="h-4 w-4 text-primary mr-3 shrink-0" />
                      <span className="text-sm text-muted-foreground flex-1">{stat.label}</span>
                      <AnimatedNumber
                        value={value}
                        className="text-sm font-bold tabular-nums"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily views chart */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t.dailyViews}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <div
                className="flex items-end justify-around gap-2 sm:gap-4 px-3"
                style={{ height: "180px", paddingTop: "40px", paddingBottom: "24px" }}
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
          </div>

          {/* Views by page */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t.viewsByPage}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              {PAGE_ORDER.map((pageKey, index) => {
                const pageData = data.viewsByPage.find((v) => v.page === pageKey);
                const count = pageData?.count || 0;
                return (
                  <div key={pageKey}>
                    {index > 0 && <div className="border-t border-border mx-4" />}
                    <div className="flex items-center h-11 px-4">
                      <span className="text-sm flex-1">{t.pageNames[pageKey] || pageKey}</span>
                      <AnimatedNumber
                        value={count}
                        className="text-sm font-bold tabular-nums"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Views by language */}
          {data.viewsByLanguage.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t.viewsByLanguage}</p>
              <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
                {[...data.viewsByLanguage]
                  .sort((a, b) => b.count - a.count)
                  .map((item, index) => (
                    <div key={item.language}>
                      {index > 0 && <div className="border-t border-border mx-4" />}
                      <div className="flex items-center h-11 px-4">
                        <span className="text-sm flex-1">{t.languageNames[item.language] || item.language}</span>
                        <AnimatedNumber
                          value={item.count}
                          className="text-sm font-bold tabular-nums"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Device stats */}
          {data.deviceStats && (data.deviceStats.devices.length > 0 || data.deviceStats.browsers.length > 0 || data.deviceStats.os.length > 0) && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t.deviceStats || "Devices & Browsers"}</p>
              <div className="space-y-4">
                {data.deviceStats.devices.length > 0 && (
                  <DeviceStatsSection
                    title={t.devices || "Devices"}
                    icon={Smartphone}
                    items={data.deviceStats.devices}
                  />
                )}
                {data.deviceStats.browsers.length > 0 && (
                  <DeviceStatsSection
                    title={t.browsers || "Browsers"}
                    icon={Globe}
                    items={data.deviceStats.browsers}
                  />
                )}
                {data.deviceStats.os.length > 0 && (
                  <DeviceStatsSection
                    title={t.os || "OS"}
                    icon={Monitor}
                    items={data.deviceStats.os}
                  />
                )}
              </div>
            </div>
          )}

        </DashboardContent>
      </div>
    </div>
  );
}

function DeviceStatsSection({
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
    <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
      <div className="flex items-center h-11 px-4">
        <Icon className="h-4 w-4 text-primary mr-3 shrink-0" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      {items.map((item) => {
        const percentage = (item.count / maxCount) * 100;
        return (
          <div key={item.name}>
            <div className="border-t border-border mx-4" />
            <div className="px-4 py-2.5">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="capitalize">{item.name}</span>
                <span className="text-muted-foreground tabular-nums">{item.count}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary/70 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
