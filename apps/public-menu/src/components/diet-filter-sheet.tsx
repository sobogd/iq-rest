import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { DIETS } from "../lib/diets";
import { DietIcon } from "./diet-icon";

interface Props {
  open: boolean;
  onClose: () => void;
  selected: string[];
  accentColor?: string;
  onApply: (next: string[]) => void;
  // When provided, only these diet codes are shown as filter chips. Falls back
  // to the full 13-code list when omitted.
  availableCodes?: string[];
}

export function DietFilterSheet({ open, onClose, selected, accentColor, onApply, availableCodes }: Props) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState<string[]>(selected);

  useEffect(() => {
    if (open) setDraft(selected);
  }, [open, selected]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function toggle(code: string) {
    setDraft((d) => (d.includes(code) ? d.filter((c) => c !== code) : [...d, code]));
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <button
        type="button"
        aria-label="Close"
        className="flex-1 bg-black/40"
        onClick={onClose}
      />
      <div
        className="bg-white rounded-t-2xl shadow-2xl flex flex-col"
        style={{ maxHeight: "85vh", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-0.5">
          <h2 className="text-lg font-semibold text-black">
            {t("publicMenu.dietFilter.title", { defaultValue: "Filters" })}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 p-2 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="px-5 text-xs text-gray-500 pb-5">
          {t("publicMenu.dietFilter.tip", {
            defaultValue: "Show only dishes matching all selected tags.",
          })}
        </p>
        <div className="px-5 pb-4 overflow-y-auto flex flex-wrap gap-2">
          {(availableCodes
            ? DIETS.filter((d) => availableCodes.includes(d.code))
            : DIETS
          ).map((d) => {
            const checked = draft.includes(d.code);
            const accent = accentColor || "#000";
            return (
              <button
                key={d.code}
                type="button"
                onClick={() => toggle(d.code)}
                className="inline-flex items-center gap-1.5 h-10 px-3 text-sm font-semibold rounded-lg border-2 transition-colors"
                style={
                  checked
                    ? { borderColor: accent, backgroundColor: accent, color: "#fff" }
                    : { borderColor: "#e5e7eb", backgroundColor: "#fff", color: "#000" }
                }
              >
                <DietIcon code={d.code} className="w-5 h-5" />
                {t(`publicMenu.dietNames.${d.code}`, { defaultValue: d.code })}
              </button>
            );
          })}
        </div>
        <div className="border-t border-gray-200 px-5 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setDraft([]);
              onApply([]);
              onClose();
            }}
            className="flex-1 h-11 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm active:bg-gray-50"
          >
            {t("publicMenu.dietFilter.reset", { defaultValue: "Reset" })}
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(draft);
              onClose();
            }}
            className="flex-1 h-11 rounded-lg text-white font-semibold text-sm active:opacity-80"
            style={{ backgroundColor: accentColor || "#000" }}
          >
            {t("publicMenu.dietFilter.apply", { defaultValue: "Apply" })}
          </button>
        </div>
      </div>
    </div>
  );
}
