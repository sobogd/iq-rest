"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { EVENT_LABELS } from "@/lib/dashboard-events";

interface SessionData {
  id: string;
  country: string | null;
  gclid: string | null;
  keyword: string | null;
  userAgent: string | null;
  browser: string | null;
  device: string | null;
  ip: string | null;
  userId: string | null;
  companyId: string | null;
  wasRegistered: boolean;
  namedRestaurant: boolean;
  selectedType: boolean;
  modifiedMenu: boolean;
  modifiedContacts: boolean;
  modifiedDesign: boolean;
  reached50Views: boolean;
  paidSubscription: boolean;
  conversionSent: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AnalyticsEvent {
  id: string;
  event: string;
  sessionId: string;
  createdAt: string;
}

function formatTimeDiff(date1: string, date2: string): string {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime()) / 1000;
  if (diff < 1) return "0s";
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

function countryToFlag(countryCode: string): string {
  const code = countryCode.toUpperCase();
  if (code.length !== 2) return "";
  const offset = 0x1f1e6 - 65;
  return String.fromCodePoint(
    code.charCodeAt(0) + offset,
    code.charCodeAt(1) + offset
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const FLAG_LABELS: Record<string, string> = {
  wasRegistered: "Registered",
  namedRestaurant: "Named restaurant",
  selectedType: "Selected type",
  modifiedMenu: "Modified menu",
  modifiedContacts: "Modified contacts",
  modifiedDesign: "Modified design",
  reached50Views: "Reached 50 views",
  paidSubscription: "Paid subscription",
  conversionSent: "Conversion sent",
};

export function SessionDetailPage({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sessionId });
      const res = await fetch(`/api/admin/analytics/sessions?${params}`);
      if (res.ok) {
        const data = await res.json();
        setSession(data.session || null);
        setEvents(data.events || []);
      }
    } catch {
      console.error("Failed to fetch session");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  if (loading) {
    return <PageLoader />;
  }

  // Session info rows
  const infoRows: { label: string; value: string }[] = [];
  if (session) {
    if (session.country) infoRows.push({ label: "Country", value: `${countryToFlag(session.country)} ${session.country}` });
    if (session.ip) infoRows.push({ label: "IP", value: session.ip });
    if (session.browser) infoRows.push({ label: "Browser", value: session.browser });
    if (session.device) infoRows.push({ label: "Device", value: session.device });
    infoRows.push({ label: "Source", value: session.gclid ? "Google Ads" : "Direct" });
    if (session.gclid) infoRows.push({ label: "GCLID", value: session.gclid });
    if (session.keyword) infoRows.push({ label: "Keyword", value: session.keyword });
    if (session.userId) infoRows.push({ label: "User ID", value: session.userId });
    if (session.companyId) infoRows.push({ label: "Company ID", value: session.companyId });
    infoRows.push({ label: "Created", value: formatDate(session.createdAt) });
    infoRows.push({ label: "Updated", value: formatDate(session.updatedAt) });
  }

  // Active flags
  const activeFlags = session
    ? Object.entries(FLAG_LABELS).filter(([key]) => session[key as keyof SessionData] === true)
    : [];

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Session" backHref="/dashboard/sessions">
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchData}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Session info card */}
          {session && (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {infoRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-4 py-2.5 ${
                    i > 0 ? "border-t border-foreground/5" : ""
                  }`}
                >
                  <span className="text-xs text-muted-foreground">{row.label}</span>
                  <span className="text-xs font-mono text-right break-all max-w-[60%]">{row.value}</span>
                </div>
              ))}

              {/* Conversion flags */}
              {activeFlags.length > 0 && (
                <div className="border-t border-foreground/5 px-4 py-2.5">
                  <p className="text-xs text-muted-foreground mb-1.5">Flags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeFlags.map(([, label]) => (
                      <span
                        key={label}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* UA */}
              {session.userAgent && (
                <div className="border-t border-foreground/5 px-4 py-2.5">
                  <p className="text-[10px] text-muted-foreground break-all">{session.userAgent}</p>
                </div>
              )}
            </div>
          )}

          {/* Events list */}
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No events found</p>
          ) : (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {events.map((event, index) => {
                const prevEvent = index > 0 ? events[index - 1] : null;
                const timeDiff = prevEvent ? formatTimeDiff(prevEvent.createdAt, event.createdAt) : null;

                return (
                  <div
                    key={event.id}
                    className={`flex items-center gap-3 px-4 py-2.5 ${
                      index > 0 ? "border-t border-foreground/5" : ""
                    }`}
                  >
                    {/* Time diff badge */}
                    <span className="text-[10px] font-mono text-muted-foreground w-16 shrink-0 text-right">
                      {timeDiff ? `+${timeDiff}` : "start"}
                    </span>

                    {/* Event name */}
                    <span className="text-sm flex-1 min-w-0 truncate">
                      {formatEventName(event.event)}
                    </span>

                    {/* Time */}
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {new Date(event.createdAt).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Delete button */}
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDelete}
            disabled={deleting}
          >
            <Trash2 className={`h-4 w-4 mr-2 ${deleting ? "animate-pulse" : ""}`} />
            Delete session
          </Button>
        </div>
      </div>
    </div>
  );
}
