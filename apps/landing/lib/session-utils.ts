import { createHash, timingSafeEqual } from "crypto";

export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}
