-- Per-restaurant overrides for public-menu UI i18n strings.
-- Shape: { [locale]: { [i18nKey]: string } }. Null / empty ⇒ diner SPA uses built-in i18n.
ALTER TABLE "restaurants" ADD COLUMN "customTexts" JSONB;
