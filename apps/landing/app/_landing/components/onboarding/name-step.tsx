"use client";

import { useTranslations } from "next-intl";

export function NameStep({
  value,
  onChange,
  onBack,
  onContinue,
  onFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  onBack: () => void;
  onContinue: () => void;
  onFocus?: () => void;
}) {
  const t = useTranslations("createFlow");
  const trimmed = value.trim();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (trimmed) onContinue();
      }}
      className="flex flex-col"
    >
      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight mb-2">
        {t("step2.title")}
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground leading-snug mb-6">
        {t("step2.subtitle")}
      </p>

      <label htmlFor="onboarding-name" className="block text-sm font-medium text-foreground mb-2 tracking-tight">
        {t("step2.nameLabel")}
      </label>
      <input
        id="onboarding-name"
        type="text"
        required
        autoFocus
        placeholder={t("step2.namePlaceholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        className="w-full h-12 px-4 text-base text-foreground bg-background border border-border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
      />

      <div className="flex gap-3 mt-7">
        <button
          type="button"
          onClick={onBack}
          className="w-24 h-12 text-sm font-medium text-foreground bg-transparent border border-border rounded-xl hover:border-foreground transition-colors tracking-tight"
        >
          {t("back")}
        </button>
        <button
          type="submit"
          disabled={!trimmed}
          className="flex-1 h-12 text-base font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-xl hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {t("continue")}
        </button>
      </div>
    </form>
  );
}
