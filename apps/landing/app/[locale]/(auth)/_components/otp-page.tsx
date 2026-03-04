"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { isAdminEmail } from "@/lib/admin";
import { track, DashboardEvent } from "@/lib/dashboard-events";

const ERROR_MAP: Record<string, string> = {
  CODE_EXPIRED: "errors.codeExpired",
  NO_CODE: "errors.noCode",
  INVALID_CODE: "errors.invalidCode",
  TOO_MANY_ATTEMPTS: "errors.tooManyAttempts",
};

const RESEND_COOLDOWN = 60;

interface OtpPageProps {
  email: string;
}

export function OtpPage({ email }: OtpPageProps) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("dashboard.auth");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const otpInputRef = useRef<HTMLInputElement>(null);

  const [resendStatus, setResendStatus] = useState<
    "idle" | "loading" | "sent"
  >("idle");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    track(DashboardEvent.SHOWED_OTP);
    otpInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || resendStatus === "loading") return;

    setResendStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      if (response.ok) {
        setResendStatus("sent");
        setCooldown(RESEND_COOLDOWN);
        setTimeout(() => setResendStatus("idle"), 3000);
      } else {
        setResendStatus("idle");
        setErrorMessage(t("errors.sendFailed"));
        setStatus("error");
      }
    } catch {
      setResendStatus("idle");
      setErrorMessage(t("errors.sendFailed"));
      setStatus("error");
    }
  }, [cooldown, resendStatus, email, locale, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

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
          router.replace("/onboarding/name");
        } else {
          router.replace("/dashboard");
        }
      } else {
        track(DashboardEvent.ERROR_OTP_VERIFY);
        const translationKey = ERROR_MAP[data.error];
        setErrorMessage(translationKey ? t(translationKey) : t("errors.verifyFailed"));
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

              <div className="grid gap-1.5">
                <Input
                  ref={otpInputRef}
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  required
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtp(value);
                  }}
                  onFocus={() => track(DashboardEvent.FOCUSED_OTP_INPUT)}
                  disabled={status === "loading"}
                  className="text-center tracking-widest"
                />
                <p className="text-xs text-muted-foreground/70 text-center">
                  {t("checkSpam")}
                </p>
              </div>

              <Button
                type="submit"
                disabled={status === "loading" || otp.length !== 6}
              >
                {status === "loading" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("verify")}
              </Button>

              <div className="flex items-center justify-between">
                <p
                  className="text-xs text-muted-foreground/70 cursor-pointer underline"
                  onClick={() => {
                    track(DashboardEvent.CLICKED_CHANGE_EMAIL);
                    window.location.href = `/${locale}/login`;
                  }}
                >
                  {t("changeEmail")}
                </p>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || resendStatus === "loading"}
                  className="text-xs text-muted-foreground/70 underline disabled:opacity-50 disabled:no-underline disabled:cursor-default cursor-pointer"
                >
                  {resendStatus === "loading" ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : resendStatus === "sent" ? (
                    t("resendSent")
                  ) : cooldown > 0 ? (
                    `${t("resendCode")} (${cooldown}s)`
                  ) : (
                    t("resendCode")
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
