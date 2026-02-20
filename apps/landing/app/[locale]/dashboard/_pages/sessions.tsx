"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

interface Session {
  sessionId: string;
  lastEvent: string;
  duration: number;
  eventCount: number;
  country: string | null;
  source: string;
  hasUser: boolean;
}

type Period = "today" | "yesterday" | "7days";

const PERIODS: Period[] = ["today", "yesterday", "7days"];

const TABS: { value: Period; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "7days", label: "7 days" },
];

function countryToFlag(countryCode: string): string {
  const code = countryCode.toUpperCase();
  if (code.length !== 2) return "";
  const offset = 0x1f1e6 - 65;
  return String.fromCodePoint(
    code.charCodeAt(0) + offset,
    code.charCodeAt(1) + offset
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatDate(dateString: string): string {
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");
  return `${day}.${month} ${hours}:${mins}`;
}

export function SessionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const periodParam = searchParams.get("period") as Period | null;
  const period: Period = periodParam && PERIODS.includes(periodParam) ? periodParam : "today";

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollParam = searchParams.get("scroll");

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchSessions = useCallback(async (p: Period) => {
    setLoading(true);
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await fetch(`/api/admin/analytics/sessions-list?period=${p}&tz=${encodeURIComponent(tz)}`);
      if (!res.ok) return;
      const json = await res.json();
      setSessions(json.sessions || []);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions(period);
  }, [period, refreshKey, fetchSessions]);

  // Restore scroll position after data loads
  useEffect(() => {
    if (!loading && scrollParam && scrollRef.current) {
      scrollRef.current.scrollTop = Number(scrollParam);
    }
  }, [loading, scrollParam]);

  if (loading && sessions.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Sessions" backHref="/dashboard">
        <Button variant="ghost" size="icon" onClick={() => {
          const scroll = Math.round(scrollRef.current?.scrollTop || 0);
          const params = new URLSearchParams();
          if (period !== "today") params.set("period", period);
          if (scroll > 0) params.set("scroll", String(scroll));
          const url = "/dashboard/sessions" + (params.toString() ? `?${params}` : "");
          router.replace(url);
          setRefreshKey((k) => k + 1);
        }}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </PageHeader>
      <div ref={scrollRef} className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Period tabs */}
          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  const url = tab.value === "today"
                    ? "/dashboard/sessions"
                    : `/dashboard/sessions?period=${tab.value}`;
                  router.push(url);
                }}
                className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                  period === tab.value
                    ? "border-primary bg-primary/10 font-medium"
                    : "border-border hover:bg-muted/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List */}
          {loading && sessions.length > 0 ? (
            <div className="rounded-2xl border border-border bg-muted/50 flex items-center justify-center" style={{ minHeight: "200px" }}>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 && !loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">No sessions</p>
          ) : sessions.length === 0 ? null : (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {sessions.map((session, index) => (
                <button
                  key={session.sessionId}
                  onClick={() => {
                    const scroll = scrollRef.current?.scrollTop || 0;
                    const params = new URLSearchParams();
                    if (period !== "today") params.set("period", period);
                    if (scroll > 0) params.set("scroll", String(Math.round(scroll)));
                    const backUrl = "/dashboard/sessions" + (params.toString() ? `?${params}` : "");
                    router.push(`/dashboard/sessions/${session.sessionId}?back=${encodeURIComponent(backUrl)}`);
                  }}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 hover:bg-muted/30 transition-colors text-left ${
                    index > 0 ? "border-t border-foreground/5" : ""
                  }`}
                >
                  <span className="text-base shrink-0">{session.country ? countryToFlag(session.country) : "🌐"}</span>
                  <span className="text-xs font-medium shrink-0">{formatDate(session.lastEvent)}</span>
                  <span className={`text-xs shrink-0 ${session.source === "Ads" ? "text-blue-500" : "text-muted-foreground"}`}>
                    {session.source}
                  </span>
                  <span className="flex-1" />
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatDuration(session.duration)} · {session.eventCount} ev.
                  </span>
                  {session.hasUser && (
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
