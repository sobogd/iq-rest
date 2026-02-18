import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";
import { uploadClickConversion } from "@/lib/google-ads";

interface AdUserRow {
  gclid: string;
  keyword: string | null;
  country: string | null;
  session_id: string;
  first_seen: Date;
  email: string | null;
  signup_time: Date | null;
  onboarding_step: number | null;
  checklist_menu: boolean | null;
  checklist_contacts: boolean | null;
  used_qr: boolean;
  uploaded: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(0, Number(searchParams.get("page") || 0));
    const limit = 5;
    const offset = page * limit;

    const [adUsers, countResult] = await Promise.all([
      prisma.$queryRaw<AdUserRow[]>`
        WITH uploaded_sessions AS (
          SELECT DISTINCT "sessionId" as session_id
          FROM analytics_events
          WHERE event = 'gads_conversion_uploaded'
        ),
        qr_users AS (
          SELECT DISTINCT s."userId" as user_id
          FROM analytics_events ae
          JOIN sessions s ON s.id = ae."sessionId"
          WHERE ae.event IN ('clicked_print_qr', 'clicked_download_qr', 'clicked_copy_url')
            AND s."userId" IS NOT NULL
        )
        SELECT
          s.gclid,
          s.keyword,
          s.country,
          s.id as session_id,
          s."createdAt" as first_seen,
          u.email,
          u."createdAt" as signup_time,
          c."onboardingStep" as onboarding_step,
          r."checklistMenuEdited" as checklist_menu,
          r."checklistContactsSaved" as checklist_contacts,
          CASE WHEN qr.user_id IS NOT NULL THEN true ELSE false END as used_qr,
          CASE WHEN us.session_id IS NOT NULL THEN true ELSE false END as uploaded
        FROM sessions s
        JOIN users u ON u.id = s."userId"
        LEFT JOIN uploaded_sessions us ON us.session_id = s.id
        LEFT JOIN users_companies uc ON uc."userId" = s."userId"
        LEFT JOIN companies c ON c.id = uc."companyId"
        LEFT JOIN restaurants r ON r."companyId" = c.id
        LEFT JOIN qr_users qr ON qr.user_id = s."userId"
        WHERE s.gclid IS NOT NULL
          AND s."userId" IS NOT NULL
        ORDER BY s."createdAt" DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*) as count
        FROM sessions
        WHERE gclid IS NOT NULL AND "userId" IS NOT NULL
      `,
    ]);

    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      adUsers: adUsers.map((row) => ({
        gclid: row.gclid,
        keyword: row.keyword,
        matchType: null,
        campaign: null,
        country: row.country,
        sessionId: row.session_id,
        firstSeen: row.first_seen,
        email: row.email,
        signupTime: row.signup_time,
        onboardingStep: row.onboarding_step,
        checklistMenu: row.checklist_menu,
        checklistContacts: row.checklist_contacts,
        usedQr: row.used_qr,
        uploaded: row.uploaded,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Ad users API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { gclid, conversionDateTime, conversionValue, sessionId } =
      await request.json();

    if (!gclid || !conversionDateTime || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const alreadyUploaded = await prisma.analyticsEvent.findFirst({
      where: { sessionId, event: "gads_conversion_uploaded" },
    });

    if (alreadyUploaded) {
      return NextResponse.json(
        { error: "Already uploaded" },
        { status: 400 }
      );
    }

    const result = await uploadClickConversion(
      gclid,
      conversionDateTime,
      conversionValue || undefined
    );

    if (result.success) {
      await prisma.analyticsEvent.create({
        data: {
          event: "gads_conversion_uploaded",
          sessionId,
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Ad users POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
