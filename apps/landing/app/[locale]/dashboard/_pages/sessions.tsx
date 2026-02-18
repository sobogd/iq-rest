"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Trash2,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  hasUser: boolean;
  country: string | null;
  source: string;
  adValues: string | null;
  sessionType: string | null;
  restaurantName: string | null;
  ip: string | null;
  isBot: boolean;
}

interface Filters {
  country: string;
  keyword: string;
  bot: "all" | "true" | "false";
  ads: "all" | "true" | "false";
}

const DEFAULT_FILTERS: Filters = { country: "", keyword: "", bot: "all", ads: "all" };

function hasActiveFilters(filters: Filters): boolean {
  return filters.country !== "" || filters.keyword !== "" || filters.bot !== "all" || filters.ads !== "all";
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

function filtersToParams(p: number, f: Filters): URLSearchParams {
  const params = new URLSearchParams();
  if (p > 0) params.set("page", String(p));
  if (f.country) params.set("country", f.country.toUpperCase());
  if (f.keyword) params.set("keyword", f.keyword);
  if (f.bot !== "all") params.set("bot", f.bot);
  if (f.ads !== "all") params.set("ads", f.ads);
  return params;
}

export function SessionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial state from URL
  const initialFilters = useMemo<Filters>(() => ({
    country: searchParams.get("country") || "",
    keyword: searchParams.get("keyword") || "",
    bot: (searchParams.get("bot") as Filters["bot"]) || "all",
    ads: (searchParams.get("ads") as Filters["ads"]) || "all",
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  const initialPage = useMemo(() => {
    return Math.max(0, Number(searchParams.get("page") || 0));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<Filters>(initialFilters);

  const updateUrl = useCallback((p: number, f: Filters) => {
    const params = filtersToParams(p, f);
    const qs = params.toString();
    const url = qs ? `/dashboard/sessions?${qs}` : "/dashboard/sessions";
    router.replace(url, { scroll: false });
  }, [router]);

  const fetchSessions = useCallback(async (p: number, f: Filters) => {
    setLoading(true);
    try {
      const apiParams = new URLSearchParams({ page: String(p) });
      if (f.country) apiParams.set("country", f.country.toUpperCase());
      if (f.keyword) apiParams.set("keyword", f.keyword);
      if (f.bot !== "all") apiParams.set("bot", f.bot);
      if (f.ads !== "all") apiParams.set("ads", f.ads);
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
    updateUrl(0, draftFilters);
  };

  const resetFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setFilterOpen(false);
    fetchSessions(0, DEFAULT_FILTERS);
    updateUrl(0, DEFAULT_FILTERS);
  };

  const goToPage = (p: number) => {
    fetchSessions(p, filters);
    updateUrl(p, filters);
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
      <PageHeader title="Sessions" backHref="/dashboard">
        <Dialog open={filterOpen} onOpenChange={(open) => { setFilterOpen(open); if (open) setDraftFilters(filters); }}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <SlidersHorizontal className="h-4 w-4" />
              {active && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              )}
            </Button>
          </DialogTrigger>
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
        <Button
          variant="ghost"
          size="icon"
          onClick={() => goToPage(page)}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {active ? "No sessions match filters" : "No sessions yet"}
            </p>
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
                          <span className="invisible">-</span>
                        )}
                      </p>

                      {/* Line 4: Restaurant name */}
                      <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                        {session.restaurantName || <span className="invisible">-</span>}
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
