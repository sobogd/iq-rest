"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function OnboardingNamePage() {
  const locale = useLocale();
  const t = useTranslations("dashboard.onboarding");
  const tAuth = useTranslations("dashboard.auth");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function getCurrencyFromCookie(): string {
    const match = document.cookie.match(/(?:^|; )currency=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : "EUR";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const currency = getCurrencyFromCookie();
      const response = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: name.trim(), currency }),
      });

      if (response.ok) {
        window.location.href = `/${locale}/onboarding/type`;
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
      <div className="w-full max-w-[280px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-2xl font-bold">{t("nameTitle")}</h1>
            <p className="text-muted-foreground">
              {t("nameSubtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {status === "error" && errorMessage && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {errorMessage}
                </div>
              )}

              <Input
                ref={inputRef}
                id="name"
                type="text"
                placeholder={t("namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
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
      </div>
    </div>
  );
}
