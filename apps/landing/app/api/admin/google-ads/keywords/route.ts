import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { getKeywordBids, updateKeywordBid } from "@/lib/google-ads";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { keywords, yesterdayError } = await getKeywordBids("TODAY");
    return NextResponse.json({ keywords, yesterdayError });
  } catch (error) {
    console.error("Admin Google Ads keywords error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { resourceName, cpcBidMicros } = await request.json();

    if (!resourceName || typeof cpcBidMicros !== "number") {
      return NextResponse.json(
        { error: "Missing resourceName or cpcBidMicros" },
        { status: 400 }
      );
    }

    const result = await updateKeywordBid(resourceName, cpcBidMicros);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin Google Ads update bid error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
