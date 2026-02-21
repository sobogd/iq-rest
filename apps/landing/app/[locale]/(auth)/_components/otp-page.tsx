"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { isAdminEmail } from "@/lib/admin";
import { track, DashboardEvent } from "@/lib/dashboard-events";

interface OtpPageProps {
  email: string;
}

export function OtpPage({ email }: OtpPageProps) {
  const locale = useLocale();
  const t = useTranslations("dashboard.auth");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    track(DashboardEvent.SHOWED_OTP);
    otpInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isAdminEmail(email)) {
          analytics.disableTracking();
        }
        track(DashboardEvent.CLICKED_VERIFY_OTP);
        await analytics.linkSession(data.userId);

        // Redirect based on onboarding step
        const step = data.onboardingStep ?? 2;
        if (step < 2) {
          window.location.href = `/${locale}/onboarding/name`;
        } else {
          window.location.href = `/${locale}/dashboard`;
        }
      } else {
        track(DashboardEvent.ERROR_OTP_VERIFY);
        setErrorMessage(data.error || t("errors.verifyFailed"));
        setStatus("error");
        setOtp("");
        otpInputRef.current?.focus();
      }
    } catch {
      track(DashboardEvent.ERROR_OTP_VERIFY);
      setErrorMessage(t("errors.verifyFailed"));
      setStatus("error");
      setOtp("");
      otpInputRef.current?.focus();
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-[280px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-2xl font-bold">{t("verifyTitle")}</h1>
            <p className="text-muted-foreground">
              {t("verifySubtitle", { email })}
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
                ref={otpInputRef}
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="0000"
                required
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setOtp(value);
                }}
                onFocus={() => track(DashboardEvent.FOCUSED_OTP_INPUT)}
                disabled={status === "loading"}
                className="text-center tracking-widest"
              />

              <Button
                type="submit"
                disabled={status === "loading" || otp.length !== 4}
              >
                {status === "loading" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("verify")}
              </Button>

              <p
                className="text-xs text-muted-foreground/70 cursor-pointer underline"
                onClick={() => {
                  track(DashboardEvent.CLICKED_CHANGE_EMAIL);
                  window.location.href = `/${locale}/login`;
                }}
              >
                {t("changeEmail")}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
