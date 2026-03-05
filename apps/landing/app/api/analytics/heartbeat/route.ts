import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ ok: true });
    }

    await prisma.session.update({
      where: { id: sessionId },
      data: { lastSeenAt: new Date() },
    }).catch(() => {
      // Session not found — ignore silently
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
