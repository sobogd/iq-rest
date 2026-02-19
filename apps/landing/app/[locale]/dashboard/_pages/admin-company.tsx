"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Trash2,
  Loader2,
  Send,
  Mail,
  RefreshCw,
  ExternalLink,
  Eye,
  MoreVertical,
  Copy,
  LogIn,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { MenuPreviewModal } from "@/components/menu-preview-modal";

interface User {
  id: string;
  email: string;
  createdAt: string;
  role: string;
}

interface Restaurant {
  id: string;
  title: string;
  description: string | null;
  slug: string | null;
  accentColor: string;
  createdAt: string;
  address: string | null;
  phone: string | null;
  instagram: string | null;
  whatsapp: string | null;
  reservationsEnabled: boolean;
  defaultLanguage: string | null;
  languages: string[];
  url: string | null;
}

interface Company {
  id: string;
  name: string;
  createdAt: string;
  plan: string;
  subscriptionStatus: string;
  billingCycle: string | null;
  currentPeriodEnd: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  emailsSent: Record<string, string> | null;
  categoriesCount: number;
  itemsCount: number;
  messagesCount: number;
  monthlyViews: number;
  sessionId: string | null;
  users: User[];
  restaurants: Restaurant[];
}

interface Message {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
  user: { email: string };
}

interface AdminCompanyPageProps {
  companyId: string;
}

export function AdminCompanyPage({ companyId }: AdminCompanyPageProps) {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [sendingEmailType, setSendingEmailType] = useState<string | null>(null);
  const [impersonating, setImpersonating] = useState(false);
  const [showMenuPreview, setShowMenuPreview] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchCompany = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/companies/${companyId}`);
      if (!res.ok) {
        if (res.status === 403) setError("Access denied");
        else if (res.status === 404) setError("Company not found");
        else setError("Failed to load data");
        return;
      }
      const data = await res.json();
      setCompany(data);
      setError(null);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  const fetchMessages = useCallback(async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/admin/companies/${companyId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  }, [companyId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendEmail(type: string) {
    if (!company || sendingEmailType) return;

    setSendingEmailType(type);
    try {
      const res = await fetch(`/api/admin/companies/${company.id}/remind`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (res.ok) {
        const data = await res.json();
        const emailsSent = { ...(company.emailsSent || {}), [type]: new Date().toISOString() };
        setCompany({ ...company, emailsSent });
        toast.success(`Email sent to ${data.sentTo}`);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to send email");
      }
    } catch {
      toast.error("Failed to send email");
    } finally {
      setSendingEmailType(null);
    }
  }

  const EMAIL_OPTIONS = [
    { type: "reminder_onboarded", label: "Menu almost ready", description: "For users who completed onboarding — nudge to finish editing menu" },
    { type: "reminder_not_onboarded", label: "Menu waiting for you", description: "For users who haven't started onboarding yet" },
  ];

  async function handleDelete() {
    if (!company) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/companies/${company.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(`Company "${company.name}" deleted`);
        router.back();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  async function handleImpersonate() {
    if (!company || impersonating) return;
    const user = company.users[0];
    if (!user) return;

    setImpersonating(true);
    try {
      const res = await fetch("/api/admin/impersonate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to impersonate");
        setImpersonating(false);
      }
    } catch {
      toast.error("Failed to impersonate");
      setImpersonating(false);
    }
  }

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const response = await fetch(
        `/api/admin/companies/${companyId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: newMessage.trim() }),
        }
      );

      if (response.ok) {
        const sentMessage = await response.json();
        setMessages((prev) => [...prev, sentMessage]);
        setNewMessage("");
        textareaRef.current?.focus();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
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

  const formatDate = (dateString: string, withTime = false) => {
    const date = new Date(dateString);
    if (withTime) {
      return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <PageLoader />;

  if (error || !company) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader title="Company" historyBack />
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">{error || "Not found"}</p>
        </div>
      </div>
    );
  }

  const restaurant = company.restaurants[0];
  const title = restaurant?.title || "No name";

  // Build info rows
  const companyRows: { label: string; value: string }[] = [
    { label: "Plan", value: `${company.plan}${company.subscriptionStatus === "ACTIVE" ? " (Active)" : ""}` },
    { label: "Created", value: formatDate(company.createdAt, true) },
    { label: "Categories", value: String(company.categoriesCount) },
    { label: "Items", value: String(company.itemsCount) },
    { label: "Monthly Views", value: `${company.monthlyViews} / ${company.plan === "FREE" ? "400" : "\u221e"}` },
    { label: "Restaurants", value: String(company.restaurants.length) },
  ];

  if (company.plan !== "FREE") {
    if (company.billingCycle) companyRows.push({ label: "Billing", value: company.billingCycle });
    if (company.currentPeriodEnd) companyRows.push({ label: "Period Ends", value: formatDate(company.currentPeriodEnd) });
    if (company.stripeCustomerId) companyRows.push({ label: "Stripe Customer", value: company.stripeCustomerId });
  }

  if (company.emailsSent) {
    for (const [key, date] of Object.entries(company.emailsSent)) {
      companyRows.push({ label: `Email: ${key}`, value: formatDate(date, true) });
    }
  }

  // Restaurant rows
  const restaurantRows: { label: string; value: string }[] = [];
  if (restaurant) {
    if (restaurant.url) restaurantRows.push({ label: "URL", value: restaurant.url });
    if (restaurant.description) restaurantRows.push({ label: "Description", value: restaurant.description });
    if (restaurant.address) restaurantRows.push({ label: "Address", value: restaurant.address });
    if (restaurant.phone) restaurantRows.push({ label: "Phone", value: restaurant.phone });
    if (restaurant.instagram) restaurantRows.push({ label: "Instagram", value: `@${restaurant.instagram}` });
    if (restaurant.whatsapp) restaurantRows.push({ label: "WhatsApp", value: restaurant.whatsapp });
    if (restaurant.languages.length > 0) restaurantRows.push({ label: "Languages", value: restaurant.languages.join(", ") });
    if (restaurant.reservationsEnabled) restaurantRows.push({ label: "Reservations", value: "Enabled" });
  }

  // Copyable items for dropdown
  const copyableItems: { label: string; value: string }[] = [];
  if (company.stripeCustomerId) copyableItems.push({ label: "Copy Stripe ID", value: company.stripeCustomerId });
  if (restaurant?.url) copyableItems.push({ label: "Copy URL", value: restaurant.url });
  if (restaurant?.phone) copyableItems.push({ label: "Copy Phone", value: restaurant.phone });


  return (
    <div className="flex flex-col h-full">
      <PageHeader title={title} historyBack>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[60] rounded-2xl bg-background border-border p-0 overflow-hidden">
            <DropdownMenuItem className="px-4 py-2.5 rounded-none" onClick={fetchCompany}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </DropdownMenuItem>
            {company.sessionId && (
              <DropdownMenuItem
                className="px-4 py-2.5 rounded-none border-t border-foreground/5"
                onClick={() =>
                  router.push(
                    `/dashboard/sessions/${company.sessionId}`
                  )
                }
              >
                <ExternalLink className="h-4 w-4" />
                View Session
              </DropdownMenuItem>
            )}
            {restaurant?.slug && (
              <DropdownMenuItem
                className="px-4 py-2.5 rounded-none border-t border-foreground/5"
                onClick={() => setShowMenuPreview(true)}
              >
                <Eye className="h-4 w-4" />
                View Menu
              </DropdownMenuItem>
            )}
            {copyableItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                className="px-4 py-2.5 rounded-none border-t border-foreground/5"
                onClick={() => {
                  navigator.clipboard.writeText(item.value);
                  toast.success("Copied");
                }}
              >
                <Copy className="h-4 w-4" />
                {item.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="px-4 py-2.5 rounded-none border-t border-foreground/5"
              onClick={() => setShowEmailDialog(true)}
            >
              <Mail className="h-4 w-4" />
              Send Email
            </DropdownMenuItem>
            {company.users[0] && (
              <DropdownMenuItem
                className="px-4 py-2.5 rounded-none border-t border-foreground/5"
                onClick={handleImpersonate}
                disabled={impersonating}
              >
                <LogIn className="h-4 w-4" />
                Login as {company.users[0].email.split("@")[0]}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => setShowDeleteDialog(true)}
              className="px-4 py-2.5 rounded-none border-t border-foreground/5 text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Delete Company
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageHeader>

      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto">
          <Tabs
            defaultValue="info"
            onValueChange={(v) => {
              if (v === "messages" && messages.length === 0) {
                fetchMessages();
              }
            }}
          >
            <TabsList className="w-full">
              <TabsTrigger value="info" className="flex-1">
                Info
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex-1">
                Messages
                {company.messagesCount > 0 && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({company.messagesCount})
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Info Tab */}
            <TabsContent value="info" className="space-y-4 mt-4">
              {/* Company info card */}
              <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
                {companyRows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between px-4 py-2.5 ${
                      i > 0 ? "border-t border-foreground/5" : ""
                    }`}
                  >
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                    <span className="text-xs font-mono text-right break-all max-w-[60%]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Users card */}
              <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
                {company.users.map((user, i) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between px-4 py-2.5 ${
                      i > 0 ? "border-t border-foreground/5" : ""
                    }`}
                  >
                    <span className="text-xs break-all">{user.email}</span>
                    <span className="text-xs text-muted-foreground font-mono shrink-0 ml-3">
                      {user.role} · {formatDate(user.createdAt)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Restaurant card */}
              {restaurantRows.length > 0 && (
                <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
                  {restaurantRows.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between px-4 py-2.5 ${
                        i > 0 ? "border-t border-foreground/5" : ""
                      }`}
                    >
                      <span className="text-xs text-muted-foreground">{row.label}</span>
                      <span className="text-xs font-mono text-right break-all max-w-[60%]">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="mt-4">
              <div
                className="flex flex-col"
                style={{ height: "calc(100dvh - 220px)" }}
              >
                <div className="flex-1 overflow-auto space-y-3 pr-1">
                  {loadingMessages ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                      No messages yet
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl px-4 py-3 ${
                            msg.isAdmin
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/50 text-foreground"
                          }`}
                        >
                          {!msg.isAdmin && (
                            <div className="text-xs font-medium mb-1 opacity-70">
                              {msg.user.email}
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {msg.message}
                          </p>
                          <div
                            className={`text-xs mt-1 ${
                              msg.isAdmin
                                ? "opacity-70"
                                : "text-muted-foreground"
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

                <div className="border-t pt-4 mt-4 shrink-0">
                  <div className="flex gap-2">
                    <Textarea
                      ref={textareaRef}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      className="min-h-[60px] resize-none flex-1"
                      rows={2}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!newMessage.trim() || isSending}
                      size="icon"
                      className="shrink-0 h-[60px] w-[60px]"
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
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {restaurant?.slug && (
        <MenuPreviewModal
          menuUrl={`/m/${restaurant.slug}`}
          open={showMenuPreview}
          onOpenChange={setShowMenuPreview}
        />
      )}

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 pt-2">
            {EMAIL_OPTIONS.map((opt) => {
              const sentAt = company.emailsSent?.[opt.type];
              const isSending = sendingEmailType === opt.type;
              return (
                <button
                  key={opt.type}
                  onClick={() => handleSendEmail(opt.type)}
                  disabled={!!sendingEmailType}
                  className="flex items-start gap-3 rounded-xl border border-border p-3 text-left hover:bg-muted/50 transition-colors disabled:opacity-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
                    {sentAt && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Sent {formatDate(sentAt, true)}
                      </p>
                    )}
                  </div>
                  {isSending && <Loader2 className="h-4 w-4 animate-spin shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Company</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{company.name}</strong>?
              <br />
              <br />
              This will permanently delete:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>{company.restaurants.length || 0} restaurant(s)</li>
                <li>{company.categoriesCount || 0} categories</li>
                <li>{company.itemsCount || 0} items</li>
                <li>{company.users.length || 0} user(s)</li>
                <li>All reservations, tables, and analytics data</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
