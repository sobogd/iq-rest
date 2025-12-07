"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-refresh messages every 60 seconds
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/support/messages");
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    const interval = setInterval(fetchMessages, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom when messages change
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
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Messages - scrollable */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3 hide-scrollbar">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="font-medium">{t("emptyTitle")}</p>
              <p className="text-sm text-muted-foreground max-w-[270px] mt-2">{t("emptyDescription")}</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isAdmin ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  msg.isAdmin
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {msg.isAdmin && (
                  <div className="text-xs font-medium mb-0.5 opacity-70">
                    {t("supportTeam")}
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
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

      {/* Input - fixed at bottom */}
      <div className="pt-3 shrink-0 space-y-3">
        <Textarea
          ref={textareaRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("placeholder")}
          className="min-h-[80px] resize-none"
          rows={3}
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
