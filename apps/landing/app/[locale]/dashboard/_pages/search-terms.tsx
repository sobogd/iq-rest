"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";

interface SearchTerm {
  searchTerm: string;
  campaignName: string;
  adGroupName: string;
  clicks: number;
  impressions: number;
  costMicros: number;
  conversions: number;
}

type Period = "today" | "yesterday" | "7days";

const TABS: { value: Period; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "7days", label: "7 days" },
];

function formatCost(micros: number): string {
  return (micros / 1_000_000).toFixed(2);
}

export function SearchTermsPage() {
  const [terms, setTerms] = useState<SearchTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("today");

  const fetchTerms = useCallback(async (p: Period) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/google-ads/search-terms?period=${p}`);
      if (res.ok) {
        const json = await res.json();
        setTerms(json.terms || []);
      }
    } catch (err) {
      console.error("Failed to fetch search terms:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTerms(period);
  }, [period, fetchTerms]);

  const handleTab = (p: Period) => {
    setPeriod(p);
  };

  if (loading && terms.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Search Terms" historyBack />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Tabs */}
          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTab(tab.value)}
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

          {/* List */}
          {loading && terms.length > 0 ? (
            <div className="rounded-2xl border border-border bg-muted/50 flex items-center justify-center" style={{ minHeight: "200px" }}>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : terms.length === 0 && !loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">No search terms found</p>
          ) : (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {terms.map((term, index) => (
                <div
                  key={`${term.searchTerm}-${term.adGroupName}-${index}`}
                  className={`px-4 py-2.5 ${
                    index > 0 ? "border-t border-foreground/5" : ""
                  }`}
                >
                  {/* Line 1: Search term */}
                  <p className="text-sm font-medium truncate">{term.searchTerm}</p>
                  {/* Line 2: Stats */}
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">
                      {term.clicks} clicks · {term.impressions} impr · ${formatCost(term.costMicros)}
                      {term.conversions > 0 && (
                        <> · <span className="text-green-500 font-medium">{term.conversions} conv</span></>
                      )}
                    </span>
                  </div>
                  {/* Line 3: Campaign / Ad Group */}
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                    {term.campaignName} / {term.adGroupName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
