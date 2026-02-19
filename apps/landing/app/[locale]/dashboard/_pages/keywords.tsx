"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";

interface KeywordRow {
  keyword: string;
  count: number;
}

type Period = "today" | "yesterday" | "7days";
type CompanyFilter = "all" | "true" | "false";

const PERIOD_TABS: { value: Period; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "7days", label: "7 days" },
];

const COMPANY_TABS: { value: CompanyFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "true", label: "With company" },
  { value: "false", label: "No company" },
];

export function KeywordsPage() {
  const [keywords, setKeywords] = useState<KeywordRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("today");
  const [company, setCompany] = useState<CompanyFilter>("all");

  const fetchKeywords = useCallback(async (p: Period, c: CompanyFilter) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ period: p });
      if (c !== "all") params.set("company", c);
      const res = await fetch(`/api/admin/analytics/keywords?${params}`);
      if (res.ok) {
        const json = await res.json();
        setKeywords(json.keywords || []);
      }
    } catch (err) {
      console.error("Failed to fetch keywords:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKeywords(period, company);
  }, [period, company, fetchKeywords]);

  if (loading && keywords.length === 0) {
    return <PageLoader />;
  }

  const total = keywords.reduce((s, k) => s + k.count, 0);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Keywords" historyBack />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Period tabs */}
          <div className="flex gap-2">
            {PERIOD_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setPeriod(tab.value)}
                className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                  period === tab.value
                    ? "border-primary bg-primary/10 font-medium"
                    : "border-border hover:bg-muted/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Company filter tabs */}
          <div className="flex gap-2">
            {COMPANY_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setCompany(tab.value)}
                className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                  company === tab.value
                    ? "border-primary bg-primary/10 font-medium"
                    : "border-border hover:bg-muted/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List */}
          {loading && keywords.length > 0 ? (
            <div className="rounded-2xl border border-border bg-muted/50 flex items-center justify-center" style={{ minHeight: "200px" }}>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : keywords.length === 0 && !loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">No keywords found</p>
          ) : (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {keywords.map((row, index) => (
                <div
                  key={row.keyword}
                  className={`flex items-center gap-3 px-4 py-2.5 ${
                    index > 0 ? "border-t border-foreground/5" : ""
                  }`}
                >
                  <span className="text-sm flex-1 min-w-0 truncate">{row.keyword}</span>
                  <span className="text-xs text-muted-foreground shrink-0">{row.count}</span>
                </div>
              ))}
              {total > 0 && (
                <div className="border-t border-foreground/10 flex items-center gap-3 px-4 py-2.5">
                  <span className="text-sm font-medium flex-1">Total</span>
                  <span className="text-xs font-medium shrink-0">{total}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
