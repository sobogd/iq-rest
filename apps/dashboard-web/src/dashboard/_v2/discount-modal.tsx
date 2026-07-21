"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "./ui";
import { formInputClass, primaryBtn } from "./tokens";
import { sanitizePriceInput } from "./helpers";
import type { Discount } from "./types";

// Discount picker shared by the order-level "Add discount" menu and the
// per-item "Add discount" menu. Two types — percent and fixed — with an
// optional reason for analytics. Save replaces the existing discount;
// Remove clears it. Server clamps + rounds + validates on patch.

interface DiscountModalProps {
  open: boolean;
  initial: Discount | null;
  // Optional copy override — the menu provides "order" / "item" label.
  title?: string;
  currencySymbol: string;
  onClose: () => void;
  onSave: (next: Discount | null) => void | Promise<void>;
}

export function DiscountModal({
  open,
  initial,
  title,
  currencySymbol,
  onClose,
  onSave,
}: DiscountModalProps) {
  const t = useTranslations("dashboard.orders");
  const [type, setType] = useState<Discount["type"]>("percent");
  const [value, setValue] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Reset only on the closed→open transition. `initial` is re-derived from
  // `orders` on every parent render, so keeping it in the deps meant any
  // SSE/poll tick wiped the user's in-progress edits while the modal was open.
  const initialRef = useRef(initial);
  initialRef.current = initial;
  useEffect(() => {
    if (!open) return;
    const init = initialRef.current;
    setType(init?.type ?? "percent");
    setValue(init?.value != null ? String(init.value) : "");
    setReason(init?.reason ?? "");
    setSaving(false);
  }, [open]);

  const numericValue = Number(value);
  const valid =
    Number.isFinite(numericValue) &&
    numericValue > 0 &&
    (type === "percent" ? numericValue <= 100 : true);

  async function handleSave() {
    if (!valid || saving) return;
    setSaving(true);
    try {
      const next: Discount = {
        type,
        value: numericValue,
        ...(reason.trim() ? { reason: reason.trim() } : {}),
      };
      await onSave(next);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    if (saving) return;
    setSaving(true);
    try {
      await onSave(null);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => !saving && onClose()}
      title={title || t("discountTitle", { defaultValue: "Discount" })}
      size="sm"
      closeOnBackdrop={!saving}
      footer={
        <div className="flex items-center justify-between gap-2">
          {initial ? (
            <button
              type="button"
              data-testid="discount-remove"
              onClick={() => void handleRemove()}
              disabled={saving}
              className="h-[36px] px-[16px] text-[14px] font-semibold text-red-600 rounded-lg transition-colors disabled:opacity-50 inline-flex items-center"
            >
              <span className="truncate">{t("discountRemove", { defaultValue: "Remove" })}</span>
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            data-testid="discount-save"
            onClick={() => void handleSave()}
            disabled={!valid || saving}
            className={primaryBtn + " inline-flex items-center"}
          >
            <span className="truncate">{t("discountSave", { defaultValue: "Save" })}</span>
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2.5">
            {t("discountTypeLabel", { defaultValue: "Type" })}:
          </label>
          {/* Segmented control — mirrors the day/month switch on the
              bookings page so the kiosk + admin share one visual idiom
              for binary mode pickers. */}
          <div className="inline-flex items-center rounded-lg border border-border bg-card overflow-hidden">
            <TypeBtn active={type === "percent"} onClick={() => setType("percent")}>
              {t("discountTypePercent", { defaultValue: "Percent" })}
            </TypeBtn>
            <TypeBtn active={type === "fixed"} onClick={() => setType("fixed")}>
              {t("discountTypeFixed", { defaultValue: "Fixed" })}
            </TypeBtn>
          </div>
        </div>
        <div>
          <label htmlFor="discount-value" className="block text-sm font-medium text-foreground mb-2.5">
            {t("discountValueLabel", { defaultValue: "Value" })}:
          </label>
          <div className="relative">
            <input
              id="discount-value"
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(e) => setValue(sanitizePriceInput(e.target.value))}
              placeholder={type === "percent" ? "10" : "5.00"}
              className={formInputClass + " pl-3 pr-8 tabular-nums"}
            />
            <span className="absolute top-1 right-1 w-8 h-8 inline-flex items-center justify-center text-sm text-muted-foreground pointer-events-none">
              {type === "percent" ? "%" : currencySymbol}
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="discount-reason" className="block text-sm font-medium text-foreground mb-2.5">
            {t("discountReasonLabel", { defaultValue: "Reason (optional)" })}:
          </label>
          <input
            id="discount-reason"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t("discountReasonPlaceholder", { defaultValue: "e.g. Loyal customer" })}
            className={formInputClass}
          />
        </div>
      </div>
    </Modal>
  );
}

function TypeBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        // h-10 matches the form inputs (formInputClass) next to the tabs.
        "h-10 px-4 text-sm font-medium transition-colors " +
        (active ? "bg-primary-gradient text-primary-foreground" : "text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
