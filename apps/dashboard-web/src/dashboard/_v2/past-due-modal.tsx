"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";
import { Modal } from "./ui";
import { primaryBtn, secondaryBtn } from "./tokens";
import { useDashboardRouter } from "../_spa/router";
import { track } from "@/lib/dashboard-events";
import { isPastDue, inPastDueGrace, pastDueDaysLeft, type BillingSub } from "./billing-status";

const SHOWN_KEY = "dash_past_due_modal_shown";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Payment-failed reminder — shown when a paid subscription is PAST_DUE. During
 * the grace window it counts down the days left before the public menu is
 * blocked; once grace has expired it tells the owner the menu is offline until
 * they pay. Dismissible for the rest of the day (mirrors TrialModal). Mount
 * AFTER the onboarding + trial modals so it never competes with them.
 */
export function PastDueModal({ sub }: { sub: BillingSub }) {
  const t = useTranslations("pastDueModal");
  const router = useDashboardRouter();

  const [open, setOpen] = useState<boolean>(() => shouldShow(sub));

  useEffect(() => {
    if (open) track("dash_past_due_modal_open");
  }, [open]);

  if (!sub || !isPastDue(sub)) return null;

  const inGrace = inPastDueGrace(sub);
  const daysLeft = pastDueDaysLeft(sub);

  const markShownToday = () => {
    try {
      localStorage.setItem(SHOWN_KEY, todayKey());
    } catch {
      // ignore storage errors
    }
  };

  const hide = () => {
    track("dash_past_due_modal_dismiss");
    markShownToday();
    setOpen(false);
  };
  const goBilling = () => {
    track("dash_past_due_modal_pay");
    markShownToday();
    setOpen(false);
    router.push({ name: "settings.billing", from: "menu" });
  };

  return (
    <Modal
      open={open}
      onClose={hide}
      title={inGrace ? t("title") : t("blockedTitle")}
      size="sm"
      footer={
        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={hide} className={secondaryBtn}>
            {t("hide")}
          </button>
          <button type="button" onClick={goBilling} className={primaryBtn}>
            {t("pay")}
          </button>
        </div>
      }
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {inGrace ? t("daysLeft", { days: daysLeft }) : t("blockedHeadline")}
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-snug">
            {inGrace ? t("body") : t("blockedBody")}
          </p>
        </div>
      </div>
    </Modal>
  );
}

function shouldShow(sub: BillingSub): boolean {
  if (!isPastDue(sub)) return false;
  // Once per day (survives reloads until the owner dismisses it).
  try {
    if (localStorage.getItem(SHOWN_KEY) === todayKey()) return false;
  } catch {
    // ignore storage errors — fall through and show
  }
  return true;
}
