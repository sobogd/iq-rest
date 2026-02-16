"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { analytics } from "@/lib/analytics";
import { isAdminEmail } from "@/lib/admin";
import { track, DashboardEvent } from "@/lib/dashboard-events";

export function LoginPage() {
  const locale = useLocale();
  const t = useTranslations("dashboard.auth");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    track(DashboardEvent.SHOWED_LOGIN);
    emailInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      const data = await response.json();

      if (response.ok) {
        track(DashboardEvent.CLICKED_LOGIN_CONTINUE);

        if (data.autoLogin) {
          if (isAdminEmail(email)) {
            analytics.disableTracking();
          }
          if (data.isNewUser) {
            track(DashboardEvent.AUTH_SIGNUP);
          }
          analytics.linkSession(data.userId);

          // Redirect based on onboarding step
          const step = data.onboardingStep ?? 0;
          if (step === 0) {
            window.location.href = `/${locale}/onboarding/name`;
          } else if (step === 1) {
            window.location.href = `/${locale}/onboarding/type`;
          } else {
            window.location.href = `/${locale}/dashboard`;
          }
          return;
        }

        window.location.href = `/${locale}/otp?email=${encodeURIComponent(email)}`;
      } else {
        setErrorMessage(data.error || t("errors.sendFailed"));
        setStatus("error");
      }
    } catch {
      setErrorMessage(t("errors.sendFailed"));
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[280px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-2xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground">
              {t("subtitle")}
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
                ref={emailInputRef}
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => track(DashboardEvent.FOCUSED_LOGIN_EMAIL)}
                disabled={status === "loading"}
              />

              <Button
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("continue")}
              </Button>

              <p className="text-xs text-muted-foreground/70">
                {t("consent.text")}{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  {t("consent.terms")}
                </Link>{" "}
                {t("consent.and")}{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  {t("consent.privacy")}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
