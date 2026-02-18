import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { uploadClickConversion } from "@/lib/google-ads";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { gclid, value, conversionDateTime } = await request.json();

    if (!gclid || !conversionDateTime) {
      return NextResponse.json(
        { error: "Missing required fields: gclid, conversionDateTime" },
        { status: 400 }
      );
    }

    const result = await uploadClickConversion(gclid, conversionDateTime, value);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin send conversion error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
