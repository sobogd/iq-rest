"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  ExternalLink,
  Building2,
  FolderOpen,
  Package,
  Users,
  Trash2,
  Loader2,
  Send,
  MessageSquare,
  Calendar,
  CreditCard,
  Phone,
  MapPin,
  Instagram,
  Globe,
  Mail,
  Eye,
  Info,
} from "lucide-react";
import { MenuPreviewModal } from "@/components/menu-preview-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
import { toast } from "sonner";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";

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
  reminderSentAt: string | null;
  categoriesCount: number;
  itemsCount: number;
  messagesCount: number;
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

export function AdminPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Separate states for different sheets
  const [chatCompany, setChatCompany] = useState<Company | null>(null);
  const [detailsCompany, setDetailsCompany] = useState<Company | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [sendingReminder, setSendingReminder] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchMessages = useCallback(async (companyId: string) => {
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
  }, []);

  useEffect(() => {
    if (chatCompany) {
      fetchMessages(chatCompany.id);
    } else {
      setMessages([]);
      setNewMessage("");
    }
  }, [chatCompany, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendReminder() {
    if (!detailsCompany || sendingReminder) return;

    setSendingReminder(true);
    try {
      const res = await fetch(`/api/admin/companies/${detailsCompany.id}/remind`, {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        const now = new Date().toISOString();
        setCompanies((prev) =>
          prev.map((c) =>
            c.id === detailsCompany.id ? { ...c, reminderSentAt: now } : c
          )
        );
        setDetailsCompany({ ...detailsCompany, reminderSentAt: now });
        toast.success(`Reminder sent to ${data.sentTo}`);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to send reminder");
      }
    } catch {
      toast.error("Failed to send reminder");
    } finally {
      setSendingReminder(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/companies/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCompanies((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        if (detailsCompany?.id === deleteTarget.id) {
          setDetailsCompany(null);
        }
        toast.success(`Company "${deleteTarget.name}" deleted`);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  const handleSend = async () => {
    if (!newMessage.trim() || isSending || !chatCompany) return;

    setIsSending(true);
    try {
      const response = await fetch(
        `/api/admin/companies/${chatCompany.id}/messages`,
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

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await fetch("/api/admin/companies");
        if (!res.ok) {
          if (res.status === 403) {
            setError("Access denied");
          } else {
            setError("Failed to load data");
          }
          return;
        }
        const data = await res.json();
        setCompanies(data);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, []);

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

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  const totalCategories = companies.reduce((sum, c) => sum + c.categoriesCount, 0);
  const totalItems = companies.reduce((sum, c) => sum + c.itemsCount, 0);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Admin" />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{companies.length}</p>
                  <p className="text-sm text-muted-foreground">Companies</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">
                    {companies.reduce((sum, c) => sum + c.users.length, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <FolderOpen className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{totalCategories}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{totalItems}</p>
                  <p className="text-sm text-muted-foreground">Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Companies List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Clients</h2>
          <div className="space-y-2">
            {companies.map((company) => {
              const restaurant = company.restaurants[0];
              const title = restaurant?.title || "No name";

              return (
                <div
                  key={company.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border bg-card"
                >
                  {/* Top/Left: stats + name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1" title="Categories">
                        <FolderOpen className="h-3.5 w-3.5" />
                        {company.categoriesCount}
                      </span>
                      <span className="flex items-center gap-1" title="Items">
                        <Package className="h-3.5 w-3.5" />
                        {company.itemsCount}
                      </span>
                      {company.messagesCount > 0 && (
                        <span className="flex items-center gap-1" title="Messages">
                          <MessageSquare className="h-3.5 w-3.5" />
                          {company.messagesCount}
                        </span>
                      )}
                      {company.reminderSentAt && (
                        <span
                          className="flex items-center gap-1 text-green-600"
                          title={`Reminder sent ${formatDate(company.reminderSentAt)}`}
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-medium truncate ${
                        !restaurant?.title ? "text-muted-foreground italic" : ""
                      }`}
                    >
                      {title}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge
                        variant={company.plan === "FREE" ? "secondary" : "default"}
                        className="text-xs"
                      >
                        {company.plan}
                      </Badge>
                      {company.subscriptionStatus === "ACTIVE" && (
                        <Badge
                          variant="outline"
                          className="text-xs text-green-600 border-green-600"
                        >
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Bottom/Right: action buttons */}
                  <div className="flex items-center gap-1 shrink-0 -ml-2 sm:ml-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setChatCompany(company)}
                      title="Chat"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    {restaurant?.slug && (
                      <MenuPreviewModal menuUrl={`/m/${restaurant.slug}`}>
                        <Button variant="ghost" size="icon" title="View Menu">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </MenuPreviewModal>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDetailsCompany(company)}
                      title="Details"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>

      {/* Chat Sheet */}
      <Sheet open={!!chatCompany} onOpenChange={(open) => !open && setChatCompany(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-hidden flex flex-col p-0">
          <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
            <SheetTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat with {chatCompany?.restaurants[0]?.title || "Client"}
            </SheetTitle>
            <SheetDescription>
              {chatCompany?.users[0]?.email}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
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
                          msg.isAdmin ? "opacity-70" : "text-muted-foreground"
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

            {/* Input */}
            <div className="border-t p-4 shrink-0">
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
        </SheetContent>
      </Sheet>

      {/* Details Sheet */}
      <Sheet
        open={!!detailsCompany}
        onOpenChange={(open) => !open && setDetailsCompany(null)}
      >
        <SheetContent className="w-full sm:max-w-xl overflow-hidden flex flex-col p-0">
          <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
            {(() => {
              const restaurant = detailsCompany?.restaurants[0];
              return (
                <div className="flex items-start justify-between pr-8">
                  <div className="flex items-center gap-3">
                    {restaurant?.accentColor && (
                      <div
                        className="w-5 h-5 rounded-full shrink-0"
                        style={{ backgroundColor: restaurant.accentColor }}
                      />
                    )}
                    <div>
                      <SheetTitle
                        className={
                          !restaurant?.title ? "text-muted-foreground italic" : ""
                        }
                      >
                        {restaurant?.title || "No name"}
                      </SheetTitle>
                      <SheetDescription>
                        {detailsCompany && formatDate(detailsCompany.createdAt, true)}
                      </SheetDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={detailsCompany?.plan === "FREE" ? "secondary" : "default"}
                    >
                      {detailsCompany?.plan}
                    </Badge>
                    {detailsCompany?.subscriptionStatus === "ACTIVE" && (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
                        Active
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })()}
          </SheetHeader>

          <div className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Subscription Info */}
              {detailsCompany && detailsCompany.plan !== "FREE" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Subscription
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Billing: {detailsCompany.billingCycle || "N/A"}</p>
                    {detailsCompany.currentPeriodEnd && (
                      <p>Period ends: {formatDate(detailsCompany.currentPeriodEnd)}</p>
                    )}
                    {detailsCompany.stripeCustomerId && (
                      <p className="font-mono text-xs">
                        Customer: {detailsCompany.stripeCustomerId}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">
                    {detailsCompany?.categoriesCount}
                  </p>
                  <p className="text-xs text-muted-foreground">Categories</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">{detailsCompany?.itemsCount}</p>
                  <p className="text-xs text-muted-foreground">Items</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">
                    {detailsCompany?.restaurants.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Restaurants</p>
                </div>
              </div>

              {/* Users */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Users ({detailsCompany?.users.length})
                </h3>
                <div className="space-y-2">
                  {detailsCompany?.users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/30"
                    >
                      <span>{user.email}</span>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {user.role}
                        </Badge>
                        <span className="text-xs">{formatDate(user.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restaurant Details */}
              {(() => {
                const restaurant = detailsCompany?.restaurants[0];
                if (!restaurant) return null;

                return (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Restaurant Details
                    </h3>
                    {restaurant.url && (
                      <a
                        href={restaurant.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm flex items-center gap-1"
                      >
                        {restaurant.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {restaurant.description && (
                      <p className="text-sm text-muted-foreground">
                        {restaurant.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      {restaurant.address && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {restaurant.address}
                        </span>
                      )}
                      {restaurant.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {restaurant.phone}
                        </span>
                      )}
                      {restaurant.instagram && (
                        <span className="flex items-center gap-1">
                          <Instagram className="h-4 w-4" />
                          @{restaurant.instagram}
                        </span>
                      )}
                      {restaurant.languages.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          {restaurant.languages.join(", ")}
                        </span>
                      )}
                    </div>
                    {restaurant.reservationsEnabled && (
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        Reservations enabled
                      </Badge>
                    )}
                  </div>
                );
              })()}

              {/* Actions */}
              <div className="pt-4 border-t space-y-3">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleSendReminder}
                    disabled={sendingReminder}
                  >
                    {sendingReminder ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Mail className="h-4 w-4 mr-2" />
                    )}
                    {detailsCompany?.reminderSentAt
                      ? "Send Reminder Again"
                      : "Send Reminder Email"}
                  </Button>
                  {detailsCompany?.reminderSentAt && (
                    <p className="text-xs text-center text-muted-foreground">
                      Last sent: {formatDate(detailsCompany.reminderSentAt, true)}
                    </p>
                  )}
                </div>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    setDeleteTarget(detailsCompany);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Company
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Company</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>?
              <br />
              <br />
              This will permanently delete:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>{deleteTarget?.restaurants.length || 0} restaurant(s)</li>
                <li>{deleteTarget?.categoriesCount || 0} categories</li>
                <li>{deleteTarget?.itemsCount || 0} items</li>
                <li>{deleteTarget?.users.length || 0} user(s)</li>
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
