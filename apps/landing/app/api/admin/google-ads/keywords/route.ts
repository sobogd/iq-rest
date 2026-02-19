import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { getAdGroupsHourly, getAdGroupsWeekly } from "@/lib/google-ads";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const period = request.nextUrl.searchParams.get("period");

    if (period === "week") {
      const adGroups = await getAdGroupsWeekly();
      return NextResponse.json({ adGroups });
    }

    const date = request.nextUrl.searchParams.get("date");
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Invalid date param (YYYY-MM-DD)" }, { status: 400 });
    }

    const adGroups = await getAdGroupsHourly(date);
    return NextResponse.json({ adGroups });
  } catch (error) {
    console.error("Admin Google Ads error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
