import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getKeywordBids } from "@/lib/google-ads";

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { keywords } = await getKeywordBids("TODAY");
    const hour = new Date().getHours();

    const snapshots = keywords.map((kw) => ({
      resourceName: kw.resourceName,
      keyword: kw.keyword,
      campaignName: kw.campaignName,
      adGroupName: kw.adGroupName,
      cpcBidMicros: kw.cpcBidMicros ?? 0,
      firstPageCpcMicros: kw.firstPageCpcMicros,
      topOfPageCpcMicros: kw.topOfPageCpcMicros,
      clicks: kw.clicks,
      impressions: kw.impressions,
      costMicros: kw.costMicros,
      hour,
    }));

    await prisma.keywordBidSnapshot.createMany({ data: snapshots });

    return NextResponse.json({ saved: snapshots.length, hour });
  } catch (error) {
    console.error("[Cron] snapshot-bids error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}
