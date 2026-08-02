"use client";

// billing-features-constructor — Stripe Elements payment modal.
//
// Two modes:
//  · "payment" — confirm a subscription's first invoice PaymentIntent (handles
//    SCA/3DS in the PaymentElement).
//  · "setup"   — add/change a card via a SetupIntent, then set it as default.
// English-first strings.

import { useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getStripe } from "./stripe";
import { setDefaultPaymentMethod } from "./api";

type Mode = "payment" | "setup";

function InnerForm({ mode, onDone, onClose }: { mode: Mode; onDone: () => void; onClose: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!stripe || !elements || busy) return;
    setBusy(true);
    setError(null);
    if (mode === "payment") {
      const { error } = await stripe.confirmPayment({ elements, redirect: "if_required" });
      if (error) {
        setError(error.message || "Payment failed");
        setBusy(false);
        return;
      }
      onDone();
    } else {
      const { error, setupIntent } = await stripe.confirmSetup({ elements, redirect: "if_required" });
      if (error) {
        setError(error.message || "Could not save card");
        setBusy(false);
        return;
      }
      const pm = setupIntent?.payment_method;
      if (typeof pm === "string") await setDefaultPaymentMethod(pm);
      onDone();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PaymentElement />
      {error ? <div className="text-sm text-red-600">{error}</div> : null}
      <div className="flex items-center justify-end gap-2">
        <button type="button" onClick={onClose} className="h-10 px-4 text-sm rounded-lg border border-input">
          Cancel
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={busy || !stripe}
          className="h-10 px-5 text-sm font-semibold rounded-lg text-primary-foreground bg-primary disabled:opacity-50"
        >
          {busy ? "Processing…" : mode === "payment" ? "Pay" : "Save card"}
        </button>
      </div>
    </div>
  );
}

export function PaymentModal({
  mode,
  clientSecret,
  onDone,
  onClose,
}: {
  mode: Mode;
  clientSecret: string;
  onDone: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-card border border-border p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-base font-semibold text-foreground mb-4">
          {mode === "payment" ? "Payment" : "Payment method"}
        </div>
        <Elements stripe={getStripe()} options={{ clientSecret, appearance: { theme: "stripe" } }}>
          <InnerForm mode={mode} onDone={onDone} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
}
