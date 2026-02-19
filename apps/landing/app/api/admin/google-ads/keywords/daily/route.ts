import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { getKeywordDailyStats } from "@/lib/google-ads";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const resourceName = request.nextUrl.searchParams.get("resourceName");
    if (!resourceName) {
      return NextResponse.json({ error: "Missing resourceName" }, { status: 400 });
    }

    const days = await getKeywordDailyStats(resourceName, "LAST_7_DAYS");
    return NextResponse.json({ days });
  } catch (error) {
    console.error("Admin Google Ads keyword daily stats error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
