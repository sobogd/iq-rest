"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

function getLocalDateTimeString(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

export function GoogleAdsSendPage() {
  const router = useRouter();
  const [gclid, setGclid] = useState("");
  const [value, setValue] = useState("0.01");
  const [dateTime, setDateTime] = useState(getLocalDateTimeString);
  const [loading, setLoading] = useState(false);

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
          value: parseFloat(value),
          conversionDateTime: new Date(dateTime).toISOString(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Conversion uploaded successfully");
        setGclid("");
      } else {
        toast.error(data.error || "Failed to upload conversion");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="shrink-0 shadow-sm px-6 bg-muted/50">
        <div className="flex items-center py-3 max-w-lg mx-auto">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold flex-1 ml-3">Google Ads Conversion</h1>
        </div>
      </header>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="w-full max-w-lg mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl border border-border bg-muted/50 p-4 flex flex-col gap-4">
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
                <Label htmlFor="value">Value (EUR)</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  min="0"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
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
    </div>
  );
}
