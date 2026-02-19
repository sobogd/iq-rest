"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Send, Loader2 } from "lucide-react";
import { PageHeader } from "../_ui/page-header";

const EVENT_TYPES = [
  { value: "type_selected", label: "Type Selected" },
  { value: "views_reached", label: "20 Views Reached" },
  { value: "subscription", label: "Subscription" },
];

function getLocalDateTimeString(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function parseGoogleError(error: string): string {
  // Try to extract readable parts from Google Ads error messages
  // Format: "0; ...: FIELD_ERROR, errorCode: ..., message: '...'"
  const messages: string[] = [];

  // Extract quoted messages
  const msgMatches = error.match(/message:\s*'([^']+)'/g);
  if (msgMatches) {
    for (const m of msgMatches) {
      const val = m.match(/message:\s*'([^']+)'/)?.[1];
      if (val) messages.push(val);
    }
  }

  // Extract error codes like INVALID_CONVERSION_ACTION, TOO_RECENT, etc.
  const codeMatches = error.match(/[A-Z_]{5,}/g);
  const codes = codeMatches?.filter(c =>
    !["FIELD", "ERROR", "GOOGLE", "CONVERSION"].includes(c)
  ) || [];

  if (messages.length > 0) {
    return messages.join("\n");
  }

  if (codes.length > 0) {
    return codes.join(", ");
  }

  return error;
}

export function GoogleAdsSendPage() {
  const router = useRouter();
  const [gclid, setGclid] = useState("");
  const [eventType, setEventType] = useState("type_selected");
  const [dateTime, setDateTime] = useState(getLocalDateTimeString);
  const [loading, setLoading] = useState(false);
  const [responseDialog, setResponseDialog] = useState<{
    open: boolean;
    success: boolean;
    title: string;
    message: string;
    details: string;
  }>({ open: false, success: false, title: "", message: "", details: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gclid.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/analytics/send-conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gclid: gclid.trim(),
          eventType,
          conversionDateTime: new Date(dateTime).toISOString(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponseDialog({
          open: true,
          success: true,
          title: "Success",
          message: "Conversion uploaded successfully",
          details: data.details || "",
        });
        setGclid("");
      } else {
        const errorText = data.error || "Unknown error";
        setResponseDialog({
          open: true,
          success: false,
          title: "Error",
          message: parseGoogleError(errorText),
          details: data.details || errorText,
        });
      }
    } catch (err) {
      setResponseDialog({
        open: true,
        success: false,
        title: "Network Error",
        message: "Failed to reach server",
        details: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Google Ads Conversion" historyBack />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="w-full max-w-lg mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl border border-border bg-muted/50 p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Event Type</Label>
                <div className="flex gap-2">
                  {EVENT_TYPES.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setEventType(opt.value)}
                      className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                        eventType === opt.value
                          ? "border-primary bg-primary/10 font-medium"
                          : "border-border hover:bg-muted/30"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="gclid">GCLID</Label>
                <Input
                  id="gclid"
                  type="text"
                  value={gclid}
                  onChange={(e) => setGclid(e.target.value)}
                  placeholder="CjwKCAjw..."
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="datetime">Date / Time</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" disabled={loading || !gclid.trim()} className="w-full">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send Conversion
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AlertDialog open={responseDialog.open} onOpenChange={(open) => setResponseDialog((prev) => ({ ...prev, open }))}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className={responseDialog.success ? "text-green-500" : "text-destructive"}>
              {responseDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p className="text-sm">{responseDialog.message}</p>
                {responseDialog.details && (
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-60 whitespace-pre-wrap break-all">
                    {responseDialog.details}
                  </pre>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
