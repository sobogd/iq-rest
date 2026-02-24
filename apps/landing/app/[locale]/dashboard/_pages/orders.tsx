"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { PlayCircle, CheckCheck, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { PageHeader } from "../_ui/page-header";
import { useDashboard } from "../_context/dashboard-context";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { formatPrice } from "@/lib/currencies";

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  items: unknown;
  total: number;
  currency: string;
  customerName: string | null;
  customerPhone: string | null;
  customerAddress: string | null;
  comment: string | null;
  tableNumber: number | null;
  status: string;
  createdAt: string;
}

type FilterTab = "new" | "in_progress" | "all";

const POLLING_INTERVAL = 15000;

interface OrdersPageProps {
  initialOrders: Order[];
}

export function OrdersPage({ initialOrders }: OrdersPageProps) {
  const t = useTranslations("orders");
  const { translations } = useDashboard();

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [updating, setUpdating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("new");
  const [pollKey, setPollKey] = useState(0);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch {
      // silent fail for polling
    }
  }, []);

  useEffect(() => {
    track(DashboardEvent.SHOWED_ORDERS);
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchOrders, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchOrders, pollKey]);

  const filteredOrders = useMemo(() => {
    if (activeTab === "all") return orders;
    return orders.filter((o) => o.status === activeTab);
  }, [orders, activeTab]);

  const newCount = useMemo(() => orders.filter((o) => o.status === "new").length, [orders]);
  const inProgressCount = useMemo(() => orders.filter((o) => o.status === "in_progress").length, [orders]);

  async function handleUpdateStatus(id: string, status: string) {
    setUpdating(id);

    const prevOrders = orders;
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );

    const eventMap: Record<string, DashboardEvent> = {
      in_progress: DashboardEvent.CLICKED_START_ORDER,
      completed: DashboardEvent.CLICKED_COMPLETE_ORDER,
      cancelled: DashboardEvent.CLICKED_CANCEL_ORDER,
    };
    if (eventMap[status]) track(eventMap[status]);

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        setOrders(prevOrders);
        track(DashboardEvent.ERROR_SAVE, { page: "orders" });
        toast.error(t("error"));
      } else {
        setPollKey((k) => k + 1);
        toast.success(t("statusUpdated"));
      }
    } catch {
      setOrders(prevOrders);
      track(DashboardEvent.ERROR_SAVE, { page: "orders" });
      toast.error(t("error"));
    } finally {
      setUpdating(null);
    }
  }

  function renderOrder(order: Order) {
    const isUpdating = updating === order.id;
    const items = (Array.isArray(order.items) ? order.items : []) as OrderItem[];

    return (
      <div key={order.id} className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
        {/* Header: table/name + time + cancel */}
        <div className="flex items-center h-12 bg-muted/30">
          <div className="flex items-center px-4 flex-1 min-w-0">
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground truncate">
              {order.tableNumber != null && `${t("table")} ${order.tableNumber}`}
              {order.tableNumber != null && order.customerName && " — "}
              {order.customerName}
              {!order.tableNumber && !order.customerName && format(new Date(order.createdAt), "HH:mm")}
            </span>
          </div>
          <span className="text-sm text-muted-foreground shrink-0 px-3">
            {format(new Date(order.createdAt), "HH:mm")}
          </span>
          {(order.status === "new" || order.status === "in_progress") && (
            <button
              onClick={() => !isUpdating && handleUpdateStatus(order.id, "cancelled")}
              className="flex items-center justify-center w-12 shrink-0 self-stretch border-l border-foreground/5 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
              disabled={isUpdating}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Items as separate rows */}
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center h-12 px-4 border-t border-foreground/5"
          >
            <span className="text-sm font-medium flex-1 min-w-0 truncate">{item.name}</span>
            <span className="text-sm text-muted-foreground ml-2 shrink-0">
              {item.qty} × {formatPrice(item.price, order.currency)}
            </span>
          </div>
        ))}

        {/* Total row */}
        <div className="flex items-center h-12 px-4 border-t border-foreground/5">
          <span className="text-sm font-semibold flex-1">{t("total")}</span>
          <span className="text-sm font-bold">{formatPrice(order.total, order.currency)}</span>
        </div>

        {/* Customer info */}
        {order.customerPhone && (
          <div className="flex items-center h-10 px-4 border-t border-foreground/5">
            <span className="text-sm text-muted-foreground/60 truncate">{order.customerPhone}</span>
          </div>
        )}
        {order.customerAddress && (
          <div className="flex items-center h-10 px-4 border-t border-foreground/5">
            <span className="text-sm text-muted-foreground truncate">{order.customerAddress}</span>
          </div>
        )}
        {order.comment && (
          <div className="flex items-center h-10 px-4 border-t border-foreground/5">
            <span className="text-sm text-muted-foreground italic truncate">{order.comment}</span>
          </div>
        )}

        {/* Status badge for completed in "all" tab */}
        {order.status === "completed" && (
          <div className="flex items-center h-10 px-4 border-t border-foreground/5">
            <span className="text-xs text-muted-foreground/50 uppercase tracking-wide">{t("completed")}</span>
          </div>
        )}
        {order.status === "in_progress" && activeTab === "all" && (
          <div className="flex items-center h-10 px-4 border-t border-foreground/5">
            <span className="text-xs text-muted-foreground/50 uppercase tracking-wide">{t("inProgress")}</span>
          </div>
        )}
        {order.status === "cancelled" && (
          <div className="flex items-center h-10 px-4 border-t border-foreground/5">
            <span className="text-xs text-red-400/70 uppercase tracking-wide">{t("cancelled")}</span>
          </div>
        )}

        {/* Action: start order (green, like "add item" in menu) */}
        {order.status === "new" && (
          <div
            onClick={() => !isUpdating && handleUpdateStatus(order.id, "in_progress")}
            className={`flex items-center h-12 px-4 border-t border-foreground/5 transition-colors bg-green-500/5 hover:bg-green-500/10 ${isUpdating ? "opacity-50" : "cursor-pointer"}`}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 mr-2 text-green-500 animate-spin" />
            ) : (
              <PlayCircle className="h-4 w-4 mr-2 text-green-500" />
            )}
            <span className="text-sm font-medium text-green-700 dark:text-green-400">{t("startOrder")}</span>
          </div>
        )}

        {/* Action: complete order (green, like "add item" in menu) */}
        {order.status === "in_progress" && (
          <div
            onClick={() => !isUpdating && handleUpdateStatus(order.id, "completed")}
            className={`flex items-center h-12 px-4 border-t border-foreground/5 transition-colors bg-green-500/5 hover:bg-green-500/10 ${isUpdating ? "opacity-50" : "cursor-pointer"}`}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 mr-2 text-green-500 animate-spin" />
            ) : (
              <CheckCheck className="h-4 w-4 mr-2 text-green-500" />
            )}
            <span className="text-sm font-medium text-green-700 dark:text-green-400">{t("complete")}</span>
          </div>
        )}
      </div>
    );
  }

  const tabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: "new", label: t("new"), count: newCount },
    { key: "in_progress", label: t("inProgress"), count: inProgressCount },
    { key: "all", label: t("all") },
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.orders} />
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4 flex flex-col min-h-full">

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 h-10 rounded-2xl border text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-destructive bg-destructive text-destructive-foreground"
                    : "border-border bg-muted/50 text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="flex items-center justify-center size-5 rounded-full bg-primary-foreground/20 text-[11px] leading-none">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Orders list */}
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1">
              <p className="text-sm text-muted-foreground">{t("noOrders")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => renderOrder(order))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
