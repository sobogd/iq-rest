"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type FormStatus = "idle" | "loading" | "success" | "error";

const ERROR_RESET_DELAY_MS = 5000;

export function ContactForm() {
  const t = useTranslations("contacts.form");
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), ERROR_RESET_DELAY_MS);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), ERROR_RESET_DELAY_MS);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isLoading = status === "loading";

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="pt-6">
        {status === "success" ? (
          <div className="py-8 text-center">
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {t("success")}
            </p>
          </div>
        ) : (
          <>
            {status === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                {t("error")}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">{t("email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={t("emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-base">{t("subject")}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder={t("subjectPlaceholder")}
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">{t("message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder={t("messagePlaceholder")}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="h-[104px] resize-none text-base"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading} size="lg" className="text-base px-8">
                      {isLoading ? t("sending") : t("submit")}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
}
