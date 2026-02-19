"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, MoreVertical, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { toast } from "sonner";
import type { KeywordBid } from "@/lib/google-ads";

interface BidConfig {
  id: string;
  resourceName: string;
  maxBidMicros: number;
  isActive: boolean;
}

interface BidLog {
  id: string;
  resourceName: string;
  keyword: string;
  effectiveCpcMicros: number;
  previousBidMicros: number;
  newBidMicros: number;
  maxBidMicros: number;
  reason: string;
  success: boolean;
  error: string | null;
  createdAt: string;
}

function formatMicros(micros: number | null): string {
  if (micros == null) return "—";
  return (micros / 1_000_000).toFixed(2) + " €";
}

function matchTypeBadge(matchType: string) {
  const labels: Record<string, { text: string; className: string }> = {
    EXACT: { text: "Exact", className: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
    PHRASE: { text: "Phrase", className: "bg-purple-500/15 text-purple-600 dark:text-purple-400" },
    BROAD: { text: "Broad", className: "bg-orange-500/15 text-orange-600 dark:text-orange-400" },
  };
  const badge = labels[matchType] || { text: matchType, className: "bg-muted text-muted-foreground" };
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${badge.className}`}>
      {badge.text}
    </span>
  );
}

function reasonBadge(reason: string) {
  const map: Record<string, { text: string; className: string }> = {
    auto_adjust: { text: "Adjusted", className: "bg-green-500/15 text-green-600 dark:text-green-400" },
    capped_at_max: { text: "Capped", className: "bg-orange-500/15 text-orange-600 dark:text-orange-400" },
    skipped_same: { text: "Skipped", className: "bg-muted text-muted-foreground" },
    manual: { text: "Manual", className: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  };
  const b = map[reason] || { text: reason, className: "bg-muted text-muted-foreground" };
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${b.className}`}>
      {b.text}
    </span>
  );
}

export function GoogleAdsKeywordDetailPage({ resourceName }: { resourceName: string }) {
  const [keyword, setKeyword] = useState<KeywordBid | null>(null);
  const [config, setConfig] = useState<BidConfig | null>(null);
  const [logs, setLogs] = useState<BidLog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Config form state
  const [maxBidValue, setMaxBidValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchKeyword = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/google-ads/keywords");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      const kw = (data.keywords as KeywordBid[]).find(
        (k) => k.resourceName === resourceName
      );
      if (kw) setKeyword(kw);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load keyword");
    }
  }, [resourceName]);

  const fetchConfig = useCallback(
    async (p: number) => {
      try {
        const res = await fetch(
          `/api/admin/google-ads/keywords/config?resourceName=${encodeURIComponent(resourceName)}&page=${p}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load config");
        setConfig(data.config);
        setLogs(data.logs);
        setTotalPages(data.totalPages);
        setPage(p);
        if (data.config) {
          setMaxBidValue((data.config.maxBidMicros / 1_000_000).toFixed(2));
          setIsActive(data.config.isActive);
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to load config");
      }
    },
    [resourceName]
  );

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchKeyword(), fetchConfig(1)]);
    setLoading(false);
  }, [fetchKeyword, fetchConfig]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function handleSaveConfig() {
    const euros = parseFloat(maxBidValue);
    if (isNaN(euros) || euros < 0) {
      toast.error("Invalid max bid value");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(
        `/api/admin/google-ads/keywords/config?resourceName=${encodeURIComponent(resourceName)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            maxBidMicros: Math.round(euros * 1_000_000),
            isActive,
            keyword: keyword?.keyword,
            matchType: keyword?.matchType,
            campaignName: keyword?.campaignName,
            adGroupName: keyword?.adGroupName,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setConfig(data.config);
      toast.success("Config saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save config");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <PageLoader />;

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title={keyword?.keyword || "Keyword"}
        backHref="/dashboard/google-ads/keywords"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center h-10 w-10">
              <MoreVertical className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                fetchAll();
                toast.success("Refreshed");
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(resourceName);
                toast.success("Copied");
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Resource Name
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageHeader>

      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
          {/* Info card */}
          {keyword && (
            <div className="rounded-2xl border border-border bg-muted/50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold">{keyword.keyword}</span>
                {matchTypeBadge(keyword.matchType)}
                {keyword.status === "PAUSED" && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
                    Paused
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mb-3">
                {keyword.campaignName} &middot; {keyword.adGroupName}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">My Bid</div>
                  <div className="text-sm font-medium">{formatMicros(keyword.cpcBidMicros)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Avg CPC</div>
                  <div className="text-sm font-medium">{formatMicros(keyword.averageCpc)}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-2 pt-2 border-t border-foreground/5">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">1st Page</div>
                  <div className="text-sm font-medium">{formatMicros(keyword.firstPageCpcMicros)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Top Page</div>
                  <div className="text-sm font-medium">{formatMicros(keyword.topOfPageCpcMicros)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">1st Pos.</div>
                  <div className="text-sm font-medium">{formatMicros(keyword.firstPositionCpcMicros)}</div>
                </div>
              </div>
              {(keyword.estimatedAddClicksAtFirstPosition != null || keyword.estimatedAddCostAtFirstPosition != null) && (
                <div className="grid grid-cols-2 gap-3 mt-2 pt-2 border-t border-foreground/5">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">+Clicks at 1st</div>
                    <div className="text-sm font-medium">
                      {keyword.estimatedAddClicksAtFirstPosition != null ? `+${keyword.estimatedAddClicksAtFirstPosition}/wk` : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">+Cost at 1st</div>
                    <div className="text-sm font-medium">
                      {keyword.estimatedAddCostAtFirstPosition != null ? formatMicros(keyword.estimatedAddCostAtFirstPosition) + "/wk" : "—"}
                    </div>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-4 gap-3 mt-2 pt-2 border-t border-foreground/5">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Clicks</div>
                  <div className="text-sm font-medium">{keyword.clicks.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Impr.</div>
                  <div className="text-sm font-medium">{keyword.impressions.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Conv.</div>
                  <div className="text-sm font-medium">{keyword.conversions}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Cost</div>
                  <div className="text-sm font-medium">{formatMicros(keyword.costMicros)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Config card */}
          <div className="rounded-2xl border border-border bg-muted/50 p-4">
            <h3 className="text-sm font-semibold mb-3">Auto-Bidding</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm">Enable auto-bidding</span>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>
            <div className="flex flex-col gap-1.5 mb-3">
              <label className="text-xs text-muted-foreground">Max Bid (EUR)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={maxBidValue}
                onChange={(e) => setMaxBidValue(e.target.value)}
                placeholder="0.50"
              />
            </div>
            <Button
              onClick={handleSaveConfig}
              disabled={saving || !maxBidValue}
              className="w-full"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </div>

          {/* Bid History */}
          {logs.length > 0 && (
            <div className="rounded-2xl border border-border bg-muted/50 p-4">
              <h3 className="text-sm font-semibold mb-3">Bid History</h3>
              <div className="flex flex-col gap-2">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center gap-2 text-xs py-1.5 border-b border-foreground/5 last:border-0"
                  >
                    {reasonBadge(log.reason)}
                    <span className="tabular-nums text-muted-foreground">
                      {formatMicros(log.previousBidMicros)}
                    </span>
                    <span className="text-muted-foreground">&rarr;</span>
                    <span className="tabular-nums font-medium">
                      {formatMicros(log.newBidMicros)}
                    </span>
                    {!log.success && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-destructive/15 text-destructive">
                        Failed
                      </span>
                    )}
                    <span className="ml-auto text-muted-foreground">
                      {new Date(log.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-foreground/5">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => fetchConfig(page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => fetchConfig(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
