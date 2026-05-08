// Resolve a translated field from translations[locale]?[field] with a fallback.
export function tField<T extends "name" | "description" | "zone">(
  fallback: string | null | undefined,
  translations: Record<string, Partial<Record<T, string | null | undefined>>> | null | undefined,
  field: T,
  locale: string,
): string {
  const t = translations?.[locale]?.[field];
  if (typeof t === "string" && t.trim().length > 0) return t;
  return fallback || "";
}
