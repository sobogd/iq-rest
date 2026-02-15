"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useDashboard } from "../_context/dashboard-context";

interface Message {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

const POLLING_INTERVAL = 60000;

export function SupportPage() {
  const t = useTranslations("support");
  const { translations } = useDashboard();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch("/api/support/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {

    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    const interval = setInterval(fetchMessages, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const response = await fetch("/api/support/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.trim() }),
      });

      if (response.ok) {

        const sentMessage = await response.json();
        setMessages((prev) => [...prev, sentMessage]);
        setNewMessage("");
        textareaRef.current?.focus();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.support} />
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="font-medium">{t("emptyTitle")}</p>
              <p className="text-sm text-muted-foreground max-w-[270px] mt-2">
                {t("emptyDescription")}
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isAdmin ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  msg.isAdmin
                    ? "bg-muted/30 text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {msg.isAdmin && (
                  <div className="text-xs font-medium mb-1 opacity-70">
                    {t("supportTeam")}
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap break-words">
                  {msg.message}
                </p>
                <div
                  className={`text-xs mt-1 ${
                    msg.isAdmin ? "text-muted-foreground" : "opacity-70"
                  }`}
                >
                  {formatDateTime(msg.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-6 py-4 border-t bg-background shrink-0 rounded-b-xl">
        <div className="flex flex-col md:flex-row md:items-start gap-3">
          <Textarea
            ref={textareaRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("placeholder")}
            className="min-h-[80px] resize-none flex-1"
            rows={3}
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || isSending}
            className="w-full md:w-auto shrink-0"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            {t("send")}
          </Button>
        </div>
      </div>
    </div>
  );
}
