"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactForm() {
  const t = useTranslations("contacts.form");
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            {/* Left Column - Email and Subject */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">{t("subject")}</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder={t("subjectPlaceholder")}
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full"
                />
              </div>
            </div>

            {/* Right Column - Message and Button */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">{t("message")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder={t("messagePlaceholder")}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full h-[80px] resize-none"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  size="lg"
                >
                  {status === "loading" ? t("sending") : t("submit")}
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
