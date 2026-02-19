import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getKeywordBids, batchUpdateKeywordBids } from "@/lib/google-ads";

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Fetch current keyword data from Google Ads (1 API operation)
    // dateRange doesn't matter for position_estimates (they're real-time, not historical)
    const keywords = await getKeywordBids("LAST_30_DAYS");

    // 2. Load active bid configs from DB
    const configs = await prisma.keywordBidConfig.findMany({
      where: { isActive: true },
    });
    const configMap = new Map(configs.map((c) => [c.resourceName, c]));

    // 3. Build updates and logs
    const updates: { resourceName: string; cpcBidMicros: number }[] = [];
    const logs: {
      resourceName: string;
      keyword: string;
      effectiveCpcMicros: number;
      previousBidMicros: number;
      newBidMicros: number;
      maxBidMicros: number;
      reason: string;
      success: boolean;
      error: string | null;
    }[] = [];

    for (const kw of keywords) {
      const config = configMap.get(kw.resourceName);
      if (!config) continue;

      const firstPageCpc = kw.firstPageCpcMicros ?? 0;
      const currentBid = kw.cpcBidMicros ?? 0;

      // newBid = first_page_cpc (Google's estimate to appear on page 1)
      // Rounded UP to nearest 10000 (0.01€)
      let newBid = Math.ceil(firstPageCpc / 10000) * 10000;
      let reason = "auto_adjust";

      if (newBid <= 0) continue;

      if (newBid > config.maxBidMicros) {
        newBid = config.maxBidMicros;
        reason = "capped_at_max";
      }

      if (newBid === currentBid) {
        logs.push({
          resourceName: kw.resourceName,
          keyword: kw.keyword,
          effectiveCpcMicros: firstPageCpc,
          previousBidMicros: currentBid,
          newBidMicros: newBid,
          maxBidMicros: config.maxBidMicros,
          reason: "skipped_same",
          success: true,
          error: null,
        });
        continue;
      }

      updates.push({ resourceName: kw.resourceName, cpcBidMicros: newBid });
      logs.push({
        resourceName: kw.resourceName,
        keyword: kw.keyword,
        effectiveCpcMicros: firstPageCpc,
        previousBidMicros: currentBid,
        newBidMicros: newBid,
        maxBidMicros: config.maxBidMicros,
        reason,
        success: true,
        error: null,
      });
    }

    // 4. Batch update Google Ads (1 API operation)
    if (updates.length > 0) {
      const result = await batchUpdateKeywordBids(updates);
      if (!result.success) {
        // Mark all update logs as failed
        for (const log of logs) {
          if (log.reason !== "skipped_same") {
            log.success = false;
            log.error = result.error ?? "Unknown error";
          }
        }
      }
    }

    // 5. Save logs
    if (logs.length > 0) {
      await prisma.bidChangeLog.createMany({ data: logs });
    }

    return NextResponse.json({
      processed: logs.length,
      updated: updates.length,
      skipped: logs.filter((l) => l.reason === "skipped_same").length,
      capped: logs.filter((l) => l.reason === "capped_at_max").length,
      failed: logs.filter((l) => !l.success).length,
    });
  } catch (error) {
    console.error("[Cron] update-bids error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}
