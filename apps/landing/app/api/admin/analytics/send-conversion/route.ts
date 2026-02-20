import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";
import { uploadClickConversion } from "@/lib/google-ads";

const CONVERSION_ACTIONS: Record<string, string | undefined> = {
  type_selected: process.env.GOOGLE_ADS_CONVERSION_ACTION_ID,
  views_reached: process.env.GOOGLE_ADS_CONVERSION_ACTION_ID_VIEWS,
  subscription: process.env.GOOGLE_ADS_CONVERSION_ACTION_ID_SUBSCRIPTION,
};

const FLAG_MAP: Record<string, string> = {
  type_selected: "conversionSent",
  views_reached: "conversionViewsSent",
  subscription: "conversionSubscriptionSent",
};

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { gclid, conversionDateTime, eventType } = await request.json();

    if (!gclid || !conversionDateTime) {
      return NextResponse.json(
        { error: "Missing required fields: gclid, conversionDateTime" },
        { status: 400 }
      );
    }

    const conversionActionId = eventType ? CONVERSION_ACTIONS[eventType] : undefined;

    const result = await uploadClickConversion(gclid, conversionDateTime, undefined, conversionActionId);

    // Update session flag on success
    if (result.success && eventType && FLAG_MAP[eventType]) {
      await prisma.session.updateMany({
        where: { gclid },
        data: { [FLAG_MAP[eventType]]: true },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin send conversion error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
