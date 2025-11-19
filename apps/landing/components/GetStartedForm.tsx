"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

type Step = "email" | "otp";

export default function GetStartedForm() {
  const t = useTranslations("getStarted");
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first OTP input when step changes to OTP
  useEffect(() => {
    if (step === "otp" && otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleResendCode = async () => {
    setStatus("loading");
    setErrorMessage("");
    setOtp(["", "", "", ""]);

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, locale }),
      });

      if (response.ok) {
        setStatus("idle");
        otpInputs.current[0]?.focus();
      } else {
        const data = await response.json();
        setErrorMessage(data.error || t("errors.sendFailed"));
        setStatus("error");
      }
    } catch {
      setErrorMessage(t("errors.sendFailed"));
      setStatus("error");
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp(["", "", "", ""]);
    setErrorMessage("");
    setStatus("idle");
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">
          {step === "email" && t("title")}
          {step === "otp" && t("verifyTitle")}
        </h1>
        <p className="text-muted-foreground whitespace-pre-line">
          {step === "email" && t("subtitle")}
          {step === "otp" && t("verifySubtitle", { email })}
        </p>
      </div>

      {/* Email Step */}
      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          {status === "error" && errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm text-left">
              {errorMessage}
            </div>
          )}

          <div className="flex gap-2 justify-center">
            <Input
              id="email"
              type="email"
              required
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="w-64"
            />
            <Button
              type="submit"
              disabled={status === "loading" || !email}
              size="icon"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      )}

      {/* OTP Step */}
      {step === "otp" && (
        <div className="space-y-6">
          {status === "error" && errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm text-left">
              {errorMessage}
            </div>
          )}

          <div className="flex gap-2 justify-center">
            <Button
              onClick={handleBackToEmail}
              disabled={status === "loading"}
              size="icon"
              variant="outline"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => { otpInputs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={handleOtpPaste}
                disabled={status === "loading"}
                className="w-10 h-10 text-center text-xl font-bold"
              />
            ))}
            <Button
              onClick={() => handleOtpSubmit()}
              disabled={status === "loading" || otp.some(d => !d)}
              size="icon"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
