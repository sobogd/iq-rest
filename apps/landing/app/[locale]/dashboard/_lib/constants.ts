export const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  pl: "Polski",
  ru: "Русский",
  uk: "Українська",
  sv: "Svenska",
  da: "Dansk",
  no: "Norsk",
  fi: "Suomi",
  cs: "Čeština",
  el: "Ελληνικά",
  tr: "Türkçe",
  ro: "Română",
  hu: "Magyar",
  bg: "Български",
  hr: "Hrvatski",
  sk: "Slovenčina",
  sl: "Slovenščina",
  et: "Eesti",
  lv: "Latviešu",
  lt: "Lietuvių",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  ar: "العربية",
  he: "עברית",
};

// Top languages shown first
export const TOP_LANGUAGES = ["en", "es"];

// European languages sorted by popularity
export const EUROPEAN_LANGUAGES = [
  "de", "fr", "it", "pt", "nl", "pl", "ru", "uk",
  "sv", "da", "no", "fi", "cs", "el", "tr", "ro",
  "hu", "bg", "hr", "sk", "sl", "et", "lv", "lt",
];

export const AVAILABLE_LANGUAGES = TOP_LANGUAGES.map((code) => ({
  code,
  name: LANGUAGE_NAMES[code] || code,
}));

export const AVAILABLE_EUROPEAN_LANGUAGES = EUROPEAN_LANGUAGES.map((code) => ({
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
