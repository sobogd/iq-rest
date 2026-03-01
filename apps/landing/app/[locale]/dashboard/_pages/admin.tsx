"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Loader2, RefreshCw, FolderOpen, Package, Eye, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { DashboardContent } from "../_ui/dashboard-content";

interface Company {
  id: string;
  name: string | null;
  plan: string;
  subscriptionStatus: string;
  categoriesCount: number;
  itemsCount: number;
  messagesCount: number;
  monthlyViews: number;
  todayViews: number;
  scanLimit: number | null;
  emailsSent: Record<string, string> | null;
}

type Filter = "all" | "today_active";

const FILTERS: Filter[] = ["all", "today_active"];

const TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "today_active", label: "Today Active" },
];

function buildUrl(filter: Filter): string {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("filter", filter);
  const qs = params.toString();
  return `/dashboard/admin${qs ? `?${qs}` : ""}`;
}

export function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterParam = searchParams.get("filter") as Filter | null;
  const filter: Filter = filterParam && FILTERS.includes(filterParam) ? filterParam : "all";
  const scrollParam = searchParams.get("scroll");
  const scrollRef = useRef<HTMLDivElement>(null);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchCompanies = useCallback(async (f: Filter) => {
    setLoading(true);
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const params = new URLSearchParams({ filter: f, tz });
      const res = await fetch(`/api/admin/companies?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setCompanies(data.companies);
      setTotal(data.total);
    } catch {
      console.error("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies(filter);
  }, [filter, refreshKey, fetchCompanies]);

  useEffect(() => {
    if (!loading && scrollParam && scrollRef.current) {
      scrollRef.current.scrollTop = Number(scrollParam);
    }
  }, [loading, scrollParam]);

  if (loading && companies.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Companies" backHref="/dashboard">
        <Button variant="ghost" size="icon" onClick={() => {
          const scroll = Math.round(scrollRef.current?.scrollTop || 0);
          const params = new URLSearchParams();
          if (filter !== "all") params.set("filter", filter);
          if (scroll > 0) params.set("scroll", String(scroll));
          const url = "/dashboard/admin" + (params.toString() ? `?${params}` : "");
          router.replace(url);
          setRefreshKey((k) => k + 1);
        }}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </PageHeader>
      <div ref={scrollRef} className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-4">
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

          {/* Total count */}
          {!loading && (
            <p className="text-xs text-muted-foreground text-center">{total} companies</p>
          )}

          {/* List */}
          {loading && companies.length > 0 ? (
            <div className="rounded-md border border-border bg-muted/50 flex items-center justify-center" style={{ minHeight: "200px" }}>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : companies.length === 0 && !loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">No companies</p>
          ) : (
            <div className="rounded-md border border-border bg-muted/50 overflow-hidden">
              {companies.map((company, index) => {
                const nameColor =
                  company.subscriptionStatus === "ACTIVE" && company.plan === "PRO"
                    ? "text-success"
                    : company.subscriptionStatus === "ACTIVE" && company.plan === "BASIC"
                      ? "text-blue-500"
                      : "";

                return (
                  <button
                    key={company.id}
                    onClick={() => {
                      const scroll = scrollRef.current?.scrollTop || 0;
                      const params = new URLSearchParams();
                      if (filter !== "all") params.set("filter", filter);
                      if (scroll > 0) params.set("scroll", String(Math.round(scroll)));
                      const backUrl = "/dashboard/admin" + (params.toString() ? `?${params}` : "");
                      router.push(`/dashboard/admin/companies/${company.id}?back=${encodeURIComponent(backUrl)}`);
                    }}
                    className={`flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-muted/30 transition-colors text-left ${
                      index > 0 ? "border-t border-foreground/5" : ""
                    }`}
                  >
                    <span className={`text-sm truncate flex-1 min-w-0 ${nameColor || (company.name ? "" : "text-muted-foreground italic")}`}>
                      {company.name || "No name"}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                      <span className="flex items-center gap-0.5"><FolderOpen className="h-3 w-3" />{company.categoriesCount}</span>
                      <span className="flex items-center gap-0.5"><Package className="h-3 w-3" />{company.itemsCount}</span>
                      {company.monthlyViews > 0 && (
                        <span className={`flex items-center gap-0.5 ${
                          company.scanLimit && company.monthlyViews >= company.scanLimit ? "text-red-500" : "text-blue-500"
                        }`}>
                          <Eye className="h-3 w-3" />{company.monthlyViews}{company.todayViews > 0 && <span className="text-muted-foreground">({company.todayViews})</span>}
                        </span>
                      )}
                      {company.messagesCount > 0 && (
                        <span className="flex items-center gap-0.5 text-red-500 font-medium">
                          <MessageSquare className="h-3 w-3" />{company.messagesCount}
                        </span>
                      )}
                      {company.emailsSent && Object.keys(company.emailsSent).length > 0 && (
                        <span className="flex items-center gap-0.5 text-success">
                          <Mail className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </DashboardContent>
      </div>
    </div>
  );
}
