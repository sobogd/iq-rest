"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  MousePointerClick,
  UserCheck,
  TrendingUp,
  Calendar,
  Globe,
  Monitor,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLoader } from "../_ui/page-loader";

interface FunnelStep {
  event: string;
  label: string;
  count: number;
}

interface AnalyticsEvent {
  id: string;
  event: string;
  sessionId: string;
  userId: string | null;
  page: string | null;
  createdAt: string;
}

interface Stats {
  totalEvents: number;
  uniqueSessions: number;
  linkedSessions: number;
}

interface GeoStatsItem {
  name: string;
  count: number;
}

interface GeoStats {
  countries: GeoStatsItem[];
  devices: GeoStatsItem[];
  browsers: GeoStatsItem[];
  os: GeoStatsItem[];
}

interface AnalyticsData {
  funnels: {
    sections: FunnelStep[];
    marketing: FunnelStep[];
    dashboard: FunnelStep[];
    conversion: FunnelStep[];
  };
  recentEvents: AnalyticsEvent[];
  stats: Stats;
  geoStats: GeoStats;
  dateRange: {
    from: string;
    to: string;
  };
}

// Convert country code to flag emoji (e.g., "US" -> "🇺🇸")
function countryToFlag(countryCode: string): string {
  const code = countryCode.toUpperCase();
  if (code.length !== 2) return "";
  const offset = 0x1f1e6 - 65; // 🇦 minus 'A'
  return String.fromCodePoint(
    code.charCodeAt(0) + offset,
    code.charCodeAt(1) + offset
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
  const maxCount = Math.max(...items.map((i) => i.count), 1);

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No data yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => {
            const percentage = (item.count / maxCount) * 100;
            const flag = showFlag ? countryToFlag(item.name) : "";
            return (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{flag ? `${flag} ${item.name}` : item.name}</span>
                  <span className="text-muted-foreground">{item.count}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/70 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function FunnelCard({ title, steps }: { title: string; steps: FunnelStep[] }) {
  const maxCount = Math.max(...steps.map((s) => s.count), 1);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {steps.map((step, index) => {
              const percentage = maxCount > 0 ? (step.count / maxCount) * 100 : 0;
              const prevCount = index > 0 ? steps[index - 1].count : step.count;
              const dropoff = prevCount > 0 ? ((prevCount - step.count) / prevCount) * 100 : 0;

              const tooltipText = `${step.label}\n${step.count} users${index > 0 && dropoff > 0 ? `\n-${dropoff.toFixed(0)}% drop` : ""}`;

              return (
                <div key={step.event} className="flex flex-col items-center w-16">
                  <div className="h-24 w-full flex items-end justify-center">
                    <div
                      className="w-10 rounded-t cursor-pointer transition-all bg-primary/70 hover:bg-primary"
                      style={{ height: `${Math.max(percentage, 4)}%` }}
                      title={tooltipText}
                    />
                  </div>
                  <div className="mt-1 text-center">
                    <p className="text-xs font-medium">{step.count}</p>
                    <p className="text-[9px] text-muted-foreground leading-tight h-6 overflow-hidden">
                      {step.label}
                    </p>
                    {index > 0 && dropoff > 0 && (
                      <p className="text-[9px] text-red-500">-{dropoff.toFixed(0)}%</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type TimeRange =
  | "5m"
  | "30m"
  | "1h"
  | "2h"
  | "12h"
  | "today"
  | "yesterday"
  | "7d";

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: "5m", label: "5 min" },
  { value: "30m", label: "30 min" },
  { value: "1h", label: "1 hour" },
  { value: "2h", label: "2 hours" },
  { value: "12h", label: "12 hours" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "7d", label: "7 days" },
];

function getDateRange(range: TimeRange): { from: string; to: string } {
  const now = new Date();
  const to = now.toISOString();
  let from: Date;

  switch (range) {
    case "5m":
      from = new Date(now.getTime() - 5 * 60 * 1000);
      break;
    case "30m":
      from = new Date(now.getTime() - 30 * 60 * 1000);
      break;
    case "1h":
      from = new Date(now.getTime() - 60 * 60 * 1000);
      break;
    case "2h":
      from = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      break;
    case "12h":
      from = new Date(now.getTime() - 12 * 60 * 60 * 1000);
      break;
    case "today":
      from = new Date(now);
      from.setHours(0, 0, 0, 0);
      break;
    case "yesterday":
      from = new Date(now);
      from.setDate(from.getDate() - 1);
      from.setHours(0, 0, 0, 0);
      const yesterdayEnd = new Date(now);
      yesterdayEnd.setHours(0, 0, 0, 0);
      return { from: from.toISOString(), to: yesterdayEnd.toISOString() };
    case "7d":
      from = new Date(now);
      from.setDate(from.getDate() - 7);
      from.setHours(0, 0, 0, 0);
      break;
    default:
      from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  return { from: from.toISOString(), to };
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
        if (res.status === 403) {
          setError("Access denied");
        } else {
          setError("Failed to load data");
        }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatEventName = (event: string): string => {
    const eventNames: Record<string, string> = {
      // Page views
      page_view_home: "Visited Home",
      page_view_pricing: "Visited Pricing",
      page_view_faq: "Visited FAQ",
      page_view_contacts: "Visited Contacts",
      page_view_changelog: "Visited Changelog",
      // Features
      page_view_instant_setup: "Visited Instant Setup",
      page_view_mobile_management: "Visited Mobile Management",
      page_view_ai_translation: "Visited AI Translation",
      page_view_multilingual: "Visited Multilingual",
      page_view_ai_images: "Visited AI Images",
      page_view_easy_menu: "Visited Easy Menu",
      page_view_analytics: "Visited Analytics",
      page_view_reservations: "Visited Reservations",
      page_view_custom_design: "Visited Custom Design",
      page_view_color_scheme: "Visited Color Scheme",
      page_view_personal_support: "Visited Support",
      // Marketing
      hero_create_click: "Clicked Create Button",
      demo_open: "Opened Demo",
      demo_close: "Closed Demo",
      // Auth
      auth_email_submit: "Submitted Email",
      auth_code_verify: "Verified Code",
      auth_signup: "Signed Up",
      // Dashboard
      dashboard_onboarding: "Dashboard: Onboarding",
      dashboard_categories: "Dashboard: Categories",
      dashboard_items: "Dashboard: Items",
      dashboard_settings: "Dashboard: Settings",
      dashboard_design: "Dashboard: Design",
      dashboard_contacts: "Dashboard: Contacts",
      dashboard_languages: "Dashboard: Languages",
      dashboard_analytics: "Dashboard: Analytics",
      dashboard_qrMenu: "Dashboard: QR Menu",
      dashboard_billing: "Dashboard: Billing",
      // Actions
      category_created: "Created Category",
      item_created: "Created Item",
      restaurant_saved: "Saved Restaurant",
    };

    if (eventNames[event]) return eventNames[event];

    // Fallback: convert section_view_hero -> "Section: Hero"
    if (event.startsWith("section_view_")) {
      const section = event.replace("section_view_", "").replace(/_/g, " ");
      return `Section: ${section.charAt(0).toUpperCase() + section.slice(1)}`;
    }

    // Fallback: convert snake_case to Title Case
    return event.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (loading && !data) {
    return <PageLoader />;
  }

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
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Time Range Filter */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {TIME_RANGES.map((range) => (
                <Button
                  key={range.value}
                  variant={timeRange === range.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range.value)}
                  disabled={loading}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <MousePointerClick className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{data.stats.totalEvents}</p>
                  <p className="text-sm text-muted-foreground">Events</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{data.stats.uniqueSessions}</p>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <UserCheck className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{data.stats.linkedSessions}</p>
                  <p className="text-sm text-muted-foreground">Logged In</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">
                    {data.stats.uniqueSessions > 0
                      ? ((data.stats.linkedSessions / data.stats.uniqueSessions) * 100).toFixed(1)
                      : 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">Conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4 Funnels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FunnelCard title="Landing Sections" steps={data.funnels.sections} />
          <FunnelCard title="Marketing Pages" steps={data.funnels.marketing} />
          <FunnelCard title="Dashboard Pages" steps={data.funnels.dashboard} />
          <FunnelCard title="Conversion Funnel" steps={data.funnels.conversion} />
        </div>

        {/* Geo & Device Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsListCard
            title="Countries"
            items={data.geoStats.countries}
            icon={Globe}
            showFlag
          />
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
          <StatsListCard
            title="OS"
            items={data.geoStats.os}
            icon={Monitor}
          />
        </div>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {formatEventName(event.event)}
                      </span>
                      {event.userId && (
                        <span className="text-[10px] text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                          logged in
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDate(event.createdAt)}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {event.sessionId.slice(0, 8)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
