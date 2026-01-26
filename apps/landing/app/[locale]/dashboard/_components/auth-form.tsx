"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";

type Step = "email" | "otp";

interface AuthFormProps {
  onSuccess: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (step === "otp") {
      otpInputRef.current?.focus();
    }
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
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
        setStep("otp");
        setStatus("idle");
      } else {
        setErrorMessage(data.error || t("auth.errors.sendFailed"));
        setStatus("error");
      }
    } catch {
      setErrorMessage(t("auth.errors.sendFailed"));
      setStatus("error");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
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
        onSuccess();
      } else {
        setErrorMessage(data.error || t("auth.errors.verifyFailed"));
        setStatus("error");
        setOtp("");
        otpInputRef.current?.focus();
      }
    } catch {
      setErrorMessage(t("auth.errors.verifyFailed"));
      setStatus("error");
      setOtp("");
      otpInputRef.current?.focus();
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="IQ Rest" width={32} height={32} />
          <span className="text-xl font-semibold">IQ Rest</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {step === "email" ? t("auth.title") : t("auth.verifyTitle")}
            </CardTitle>
            <CardDescription>
              {step === "email"
                ? t("auth.subtitle")
                : t("auth.verifySubtitle", { email })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "email" ? (
              <form onSubmit={handleEmailSubmit}>
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
                    placeholder={t("auth.emailPlaceholder")}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === "loading" || !email}
                  >
                    {status === "loading" && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("auth.continue")}
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    {t("auth.benefits")}
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
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
                    disabled={status === "loading"}
                    className="text-center text-lg tracking-widest"
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === "loading" || otp.length !== 4}
                  >
                    {status === "loading" && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("auth.verify")}
                  </Button>

                  <p
                    className="text-xs text-muted-foreground cursor-pointer underline"
                    onClick={() => {
                      setStep("email");
                      setOtp("");
                      setErrorMessage("");
                      setStatus("idle");
                    }}
                  >
                    {t("auth.changeEmail")}
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
