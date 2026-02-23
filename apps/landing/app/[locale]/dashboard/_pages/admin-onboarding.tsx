"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";

interface ScanFile {
  url: string;
  name: string;
  size: number;
  lastModified: string;
  companyId: string;
}

interface OnboardingData {
  counts: Record<string, number>;
  scanMeta: { totalFiles: number; errorBreakdown: Record<string, number> };
  reachedDashboard: number;
  dateRange: { from: string; to: string };
}

type TimeRange = "today" | "yesterday" | "7d" | "30d" | "all";

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "all", label: "All" },
];

function getDateRange(range: TimeRange): { from: string; to: string } {
  const now = new Date();
  const to = now.toISOString();

  switch (range) {
    case "today": {
      const from = new Date(now);
      from.setHours(0, 0, 0, 0);
      return { from: from.toISOString(), to };
    }
    case "yesterday": {
      const from = new Date(now);
      from.setDate(from.getDate() - 1);
      from.setHours(0, 0, 0, 0);
      const end = new Date(now);
      end.setHours(0, 0, 0, 0);
      return { from: from.toISOString(), to: end.toISOString() };
    }
    case "7d": {
      const from = new Date(now);
      from.setDate(from.getDate() - 6);
      from.setHours(0, 0, 0, 0);
      return { from: from.toISOString(), to };
    }
    case "30d": {
      const from = new Date(now);
      from.setDate(from.getDate() - 29);
      from.setHours(0, 0, 0, 0);
      return { from: from.toISOString(), to };
    }
    case "all": {
      const from = new Date("2024-01-01");
      return { from: from.toISOString(), to };
    }
  }
}

function c(count: number | undefined): number {
  return count || 0;
}

function pct(value: number, total: number): string {
  if (total === 0) return "0%";
  return `${((value / total) * 100).toFixed(0)}%`;
}

function dropoff(current: number, previous: number): string {
  if (previous === 0) return "";
  const drop = previous - current;
  if (drop <= 0) return "";
  return `-${((drop / previous) * 100).toFixed(0)}%`;
}

// Funnel bar component
function FunnelBar({
  label,
  count,
  maxCount,
  firstCount,
  prevCount,
}: {
  label: string;
  count: number;
  maxCount: number;
  firstCount: number;
  prevCount?: number;
}) {
  const width = maxCount > 0 ? Math.max((count / maxCount) * 100, 4) : 4;
  const drop = prevCount !== undefined ? dropoff(count, prevCount) : "";

  return (
    <div className="flex items-center gap-3">
      <div className="w-28 shrink-0 text-right">
        <p className="text-xs text-muted-foreground leading-tight">{label}</p>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <div
          className="h-6 rounded bg-primary/70 flex items-center justify-end px-2 min-w-[32px] transition-all"
          style={{ width: `${width}%` }}
        >
          <span className="text-[10px] font-medium text-primary-foreground">
            {count}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">
          {pct(count, firstCount)}
        </span>
        {drop && (
          <span className="text-[10px] text-red-400 shrink-0">{drop}</span>
        )}
      </div>
    </div>
  );
}

// Horizontal split bar for path comparison
function PathSplitBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const width = total > 0 ? Math.max((count / total) * 100, 2) : 2;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">
          {count} ({pct(count, total)})
        </span>
      </div>
      <div className="h-4 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

// Card wrapper
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-foreground/5">
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="px-4 py-4 space-y-2">{children}</div>
    </div>
  );
}

// Summary stat card
function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/50 px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
      {detail && (
        <p className="text-[10px] text-muted-foreground mt-0.5">{detail}</p>
      )}
    </div>
  );
}

export function AdminOnboardingPage() {
  const [data, setData] = useState<OnboardingData | null>(null);
  const [scanFiles, setScanFiles] = useState<ScanFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { from, to } = getDateRange(timeRange);
      const params = new URLSearchParams({ from, to });
      const res = await fetch(`/api/admin/analytics/onboarding?${params}`);
      if (!res.ok) {
        setError(res.status === 403 ? "Access denied" : "Failed to load data");
        return;
      }
      const json = await res.json();
      setData(json);
      setError(null);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  const fetchScanFiles = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/analytics/onboarding/scans");
      if (res.ok) {
        const json = await res.json();
        setScanFiles(json.files || []);
      }
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchScanFiles();
  }, [fetchScanFiles]);

  if (loading && !data) return <PageLoader />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const g = (event: string) => c(data.counts[event]);

  // Summary values
  const totalSessions = g("showed_onboarding_name");
  const completionRate = pct(data.reachedDashboard, totalSessions);
  const scanCount = g("clicked_onboarding_scan");
  const templatesCount = g("clicked_onboarding_templates");
  const manualCount = g("clicked_onboarding_manual");
  const skipCount = g("clicked_onboarding_skip");
  const backCount = g("clicked_onboarding_back");

  const pathChoices = scanCount + templatesCount + manualCount + skipCount;
  const mostPopular =
    scanCount >= templatesCount && scanCount >= manualCount
      ? "Scan"
      : templatesCount >= manualCount
        ? "Templates"
        : "Manual";

  // Main funnel steps
  const mainFunnelSteps = [
    { label: "Showed Name", count: g("showed_onboarding_name") },
    { label: "Focused Name", count: g("focused_onboarding_name") },
    { label: "Submitted Name", count: g("clicked_onboarding_continue") },
    { label: "Showed Menu", count: g("showed_onboarding_menu") },
    { label: "Chose Path", count: pathChoices },
    { label: "Done Page", count: g("showed_onboarding_done") },
    { label: "Dashboard", count: data.reachedDashboard },
  ];
  const mainMax = Math.max(...mainFunnelSteps.map((s) => s.count), 1);
  const mainFirst = mainFunnelSteps[0].count;

  // Scan funnel
  const scanSteps = [
    { label: "Showed Scan", count: g("showed_onboarding_scan") },
    { label: "Uploaded", count: g("scan_menu_upload") },
    { label: "Success", count: g("scan_menu_success") },
    { label: "Error", count: g("scan_menu_error") },
  ];
  const scanMax = Math.max(...scanSteps.map((s) => s.count), 1);
  const scanFirst = scanSteps[0].count;

  // Templates
  const templateRestaurant = g("clicked_template_restaurant");
  const templateCafe = g("clicked_template_cafe");
  const templateBar = g("clicked_template_bar");
  const templateTotal = templateRestaurant + templateCafe + templateBar;

  // Manual funnel
  const manualSteps = {
    category: [
      { label: "Showed Category", count: g("showed_onboarding_category") },
      {
        label: "Focused Name",
        count: g("focused_onboarding_category_name"),
      },
      {
        label: "Saved Category",
        count: g("clicked_onboarding_save_category"),
      },
    ],
    item: [
      { label: "Showed Item", count: g("showed_onboarding_item") },
      { label: "Focused Name", count: g("focused_onboarding_item_name") },
      { label: "Focused Price", count: g("focused_onboarding_item_price") },
      { label: "Saved Item", count: g("clicked_onboarding_save_item") },
    ],
  };

  // Done page actions
  const doneActions = [
    { label: "Showed Done", count: g("showed_onboarding_done") },
    { label: "Add Item", count: g("clicked_onboarding_add_item") },
    { label: "Add Category", count: g("clicked_onboarding_add_category") },
    { label: "Finish", count: g("clicked_onboarding_finish") },
  ];

  const avgFiles =
    g("scan_menu_upload") > 0
      ? (data.scanMeta.totalFiles / g("scan_menu_upload")).toFixed(1)
      : "0";

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Onboarding" backHref="/dashboard/admin/analytics">
        <button
          onClick={fetchData}
          disabled={loading}
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Time Range */}
          <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden flex">
            {TIME_RANGES.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                disabled={loading}
                className={`flex-1 text-xs py-2.5 transition-colors ${
                  timeRange === range.value
                    ? "bg-primary/10 font-medium"
                    : "hover:bg-muted/30"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Total Sessions" value={totalSessions} />
            <StatCard
              label="Completion Rate"
              value={completionRate}
              detail={`${data.reachedDashboard} reached dashboard`}
            />
            <StatCard
              label="Most Popular Path"
              value={mostPopular}
              detail={`Scan ${scanCount} / Templates ${templatesCount} / Manual ${manualCount}`}
            />
            <StatCard
              label="Back / Skip"
              value={backCount + skipCount}
              detail={`Back ${backCount} / Skip ${skipCount}`}
            />
          </div>

          {/* Main Funnel */}
          <Card title="Main Funnel">
            {mainFunnelSteps.map((step, i) => (
              <FunnelBar
                key={step.label}
                label={step.label}
                count={step.count}
                maxCount={mainMax}
                firstCount={mainFirst}
                prevCount={i > 0 ? mainFunnelSteps[i - 1].count : undefined}
              />
            ))}
          </Card>

          {/* Path Split */}
          <Card title="Path Split">
            <PathSplitBar
              label="Scan"
              count={scanCount}
              total={pathChoices}
              color="bg-blue-500"
            />
            <PathSplitBar
              label="Templates"
              count={templatesCount}
              total={pathChoices}
              color="bg-green-500"
            />
            <PathSplitBar
              label="Manual"
              count={manualCount}
              total={pathChoices}
              color="bg-orange-500"
            />
            <PathSplitBar
              label="Skip"
              count={skipCount}
              total={pathChoices}
              color="bg-muted-foreground/40"
            />
          </Card>

          {/* AI Scan */}
          <Card title="AI Scan">
            {scanSteps.map((step, i) => (
              <FunnelBar
                key={step.label}
                label={step.label}
                count={step.count}
                maxCount={scanMax}
                firstCount={scanFirst}
                prevCount={
                  i > 0 && i < 3 ? scanSteps[i - 1].count : undefined
                }
              />
            ))}
            <div className="pt-2 border-t border-foreground/5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Avg files/scan
              </span>
              <span className="text-xs font-medium">{avgFiles}</span>
            </div>
            {Object.keys(data.scanMeta.errorBreakdown).length > 0 && (
              <div className="space-y-1.5 pt-1">
                <p className="text-xs text-muted-foreground">Errors</p>
                {Object.entries(data.scanMeta.errorBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([reason, cnt]) => {
                    const errorTotal = Object.values(
                      data.scanMeta.errorBreakdown
                    ).reduce((s, v) => s + v, 0);
                    const barW =
                      errorTotal > 0 ? (cnt / errorTotal) * 100 : 0;
                    return (
                      <div key={reason}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px]">{reason}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {cnt}
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-400 rounded-full"
                            style={{ width: `${barW}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </Card>

          {/* Templates */}
          <Card title="Templates">
            <FunnelBar
              label="Showed"
              count={g("showed_onboarding_templates")}
              maxCount={Math.max(g("showed_onboarding_templates"), 1)}
              firstCount={g("showed_onboarding_templates")}
            />
            <div className="pt-2 border-t border-foreground/5 space-y-1.5">
              <p className="text-xs text-muted-foreground">Choice</p>
              <PathSplitBar
                label="Restaurant"
                count={templateRestaurant}
                total={templateTotal}
                color="bg-blue-500"
              />
              <PathSplitBar
                label="Cafe"
                count={templateCafe}
                total={templateTotal}
                color="bg-green-500"
              />
              <PathSplitBar
                label="Bar"
                count={templateBar}
                total={templateTotal}
                color="bg-orange-500"
              />
            </div>
            <div className="pt-2 border-t border-foreground/5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Success</span>
              <span className="text-xs font-medium">
                {g("template_apply_success")}
              </span>
            </div>
            {g("template_apply_error") > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-red-400">Errors</span>
                <span className="text-xs font-medium text-red-400">
                  {g("template_apply_error")}
                </span>
              </div>
            )}
          </Card>

          {/* Manual Path */}
          <Card title="Manual Path">
            <p className="text-xs text-muted-foreground -mb-1">Category</p>
            {manualSteps.category.map((step, i) => (
              <FunnelBar
                key={step.label}
                label={step.label}
                count={step.count}
                maxCount={Math.max(
                  ...manualSteps.category.map((s) => s.count),
                  1
                )}
                firstCount={manualSteps.category[0].count}
                prevCount={
                  i > 0 ? manualSteps.category[i - 1].count : undefined
                }
              />
            ))}
            <div className="pt-2 border-t border-foreground/5">
              <p className="text-xs text-muted-foreground mb-2">Item</p>
              {manualSteps.item.map((step, i) => (
                <FunnelBar
                  key={step.label}
                  label={step.label}
                  count={step.count}
                  maxCount={Math.max(
                    ...manualSteps.item.map((s) => s.count),
                    1
                  )}
                  firstCount={manualSteps.item[0].count}
                  prevCount={
                    i > 0 ? manualSteps.item[i - 1].count : undefined
                  }
                />
              ))}
            </div>
          </Card>

          {/* Done Page */}
          <Card title="Done Page">
            {doneActions.map((action, i) => (
              <FunnelBar
                key={action.label}
                label={action.label}
                count={action.count}
                maxCount={Math.max(...doneActions.map((a) => a.count), 1)}
                firstCount={doneActions[0].count}
                prevCount={
                  i > 0 ? doneActions[i - 1].count : undefined
                }
              />
            ))}
          </Card>

          {/* Scan Files */}
          {scanFiles.length > 0 && (
            <Card title={`Uploaded Scans (${scanFiles.length})`}>
              <div className="space-y-1.5 max-h-96 overflow-auto -mx-1 px-1">
                {scanFiles.map((file) => (
                  <a
                    key={file.url}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground">{file.companyId.slice(0, 8)}...</p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p className="text-[10px] text-muted-foreground">
                        {(file.size / 1024).toFixed(0)} KB
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(file.lastModified).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
