"use client";

import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { LanguageSwitcher, SubpageStickyBar, TranslatedInput } from "./ui";
import { SparklesIcon } from "./icons";
import { AVAILABLE_LANGUAGES } from "./i18n";
import type { Ml } from "./types";
import { useRestaurant } from "./restaurant-context";
import {
 fetchRestaurant,
 translateCustomTexts,
 updateCustomTexts,
 type CustomTexts,
} from "./api";
import { track } from "@/lib/dashboard-events";

// Curated set of public-menu i18n keys owners may override, grouped for the
// form. `def` is the built-in English string — shown as the field label and
// placeholder so the owner knows what they're changing. Keep these keys in
// sync with apps/public-menu/src/locales/*.json (an override for a key that no
// longer exists is simply ignored by the diner SPA). Allergen/diet codes are
// intentionally excluded — the public menu maps them to filter logic.
interface CustomTextDef {
 key: string;
 def: string;
}
interface CustomTextGroup {
 titleKey: string;
 items: CustomTextDef[];
}

export const CUSTOM_TEXT_GROUPS: CustomTextGroup[] = [
 {
 titleKey: "navigation",
 items: [
 { key: "publicMenu.onlineMenu", def: "Online Menu" },
 { key: "publicMenu.contacts", def: "Contacts" },
 { key: "publicMenu.reserve", def: "Book a Table" },
 { key: "publicMenu.language", def: "Language" },
 { key: "publicMenu.noCategories", def: "No categories available" },
 ],
 },
 {
 titleKey: "order",
 items: [
 { key: "publicMenu.order.add", def: "Add" },
 { key: "publicMenu.order.yourOrder", def: "Your Order" },
 { key: "publicMenu.order.emptyCart", def: "Your cart is empty" },
 { key: "publicMenu.order.total", def: "Total" },
 { key: "publicMenu.order.continue", def: "Continue" },
 { key: "publicMenu.order.sendOrder", def: "Send Order" },
 { key: "publicMenu.order.successTitle", def: "Order placed" },
 { key: "publicMenu.order.successBody", def: "Thanks! The restaurant will get back to you shortly." },
 ],
 },
 {
 titleKey: "reservation",
 items: [
 { key: "publicReserve.title", def: "Book a Table" },
 { key: "publicReserve.selectDate", def: "Select Date" },
 { key: "publicReserve.selectTime", def: "Select Time" },
 { key: "publicReserve.selectGuests", def: "Number of Guests" },
 { key: "publicReserve.yourDetails", def: "Your Details" },
 { key: "publicReserve.submit", def: "Book Table" },
 { key: "publicReserve.success", def: "Reservation Submitted!" },
 { key: "publicReserve.successAuto", def: "Your reservation is confirmed. You will receive a confirmation email shortly." },
 { key: "publicReserve.successManual", def: "Your reservation request has been submitted. You will receive an email once confirmed." },
 ],
 },
];

const ALL_KEYS = CUSTOM_TEXT_GROUPS.flatMap((g) => g.items.map((i) => i.key));

// The API stores { [locale]: { [key]: value } }; the form binds one Ml
// (= { [locale]: value }) per key. These two helpers convert between them.
function toKeyMl(ct: CustomTexts | null | undefined): Record<string, Ml> {
 const out: Record<string, Ml> = {};
 for (const key of ALL_KEYS) out[key] = {};
 if (ct) {
 for (const [locale, byKey] of Object.entries(ct)) {
 if (!byKey || typeof byKey !== "object") continue;
 for (const [key, val] of Object.entries(byKey)) {
 if (!out[key]) out[key] = {};
 if (typeof val === "string") out[key][locale] = val;
 }
 }
 }
 return out;
}

function toCustomTexts(byKey: Record<string, Ml>): CustomTexts {
 const out: CustomTexts = {};
 for (const [key, ml] of Object.entries(byKey)) {
 if (!ml) continue;
 for (const [locale, val] of Object.entries(ml)) {
 const text = (val || "").trim();
 if (!text) continue;
 (out[locale] ??= {})[key] = text;
 }
 }
 return out;
}

export function CustomTextsSettingsPage({ onBack }: { onBack: () => void }) {
 const restaurant = useRestaurant();
 const t = useTranslations("dashboard.settings");
 const tct = useTranslations("dashboard.settings.customTexts");
 const qc = useQueryClient();
 const languages = restaurant.languages;
 const defaultLang = restaurant.defaultLang;

 const [lang, setLang] = useState(defaultLang);
 const [byKey, setByKey] = useState<Record<string, Ml>>(() => toKeyMl(null));
 const [loaded, setLoaded] = useState(false);
 const [saving, setSaving] = useState(false);
 const [translating, setTranslating] = useState(false);

 useEffect(() => {
 window.scrollTo({ top: 0, behavior: "auto" });
 }, []);

 useEffect(() => {
 let alive = true;
 void fetchRestaurant().then((r) => {
 if (!alive) return;
 setByKey(toKeyMl(r?.customTexts));
 setLoaded(true);
 });
 return () => {
 alive = false;
 };
 }, []);

 const miniLangs = useMemo(
 () =>
 AVAILABLE_LANGUAGES.filter((l) => languages.includes(l.code)).map((l) => ({
 code: l.code,
 label: l.label,
 short: l.short,
 })),
 [languages],
 );

 function setKey(key: string, ml: Ml) {
 setByKey((prev) => ({ ...prev, [key]: ml }));
 }

 async function save() {
 if (saving) return;
 track("dash_settings_custom_texts_save");
 setSaving(true);
 try {
 await updateCustomTexts(toCustomTexts(byKey));
 await qc.invalidateQueries({ queryKey: ["restaurant"] });
 onBack();
 } finally {
 setSaving(false);
 }
 }

 // Persist the current draft first so the server translates from the latest
 // default-language values, then gap-fill every other enabled language.
 async function doTranslateAll() {
 if (translating || saving) return;
 track("dash_settings_custom_texts_translate");
 setTranslating(true);
 try {
 await updateCustomTexts(toCustomTexts(byKey));
 const merged = await translateCustomTexts();
 setByKey(toKeyMl(merged));
 await qc.invalidateQueries({ queryKey: ["restaurant"] });
 } finally {
 setTranslating(false);
 }
 }

 const canTranslate = languages.length > 1 && loaded && !translating && !saving;

 return (
 <div>
 <SubpageStickyBar onBack={onBack} onSave={save} canSave={loaded && !saving} title={tct("title")}>
 {miniLangs.length > 1 ? (
 <LanguageSwitcher lang={lang} onChange={setLang} languages={miniLangs} />
 ) : null}
 {languages.length > 1 ? (
 <button
 type="button"
 onClick={doTranslateAll}
 disabled={!canTranslate}
 className="h-8 px-2.5 text-xs font-medium text-muted-foreground bg-secondary rounded-md inline-flex items-center gap-1 disabled:opacity-50"
 >
 {translating ? (
 <span className="w-3 h-3 border-2 border-input border-t-foreground rounded-full animate-spin" />
 ) : (
 <SparklesIcon size={14} />
 )}
 {tct("translateAll")}
 </button>
 ) : null}
 </SubpageStickyBar>

 <div className="max-w-5xl mx-auto md:px-6 pt-5 md:pt-4">
 <div className="mb-6">
 <div className="text-xs text-muted-foreground">{t("breadcrumb")}</div>
 <h2 className="text-xl font-medium text-foreground mt-1">{tct("title")}</h2>
 <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">{tct("subtitle")}</p>
 </div>

 {CUSTOM_TEXT_GROUPS.map((group) => (
 <div key={group.titleKey} className="mb-8">
 <h3 className="text-sm font-medium text-foreground mb-3">
 {tct(`groups.${group.titleKey}` as never)}
 </h3>
 <div className="space-y-4">
 {group.items.map((item) => (
 <TranslatedInput
 key={item.key}
 id={`ct-${item.key}`}
 label={item.def}
 value={byKey[item.key] ?? {}}
 lang={lang}
 defaultLang={defaultLang}
 languages={languages}
 onChange={(ml) => setKey(item.key, ml)}
 placeholder={item.def}
 />
 ))}
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}
