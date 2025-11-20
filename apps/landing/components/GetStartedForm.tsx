"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, CheckCircle2, Zap, RefreshCw, QrCode, Gift } from "lucide-react";

type Step = "email" | "otp";

// Calculate restaurant count based on days since start date
function getRestaurantCount(): number {
  const startDate = new Date('2025-03-03');
  const currentDate = new Date();
  const daysDiff = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(100, 100 + (daysDiff * 3));
}

export default function GetStartedForm() {
  const t = useTranslations("getStarted");
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  const restaurantCount = useMemo(() => getRestaurantCount(), []);

  // Fade-in animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-focus email input on mount
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  // Focus first OTP input when step changes to OTP
  useEffect(() => {
    if (step === "otp" && otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, [step]);

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3 && otpInputs.current[index + 1]) {
      otpInputs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (value && index === 3 && newOtp.every(digit => digit !== "")) {
      handleOtpSubmit(newOtp.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);

    if (pastedData.length === 4) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      handleOtpSubmit(pastedData);
    }
  };

  const handleOtpSubmit = async (code?: string) => {
    const otpCode = code || otp.join("");

    if (otpCode.length !== 4) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: otpCode }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to dashboard immediately
        router.push(`/${locale}/dashboard`);
        router.refresh();
      } else {
        setErrorMessage(data.error || t("errors.verifyFailed"));
        setStatus("error");
        // Clear OTP inputs on error
        setOtp(["", "", "", ""]);
        otpInputs.current[0]?.focus();
      }
    } catch {
      setErrorMessage(t("errors.verifyFailed"));
      setStatus("error");
      setOtp(["", "", "", ""]);
      otpInputs.current[0]?.focus();
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp(["", "", "", ""]);
    setErrorMessage("");
    setStatus("idle");
  };

  return (
    <div
      className={`w-full max-w-[1000px] mx-auto text-center transition-all duration-700 md:min-h-[80vh] flex flex-col md:justify-center ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-base md:text-lg whitespace-pre-line">
          {t("subtitle")}
        </p>
      </div>

      {/* Restaurant Counter */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 md:py-2 rounded-lg bg-green-500/10 border border-green-500/20 w-full md:w-auto md:inline-flex">
          <span className="text-sm md:text-base font-semibold text-green-500">
            {restaurantCount.toLocaleString()}+
          </span>
          <span className="text-sm md:text-base text-muted-foreground">
            Restaurants already using SobogdQR
          </span>
        </div>
      </div>

      {/* Value Proposition Cards */}
      <div className="mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        <div className="flex items-center justify-center gap-3 p-3 md:p-4 rounded-lg bg-muted/50 border border-border/50 sm:justify-start">
          <Zap className="h-6 w-6 md:h-7 md:w-7 text-primary flex-shrink-0" />
          <span className="text-sm md:text-base text-center sm:text-left text-muted-foreground">{t("valueProps.noSkills")}</span>
        </div>
        <div className="flex items-center justify-center gap-3 p-3 md:p-4 rounded-lg bg-muted/50 border border-border/50 sm:justify-start">
          <RefreshCw className="h-6 w-6 md:h-7 md:w-7 text-primary flex-shrink-0" />
          <span className="text-sm md:text-base text-center sm:text-left text-muted-foreground">{t("valueProps.instantUpdates")}</span>
        </div>
        <div className="flex items-center justify-center gap-3 p-3 md:p-4 rounded-lg bg-muted/50 border border-border/50 sm:justify-start">
          <QrCode className="h-6 w-6 md:h-7 md:w-7 text-primary flex-shrink-0" />
          <span className="text-sm md:text-base text-center sm:text-left text-muted-foreground">{t("valueProps.qrIncluded")}</span>
        </div>
        <div className="flex items-center justify-center gap-3 p-3 md:p-4 rounded-lg bg-muted/50 border border-border/50 sm:justify-start">
          <Gift className="h-6 w-6 md:h-7 md:w-7 text-primary flex-shrink-0" />
          <span className="text-sm md:text-base text-center sm:text-left text-muted-foreground">{t("valueProps.freeStart")}</span>
        </div>
      </div>

      {/* Email Step */}
      {step === "email" && (
        <div className="space-y-4">
          {status === "error" && errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-left">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleEmailSubmit} className="max-w-[500px] mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  ref={emailInputRef}
                  id="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="w-full h-12 text-sm md:text-base pr-10"
                />
                {isEmailValid && email && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500 animate-in fade-in duration-200" />
                )}
              </div>
              <Button
                type="submit"
                disabled={status === "loading" || !isEmailValid}
                size="icon"
                className="h-12 w-20"
              >
                {status === "loading" ? (
                  <Loader2 className="!h-6 !w-6 animate-spin" />
                ) : (
                  <ArrowRight className="!h-6 !w-6" />
                )}
              </Button>
            </div>
          </form>

          {/* Form helper text */}
          <p className="text-sm md:text-base text-muted-foreground">
            {t("formHelper")} • {t("setupTime")}
          </p>
        </div>
      )}

      {/* OTP Step */}
      {step === "otp" && (
        <div className="space-y-4">
          {status === "error" && errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-left max-w-[400px] mx-auto">
              {errorMessage}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleOtpSubmit(); }} className="max-w-[500px] mx-auto">
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleBackToEmail}
                disabled={status === "loading"}
                size="icon"
                variant="outline"
                className="h-12 w-12"
              >
                <ArrowRight className="h-6 w-6 rotate-180" />
              </Button>
              <div className="relative flex-1">
                <Input
                  ref={(el) => { otpInputs.current[0] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder={t("otpPlaceholder")}
                  value={otp.join("")}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    const newOtp = value.split("").concat(["", "", "", ""]).slice(0, 4);
                    setOtp(newOtp);
                    if (value.length === 4) {
                      handleOtpSubmit(value);
                    }
                  }}
                  onPaste={handleOtpPaste}
                  disabled={status === "loading"}
                  className="w-full h-12 text-sm md:text-base"
                />
              </div>
              <Button
                type="submit"
                disabled={status === "loading" || otp.join("").length !== 4}
                size="icon"
                className="h-12 w-20"
              >
                {status === "loading" ? (
                  <Loader2 className="!h-6 !w-6 animate-spin" />
                ) : (
                  <ArrowRight className="!h-6 !w-6" />
                )}
              </Button>
            </div>
          </form>

          {/* Form helper text */}
          <p className="text-sm text-muted-foreground">
            Code sent to {email}
          </p>
        </div>
      )}

      {/* Process Indicator */}
      <div className="pt-4 md:pt-6">
        {/* Mobile & Tablet: Vertical */}
        <div className="flex flex-col gap-3 lg:hidden items-center px-6 py-3 rounded-lg bg-muted/50 border border-border/50">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-semibold text-xs flex-shrink-0">1</span>
            <span className="text-sm font-medium">{t("steps.signUp")}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center font-semibold text-xs flex-shrink-0">2</span>
            <span className="text-sm">{t("steps.addMenu")}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center font-semibold text-xs flex-shrink-0">3</span>
            <span className="text-sm">{t("steps.getQr")}</span>
          </div>
        </div>
        {/* Desktop: Horizontal */}
        <div className="hidden lg:inline-flex items-center gap-4 px-6 py-3 rounded-lg bg-muted/50 border border-border/50">
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-semibold text-xs">1</span>
            <span className="text-base font-medium">{t("steps.signUp")}</span>
          </span>
          <span className="text-muted-foreground text-base">→</span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center font-semibold text-xs">2</span>
            <span className="text-base">{t("steps.addMenu")}</span>
          </span>
          <span className="text-muted-foreground text-base">→</span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center font-semibold text-xs">3</span>
            <span className="text-base">{t("steps.getQr")}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
