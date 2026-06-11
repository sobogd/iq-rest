import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// All 35 supported menu locales — auto-imported via Vite glob.
const modules = import.meta.glob("../locales/*.json", { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>;

const resources: Record<string, { translation: Record<string, unknown> }> = {};
for (const path in modules) {
  const code = path.match(/([a-z]{2,3})\.json$/i)?.[1];
  if (code) resources[code] = { translation: modules[path].default };
}

void i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
