"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2, RefreshCw, FolderOpen, Package, Eye, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";

interface Company {
  id: string;
  name: string | null;
  plan: string;
  subscriptionStatus: string;
  categoriesCount: number;
  itemsCount: number;
  messagesCount: number;
  monthlyViews: number;
  emailsSent: Record<string, string> | null;
}

type Filter = "all" | "active" | "inactive";

const FILTERS: Filter[] = ["all", "active", "inactive"];

const TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

function buildUrl(filter: Filter, page?: number): string {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("filter", filter);
  if (page) params.set("page", String(page));
  const qs = params.toString();
  return `/dashboard/admin${qs ? `?${qs}` : ""}`;
}

export function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterParam = searchParams.get("filter") as Filter | null;
  const filter: Filter = filterParam && FILTERS.includes(filterParam) ? filterParam : "all";
  const currentPage = Math.max(0, Number(searchParams.get("page") || 0));

  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchCompanies = useCallback(async (f: Filter, pg: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ filter: f, page: String(pg) });
      const res = await fetch(`/api/admin/companies?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setCompanies(data.companies);
      setTotal(data.total);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch {
      console.error("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies(filter, currentPage);
  }, [filter, currentPage, refreshKey, fetchCompanies]);

  if (loading && companies.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Companies" backHref="/dashboard">
        <Button variant="ghost" size="icon" onClick={() => setRefreshKey((k) => k + 1)}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Filter tabs */}
          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => router.push(buildUrl(tab.value))}
                className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                  filter === tab.value
                    ? "border-primary bg-primary/10 font-medium"
                    : "border-border hover:bg-muted/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List */}
          {loading && companies.length > 0 ? (
            <div className="rounded-2xl border border-border bg-muted/50 flex items-center justify-center" style={{ minHeight: "200px" }}>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : companies.length === 0 && !loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">No companies</p>
          ) : (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {companies.map((company, index) => {
                const nameColor =
                  company.subscriptionStatus === "ACTIVE" && company.plan === "PRO"
                    ? "text-green-500"
                    : company.subscriptionStatus === "ACTIVE" && company.plan === "BASIC"
                      ? "text-blue-500"
                      : "";

                return (
                  <button
                    key={company.id}
                    onClick={() => router.push(`/dashboard/admin/companies/${company.id}`)}
                    className={`flex flex-col gap-1 w-full px-4 py-2.5 hover:bg-muted/30 transition-colors text-left ${
                      index > 0 ? "border-t border-foreground/5" : ""
                    }`}
                  >
                    <span className={`text-sm truncate w-full ${nameColor || (company.name ? "" : "text-muted-foreground italic")}`}>
                      {company.name || "No name"}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5"><FolderOpen className="h-3 w-3" />{company.categoriesCount}</span>
                      <span className="flex items-center gap-0.5"><Package className="h-3 w-3" />{company.itemsCount}</span>
                      {company.monthlyViews > 0 && (
                        <span className={`flex items-center gap-0.5 ${
                          company.plan === "FREE" && company.monthlyViews >= 400 ? "text-red-500" : "text-blue-500"
                        }`}>
                          <Eye className="h-3 w-3" />{company.monthlyViews}
                        </span>
                      )}
                      {company.messagesCount > 0 && (
                        <span className="flex items-center gap-0.5 text-red-500 font-medium">
                          <MessageSquare className="h-3 w-3" />{company.messagesCount}
                        </span>
                      )}
                      {company.emailsSent && Object.keys(company.emailsSent).length > 0 && (
                        <span className="flex items-center gap-0.5 text-green-600">
                          <Mail className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(buildUrl(filter, page - 1))}
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
                onClick={() => router.push(buildUrl(filter, page + 1))}
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
