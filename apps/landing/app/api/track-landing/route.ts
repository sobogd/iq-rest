import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
const PAGE_EVENT_REGEX = /^land_page_[a-z]{2}_[a-z0-9_]+$/;

function anonymizeIp(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const ip = raw.trim().split(",")[0]?.trim();
  if (!ip) return null;
  if (ip.includes(":")) {
    const parts = ip.split(":").filter((p) => p.length > 0);
    return parts.slice(0, 4).join(":") + "::";
  }
  const oct = ip.split(".");
  if (oct.length !== 4) return null;
  return `${oct[0]}.${oct[1]}.${oct[2]}.0`;
}

function isValidEvent(event: string): boolean {
  return PAGE_EVENT_REGEX.test(event);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const event = typeof b.event === "string" ? b.event : "";
  if (!isValidEvent(event)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const country = typeof b.country === "string" ? b.country.toUpperCase().slice(0, 2) : "XX";
  const region = typeof b.region === "string" ? b.region.slice(0, 100) : "";
  const rawIp = typeof b.ip === "string" ? b.ip : null;
  const ip = anonymizeIp(rawIp);
  const gclid =
    typeof b.gclid === "string" && GCLID_REGEX.test(b.gclid) ? b.gclid : null;
  const isBot = b.isBot === true;

  try {
    await prisma.$executeRaw`
      INSERT INTO usage_events (id, at, event, country, region, device, platform, gclid, ad_params, "companyId", ip, is_bot)
      VALUES (${randomUUID()}, ${new Date()}, ${event}, ${country}, ${region}, NULL, NULL, ${gclid}, NULL, NULL, ${ip}, ${isBot})
    `;
  } catch {
    // best-effort
  }

  return NextResponse.json({ ok: true });
}
