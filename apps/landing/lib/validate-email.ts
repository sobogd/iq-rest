/**
 * Strict email validation and sanitization.
 * Prevents header injection, XSS, and other attacks via email field.
 *
 * Returns normalized email or null if invalid.
 */
export function validateEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;

  // Strip whitespace
  const trimmed = raw.trim().toLowerCase();

  // Reject empty
  if (!trimmed) return null;

  // Length limits (RFC 5321: local 64, domain 255, total 254)
  if (trimmed.length > 254) return null;

  // Reject control characters, newlines, null bytes (header injection vectors)
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x1f\x7f]/.test(trimmed)) return null;

  // Reject characters commonly used in injection attacks
  if (/[<>()[\]\\,;:"\s]/.test(trimmed)) return null;

  // Strict email regex: alphanumeric + limited special chars in local part
  // Local part: letters, digits, dots, hyphens, underscores, plus
  // Domain: letters, digits, dots, hyphens; TLD at least 2 chars
  const strictRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!strictRegex.test(trimmed)) return null;

  // Reject consecutive dots
  if (trimmed.includes("..")) return null;

  // Split and validate parts
  const [local, domain] = trimmed.split("@");
  if (!local || !domain) return null;
  if (local.length > 64) return null;
  if (local.startsWith(".") || local.endsWith(".")) return null;
  if (domain.startsWith("-") || domain.endsWith("-")) return null;
  if (domain.startsWith(".") || domain.endsWith(".")) return null;

  return trimmed;
}
