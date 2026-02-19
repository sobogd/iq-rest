import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { getClickInfo } from "@/lib/google-ads";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const gclid = request.nextUrl.searchParams.get("gclid");
    const date = request.nextUrl.searchParams.get("date");

    if (!gclid) {
      return NextResponse.json({ error: "Missing gclid param" }, { status: 400 });
    }
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Missing or invalid date param (YYYY-MM-DD)" }, { status: 400 });
    }

    const clickInfo = await getClickInfo(gclid, date);

    if (!clickInfo) {
      return NextResponse.json({ error: "Click not found for this gclid/date" }, { status: 404 });
    }

    return NextResponse.json(clickInfo);
  } catch (error) {
    console.error("Admin Google Ads click error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
