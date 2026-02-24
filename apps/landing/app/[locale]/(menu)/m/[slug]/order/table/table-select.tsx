"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/currencies";

interface TableInfo {
  id: string;
  number: number;
  capacity: number;
  zone: string | null;
  translations: Record<string, { zone?: string }> | null;
  imageUrl: string | null;
}

interface DraftItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface OrderDraft {
  items: DraftItem[];
  total: number;
  customerName: string | null;
  customerPhone: string | null;
  customerAddress: string | null;
  comment: string | null;
}

interface TableSelectProps {
  tables: TableInfo[];
  slug: string;
  locale: string;
  currency: string;
  whatsapp: string;
  restaurantTitle: string;
  accentColor: string;
  orderMode: string;
  isPreview: boolean;
  translations: {
    selectTable: string;
    tableLabel: string;
    table: string;
    guests: string;
    sendWhatsApp: string;
    sendOrder: string;
    orderLimitReached: string;
  };
}

const ORDER_DRAFT_KEY = "iqrest_order_draft";

function getTranslatedZone(table: TableInfo, locale: string): string | null {
  const translated = table.translations?.[locale]?.zone;
  return translated || table.zone;
}

export function TableSelect({
  tables,
  slug,
  locale,
  currency,
  whatsapp,
  restaurantTitle,
  accentColor,
  orderMode,
  isPreview,
  translations: t,
}: TableSelectProps) {
  const [selectedTableNumber, setSelectedTableNumber] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [draft, setDraft] = useState<OrderDraft | null>(null);

  const showWhatsApp = orderMode === "whatsapp" || orderMode === "both";

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ORDER_DRAFT_KEY);
      if (raw) setDraft(JSON.parse(raw));
    } catch {}
  }, []);

  const handleSendOrder = async () => {
    if (sending || !draft) return;
    setSending(true);

    try {
      if (!isPreview) {
        const orderPayload = {
          slug,
          items: draft.items,
          total: draft.total,
          customerName: draft.customerName,
          customerPhone: draft.customerPhone,
          customerAddress: draft.customerAddress,
          comment: draft.comment,
          tableNumber: selectedTableNumber ?? null,
        };

        const res = await fetch("/api/public/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.error === "limit_reached") {
            setLimitReached(true);
            setSending(false);
            return;
          }
          setSending(false);
          return;
        }

        if (data.mode === "whatsapp" || data.mode === "both") {
          openWhatsApp();
        }
      } else if (showWhatsApp) {
        openWhatsApp();
      }

      const previewParam = isPreview ? "?preview=1" : "";
      window.location.href = window.location.pathname.replace(/\/table$/, `/success${previewParam}`);
    } catch {
      setSending(false);
    }
  };

  function openWhatsApp() {
    if (!draft) return;
    const lines: string[] = [];
    lines.push(`*${restaurantTitle}*`);
    lines.push("");

    if (selectedTableNumber) {
      lines.push(`${t.tableLabel}: ${selectedTableNumber}`);
      lines.push("");
    }

    for (const item of draft.items) {
      lines.push(`${item.qty}x ${item.name} — ${formatPrice(item.price * item.qty, currency)}`);
    }

    lines.push("");
    lines.push(`*${formatPrice(draft.total, currency)}*`);

    if (draft.customerName) {
      lines.push("");
      lines.push(draft.customerName);
    }
    if (draft.customerPhone) lines.push(draft.customerPhone);
    if (draft.customerAddress) lines.push(draft.customerAddress);
    if (draft.comment) lines.push(draft.comment);

    const text = encodeURIComponent(lines.join("\n"));
    const waPhone = whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${waPhone}?text=${text}`, "_blank");
  }

  if (limitReached) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-gray-400 text-lg">{t.orderLimitReached}</p>
      </div>
    );
  }

  const buttonLabel = showWhatsApp ? t.sendWhatsApp : t.sendOrder;

  return (
    <div className="space-y-6 pb-[100px]">
      {/* Table selection */}
      <label className="text-base font-semibold text-black">{t.selectTable}:</label>

      <div className="flex flex-col gap-3">
        {tables.map((table) => (
          <div key={table.id} className="flex items-center gap-3">
            {table.imageUrl && (
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={table.imageUrl}
                  alt={`${t.table} ${table.number}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => setSelectedTableNumber(table.number)}
              className="flex-1 h-16 rounded-lg border-2 transition-colors flex flex-col justify-center px-4 text-left"
              style={
                selectedTableNumber === table.number
                  ? { borderColor: accentColor, backgroundColor: accentColor, color: "#fff" }
                  : { borderColor: "#e5e7eb", backgroundColor: "#fff", color: "#000" }
              }
            >
              <span className="text-sm font-semibold">
                {getTranslatedZone(table, locale) || `${t.table} ${table.number}`}
              </span>
              <span
                className="text-xs"
                style={{ color: selectedTableNumber === table.number ? "rgba(255,255,255,0.7)" : "#6b7280" }}
              >
                {table.capacity} {t.guests}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Send button */}
      {selectedTableNumber != null && (
      <button
        onClick={handleSendOrder}
        disabled={sending || !draft}
        className="w-full h-14 rounded-lg font-bold text-lg flex items-center justify-center gap-3 text-white active:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {sending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {showWhatsApp && (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            )}
            {buttonLabel}
          </>
        )}
      </button>
      )}
    </div>
  );
}
