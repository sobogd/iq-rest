"use client";

import { Fragment, useEffect, useState, useCallback } from "react";
import {
  Users,
  MousePointerClick,
  UserCheck,
  TrendingUp,
  Calendar,
  Globe,
  Monitor,
  Network,
  Megaphone,
  Info,
  RefreshCw,
  X,
  ChevronLeft,
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { EVENT_LABELS } from "@/lib/dashboard-events";

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
  sessionType?: "signup" | "dashboard" | null;
  eventCount?: number;
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

interface ReturningIp {
  ip: string;
  sessions: number;
  views: number;
}

interface AdClick {
  gclid: string;
  keyword: string | null;
  match_type: string | null;
  campaign: string | null;
  country: string | null;
  sessionId: string;
  event_count: number;
  hasUser: boolean;
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
  returningIps?: ReturningIp[];
  adClicks?: AdClick[];
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

  // Copy to clipboard (textarea method for HTTP compatibility)
  const copyToClipboard = useCallback((text: string) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    document.execCommand("copy");
    document.body.removeChild(ta);
  }, []);

  // Ad clicks pagination
  const [adClicksPage, setAdClicksPage] = useState(0);

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
  const [eventsModalUserAgent, setEventsModalUserAgent] = useState<string | null>(null);
  const [sessionEvents, setSessionEvents] = useState<AnalyticsEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Event detail modal state
  const [detailEvent, setDetailEvent] = useState<AnalyticsEvent | null>(null);

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
      setAdClicksPage(0);
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
      second: "2-digit",
    });
  };

  const formatDateUTCRaw = (dateString: string) => {
    const d = new Date(dateString);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
  };

  const formatDateUTC = (dateString: string) => {
    return `${formatDateUTCRaw(dateString)} UTC`;
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
        setEventsModalUserAgent(data.userAgent || null);
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
    // Check new dashboard events first
    if (EVENT_LABELS[event]) return EVENT_LABELS[event];

    // Legacy marketing/section events
    const legacyNames: Record<string, string> = {
      page_view_home: "Visited Home",
      page_view_pricing: "Visited Pricing",
      page_view_faq: "Visited FAQ",
      page_view_contacts: "Visited Contacts",
      page_view_changelog: "Visited Changelog",
      page_view_terms: "Visited Terms",
      page_view_privacy: "Visited Privacy",
      page_view_cookies: "Visited Cookies",
      demo_open: "Opened Demo",
      demo_close: "Closed Demo",
    };

    if (legacyNames[event]) return legacyNames[event];

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
      <PageHeader title="Admin Analytics" backHref="/dashboard/admin" />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-6">
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

        {/* Returning IPs */}
        {data.returningIps && data.returningIps.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Network className="h-4 w-4" />
                Returning IPs ({data.returningIps.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.returningIps.map((item) => (
                  <div
                    key={item.ip}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <span className="text-sm font-mono">{item.ip}</span>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>{item.sessions} sessions</span>
                      <span>{item.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Google Ads Clicks */}
        {data.adClicks && data.adClicks.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Megaphone className="h-4 w-4" />
                Google Ads Clicks ({data.adClicks.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              {(() => {
                const PAGE_SIZE = 10;
                const totalPages = Math.ceil(data.adClicks!.length / PAGE_SIZE);
                const paged = data.adClicks!.slice(adClicksPage * PAGE_SIZE, (adClicksPage + 1) * PAGE_SIZE);
                return (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b text-muted-foreground">
                            <th className="text-left font-medium px-2 py-2">#</th>
                            <th className="text-left font-medium px-2 py-2"></th>
                            <th className="text-left font-medium px-2 py-2">kw</th>
                            <th className="text-left font-medium px-2 py-2">mt</th>
                            <th className="text-left font-medium px-2 py-2">ad</th>
                            <th className="text-left font-medium px-4 py-2">gclid</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paged.map((click) => (
                            <tr
                              key={click.gclid}
                              className="border-b last:border-0 cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => handleSessionClick(click.sessionId)}
                            >
                              <td className={`px-2 py-2 ${click.hasUser ? "text-red-500 font-medium" : "text-muted-foreground"}`}>{click.event_count}</td>
                              <td className="px-2 py-2">
                                {click.country ? countryToFlag(click.country) : ""}
                              </td>
                              <td className="px-2 py-2">{click.keyword || "—"}</td>
                              <td className="px-2 py-2">{click.match_type || "—"}</td>
                              <td className="px-2 py-2">{click.campaign || "—"}</td>
                              <td
                                className="px-4 py-2 font-mono whitespace-nowrap text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(click.gclid);
                                }}
                                title="Click to copy"
                              >
                                {click.gclid.slice(0, 8)}…{click.gclid.slice(-8)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between px-4 py-2 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setAdClicksPage((p) => p - 1)}
                          disabled={adClicksPage === 0}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {adClicksPage + 1} / {totalPages}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setAdClicksPage((p) => p + 1)}
                          disabled={adClicksPage >= totalPages - 1}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                );
              })()}
            </CardContent>
          </Card>
        )}

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
                    <span className="text-sm font-medium">
                      {formatEventName(event.event)}
                    </span>
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

      {/* Sessions Sheet */}
      <Sheet open={sessionsModalOpen} onOpenChange={setSessionsModalOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
          <SheetHeader className="p-6 pb-0 text-left">
            <SheetTitle>{sessionsModalTitle}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 px-6 pb-6">
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
                      <div className="flex items-center gap-2.5">
                        {session.sessionType === "signup" ? (
                          <span className="h-2.5 w-2.5 rounded-full bg-green-500 shrink-0" title="Signed up" />
                        ) : session.sessionType === "dashboard" ? (
                          <span className="h-2.5 w-2.5 rounded-full bg-red-500 shrink-0" title="Returning user" />
                        ) : (session.eventCount ?? 0) <= 2 ? (
                          <span className="h-2.5 w-2.5 rounded-full bg-violet-500 shrink-0" title="Bounce" />
                        ) : (
                          <span className="h-2.5 w-2.5 rounded-full bg-muted shrink-0" />
                        )}
                        {country && (
                          <span className="text-sm shrink-0">{countryToFlag(country)}</span>
                        )}
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-sm">
                            {formatDate(session.createdAt)}
                          </span>
                          <span className={`text-[9px] ${session.source === "Ads" ? "text-blue-500" : "text-muted-foreground"}`}>
                            {session.source === "Ads" ? `Ads: ${session.adValues || "gclid"}` : "Direct"}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Session Events Sheet (opens on top of sessions sheet) */}
      <Sheet open={eventsModalOpen} onOpenChange={setEventsModalOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
          <SheetHeader className="p-6 pb-0 text-left">
            <SheetTitle className="flex flex-col gap-0.5">
              <span className="font-mono text-sm break-all">{eventsModalSessionId}</span>
              <span className={`text-[10px] font-normal ${eventsModalSource === "Ads" ? "text-blue-500" : "text-muted-foreground"}`}>
                {eventsModalSource === "Ads" ? `Ads: ${eventsModalAdValues || "gclid"}` : "Direct"}
              </span>
              {eventsModalUserAgent && (
                <span className="text-[10px] font-normal text-muted-foreground break-all">
                  {eventsModalUserAgent}
                </span>
              )}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 px-6 pb-6">
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
                  const hasDetails = (event.meta && Object.keys(event.meta).length > 0) || event.page;

                  const dateDisplay = formatDateUTC(event.createdAt);
                  const dateCopy = formatDateUTCRaw(event.createdAt);

                  return (
                    <div key={event.id}>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-[10px] font-mono cursor-pointer w-fit text-muted-foreground hover:text-foreground select-none"
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              copyToClipboard(dateCopy);
                            }}
                            title="Click to copy"
                          >
                            {dateDisplay}
                          </p>
                          <p className="text-sm font-medium mt-0.5">
                            {formatEventName(event.event)}
                          </p>
                        </div>
                        {hasDetails && (
                          <button
                            className="shrink-0 p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setDetailEvent(event)}
                          >
                            <Info className="h-4 w-4" />
                          </button>
                        )}
                      </div>
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
          {!eventsLoading && sessionEvents.length > 0 && (
            <div className="p-6 pt-0">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => eventsModalSessionId && handleDeleteSession(eventsModalSessionId)}
                disabled={deleting}
              >
                <Trash2 className={`h-4 w-4 mr-2 ${deleting ? "animate-pulse" : ""}`} />
                Delete session
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Event Detail Modal */}
      <Dialog open={!!detailEvent} onOpenChange={(open) => !open && setDetailEvent(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{detailEvent && formatEventName(detailEvent.event)}</DialogTitle>
          </DialogHeader>
          {detailEvent && (
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-mono">{formatDateUTC(detailEvent.createdAt)}</span>
              </div>
              {detailEvent.page && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground">Page:</span>
                  <span className="break-all">{detailEvent.page}</span>
                </div>
              )}
              {detailEvent.meta && Object.keys(detailEvent.meta).length > 0 && (
                <div className="space-y-0.5 text-xs pt-1 border-t">
                  {formatMeta(detailEvent.meta)}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
