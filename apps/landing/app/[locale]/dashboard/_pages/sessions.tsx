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
  eventCount: number;
  hasUser: boolean;
  country: string | null;
  source: string;
  adValues: string | null;
  sessionType: string | null;
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
      if (res.ok) {
        const json = await res.json();
        setSessions(json.sessions || []);
        setTotal(json.total || 0);
        setPage(json.page || 0);
        setTotalPages(json.totalPages || 0);
      }
    } catch {
      console.error("Failed to fetch sessions");
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
        setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
        setTotal((prev) => prev - 1);
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
              {sessions.map((session, index) => (
                <div
                  key={session.sessionId}
                  className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-muted/30 transition-colors ${
                    index > 0 ? "border-t border-foreground/5" : ""
                  }`}
                >
                  {/* Type indicator */}
                  {session.sessionType === "signup" ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 shrink-0" title="Signed up" />
                  ) : session.sessionType === "dashboard" ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500 shrink-0" title="Returning" />
                  ) : session.eventCount <= 2 ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-500 shrink-0" title="Bounce" />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30 shrink-0" />
                  )}

                  {/* Flag */}
                  <span className="text-base shrink-0 w-6 text-center">
                    {session.country ? countryToFlag(session.country) : ""}
                  </span>

                  {/* Info — clickable area */}
                  <button
                    onClick={() => router.push(`/dashboard/sessions/${session.sessionId}`)}
                    className="flex-1 min-w-0 text-left"
                  >
                    <p className="text-sm font-medium truncate">
                      {formatDate(session.firstEvent)}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">
                        {session.eventCount} events
                      </span>
                      {session.source === "Ads" && (
                        <span className="text-[10px] text-blue-500">
                          Ads{session.adValues ? `: ${session.adValues}` : ""}
                        </span>
                      )}
                      {session.hasUser && (
                        <span className="text-[10px] text-green-500">logged in</span>
                      )}
                    </div>
                  </button>

                  {/* Delete */}
                  <button
                    className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    onClick={() => handleDelete(session.sessionId)}
                    disabled={deleting === session.sessionId}
                  >
                    <Trash2 className={`h-4 w-4 ${deleting === session.sessionId ? "animate-pulse" : ""}`} />
                  </button>
                </div>
              ))}
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
