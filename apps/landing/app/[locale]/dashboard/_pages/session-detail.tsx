"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { EVENT_LABELS } from "@/lib/dashboard-events";
import { toast } from "sonner";

interface SessionData {
  id: string;
  companyId: string | null;
  country: string | null;
  city: string | null;
  landingPage: string | null;
  gclid: string | null;
  keyword: string | null;
  userAgent: string | null;
  browser: string | null;
  device: string | null;
  ip: string | null;
  restaurantName: string | null;
  wasRegistered: boolean;
  namedRestaurant: boolean;
  selectedType: boolean;
  modifiedMenu: boolean;
  modifiedContacts: boolean;
  modifiedDesign: boolean;
  reached50Views: boolean;
  paidSubscription: boolean;
  conversionSent: boolean;
  conversionViewsSent: boolean;
  conversionSubscriptionSent: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AnalyticsEvent {
  id: string;
  event: string;
  sessionId: string;
  meta?: Record<string, string> | null;
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

const COUNTRY_TZ: Record<string, string> = {
  US: "America/New_York", CA: "America/Toronto", MX: "America/Mexico_City",
  BR: "America/Sao_Paulo", AR: "America/Buenos_Aires", CO: "America/Bogota",
  CL: "America/Santiago", PE: "America/Lima", VE: "America/Caracas",
  GB: "Europe/London", IE: "Europe/Dublin", IS: "Atlantic/Reykjavik",
  DE: "Europe/Berlin", FR: "Europe/Paris", ES: "Europe/Madrid",
  IT: "Europe/Rome", PT: "Europe/Lisbon", NL: "Europe/Amsterdam",
  BE: "Europe/Brussels", AT: "Europe/Vienna", CH: "Europe/Zurich",
  PL: "Europe/Warsaw", CZ: "Europe/Prague", SK: "Europe/Bratislava",
  HU: "Europe/Budapest", RO: "Europe/Bucharest", BG: "Europe/Sofia",
  HR: "Europe/Zagreb", SI: "Europe/Ljubljana", RS: "Europe/Belgrade",
  UA: "Europe/Kyiv", RU: "Europe/Moscow", BY: "Europe/Minsk",
  SE: "Europe/Stockholm", NO: "Europe/Oslo", DK: "Europe/Copenhagen",
  FI: "Europe/Helsinki", EE: "Europe/Tallinn", LV: "Europe/Riga",
  LT: "Europe/Vilnius", GR: "Europe/Athens", TR: "Europe/Istanbul",
  GE: "Asia/Tbilisi", AM: "Asia/Yerevan", AZ: "Asia/Baku",
  KZ: "Asia/Almaty", UZ: "Asia/Tashkent",
  IL: "Asia/Jerusalem", SA: "Asia/Riyadh", AE: "Asia/Dubai",
  IR: "Asia/Tehran", IQ: "Asia/Baghdad", JO: "Asia/Amman",
  IN: "Asia/Kolkata", PK: "Asia/Karachi", BD: "Asia/Dhaka",
  JP: "Asia/Tokyo", KR: "Asia/Seoul", CN: "Asia/Shanghai",
  TW: "Asia/Taipei", HK: "Asia/Hong_Kong", SG: "Asia/Singapore",
  MY: "Asia/Kuala_Lumpur", TH: "Asia/Bangkok", VN: "Asia/Ho_Chi_Minh",
  ID: "Asia/Jakarta", PH: "Asia/Manila",
  AU: "Australia/Sydney", NZ: "Pacific/Auckland",
  EG: "Africa/Cairo", ZA: "Africa/Johannesburg", NG: "Africa/Lagos",
  KE: "Africa/Nairobi", MA: "Africa/Casablanca",
};

function formatTime(dateString: string, tz?: string) {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...(tz && { timeZone: tz }),
  });
}

function formatDateFull(dateString: string) {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

function groupEventsByGap(events: AnalyticsEvent[]): AnalyticsEvent[][] {
  const sorted = [...events].reverse();
  const groups: AnalyticsEvent[][] = [];
  let current: AnalyticsEvent[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      current.push(sorted[i]);
      continue;
    }
    const gap = new Date(sorted[i - 1].createdAt).getTime() - new Date(sorted[i].createdAt).getTime();
    if (gap > TWO_HOURS_MS) {
      groups.push(current);
      current = [];
    }
    current.push(sorted[i]);
  }
  if (current.length > 0) groups.push(current);
  return groups;
}

const FLAG_LABELS: Record<string, string> = {
  wasRegistered: "Registered",
  namedRestaurant: "Named restaurant",
  selectedType: "Selected type",
  modifiedMenu: "Modified menu",
  modifiedContacts: "Modified contacts",
  modifiedDesign: "Modified design",
  reached50Views: "Reached 20 views",
  paidSubscription: "Paid subscription",
  conversionSent: "Conv: type selected",
  conversionViewsSent: "Conv: 20 views",
  conversionSubscriptionSent: "Conv: subscription",
};

export function SessionDetailPage({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const backHref = searchParams.get("back") || "/dashboard/sessions";
  const [session, setSession] = useState<SessionData | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [sendingConversion, setSendingConversion] = useState<string | null>(null);

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
        router.push(backHref);
      }
    } catch {
      console.error("Failed to delete session");
    } finally {
      setDeleting(false);
    }
  };

  const handleSendConversion = async (eventType: string) => {
    if (!session?.gclid) return;
    setSendingConversion(eventType);
    try {
      const res = await fetch("/api/admin/analytics/send-conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gclid: session.gclid,
          conversionDateTime: new Date().toISOString(),
          eventType,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Conversion "${eventType}" sent`);
        fetchData();
      } else {
        toast.error(data.error || "Failed to send conversion");
      }
    } catch {
      toast.error("Failed to send conversion");
    } finally {
      setSendingConversion(null);
    }
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied");
  };

  if (loading) {
    return <PageLoader />;
  }

  // Session info rows
  const countryTz = session?.country ? COUNTRY_TZ[session.country] : undefined;
  const infoRows: { label: string; value: string; subValue?: string; copyable?: boolean; onClick?: () => void }[] = [];
  if (session) {
    if (session.country) infoRows.push({ label: "Country", value: `${countryToFlag(session.country)} ${session.country}${session.city ? `, ${session.city}` : ""}` });
    if (session.landingPage) infoRows.push({ label: "Landing", value: session.landingPage });
    if (session.ip) infoRows.push({ label: "IP", value: session.ip, copyable: true });
    if (session.browser) infoRows.push({ label: "Browser", value: session.browser });
    if (session.device) infoRows.push({ label: "Device", value: session.device });
    infoRows.push({ label: "Source", value: session.gclid ? "Google Ads" : "Direct" });
    if (session.gclid) infoRows.push({ label: "GCLID", value: session.gclid, copyable: true });
    if (session.keyword) infoRows.push({ label: "Keyword", value: session.keyword, copyable: true });
    if (session.restaurantName) infoRows.push({
      label: "Restaurant",
      value: session.restaurantName,
      onClick: () => {
        const isFromCompany = backHref.startsWith("/dashboard/admin/companies/");
        if (isFromCompany) {
          // Came from company (which came from company list) → extract company list URL
          const qIndex = backHref.indexOf("?");
          const nestedParams = qIndex >= 0 ? new URLSearchParams(backHref.slice(qIndex + 1)) : null;
          const companyListUrl = nestedParams?.get("back") || "/dashboard/admin";
          router.push(`/dashboard/admin/companies/${session.companyId}?back=${encodeURIComponent(companyListUrl)}`);
        } else {
          // Came from sessions list → company back should return to this session
          const currentUrl = `/dashboard/sessions/${sessionId}${backHref !== "/dashboard/sessions" ? `?back=${encodeURIComponent(backHref)}` : ""}`;
          router.push(`/dashboard/admin/companies/${session.companyId}?back=${encodeURIComponent(currentUrl)}`);
        }
      },
    });
    infoRows.push({
      label: "Created",
      value: formatDateFull(session.createdAt),
      subValue: countryTz ? formatTime(session.createdAt, countryTz) : undefined,
    });
    infoRows.push({
      label: "Updated",
      value: formatDateFull(session.updatedAt),
      subValue: countryTz ? formatTime(session.updatedAt, countryTz) : undefined,
    });
  }

  // Active flags
  const activeFlags = session
    ? Object.entries(FLAG_LABELS).filter(([key]) => session[key as keyof SessionData] === true)
    : [];

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Session" backHref={backHref}>
        <Button variant="ghost" size="icon" onClick={fetchData}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Session info card */}
          {session && (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {infoRows.map((row, i) => (
                <button
                  key={row.label}
                  type="button"
                  disabled={!row.copyable && !row.onClick}
                  onClick={() => {
                    if (row.copyable) handleCopy(row.value);
                    else if (row.onClick) row.onClick();
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2.5 text-left ${
                    i > 0 ? "border-t border-foreground/5" : ""
                  } ${row.copyable || row.onClick ? "hover:bg-muted/30 active:bg-muted/50 transition-colors" : ""}`}
                >
                  <span className="text-xs text-muted-foreground">{row.label}</span>
                  <span className={`text-xs font-mono text-right break-all max-w-[60%] ${
                    row.onClick ? "text-blue-500" : ""
                  }`}>
                    {row.value}
                    {row.subValue && (
                      <span className="block text-muted-foreground">{row.subValue} {session?.country && countryToFlag(session.country)}</span>
                    )}
                  </span>
                </button>
              ))}

              {/* Conversion flags */}
              {activeFlags.length > 0 && (
                <div className="border-t border-foreground/5 px-4 py-2.5">
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

          {/* Manual conversion buttons */}
          {session?.gclid && (
            <div className="space-y-2">
              {!session.conversionSent && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => handleSendConversion("type_selected")}
                  disabled={sendingConversion !== null}
                >
                  <Send className="h-4 w-4" />
                  {sendingConversion === "type_selected" ? "Sending..." : "Send conversion: type selected"}
                </Button>
              )}
              {!session.conversionViewsSent && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => handleSendConversion("views_reached")}
                  disabled={sendingConversion !== null}
                >
                  <Send className="h-4 w-4" />
                  {sendingConversion === "views_reached" ? "Sending..." : "Send conversion: 20 views"}
                </Button>
              )}
              {!session.conversionSubscriptionSent && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => handleSendConversion("subscription")}
                  disabled={sendingConversion !== null}
                >
                  <Send className="h-4 w-4" />
                  {sendingConversion === "subscription" ? "Sending..." : "Send conversion: subscription"}
                </Button>
              )}
            </div>
          )}

          {/* Events list */}
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No events found</p>
          ) : (
            <div className="space-y-3">
              {groupEventsByGap(events).map((group, gi) => (
                <div key={gi} className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
                  {group.map((event, index) => {
                    const nextEvent = index < group.length - 1 ? group[index + 1] : null;
                    const timeDiff = nextEvent ? formatTimeDiff(nextEvent.createdAt, event.createdAt) : null;

                    return (
                      <div
                        key={event.id}
                        className={`px-4 py-2.5 ${
                          index > 0 ? "border-t border-foreground/5" : ""
                        }`}
                      >
                        <p className="text-sm truncate">
                          {formatEventName(event.event)}
                          {event.meta && (
                            <span className="text-muted-foreground ml-1">
                              ({Object.values(event.meta as Record<string, string>).join(" / ")})
                            </span>
                          )}
                        </p>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-[10px] text-muted-foreground">
                            {formatTime(event.createdAt)}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {timeDiff ? `+${timeDiff}` : ""}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Delete button */}
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete session"}
          </Button>
        </div>
      </div>
    </div>
  );
}
