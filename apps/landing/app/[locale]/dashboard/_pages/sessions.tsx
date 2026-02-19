"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

interface Session {
  sessionId: string;
  firstEvent: string;
  duration: number;
  eventCount: number;
  country: string | null;
  source: string;
  hasUser: boolean;
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
  const currentPage = Math.max(0, Number(searchParams.get("page") || 0));

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchSessions = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics/sessions-list?page=${p}`);
      if (!res.ok) return;
      const json = await res.json();
      setSessions(json.sessions || []);
      setTotal(json.total || 0);
      setTotalPages(json.totalPages || 0);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions(currentPage);
  }, [currentPage, fetchSessions]);

  const goToPage = (p: number) => {
    router.push(`/dashboard/sessions?page=${p}`);
  };

  if (loading && sessions.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Sessions" backHref="/dashboard" />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {loading && sessions.length > 0 ? (
            <div className="rounded-2xl border border-border bg-muted/50 flex items-center justify-center" style={{ minHeight: "200px" }}>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 && !loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">No sessions yet</p>
          ) : sessions.length === 0 ? null : (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {sessions.map((session, index) => (
                <button
                  key={session.sessionId}
                  onClick={() => router.push(`/dashboard/sessions/${session.sessionId}`)}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 hover:bg-muted/30 transition-colors text-left ${
                    index > 0 ? "border-t border-foreground/5" : ""
                  }`}
                >
                  <span className="text-base shrink-0">{session.country ? countryToFlag(session.country) : "🌐"}</span>
                  <span className="text-xs font-medium shrink-0">{formatDate(session.firstEvent)}</span>
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

          {/* Pagination */}
          {total > 0 && (
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0 || loading}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground">
                {currentPage + 1} / {totalPages} · {total} total
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages - 1 || loading}
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
