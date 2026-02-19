import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId } = body;

    if (!sessionId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: sessionId, userId" },
        { status: 400 }
      );
    }

    // Find companyId via UserCompany
    const userCompany = await prisma.userCompany.findFirst({
      where: { userId },
      select: { companyId: true },
    });
    const companyId = userCompany?.companyId || null;

    // Find the anonymous session
    const anonSession = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    // Find existing session for this userId (oldest = canonical)
    const existingSession = await prisma.session.findFirst({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    if (existingSession && anonSession && existingSession.id !== sessionId) {
      // Merge: move all events from anonymous to existing
      await prisma.analyticsEvent.updateMany({
        where: { sessionId },
        data: { sessionId: existingSession.id },
      });

      // Merge first-touch: keep existing values, fill nulls from anonymous
      // Merge last-touch: take from anonymous (it's more recent)
      // OR-merge boolean flags
      await prisma.session.update({
        where: { id: existingSession.id },
        data: {
          // First-touch: keep existing, fill nulls
          country: existingSession.country ?? anonSession.country,
          gclid: existingSession.gclid ?? anonSession.gclid,
          keyword: existingSession.keyword ?? anonSession.keyword,
          // Last-touch: take from anonymous (more recent)
          userAgent: anonSession.userAgent ?? existingSession.userAgent,
          browser: anonSession.browser ?? existingSession.browser,
          device: anonSession.device ?? existingSession.device,
          ip: anonSession.ip ?? existingSession.ip,
          // Ensure companyId is set
          companyId: existingSession.companyId ?? companyId,
          // OR-merge boolean flags
          wasRegistered: existingSession.wasRegistered || anonSession.wasRegistered || true,
          namedRestaurant: existingSession.namedRestaurant || anonSession.namedRestaurant,
          selectedType: existingSession.selectedType || anonSession.selectedType,
          modifiedMenu: existingSession.modifiedMenu || anonSession.modifiedMenu,
          modifiedContacts: existingSession.modifiedContacts || anonSession.modifiedContacts,
          modifiedDesign: existingSession.modifiedDesign || anonSession.modifiedDesign,
          reached50Views: existingSession.reached50Views || anonSession.reached50Views,
          paidSubscription: existingSession.paidSubscription || anonSession.paidSubscription,
        },
      });

      // Delete the anonymous session
      await prisma.session.delete({
        where: { id: sessionId },
      });

      return NextResponse.json({ sessionId: existingSession.id });
    } else if (anonSession) {
      // No existing session for this user — just update the anonymous one
      await prisma.session.update({
        where: { id: sessionId },
        data: {
          userId,
          companyId,
          wasRegistered: true,
        },
      });

      return NextResponse.json({ sessionId });
    } else {
      // No anonymous session found — create one
      await prisma.session.create({
        data: {
          id: sessionId,
          userId,
          companyId,
          wasRegistered: true,
        },
      });

      return NextResponse.json({ sessionId });
    }
  } catch (error) {
    console.error("Analytics link-session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
