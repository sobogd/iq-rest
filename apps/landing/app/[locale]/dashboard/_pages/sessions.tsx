"use client";

import { useEffect, useState, useCallback } from "react";
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";

interface Session {
  sessionId: string;
  firstEvent: string;
  duration: number;
  eventCount: number;
  hasUser: boolean;
  country: string | null;
  source: string;
  adValues: string | null;
  sessionType: string | null;
  restaurantName: string | null;
  ip: string | null;
  isBot: boolean;
}

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

function getSessionTags(session: Session): { label: string; color: string }[] {
  const tags: { label: string; color: string }[] = [];

  if (session.isBot) {
    tags.push({ label: "Bot", color: "text-orange-500" });
  }

  if (session.sessionType === "signup") {
    tags.push({ label: "Signed up", color: "text-green-500" });
  } else if (session.hasUser) {
    tags.push({ label: "Logged in", color: "text-green-500" });
  }

  if (session.sessionType === "dashboard") {
    tags.push({ label: "Dashboard", color: "text-red-500" });
  }

  if (session.eventCount <= 2 && session.sessionType !== "signup" && session.sessionType !== "dashboard") {
    tags.push({ label: "Bounce", color: "text-violet-500" });
  }

  return tags;
}

export function SessionsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchSessions = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p) });
      const res = await fetch(`/api/admin/analytics/sessions-list?${params}`);
      if (!res.ok) {
        const text = await res.text();
        console.error("Sessions API error:", res.status, text);
        return;
      }
      const json = await res.json();
      setSessions(json.sessions || []);
      setTotal(json.total || 0);
      setPage(json.page || 0);
      setTotalPages(json.totalPages || 0);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions(0);
  }, [fetchSessions]);

  const handleDelete = async (sessionId: string) => {
    if (!confirm("Delete this session and all its events?")) return;
    setDeleting(sessionId);
    try {
      const res = await fetch("/api/admin/analytics/sessions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      if (res.ok) {
        fetchSessions(page);
      }
    } catch {
      console.error("Failed to delete session");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading && sessions.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Sessions" backHref="/dashboard">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fetchSessions(page)}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No sessions yet</p>
          ) : (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {sessions.map((session, index) => {
                const tags = getSessionTags(session);
                return (
                  <div
                    key={session.sessionId}
                    className={`flex items-start gap-3 w-full px-4 py-3 hover:bg-muted/30 transition-colors ${
                      index > 0 ? "border-t border-foreground/5" : ""
                    }`}
                  >
                    {/* Flag */}
                    <span className="text-base shrink-0 w-6 text-center mt-0.5">
                      {session.country ? countryToFlag(session.country) : ""}
                    </span>

                    {/* Info — clickable area */}
                    <button
                      onClick={() => router.push(`/dashboard/sessions/${session.sessionId}`)}
                      className="flex-1 min-w-0 text-left"
                    >
                      {/* Line 1: Date + duration · events */}
                      <div className="flex items-baseline justify-between">
                        <p className="text-sm font-medium">
                          {formatDate(session.firstEvent)}
                        </p>
                        <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                          {formatDuration(session.duration)} · {session.eventCount} ev.
                        </span>
                      </div>

                      {/* Line 2: Source */}
                      <p className={`text-[10px] mt-0.5 ${session.source === "Ads" ? "text-blue-500" : "text-muted-foreground"}`}>
                        {session.source === "Ads"
                          ? `Ads${session.adValues ? `: ${session.adValues}` : ""}`
                          : "Direct"}
                      </p>

                      {/* Line 3: IP / tags */}
                      <p className="text-[10px] mt-0.5">
                        {session.ip && (
                          <span className="text-muted-foreground font-mono">{session.ip}</span>
                        )}
                        {session.ip && tags.length > 0 && (
                          <span className="text-muted-foreground"> / </span>
                        )}
                        {tags.map((tag, i) => (
                          <span key={tag.label}>
                            {i > 0 && <span className="text-muted-foreground">, </span>}
                            <span className={`font-medium ${tag.color}`}>{tag.label}</span>
                          </span>
                        ))}
                        {!session.ip && tags.length === 0 && (
                          <span className="invisible">—</span>
                        )}
                      </p>

                      {/* Line 4: Restaurant name */}
                      <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                        {session.restaurantName || <span className="invisible">—</span>}
                      </p>
                    </button>

                    {/* Delete */}
                    <button
                      className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0 mt-0.5"
                      onClick={() => handleDelete(session.sessionId)}
                      disabled={deleting === session.sessionId}
                    >
                      <Trash2 className={`h-4 w-4 ${deleting === session.sessionId ? "animate-pulse" : ""}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {total > 0 && (
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fetchSessions(page - 1)}
                disabled={page === 0 || loading}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground">
                {page + 1} / {totalPages} · {total} total
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fetchSessions(page + 1)}
                disabled={page >= totalPages - 1 || loading}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
