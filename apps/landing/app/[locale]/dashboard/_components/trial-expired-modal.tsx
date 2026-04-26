"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Rocket, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { PRICE_LOOKUP_KEYS } from "@/lib/stripe-config";
import { toast } from "sonner";

export function TrialExpiredModal({ open: initialOpen }: { open: boolean }) {
  const t = useTranslations("dashboard.upsell");
  const locale = useLocale();
  const [open, setOpen] = useState(initialOpen);
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceLookupKey: PRICE_LOOKUP_KEYS.BASIC_YEARLY, locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || t("checkoutError"));
        setLoading(false);
      }
    } catch {
      toast.error(t("checkoutError"));
      setLoading(false);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-3rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-black p-6 shadow-lg">
          <DialogPrimitive.Title className="sr-only">{t("trialEndedTitle")}</DialogPrimitive.Title>
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-md flex items-center justify-center">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">{t("trialEndedTitle")}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t("menuUnavailableText")}</p>
            </div>
            <Button
              size="lg"
              className="w-full h-12 font-semibold"
              onClick={handleUpgrade}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : t("ctaBasic")}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
