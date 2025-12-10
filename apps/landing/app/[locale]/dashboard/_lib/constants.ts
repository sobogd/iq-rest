export const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
};

export const AVAILABLE_LANGUAGES = ["en", "es"].map((code) => ({
  code,
  name: LANGUAGE_NAMES[code] || code,
}));

export const ACCENT_COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#22c55e",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#000000",
];
