"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft } from "lucide-react";
import { track, DashboardEvent } from "@/lib/dashboard-events";

export function OnboardingCategoryPage({
  restaurantName,
  fromDone,
}: {
  restaurantName: string;
  fromDone?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations("dashboard.onboarding");
  const tAuth = useTranslations("dashboard.auth");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    track(DashboardEvent.SHOWED_ONBOARDING_CATEGORY);
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setStatus("loading");
    setErrorMessage("");
    track(DashboardEvent.CLICKED_ONBOARDING_SAVE_CATEGORY);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = `/${locale}/onboarding/item?categoryId=${data.id}`;
      } else {
        const data = await response.json();
        setErrorMessage(data.error || t("error"));
        setStatus("error");
      }
    } catch {
      setErrorMessage(t("error"));
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[320px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-[28px] leading-tight font-bold">
              {restaurantName}
            </h1>
            <p className="text-muted-foreground">{t("categorySubtitle")}</p>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                {status === "error" && errorMessage && (
                  <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                    {errorMessage}
                  </div>
                )}

                <label htmlFor="category-name" className="text-sm font-medium">
                  {t("categoryLabel")}:
                </label>
                <Input
                  ref={inputRef}
                  id="category-name"
                  type="text"
                  placeholder={t("categoryPlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() =>
                    track(DashboardEvent.FOCUSED_ONBOARDING_CATEGORY_NAME)
                  }
                  disabled={status === "loading"}
                />

                <Button
                  type="submit"
                  disabled={status === "loading" || !name.trim()}
                >
                  {status === "loading" && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {tAuth("continue")}
                </Button>
              </div>
            </form>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-fit"
            onClick={() => { track(DashboardEvent.CLICKED_ONBOARDING_BACK); window.location.href = fromDone ? `/${locale}/onboarding/done` : `/${locale}/onboarding/menu`; }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
