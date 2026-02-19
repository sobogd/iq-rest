"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Trash2,
  MoreVertical,
  SlidersHorizontal,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

interface Session {
  sessionId: string;
  firstEvent: string;
  duration: number;
  eventCount: number;
  source: string;
  adValues: string | null;
}

interface Filters {
  country: string;
  keyword: string;
  bot: "all" | "true" | "false";
  ads: "all" | "true" | "false";
  device: string;
  browser: string;
}

const DEFAULT_FILTERS: Filters = { country: "", keyword: "", bot: "all", ads: "all", device: "", browser: "" };

function hasActiveFilters(filters: Filters): boolean {
  return filters.country !== "" || filters.keyword !== "" || filters.bot !== "all" || filters.ads !== "all" || filters.device !== "" || filters.browser !== "";
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

type FilterOption = { value: string; label: string };

const BOT_OPTIONS: FilterOption[] = [
  { value: "all", label: "All" },
  { value: "false", label: "Not bots" },
  { value: "true", label: "Bots only" },
];

const ADS_OPTIONS: FilterOption[] = [
  { value: "all", label: "All" },
  { value: "true", label: "Google Ads" },
  { value: "false", label: "Direct only" },
];

const LS_SESSIONS_FILTERS = "admin_sessions_filters";
const LS_SESSIONS_PAGE = "admin_sessions_page";

function readFiltersFromStorage(): Filters {
  try {
    const raw = localStorage.getItem(LS_SESSIONS_FILTERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        country: parsed.country || "",
        keyword: parsed.keyword || "",
        bot: (["all", "true", "false"].includes(parsed.bot) ? parsed.bot : "all") as Filters["bot"],
        ads: (["all", "true", "false"].includes(parsed.ads) ? parsed.ads : "all") as Filters["ads"],
        device: parsed.device || "",
        browser: parsed.browser || "",
      };
    }
  } catch {}
  return DEFAULT_FILTERS;
}

function readPageFromStorage(): number {
  try {
    const raw = localStorage.getItem(LS_SESSIONS_PAGE);
    if (raw) return Math.max(0, Number(raw));
  } catch {}
  return 0;
}

export function SessionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // If coming from analytics page, use URL params as filters (don't persist to localStorage)
  const fromAnalytics = searchParams.get("from") === "analytics";

  const initialFilters = useMemo<Filters>(() => {
    if (fromAnalytics) {
      const f: Filters = { ...DEFAULT_FILTERS };
      const country = searchParams.get("country");
      const device = searchParams.get("device");
      const browser = searchParams.get("browser");
      if (country) f.country = country;
      if (device) f.device = device;
      if (browser) f.browser = browser;
      return f;
    }
    return readFiltersFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialPage = useMemo(() => fromAnalytics ? 0 : readPageFromStorage(), [fromAnalytics]);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<Filters>(initialFilters);

  const saveToStorage = useCallback((p: number, f: Filters) => {
    if (fromAnalytics) return;
    try {
      localStorage.setItem(LS_SESSIONS_PAGE, String(p));
      localStorage.setItem(LS_SESSIONS_FILTERS, JSON.stringify(f));
    } catch {}
  }, [fromAnalytics]);

  const fetchSessions = useCallback(async (p: number, f: Filters) => {
    setLoading(true);
    try {
      const apiParams = new URLSearchParams({ page: String(p) });
      if (f.country) apiParams.set("country", f.country.toUpperCase());
      if (f.keyword) apiParams.set("keyword", f.keyword);
      if (f.bot !== "all") apiParams.set("bot", f.bot);
      if (f.ads !== "all") apiParams.set("ads", f.ads);
      if (f.device) apiParams.set("device", f.device);
      if (f.browser) apiParams.set("browser", f.browser);
      const res = await fetch(`/api/admin/analytics/sessions-list?${apiParams}`);
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
    fetchSessions(initialPage, initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        fetchSessions(page, filters);
      }
    } catch {
      console.error("Failed to delete session");
    } finally {
      setDeleting(null);
    }
  };

  const applyFilters = () => {
    setFilters(draftFilters);
    setFilterOpen(false);
    fetchSessions(0, draftFilters);
    saveToStorage(0, draftFilters);
  };

  const resetFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setFilterOpen(false);
    fetchSessions(0, DEFAULT_FILTERS);
    saveToStorage(0, DEFAULT_FILTERS);
  };

  const goToPage = (p: number) => {
    fetchSessions(p, filters);
    saveToStorage(p, filters);
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

  const active = hasActiveFilters(filters);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Sessions" backHref={fromAnalytics ? "/dashboard/admin/analytics" : "/dashboard"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <MoreVertical className="h-4 w-4" />
              {active && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[60] rounded-2xl bg-background border-border p-0 overflow-hidden">
            <DropdownMenuItem className="px-4 py-2.5 rounded-none" onClick={() => { fetchSessions(0, filters); saveToStorage(0, filters); }}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-4 py-2.5 rounded-none border-t border-foreground/5"
              onClick={() => { setFilterOpen(true); setDraftFilters(filters); }}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageHeader>
      <Dialog open={filterOpen} onOpenChange={(open) => { setFilterOpen(open); if (open) setDraftFilters(filters); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="filter-country">Country code</Label>
              <Input
                id="filter-country"
                placeholder="e.g. US, DE, ES"
                value={draftFilters.country}
                onChange={(e) => setDraftFilters({ ...draftFilters, country: e.target.value })}
                maxLength={2}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="filter-keyword">Keyword</Label>
              <Input
                id="filter-keyword"
                placeholder="e.g. qr menu"
                value={draftFilters.keyword}
                onChange={(e) => setDraftFilters({ ...draftFilters, keyword: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="filter-device">Device</Label>
              <Input
                id="filter-device"
                placeholder="e.g. mobile, desktop"
                value={draftFilters.device}
                onChange={(e) => setDraftFilters({ ...draftFilters, device: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="filter-browser">Browser</Label>
              <Input
                id="filter-browser"
                placeholder="e.g. Chrome, Safari"
                value={draftFilters.browser}
                onChange={(e) => setDraftFilters({ ...draftFilters, browser: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Bots</Label>
              <div className="flex gap-2">
                {BOT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setDraftFilters({ ...draftFilters, bot: opt.value as Filters["bot"] })}
                    className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                      draftFilters.bot === opt.value
                        ? "border-primary bg-primary/10 font-medium"
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Source</Label>
              <div className="flex gap-2">
                {ADS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setDraftFilters({ ...draftFilters, ads: opt.value as Filters["ads"] })}
                    className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                      draftFilters.ads === opt.value
                        ? "border-primary bg-primary/10 font-medium"
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={resetFilters}>
                <X className="h-4 w-4" />
                Reset
              </Button>
              <Button className="flex-1" onClick={applyFilters}>
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {loading && sessions.length > 0 ? (
            <div className="rounded-2xl border border-border bg-muted/50 flex items-center justify-center" style={{ minHeight: `${sessions.length * 60}px` }}>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 && !loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {active ? "No sessions match filters" : "No sessions yet"}
            </p>
          ) : sessions.length === 0 ? null : (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {sessions.map((session, index) => (
                <div
                  key={session.sessionId}
                  className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-muted/30 transition-colors ${
                    index > 0 ? "border-t border-foreground/5" : ""
                  }`}
                >
                  {/* Info — clickable area */}
                  <button
                    onClick={() => router.push(`/dashboard/sessions/${session.sessionId}`)}
                    className="flex-1 min-w-0 text-left"
                  >
                    {/* Line 1: Date/time + duration · events */}
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-medium">
                        {formatDate(session.firstEvent)}
                      </p>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">
                        {formatDuration(session.duration)} · {session.eventCount} ev.
                      </span>
                    </div>

                    {/* Line 2: Source */}
                    <p className={`text-xs mt-0.5 ${session.source === "Ads" ? "text-blue-500" : "text-muted-foreground"}`}>
                      {session.source === "Ads"
                        ? `Ads${session.adValues ? `: ${session.adValues}` : ""}`
                        : "Direct"}
                    </p>
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
                onClick={() => goToPage(page - 1)}
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
                onClick={() => goToPage(page + 1)}
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
