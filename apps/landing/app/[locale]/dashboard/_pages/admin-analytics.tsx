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
  RefreshCw,
  X,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  meta?: Record<string, unknown> | null;
  createdAt: string;
}

interface SessionInfo {
  sessionId: string;
  userId: string | null;
  createdAt: string;
  meta?: Record<string, unknown> | null;
  source?: string;
  adValues?: string;
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

// Format time difference between two dates
function formatTimeDiff(date1: string, date2: string): string {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime()) / 1000;

  if (diff < 60) {
    return `${Math.round(diff)}s`;
  } else if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    const secs = Math.round(diff % 60);
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    const mins = Math.round((diff % 3600) / 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  } else {
    const days = Math.floor(diff / 86400);
    const hours = Math.round((diff % 86400) / 3600);
    return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  }
}

// Format meta object into readable lines
function formatMeta(meta: Record<string, unknown>): React.ReactNode[] {
  const lines: React.ReactNode[] = [];

  const formatValue = (prefix: string, obj: Record<string, unknown>) => {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        formatValue(`${prefix} ${key.charAt(0).toUpperCase() + key.slice(1)}`, value as Record<string, unknown>);
      } else if (value !== null && value !== undefined) {
        const label = `${prefix} ${key.charAt(0).toUpperCase() + key.slice(1)}`.trim();
        lines.push(
          <div key={label} className="flex gap-2">
            <span className="text-muted-foreground">{label}:</span>
            <span>{String(value)}</span>
          </div>
        );
      }
    }
  };

  for (const [key, value] of Object.entries(meta)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      formatValue(key.charAt(0).toUpperCase() + key.slice(1), value as Record<string, unknown>);
    } else if (value !== null && value !== undefined) {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      lines.push(
        <div key={label} className="flex gap-2">
          <span className="text-muted-foreground">{label}:</span>
          <span>{String(value)}</span>
        </div>
      );
    }
  }

  return lines;
}

function StatsListCard({
  title,
  items,
  icon: Icon,
  showFlag = false,
  onItemClick,
}: {
  title: string;
  items: GeoStatsItem[];
  icon: React.ElementType;
  showFlag?: boolean;
  onItemClick?: (item: GeoStatsItem) => void;
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
              <div
                key={item.name}
                className={`space-y-1 ${onItemClick ? "cursor-pointer hover:opacity-70" : ""}`}
                onClick={() => onItemClick?.(item)}
              >
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

function FunnelCard({
  title,
  steps,
  onBarClick,
}: {
  title: string;
  steps: FunnelStep[];
  onBarClick?: (step: FunnelStep) => void;
}) {
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

              const tooltipText = `${step.label}\n${step.count} users${index > 0 && dropoff > 0 ? `\n-${dropoff.toFixed(0)}% drop` : ""}\nClick to view sessions`;

              return (
                <div key={step.event} className="flex flex-col items-center w-16">
                  <div className="h-24 w-full flex items-end justify-center">
                    <div
                      className="w-10 rounded-t cursor-pointer transition-all bg-primary/70 hover:bg-primary"
                      style={{ height: `${Math.max(percentage, 4)}%` }}
                      title={tooltipText}
                      onClick={() => step.count > 0 && onBarClick?.(step)}
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

  // Sessions modal state
  const [sessionsModalOpen, setSessionsModalOpen] = useState(false);
  const [sessionsModalTitle, setSessionsModalTitle] = useState("");
  const [sessionsModalEvent, setSessionsModalEvent] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  // Session events modal state
  const [eventsModalOpen, setEventsModalOpen] = useState(false);
  const [eventsModalSessionId, setEventsModalSessionId] = useState<string | null>(null);
  const [eventsModalSource, setEventsModalSource] = useState<string>("Direct");
  const [eventsModalAdValues, setEventsModalAdValues] = useState<string | undefined>();
  const [sessionEvents, setSessionEvents] = useState<AnalyticsEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleBarClick = async (step: FunnelStep) => {
    setSessionsModalTitle(`${step.label} (${step.count})`);
    setSessionsModalEvent(step.event);
    setSessionsModalOpen(true);
    setSessionsLoading(true);

    try {
      const { from, to } = getDateRange(timeRange);
      const params = new URLSearchParams({ event: step.event, from, to });
      const res = await fetch(`/api/admin/analytics/sessions?${params}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions || []);
      }
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    } finally {
      setSessionsLoading(false);
    }
  };

  const handleAllSessionsClick = async () => {
    setSessionsModalTitle(`All Sessions (${data?.stats.uniqueSessions || 0})`);
    setSessionsModalEvent(null);
    setSessionsModalOpen(true);
    setSessionsLoading(true);

    try {
      const { from, to } = getDateRange(timeRange);
      const params = new URLSearchParams({ from, to });
      const res = await fetch(`/api/admin/analytics/sessions?${params}`);
      if (res.ok) {
        const json = await res.json();
        setSessions(json.sessions || []);
      }
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    } finally {
      setSessionsLoading(false);
    }
  };

  const handleSessionClick = async (sessionId: string) => {
    setEventsModalSessionId(sessionId);
    setEventsModalOpen(true);
    setEventsLoading(true);

    try {
      const params = new URLSearchParams({ sessionId });
      const res = await fetch(`/api/admin/analytics/sessions?${params}`);
      if (res.ok) {
        const data = await res.json();
        setSessionEvents(data.events || []);
        setEventsModalSource(data.source || "Direct");
        setEventsModalAdValues(data.adValues);
      }
    } catch (err) {
      console.error("Failed to fetch session events:", err);
    } finally {
      setEventsLoading(false);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm("Delete this session and all its events?")) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/analytics/sessions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      if (res.ok) {
        // Close events modal and remove from sessions list
        setEventsModalOpen(false);
        setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
        // Refresh data
        fetchData();
      }
    } catch (err) {
      console.error("Failed to delete session:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCountryClick = async (item: GeoStatsItem) => {
    setSessionsModalTitle(`${countryToFlag(item.name)} ${item.name} (${item.count})`);
    setSessionsModalEvent(null);
    setSessionsModalOpen(true);
    setSessionsLoading(true);

    try {
      const { from, to } = getDateRange(timeRange);
      const params = new URLSearchParams({ from, to, country: item.name });
      const res = await fetch(`/api/admin/analytics/sessions?${params}`);
      if (res.ok) {
        const json = await res.json();
        setSessions(json.sessions || []);
      }
    } catch (err) {
      console.error("Failed to fetch sessions by country:", err);
    } finally {
      setSessionsLoading(false);
    }
  };

  const formatEventName = (event: string): string => {
    const eventNames: Record<string, string> = {
      // Page views
      page_view_home: "Visited Home",
      page_view_pricing: "Visited Pricing",
      page_view_faq: "Visited FAQ",
      page_view_contacts: "Visited Contacts",
      page_view_changelog: "Visited Changelog",
      page_view_terms: "Visited Terms",
      page_view_privacy: "Visited Privacy",
      page_view_cookies: "Visited Cookies",
      // Marketing
      demo_open: "Opened Demo",
      demo_close: "Closed Demo",
      // Auth
      auth_email_submit: "Submitted Email",
      auth_code_verify: "Verified Code",
      auth_signup: "Signed Up",
      // Onboarding
      onboarding_step_view: "Onboarding: Step View",
      onboarding_step_continue: "Onboarding: Continue Click",
      onboarding_complete: "Onboarding: Complete",
      // Dashboard
      dashboard_categories: "Dashboard: Categories",
      dashboard_items: "Dashboard: Items",
      dashboard_settings: "Dashboard: Settings",
      dashboard_design: "Dashboard: Design",
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
              <Button
                variant="outline"
                size="sm"
                onClick={fetchData}
                disabled={loading}
                className="ml-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
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
          <Card
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={handleAllSessionsClick}
          >
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
          <FunnelCard title="Landing Sections" steps={data.funnels.sections} onBarClick={handleBarClick} />
          <FunnelCard title="Marketing Pages" steps={data.funnels.marketing} onBarClick={handleBarClick} />
          <FunnelCard title="Dashboard Pages" steps={data.funnels.dashboard} onBarClick={handleBarClick} />
          <FunnelCard title="Conversion Funnel" steps={data.funnels.conversion} onBarClick={handleBarClick} />
        </div>

        {/* Geo & Device Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsListCard
            title="Countries"
            items={data.geoStats.countries}
            icon={Globe}
            showFlag
            onItemClick={handleCountryClick}
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
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSessionClick(event.sessionId)}
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

      {/* Sessions Modal */}
      <Dialog open={sessionsModalOpen} onOpenChange={setSessionsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{sessionsModalTitle}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            {sessionsLoading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : sessions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No sessions found</p>
            ) : (
              <div className="space-y-2 pr-4">
                {sessions.map((session) => {
                  const meta = session.meta as { geo?: { country?: string } } | null;
                  const country = meta?.geo?.country;
                  return (
                    <div
                      key={session.sessionId}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSessionClick(session.sessionId)}
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono">{session.sessionId.slice(0, 12)}...</span>
                          {session.userId && (
                            <span className="text-[10px] text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                              logged in
                            </span>
                          )}
                          {country && (
                            <span className="text-sm">{countryToFlag(country)}</span>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {formatDate(session.createdAt)}
                        </span>
                        <span className={`text-[9px] ${session.source === "Ads" ? "text-blue-500" : "text-muted-foreground"}`}>
                          {session.source === "Ads" ? `Ads: ${session.adValues || "gclid"}` : "Direct"}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Session Events Modal */}
      <Dialog open={eventsModalOpen} onOpenChange={setEventsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span>Session: {eventsModalSessionId?.slice(0, 12)}...</span>
                <span className={`text-[10px] font-normal ${eventsModalSource === "Ads" ? "text-blue-500" : "text-muted-foreground"}`}>
                  {eventsModalSource === "Ads" ? `Ads: ${eventsModalAdValues || "gclid"}` : "Direct"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => eventsModalSessionId && handleDeleteSession(eventsModalSessionId)}
                disabled={deleting}
              >
                <Trash2 className={`h-4 w-4 ${deleting ? "animate-pulse" : ""}`} />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            {eventsLoading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : sessionEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No events found</p>
            ) : (
              <div className="space-y-1 pr-4">
                {sessionEvents.map((event, index) => {
                  const prevEvent = index < sessionEvents.length - 1 ? sessionEvents[index + 1] : null;
                  const timeDiff = prevEvent ? formatTimeDiff(event.createdAt, prevEvent.createdAt) : null;

                  return (
                    <div key={event.id}>
                      {event.meta && Object.keys(event.meta).length > 0 ? (
                        <Collapsible>
                          <CollapsibleTrigger className="w-full text-left">
                            <div className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <ChevronRight className="h-3 w-3 text-muted-foreground transition-transform [[data-state=open]_&]:rotate-90" />
                                  <span className="text-sm font-medium">
                                    {formatEventName(event.event)}
                                  </span>
                                  {event.userId && (
                                    <span className="text-[10px] text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                                      logged in
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(event.createdAt)}
                                </span>
                              </div>
                              {event.page && (
                                <p className="text-xs text-muted-foreground mt-1 ml-5">
                                  {event.page}
                                </p>
                              )}
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="text-xs bg-muted/50 p-3 rounded-b-lg -mt-1 ml-5 mr-0 space-y-0.5 border-t border-muted">
                              {formatMeta(event.meta)}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <div className="p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium ml-5">
                                {formatEventName(event.event)}
                              </span>
                              {event.userId && (
                                <span className="text-[10px] text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                                  logged in
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(event.createdAt)}
                            </span>
                          </div>
                          {event.page && (
                            <p className="text-xs text-muted-foreground mt-1 ml-5">
                              {event.page}
                            </p>
                          )}
                        </div>
                      )}
                      {timeDiff && (
                        <div className="flex justify-center py-1">
                          <span className="text-[10px] text-muted-foreground">
                            +{timeDiff}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
