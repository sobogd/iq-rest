"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { EVENT_LABELS } from "@/lib/dashboard-events";

interface AnalyticsEvent {
  id: string;
  event: string;
  sessionId: string;
  createdAt: string;
}

function formatTimeDiff(date1: string, date2: string): string {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime()) / 1000;
  if (diff < 60) return `${Math.round(diff)}s`;
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    const secs = Math.round(diff % 60);
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    const mins = Math.round((diff % 3600) / 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  const days = Math.floor(diff / 86400);
  const hours = Math.round((diff % 86400) / 3600);
  return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
}

function formatEventName(event: string): string {
  if (EVENT_LABELS[event]) return EVENT_LABELS[event];
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
  if (event.startsWith("section_view_")) {
    const section = event.replace("section_view_", "").replace(/_/g, " ");
    return `Section: ${section.charAt(0).toUpperCase() + section.slice(1)}`;
  }
  return event.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SessionDetailPage({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("Direct");
  const [adValues, setAdValues] = useState<string | undefined>();
  const [userAgent, setUserAgent] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sessionId });
      const res = await fetch(`/api/admin/analytics/sessions?${params}`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
        setSource(data.source || "Direct");
        setAdValues(data.adValues);
        setUserAgent(data.userAgent || null);
      }
    } catch {
      console.error("Failed to fetch session events");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async () => {
    if (!confirm("Delete this session and all its events?")) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/analytics/sessions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      if (res.ok) {
        router.push("/dashboard/sessions");
      }
    } catch {
      console.error("Failed to delete session");
    } finally {
      setDeleting(false);
    }
  };

  const formatDateUTCRaw = (dateString: string) => {
    const d = new Date(dateString);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
  };

  const formatDateUTC = (dateString: string) => `${formatDateUTCRaw(dateString)} UTC`;

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Session" backHref="/dashboard/sessions">
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchEvents}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Session info */}
          <div className="space-y-1">
            <p
              className="text-xs font-mono text-muted-foreground break-all cursor-pointer hover:text-foreground"
              onClick={() => copyToClipboard(sessionId)}
              title="Click to copy"
            >
              {sessionId}
            </p>
            <p className={`text-xs ${source === "Ads" ? "text-blue-500" : "text-muted-foreground"}`}>
              {source === "Ads" ? `Ads: ${adValues || "gclid"}` : "Direct"}
            </p>
            {userAgent && (
              <p className="text-[10px] text-muted-foreground break-all">{userAgent}</p>
            )}
          </div>

          {/* Events list */}
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No events found</p>
          ) : (
            <div className="space-y-1">
              {events.map((event, index) => {
                const prevEvent = index < events.length - 1 ? events[index + 1] : null;
                const timeDiff = prevEvent ? formatTimeDiff(event.createdAt, prevEvent.createdAt) : null;

                return (
                  <div key={event.id}>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[10px] font-mono cursor-pointer w-fit text-muted-foreground hover:text-foreground select-none"
                          onPointerDown={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            copyToClipboard(formatDateUTCRaw(event.createdAt));
                          }}
                          title="Click to copy"
                        >
                          {formatDateUTC(event.createdAt)}
                        </p>
                        <p className="text-sm font-medium mt-0.5">
                          {formatEventName(event.event)}
                        </p>
                      </div>
                    </div>
                    {timeDiff && (
                      <div className="flex justify-center py-1">
                        <span className="text-[10px] text-muted-foreground">+{timeDiff}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Delete button */}
          {events.length > 0 && (
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 className={`h-4 w-4 mr-2 ${deleting ? "animate-pulse" : ""}`} />
              Delete session
            </Button>
          )}
        </div>
      </div>

    </div>
  );
}
