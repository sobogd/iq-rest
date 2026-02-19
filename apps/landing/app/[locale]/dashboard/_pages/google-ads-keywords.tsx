"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PageHeader } from "../_ui/page-header";
import type { KeywordBid } from "@/lib/google-ads";

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

export function GoogleAdsKeywordsPage() {
  const [keywords, setKeywords] = useState<KeywordBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit bid modal state
  const [editingKw, setEditingKw] = useState<KeywordBid | null>(null);
  const [bidValue, setBidValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const fetchKeywords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/google-ads/keywords");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      const sorted = (data.keywords as KeywordBid[]).sort((a, b) => {
        const cmp = a.campaignName.localeCompare(b.campaignName);
        if (cmp !== 0) return cmp;
        return a.keyword.localeCompare(b.keyword);
      });
      setKeywords(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  function openBidModal(kw: KeywordBid) {
    setEditingKw(kw);
    setBidValue(kw.cpcBidMicros != null ? (kw.cpcBidMicros / 1_000_000).toFixed(2) : "");
    setSaveError(null);
  }

  async function handleSaveBid() {
    if (!editingKw) return;
    const euros = parseFloat(bidValue);
    if (isNaN(euros) || euros < 0) {
      setSaveError("Invalid bid value");
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      const cpcBidMicros = Math.round(euros * 1_000_000);
      const res = await fetch("/api/admin/google-ads/keywords", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceName: editingKw.resourceName,
          cpcBidMicros,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");

      // Update local state
      setKeywords((prev) =>
        prev.map((kw) =>
          kw.resourceName === editingKw.resourceName
            ? { ...kw, cpcBidMicros }
            : kw
        )
      );
      setEditingKw(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Ads Bids" backHref="/dashboard">
        <button
          onClick={fetchKeywords}
          disabled={loading}
          className="flex items-center justify-center h-10 w-10"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCw className="h-5 w-5" />
          )}
        </button>
      </PageHeader>

      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="w-full max-w-lg mx-auto flex flex-col gap-3">
          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {!loading && !error && keywords.length === 0 && (
            <div className="text-center text-muted-foreground py-12 text-sm">
              No keywords found
            </div>
          )}

          {keywords.length > 0 && (() => {
            let lastCampaign = "";
            return keywords.map((kw, i) => {
              const showCampaign = kw.campaignName !== lastCampaign;
              lastCampaign = kw.campaignName;
              return (
                <div key={`${kw.keyword}-${kw.matchType}-${kw.campaignName}-${i}`}>
                  {showCampaign && (
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-2 mb-1 px-1">
                      {kw.campaignName}
                    </div>
                  )}
                  <div className="rounded-2xl border border-border bg-muted/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-semibold">{kw.keyword}</span>
                      {matchTypeBadge(kw.matchType)}
                      {kw.status === "PAUSED" && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
                          Paused
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground mb-2">
                      {kw.adGroupName}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <button
                        className="text-left rounded-lg p-1.5 -m-1.5 hover:bg-primary/5 transition-colors"
                        onClick={() => openBidModal(kw)}
                      >
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">My Bid</div>
                        <div className="text-sm font-medium text-primary underline decoration-dotted underline-offset-2">
                          {formatMicros(kw.cpcBidMicros)}
                        </div>
                      </button>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Effective</div>
                        <div className="text-sm font-medium">{formatMicros(kw.effectiveCpcBidMicros)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Avg CPC</div>
                        <div className="text-sm font-medium">{formatMicros(kw.averageCpc)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-2 pt-2 border-t border-foreground/5">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Clicks</div>
                        <div className="text-sm font-medium">{kw.clicks.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Impr.</div>
                        <div className="text-sm font-medium">{kw.impressions.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Cost</div>
                        <div className="text-sm font-medium">{formatMicros(kw.costMicros)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* Edit bid modal */}
      <Dialog open={!!editingKw} onOpenChange={(open) => { if (!open) setEditingKw(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit CPC Bid</DialogTitle>
          </DialogHeader>
          {editingKw && (
            <div className="flex flex-col gap-4">
              <div className="text-sm">
                <span className="font-semibold">{editingKw.keyword}</span>
                <span className="ml-2">{matchTypeBadge(editingKw.matchType)}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">Bid (EUR)</label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={bidValue}
                  onChange={(e) => setBidValue(e.target.value)}
                  placeholder="0.00"
                  onKeyDown={(e) => { if (e.key === "Enter") handleSaveBid(); }}
                />
              </div>
              {saveError && (
                <div className="text-sm text-destructive">{saveError}</div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingKw(null)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSaveBid} disabled={saving || !bidValue}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
