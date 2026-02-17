"use client";

import { useState, useEffect } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import type { SubscriptionStatus } from "@prisma/client";
import type { PlanType } from "@/lib/stripe-config";

interface FormInputTranslateProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
  translateErrorMessage?: string;
}

export function FormInputTranslate({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  sourceText,
  sourceLanguage,
  targetLanguage,
  translateErrorMessage = "Translation failed",
}: FormInputTranslateProps) {
  const t = useTranslations("dashboard.aiTranslate");
  const [translating, setTranslating] = useState(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("INACTIVE");
  const [currentPlan, setCurrentPlan] = useState<PlanType>("FREE");
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  const hasActiveSubscription = subscriptionStatus === "ACTIVE" && currentPlan !== "FREE";

  useEffect(() => {
    async function fetchSubscriptionStatus() {
      try {
        const response = await fetch("/api/subscription/status");
        if (response.ok) {
          const data = await response.json();
          setSubscriptionStatus(data.subscriptionStatus);
          setCurrentPlan(data.plan);
        }
      } catch (error) {
        console.error("Failed to fetch subscription status:", error);
      }
    }
    fetchSubscriptionStatus();
  }, []);

  async function handleTranslate() {
    if (!sourceText.trim()) return;
    track(DashboardEvent.CLICKED_AI_TRANSLATE);

    if (!hasActiveSubscription) {
      setShowSubscriptionDialog(true);
      return;
    }

    setTranslating(true);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: sourceText,
          targetLanguage,
          sourceLanguage,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.translatedText);
      } else {
        toast.error(translateErrorMessage);
      }
    } catch {
      toast.error(translateErrorMessage);
    } finally {
      setTranslating(false);
    }
  }

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={inputId}>{label}</Label>
        <div className="flex gap-2">
          <Input
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleTranslate}
            disabled={translating || !sourceText.trim() || disabled}
            className="shrink-0 h-11 gap-1.5 px-3 bg-muted/30 hover:bg-muted/50"
          >
            {translating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span className="text-xs">{t("translate")}</span>
          </Button>
        </div>
      </div>

      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("description")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => { track(DashboardEvent.CLICKED_AI_CANCEL); setShowSubscriptionDialog(false); }}>
              {t("cancel")}
            </Button>
            <Button asChild onClick={() => track(DashboardEvent.CLICKED_AI_SUBSCRIBE)}>
              <Link href="/dashboard?page=billing">{t("subscribe")}</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
