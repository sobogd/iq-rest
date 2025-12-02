"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

interface SupportClientProps {
  initialMessages: Message[];
}

export function SupportClient({ initialMessages }: SupportClientProps) {
  const t = useTranslations("support");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Show refresh button after 60 seconds on initial load
    refreshTimerRef.current = setTimeout(() => {
      setCanRefresh(true);
    }, 60000);

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  const fetchMessages = async () => {
    if (!canRefresh || isRefreshing) return;

    setIsRefreshing(true);
    setCanRefresh(false);

    try {
      const response = await fetch("/api/support/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsRefreshing(false);
      // Start timer to show button again after 60 seconds
      refreshTimerRef.current = setTimeout(() => {
        setCanRefresh(true);
      }, 60000);
    }
  };

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
    <div className="space-y-5">
      {/* Messages Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>{t("title")}</Label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {t("lastUpdated")}: {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            {canRefresh && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={fetchMessages}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
            )}
          </div>
        </div>
        <div className="border-t pt-2" />
        {messages.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p className="font-medium">{t("emptyTitle")}</p>
            <p className="text-sm">{t("emptyDescription")}</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isAdmin ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.isAdmin
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {msg.isAdmin && (
                  <div className="text-xs font-medium mb-1 opacity-70">
                    {t("supportTeam")}
                  </div>
                )}
                <p className="whitespace-pre-wrap break-words">{msg.message}</p>
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
      </div>

      {/* Input Section */}
      <div className="space-y-3">
        <Label>{t("sendMessage")}</Label>
        <Textarea
          ref={textareaRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("placeholder")}
          className="min-h-[100px] resize-none"
          rows={4}
        />
        <div className="flex items-start justify-between">
          <p className="text-xs text-muted-foreground">
            {t("hint")}
          </p>
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || isSending}
          >
            <Send className="h-4 w-4 mr-2" />
            {t("send")}
          </Button>
        </div>
      </div>
    </div>
  );
}
