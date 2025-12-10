"use client";

import { useEffect, useState, useMemo } from "react";
import { useDashboard } from "../_context/dashboard-context";
import { PageLoader } from "../_ui/page-loader";
import { Label } from "@/components/ui/label";
import { Eye, Calendar, CalendarDays, Users } from "lucide-react";

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

function getLast7DaysLabels() {
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString("en", { weekday: "short" }));
  }
  return labels;
}

export function AnalyticsPage() {
  const { translations } = useDashboard();
  const t = translations.analytics;
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const skeletonDayLabels = useMemo(() => getLast7DaysLabels(), []);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch("/api/dashboard/analytics");
        if (!response.ok) {
          throw new Error("Failed to fetch analytics");
        }
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  const maxDayViews = data ? Math.max(...data.viewsByDay.map((v) => v.count), 1) : 1;

  const dayHeights = useMemo(() => {
    if (!data) return SKELETON_HEIGHTS;
    return data.viewsByDay.map((item) => {
      const percent = item.count / maxDayViews;
      return Math.max(12, Math.round(percent * 88));
    });
  }, [data, maxDayViews]);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">{error}</div>
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
    <div className="h-full overflow-auto p-6 space-y-8">
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
          {(loading ? skeletonDayLabels : data?.viewsByDay || []).map((item, index) => {
            const isLoading = loading;
            const dayData = isLoading ? null : (item as { date: string; count: number });
            const height = isLoading ? SKELETON_HEIGHTS[index] : dayHeights[index];
            const dayLabel = isLoading
              ? (item as string)
              : new Date(dayData!.date).toLocaleDateString("en", { weekday: "short" });

            return (
              <div
                key={index}
                className="group"
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div style={{ height: "16px", marginBottom: "8px" }}>
                  {!isLoading && (
                    <span className="text-xs text-muted-foreground">
                      {dayData!.count}
                    </span>
                  )}
                </div>
                <div
                  className={`transition-all duration-700 ease-out ${
                    isLoading ? "bg-muted" : "bg-primary/80 hover:bg-primary"
                  }`}
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
    </div>
  );
}
