import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { getAdGroupsYesterdayHourly } from "@/lib/google-ads";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const adGroups = await getAdGroupsYesterdayHourly();
    return NextResponse.json({ adGroups });
  } catch (error) {
    console.error("Admin Google Ads error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
