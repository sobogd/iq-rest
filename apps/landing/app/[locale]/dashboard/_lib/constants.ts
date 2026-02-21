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
  sr: "Српски",
  ca: "Català",
  ga: "Gaeilge",
  is: "Íslenska",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  ar: "العربية",
  he: "עברית",
  fa: "فارسی",
};

// Top languages shown first
export const TOP_LANGUAGES = ["en", "es"];

// European languages sorted by popularity
export const EUROPEAN_LANGUAGES = [
  "de", "fr", "it", "pt", "nl", "pl", "ru", "uk",
  "sv", "da", "no", "fi", "cs", "el", "tr", "ro",
  "hu", "bg", "hr", "sk", "sl", "et", "lv", "lt",
  "sr", "ca", "ga", "is",
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
  "#8B2252",  // burgundy
  "#9B1B30",  // crimson
  "#A0522D",  // sienna
  "#6B4C3B",  // terracotta
  "#7B3F00",  // chocolate
  "#B8860B",  // dark goldenrod
  "#C9A96E",  // warm gold
  "#D4A574",  // camel
  "#6B7B3A",  // olive
  "#556B2F",  // dark olive
  "#3B6B4F",  // forest green
  "#2F4F4F",  // dark slate
  "#1B3A4B",  // deep navy
  "#2C3E6B",  // royal blue
  "#4A5568",  // slate gray
  "#6B5B73",  // mauve
  "#5C4033",  // espresso
  "#8B7355",  // tan
  "#C45B28",  // rust
  "#333333",  // dark gray
  "#1A1A1A",  // near black
  "#000000",  // black
];
