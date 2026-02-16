"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, MessageCircle } from "lucide-react";
import { PageHeader } from "../_ui/page-header";
import { useDashboard } from "../_context/dashboard-context";
import { track, DashboardEvent } from "@/lib/dashboard-events";

interface Message {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

const POLLING_INTERVAL = 60000;

interface SupportPageProps {
  initialMessages: Message[];
}

export function SupportPage({ initialMessages }: SupportPageProps) {
  const t = useTranslations("support");
  const { translations } = useDashboard();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
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
    }
  }, []);

  useEffect(() => {
    track(DashboardEvent.SHOWED_SUPPORT);
  }, []);

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

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.support} />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-4">
        <div className="max-w-lg mx-auto space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="flex items-center justify-center h-14 w-14 bg-muted/30 rounded-2xl">
              <MessageCircle className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="font-medium">{t("emptyTitle")}</p>
            <p className="text-sm text-muted-foreground text-center max-w-[270px]">
              {t("emptyDescription")}
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isAdmin ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.isAdmin
                    ? "bg-muted/30 text-foreground rounded-tl-md"
                    : "bg-primary text-primary-foreground rounded-tr-md"
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
                  className={`text-xs mt-1.5 ${
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
      </div>

      <div className="shrink-0 px-6 pb-6 pt-2">
        <div className="max-w-lg mx-auto">
          <div className="flex items-end gap-2 rounded-2xl border bg-muted/20 p-2">
            <Textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => track(DashboardEvent.FOCUSED_SUPPORT_MESSAGE)}
              placeholder={t("placeholder")}
              className="min-h-[44px] max-h-[120px] resize-none flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
              rows={1}
            />
            <Button
              onClick={() => { track(DashboardEvent.CLICKED_SEND_MESSAGE); handleSend(); }}
              disabled={!newMessage.trim() || isSending}
              variant="destructive"
              size="icon"
              className="h-10 w-10 rounded-xl shadow-md shrink-0"
            >
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
