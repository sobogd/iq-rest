"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
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
}

type Filter = "all" | "active" | "inactive";

const TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("page") !== null
    ? Math.max(0, Number(searchParams.get("page")))
    : null; // null = last page (default)

  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  const fetchCompanies = useCallback(async (p: number | null, f: Filter) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ filter: f });
      if (p !== null) params.set("page", String(p));
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
    fetchCompanies(currentPage, filter);
  }, [currentPage, filter, fetchCompanies]);

  const goToPage = (p: number) => {
    router.push(`/dashboard/admin?page=${p}${filter !== "all" ? `&filter=${filter}` : ""}`);
  };

  const handleFilter = (f: Filter) => {
    setFilter(f);
    router.push(`/dashboard/admin${f !== "all" ? `?filter=${f}` : ""}`);
  };

  if (loading && companies.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Companies" backHref="/dashboard" />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Filter tabs */}
          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleFilter(tab.value)}
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
                    className={`flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-muted/30 transition-colors text-left ${
                      index > 0 ? "border-t border-foreground/5" : ""
                    }`}
                  >
                    <span className={`text-sm truncate flex-1 ${nameColor || (company.name ? "" : "text-muted-foreground italic")}`}>
                      {company.name || "No name"}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {company.plan}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 0 && (
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
