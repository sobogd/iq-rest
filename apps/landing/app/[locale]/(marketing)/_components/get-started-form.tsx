"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  Zap,
  RefreshCw,
  QrCode,
  Gift,
} from "lucide-react";
import { analytics } from "@/lib/analytics";
import { isAdminEmail } from "@/lib/admin";

type Step = "email" | "otp";
type Status = "idle" | "loading" | "error";

const START_DATE = new Date("2025-03-03");
const BASE_RESTAURANT_COUNT = 100;
const DAILY_GROWTH = 3;

function getRestaurantCount(): number {
  const daysDiff = Math.floor(
    (Date.now() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(BASE_RESTAURANT_COUNT, BASE_RESTAURANT_COUNT + daysDiff * DAILY_GROWTH);
}

const VALUE_PROPS = [
  { icon: Zap, key: "noSkills" },
  { icon: RefreshCw, key: "instantUpdates" },
  { icon: QrCode, key: "qrIncluded" },
  { icon: Gift, key: "freeStart" },
] as const;

export function GetStartedForm() {
  const t = useTranslations("getStarted");
  const locale = useLocale();
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);

  const restaurantCount = useMemo(() => getRestaurantCount(), []);

  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  useEffect(() => {
    setIsVisible(true);
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (step === "otp") {
      otpInputRef.current?.focus();
    }
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;

    setStatus("loading");
    setErrorMessage("");
    analytics.auth.emailSubmit();

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep("otp");
        setStatus("idle");
      } else {
        setErrorMessage(data.error || t("errors.sendFailed"));
        setStatus("error");
      }
    } catch {
      setErrorMessage(t("errors.sendFailed"));
      setStatus("error");
    }
  };

  const handleOtpSubmit = async (code?: string) => {
    const otpCode = code || otp.join("");
    if (otpCode.length !== 4) return;

    setStatus("loading");
    setErrorMessage("");
    analytics.auth.codeVerify();

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode }),
      });

      const data = await response.json();
      console.log("[Auth Debug] OTP response:", { ok: response.ok, isNewUser: data.isNewUser });

      if (response.ok) {
        // Disable analytics tracking for admin
        if (isAdminEmail(email)) {
          analytics.disableTracking();
        }
        // Track auth event
        if (data.isNewUser) {
          analytics.auth.signUp();
        } else {
          analytics.auth.codeVerify();
        }
        router.push(`/${locale}/dashboard`);
        router.refresh();
      } else {
        setErrorMessage(data.error || t("errors.verifyFailed"));
        setStatus("error");
        setOtp(["", "", "", ""]);
        otpInputRef.current?.focus();
      }
    } catch {
      setErrorMessage(t("errors.verifyFailed"));
      setStatus("error");
      setOtp(["", "", "", ""]);
      otpInputRef.current?.focus();
    }
  };

  const handleOtpChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, "").slice(0, 4);
    const newOtp = cleanValue.split("").concat(["", "", "", ""]).slice(0, 4);
    setOtp(newOtp);
    if (cleanValue.length === 4) {
      handleOtpSubmit(cleanValue);
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pastedData.length === 4) {
      setOtp(pastedData.split(""));
      handleOtpSubmit(pastedData);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp(["", "", "", ""]);
    setErrorMessage("");
    setStatus("idle");
  };

  const isLoading = status === "loading";

  return (
    <div
      className={`w-full max-w-[1000px] mx-auto text-center transition-all duration-700 md:min-h-[80vh] flex flex-col md:justify-center ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-base md:text-lg whitespace-pre-line">
          {t("subtitle")}
        </p>
      </div>

      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 md:py-2 rounded-lg bg-green-500/10 border border-green-500/20 w-full md:w-auto md:inline-flex">
          <span className="text-sm md:text-base text-muted-foreground">
            {t("restaurantCounter", {
              count: `${restaurantCount.toLocaleString()}+`,
            })}
          </span>
        </div>
      </div>

      <div className="mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {VALUE_PROPS.map(({ icon: Icon, key }) => (
          <div
            key={key}
            className="flex items-center justify-center gap-3 p-3 md:p-4 rounded-lg bg-muted/50 border border-border/50 sm:justify-start"
          >
            <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary flex-shrink-0" />
            <span className="text-sm md:text-base text-center sm:text-left text-muted-foreground">
              {t(`valueProps.${key}`)}
            </span>
          </div>
        ))}
      </div>

      {step === "email" && (
        <div className="space-y-4">
          {status === "error" && errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-left max-w-[500px] mx-auto">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleEmailSubmit} className="max-w-[500px] mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  ref={emailInputRef}
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-12 text-sm md:text-base pr-10"
                />
                {isEmailValid && email && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500 animate-in fade-in duration-200" />
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading || !isEmailValid}
                size="icon"
                className="h-12 w-20"
              >
                {isLoading ? (
                  <Loader2 className="!h-6 !w-6 animate-spin" />
                ) : (
                  <ArrowRight className="!h-6 !w-6" />
                )}
              </Button>
            </div>
          </form>

          <p className="text-sm md:text-base text-muted-foreground">
            {t("formHelper")} • {t("setupTime")}
          </p>
        </div>
      )}

      {step === "otp" && (
        <div className="space-y-4">
          {status === "error" && errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-left max-w-[400px] mx-auto">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOtpSubmit();
            }}
            className="max-w-[500px] mx-auto"
          >
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleBackToEmail}
                disabled={isLoading}
                size="icon"
                variant="outline"
                className="h-12 w-12"
              >
                <ArrowRight className="h-6 w-6 rotate-180" />
              </Button>
              <Input
                ref={otpInputRef}
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder={t("otpPlaceholder")}
                value={otp.join("")}
                onChange={(e) => handleOtpChange(e.target.value)}
                onPaste={handleOtpPaste}
                disabled={isLoading}
                className="flex-1 h-12 text-sm md:text-base"
              />
              <Button
                type="submit"
                disabled={isLoading || otp.join("").length !== 4}
                size="icon"
                className="h-12 w-20"
              >
                {isLoading ? (
                  <Loader2 className="!h-6 !w-6 animate-spin" />
                ) : (
                  <ArrowRight className="!h-6 !w-6" />
                )}
              </Button>
            </div>
          </form>

          <p className="text-sm text-muted-foreground">Code sent to {email}</p>
        </div>
      )}

      <div className="pt-4 md:pt-6">
        <div className="flex flex-col gap-3 lg:hidden items-center px-6 py-3 rounded-lg bg-muted/50 border border-border/50">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`flex items-center gap-2 ${
                num > 1 ? "text-muted-foreground" : ""
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0 ${
                  num === 1
                    ? "bg-foreground text-background"
                    : "bg-muted border border-border"
                }`}
              >
                {num}
              </span>
              <span className={`text-sm ${num === 1 ? "font-medium" : ""}`}>
                {t(`steps.${num === 1 ? "signUp" : num === 2 ? "addMenu" : "getQr"}`)}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden lg:inline-flex items-center gap-4 px-6 py-3 rounded-lg bg-muted/50 border border-border/50">
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-semibold text-xs">
              1
            </span>
            <span className="text-base font-medium">{t("steps.signUp")}</span>
          </span>
          <span className="text-muted-foreground text-base">→</span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center font-semibold text-xs">
              2
            </span>
            <span className="text-base">{t("steps.addMenu")}</span>
          </span>
          <span className="text-muted-foreground text-base">→</span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center font-semibold text-xs">
              3
            </span>
            <span className="text-base">{t("steps.getQr")}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
