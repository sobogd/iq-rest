"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  FolderOpen,
  Package,
  MessageSquare,
  Eye,
  Mail,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
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
import { useRouter } from "@/i18n/routing";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";

const LS_ADMIN_PAGE = "admin_companies_page";
const LS_ADMIN_FILTERS = "admin_companies_filters";

interface Filters {
  email: string;
  minViews: boolean;
}

const DEFAULT_FILTERS: Filters = { email: "", minViews: false };

function hasActiveFilters(f: Filters): boolean {
  return f.email !== "" || f.minViews;
}

function readFiltersFromStorage(): Filters {
  try {
    const raw = localStorage.getItem(LS_ADMIN_FILTERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        email: parsed.email || "",
        minViews: parsed.minViews === true,
      };
    }
  } catch {}
  return DEFAULT_FILTERS;
}

interface User {
  id: string;
  email: string;
  createdAt: string;
  role: string;
}

interface Restaurant {
  id: string;
  title: string;
  slug: string | null;
}

interface Company {
  id: string;
  name: string;
  createdAt: string;
  plan: string;
  subscriptionStatus: string;
  reminderSentAt: string | null;
  categoriesCount: number;
  itemsCount: number;
  messagesCount: number;
  monthlyViews: number;
  users: User[];
  restaurants: Restaurant[];
}

export function AdminPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialPage = useMemo(() => {
    try {
      const raw = localStorage.getItem(LS_ADMIN_PAGE);
      if (raw) return Math.max(0, Number(raw));
    } catch {}
    return 0;
  }, []);

  const initialFilters = useMemo<Filters>(() => readFiltersFromStorage(), []);

  const [page, setPage] = useState(initialPage);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<Filters>(initialFilters);

  const saveToStorage = useCallback((p: number, f: Filters) => {
    try {
      localStorage.setItem(LS_ADMIN_PAGE, String(p));
      localStorage.setItem(LS_ADMIN_FILTERS, JSON.stringify(f));
    } catch {}
  }, []);

  const fetchCompanies = useCallback(
    async (p: number, f: Filters, isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(p));
        if (f.email) params.set("email", f.email);
        if (f.minViews) params.set("minViews", "true");
        const res = await fetch(`/api/admin/companies?${params}`);
        if (!res.ok) {
          if (res.status === 403) setError("Access denied");
          else setError("Failed to load data");
          return;
        }
        const data = await res.json();
        setCompanies(data.companies);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setError(null);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  const goToPage = (p: number) => {
    setPage(p);
    saveToStorage(p, filters);
    fetchCompanies(p, filters);
  };

  const applyFilters = () => {
    setFilters(draftFilters);
    setFilterOpen(false);
    setPage(0);
    saveToStorage(0, draftFilters);
    fetchCompanies(0, draftFilters);
  };

  const resetFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setFilterOpen(false);
    setPage(0);
    saveToStorage(0, DEFAULT_FILTERS);
    fetchCompanies(0, DEFAULT_FILTERS);
  };

  useEffect(() => {
    fetchCompanies(initialPage, initialFilters);
  }, [fetchCompanies, initialPage, initialFilters]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading && companies.length === 0) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  const active = hasActiveFilters(filters);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Admin">
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
            <DropdownMenuItem className="px-4 py-2.5 rounded-none" onClick={() => { setPage(0); saveToStorage(0, filters); fetchCompanies(0, filters, true); }}>
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
              <Label htmlFor="filter-email">Email</Label>
              <Input
                id="filter-email"
                placeholder="e.g. user@example.com"
                value={draftFilters.email}
                onChange={(e) => setDraftFilters({ ...draftFilters, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Menu views</Label>
              <div className="flex gap-2">
                {[
                  { value: false, label: "All" },
                  { value: true, label: "20+ views" },
                ].map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => setDraftFilters({ ...draftFilters, minViews: opt.value })}
                    className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                      draftFilters.minViews === opt.value
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

          {/* Companies List */}
          {(loading || refreshing) && companies.length > 0 ? (
            <div className="rounded-2xl border border-border bg-muted/50 flex items-center justify-center" style={{ minHeight: `${companies.length * 58}px` }}>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : companies.length === 0 && !loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {active ? "No companies match filters" : "No companies yet"}
            </p>
          ) : companies.length === 0 ? null : (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {companies.map((company, index) => {
                const restaurant = company.restaurants[0];
                const title = restaurant?.title || "No name";

                return (
                  <button
                    key={company.id}
                    onClick={() =>
                      router.push(
                        `/dashboard/admin/companies/${company.id}`
                      )
                    }
                    className={`flex items-center w-full gap-3 px-4 py-3 text-left hover:bg-muted/80 transition-colors ${
                      index > 0 ? "border-t border-foreground/5" : ""
                    }`}
                    style={{ minHeight: "58px" }}
                  >
                    <div className="flex-1 min-w-0">
                      {/* Line 1: Company name */}
                      <p
                        className={`font-medium truncate ${
                          !restaurant?.title
                            ? "text-muted-foreground italic"
                            : ""
                        }`}
                      >
                        {title}
                      </p>
                      {/* Line 2: Plan + indicators */}
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span
                          className={
                            company.subscriptionStatus === "ACTIVE"
                              ? "text-green-600"
                              : ""
                          }
                        >
                          {company.plan}
                        </span>
                        <span className="text-foreground/10">|</span>
                        <span
                          className="flex items-center gap-0.5"
                          title="Categories"
                        >
                          <FolderOpen className="h-3 w-3" />
                          {company.categoriesCount}
                        </span>
                        <span
                          className="flex items-center gap-0.5"
                          title="Items"
                        >
                          <Package className="h-3 w-3" />
                          {company.itemsCount}
                        </span>
                        {company.monthlyViews > 0 && (
                          <span
                            className={`flex items-center gap-0.5 ${
                              (company.plan === "FREE" &&
                                company.monthlyViews >= 500) ||
                              (company.plan === "BASIC" &&
                                company.monthlyViews >= 2000)
                                ? "text-red-500"
                                : "text-blue-500"
                            }`}
                            title={`Monthly views: ${company.monthlyViews} / ${company.plan === "PRO" ? "\u221e" : company.plan === "BASIC" ? "2000" : "500"}`}
                          >
                            <Eye className="h-3 w-3" />
                            {company.monthlyViews}
                          </span>
                        )}
                        {company.messagesCount > 0 && (
                          <span
                            className="flex items-center gap-0.5 text-red-500 font-medium"
                            title="Messages"
                          >
                            <MessageSquare className="h-3 w-3" />
                            {company.messagesCount}
                          </span>
                        )}
                        {company.reminderSentAt && (
                          <span
                            className="flex items-center gap-0.5 text-green-600"
                            title={`Reminder sent ${formatDate(company.reminderSentAt)}`}
                          >
                            <Mail className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Pagination + Total */}
          {totalPages > 0 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground">
                {page + 1} / {totalPages} &middot; {total} total
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages - 1}
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
