"use client";

import { useEffect, useState, useCallback } from "react";
import {
  RefreshCw,
  Upload,
  Check,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";

interface AdUser {
  gclid: string;
  keyword: string | null;
  matchType: string | null;
  campaign: string | null;
  country: string | null;
  sessionId: string;
  firstSeen: string;
  email: string | null;
  signupTime: string | null;
  onboardingStep: number | null;
  checklistMenu: boolean | null;
  checklistContacts: boolean | null;
  usedQr: boolean;
  uploaded: boolean;
}

function countryToFlag(countryCode: string): string {
  const code = countryCode.toUpperCase();
  if (code.length !== 2) return "";
  const offset = 0x1f1e6 - 65;
  return String.fromCodePoint(
    code.charCodeAt(0) + offset,
    code.charCodeAt(1) + offset
  );
}

function progressDots(user: AdUser) {
  const steps = [
    user.onboardingStep !== null && user.onboardingStep >= 1,
    user.onboardingStep !== null && user.onboardingStep >= 2,
    user.checklistMenu === true,
    user.checklistContacts === true,
    user.usedQr === true,
  ];
  const done = steps.filter(Boolean).length;
  return { steps, done };
}

export function GoogleAdsPage() {
  const [adUsers, setAdUsers] = useState<AdUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  const [convertUser, setConvertUser] = useState<AdUser | null>(null);
  const [convertValue, setConvertValue] = useState("");
  const [convertLoading, setConvertLoading] = useState(false);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorData, setErrorData] = useState<unknown>(null);

  const copyToClipboard = useCallback((text: string) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    document.execCommand("copy");
    document.body.removeChild(ta);
  }, []);

  const fetchAdUsers = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p) });
      const res = await fetch(`/api/admin/analytics/ad-users?${params}`);
      if (res.ok) {
        const json = await res.json();
        setAdUsers(json.adUsers || []);
        setTotal(json.total || 0);
        setPage(json.page || 0);
        setTotalPages(json.totalPages || 0);
      }
    } catch {
      console.error("Failed to fetch ad users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdUsers(0);
  }, [fetchAdUsers]);

  const handleUploadConversion = async () => {
    if (!convertUser) return;
    setConvertLoading(true);
    try {
      const res = await fetch("/api/admin/analytics/ad-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gclid: convertUser.gclid,
          conversionDateTime: convertUser.signupTime || convertUser.firstSeen,
          conversionValue: convertValue ? Number(convertValue) : undefined,
          sessionId: convertUser.sessionId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAdUsers((prev) =>
          prev.map((u) =>
            u.sessionId === convertUser.sessionId ? { ...u, uploaded: true } : u
          )
        );
        setConvertDialogOpen(false);
      } else {
        setErrorData(data.error || data);
        setErrorDialogOpen(true);
      }
    } catch (err) {
      setErrorData(err instanceof Error ? err.message : "Upload failed");
      setErrorDialogOpen(true);
    } finally {
      setConvertLoading(false);
    }
  };

  const formatDateUTC = (dateString: string) => {
    const d = new Date(dateString);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
  };

  if (loading && adUsers.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Google Ads" backHref="/dashboard">
        <Button
          variant="ghost"
          size="icon"
          onClick={async () => {
            try {
              const res = await fetch("/api/admin/analytics/ad-customers");
              const data = await res.json();
              setErrorData(data);
              setErrorDialogOpen(true);
            } catch {
              setErrorData("Failed to fetch");
              setErrorDialogOpen(true);
            }
          }}
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fetchAdUsers(page)}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
          {/* List */}
          {adUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No ad users yet</p>
          ) : (
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {adUsers.map((user, index) => {
                const { steps, done } = progressDots(user);
                return (
                  <button
                    key={user.sessionId}
                    onClick={() => {
                      setConvertUser(user);
                      setConvertValue("");
                      setConvertDialogOpen(true);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-muted/30 transition-colors text-left ${
                      index > 0 ? "border-t border-foreground/5" : ""
                    } ${user.uploaded ? "opacity-50" : ""}`}
                  >
                    {/* Flag */}
                    <span className="text-base shrink-0 w-6 text-center">
                      {user.country ? countryToFlag(user.country) : "—"}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {user.signupTime
                            ? new Date(user.signupTime).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
                            : "—"}
                        </span>
                        {/* Progress dots */}
                        <div className="flex items-center gap-1">
                          {steps.map((active, i) => (
                            <span
                              key={i}
                              className={`h-1.5 w-1.5 rounded-full ${active ? "bg-green-500" : "bg-muted-foreground/30"}`}
                            />
                          ))}
                        </div>
                        {done === 5 && (
                          <span className="text-[10px] text-green-500 font-medium">done</span>
                        )}
                      </div>
                    </div>

                    {/* Conv status */}
                    <div className="shrink-0">
                      {user.uploaded ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Upload className="h-4 w-4 text-muted-foreground/50" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {total > 0 && (
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fetchAdUsers(page - 1)}
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
                onClick={() => fetchAdUsers(page + 1)}
                disabled={page >= totalPages - 1 || loading}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <pre className="text-xs bg-muted rounded-lg p-3 overflow-auto max-h-80 whitespace-pre-wrap break-all">
            {typeof errorData === "string"
              ? errorData
              : JSON.stringify(errorData, null, 2)}
          </pre>
        </DialogContent>
      </Dialog>

      {/* Conversion Upload Dialog */}
      <Dialog open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Upload Conversion</DialogTitle>
          </DialogHeader>
          {convertUser && (
            <div className="space-y-4">
              <div className="space-y-2 text-sm overflow-hidden">
                <div className="flex gap-2 min-w-0">
                  <span className="text-muted-foreground shrink-0">Email:</span>
                  <span className="truncate">{convertUser.email || "—"}</span>
                </div>
                <div className="flex gap-2 min-w-0">
                  <span className="text-muted-foreground shrink-0">Signup:</span>
                  <span className="truncate">{convertUser.signupTime ? formatDateUTC(convertUser.signupTime) : "—"}</span>
                </div>
                <div className="flex gap-2 min-w-0">
                  <span className="text-muted-foreground shrink-0">Keyword:</span>
                  <span className="truncate">{convertUser.keyword || "—"}</span>
                </div>
                <div
                  className="font-mono text-xs text-muted-foreground break-all cursor-pointer hover:text-foreground"
                  onClick={() => copyToClipboard(convertUser.gclid)}
                  title="Click to copy"
                >
                  {convertUser.gclid}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">Conversion value (EUR)</label>
                <Input
                  type="number"
                  placeholder="e.g. 50"
                  value={convertValue}
                  onChange={(e) => setConvertValue(e.target.value)}
                  disabled={convertUser.uploaded}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleUploadConversion}
                disabled={convertUser.uploaded || convertLoading}
              >
                {convertLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : convertUser.uploaded ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {convertUser.uploaded ? "Already uploaded" : "Upload to Google Ads"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
