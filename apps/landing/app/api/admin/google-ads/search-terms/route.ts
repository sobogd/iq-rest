import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { getSearchTerms } from "@/lib/google-ads";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const period = request.nextUrl.searchParams.get("period") || "today";

    let dateFilter: string;
    if (period === "yesterday") {
      dateFilter = "segments.date = '" + getDateString(-1) + "'";
    } else if (period === "7days") {
      dateFilter = "segments.date DURING LAST_7_DAYS";
    } else {
      dateFilter = "segments.date = '" + getDateString(0) + "'";
    }

    const terms = await getSearchTerms(dateFilter);
    return NextResponse.json({ terms });
  } catch (error) {
    console.error("Admin search terms error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

function getDateString(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}
