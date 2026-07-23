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
  // Re-render bound components when resources are added at runtime. The
  // per-restaurant custom UI-text overrides are merged via i18n.addResource
  // after the menu loads (see routes/__root.tsx); without this, react-i18next
  // only re-renders on languageChanged, so a same-language override would not
  // repaint. TanStack Router memoizes <Outlet/>, so a parent state bump can't
  // stand in for this.
  react: { bindI18nStore: "added removed" },
});

export default i18n;
