"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
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
  Search,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/routing";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";

const LS_ADMIN_PAGE = "admin_companies_page";
const LS_ADMIN_EMAIL = "admin_companies_email";

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
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const initialPage = useMemo(() => {
    try {
      const raw = localStorage.getItem(LS_ADMIN_PAGE);
      if (raw) return Math.max(0, Number(raw));
    } catch {}
    return 0;
  }, []);

  const initialEmail = useMemo(() => {
    try {
      return localStorage.getItem(LS_ADMIN_EMAIL) || "";
    } catch {}
    return "";
  }, []);

  const [page, setPage] = useState(initialPage);
  const [email, setEmail] = useState(initialEmail);
  const [emailInput, setEmailInput] = useState(initialEmail);

  const saveToStorage = useCallback((p: number, e: string) => {
    try {
      localStorage.setItem(LS_ADMIN_PAGE, String(p));
      localStorage.setItem(LS_ADMIN_EMAIL, e);
    } catch {}
  }, []);

  const fetchCompanies = useCallback(
    async (p: number, e: string, isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(p));
        if (e) params.set("email", e);
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
    saveToStorage(p, email);
    fetchCompanies(p, email);
  };

  const applyEmailFilter = () => {
    const trimmed = emailInput.trim();
    setEmail(trimmed);
    setPage(0);
    saveToStorage(0, trimmed);
    fetchCompanies(0, trimmed);
  };

  const clearEmailFilter = () => {
    setEmailInput("");
    setEmail("");
    setShowSearch(false);
    setPage(0);
    saveToStorage(0, "");
    fetchCompanies(0, "");
  };

  useEffect(() => {
    if (initialEmail) setShowSearch(true);
    fetchCompanies(initialPage, initialEmail);
  }, [fetchCompanies, initialPage, initialEmail]);

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearch]);

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

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Admin">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <MoreVertical className="h-4 w-4" />
              {email && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[60] rounded-2xl bg-background border-border p-0 overflow-hidden">
            <DropdownMenuItem className="px-4 py-2.5 rounded-none" onClick={() => { setPage(0); saveToStorage(0, email); fetchCompanies(0, email, true); }}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-4 py-2.5 rounded-none border-t border-foreground/5"
              onClick={() => {
                setShowSearch(true);
              }}
            >
              <Search className="h-4 w-4" />
              Filter by email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Email search */}
          {showSearch && (
            <div className="flex gap-2">
              <Input
                ref={searchInputRef}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applyEmailFilter();
                  if (e.key === "Escape") {
                    if (emailInput) clearEmailFilter();
                    else setShowSearch(false);
                  }
                }}
                placeholder="Search by email..."
                className="text-sm"
              />
              {email && (
                <Button variant="ghost" size="icon" onClick={clearEmailFilter}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* Companies List */}
          {(loading || refreshing) && companies.length > 0 ? (
            <div className="rounded-2xl border border-border bg-muted/50 flex items-center justify-center" style={{ minHeight: `${companies.length * 58}px` }}>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : companies.length === 0 && !loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {email ? "No companies found" : "No companies yet"}
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
