import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { generateAnonymousEmail } from "@/lib/anonymous";
import { generateSessionToken, hashSessionToken, AUTH_COOKIE_OPTIONS } from "@/lib/session-utils";
import { generateUniqueSlug } from "@/lib/slug";
import { getPublicUrl, s3Key } from "@/lib/s3";
import { COUNTRY_CENTERS, getCoordinatesByCountry } from "@/lib/country-centers";
import { locales, Locale } from "@/i18n/routing";

// In-memory rate limiter by IP
const ipAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    ipAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const { title, currency, locale, turnstileToken } = await request.json();

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Rate limit by IP
    const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Verify Turnstile
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json({ error: "Verification required" }, { status: 403 });
      }
      const isValid = await verifyTurnstileToken(turnstileToken);
      if (!isValid) {
        return NextResponse.json({ error: "Verification failed" }, { status: 403 });
      }
    }

    const trimmedTitle = title.trim();
    const userLocale: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : "en";
    const finalCurrency = currency || "EUR";

    // Generate unique slug
    const slug = await generateUniqueSlug(trimmedTitle);

    // Generate session
    const sessionToken = generateSessionToken();
    const tokenHash = hashSessionToken(sessionToken);
    const anonEmail = generateAnonymousEmail();

    // Get coordinates from geo cookie
    const cookieStore = await cookies();
    const geoCountry = cookieStore.get("geo_country")?.value || null;
    const countryCoords = getCoordinatesByCountry(geoCountry);
    const center = countryCoords || COUNTRY_CENTERS[userLocale];

    // Initial background
    const initialBackground = getPublicUrl(s3Key("background_initial.webp"));

    // Create everything in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: anonEmail,
          sessionToken: tokenHash,
        },
      });

      const company = await tx.company.create({
        data: {
          name: trimmedTitle,
          onboardingStep: 2,
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      });

      await tx.userCompany.create({
        data: {
          userId: user.id,
          companyId: company.id,
          role: "owner",
        },
      });

      const restaurant = await tx.restaurant.create({
        data: {
          title: trimmedTitle,
          slug,
          currency: finalCurrency,
          source: initialBackground,
          accentColor: "#000000",
          languages: [userLocale],
          defaultLanguage: userLocale,
          x: center?.lng?.toString() || null,
          y: center?.lat?.toString() || null,
          companyId: company.id,
          startedFromScratch: true,
        },
      });

      return { userId: user.id, companyId: company.id, restaurantSlug: restaurant.slug };
    });

    // Set cookies
    cookieStore.set("session", sessionToken, AUTH_COOKIE_OPTIONS);
    cookieStore.set("user_email", anonEmail, AUTH_COOKIE_OPTIONS);
    cookieStore.set("user_id", result.userId, AUTH_COOKIE_OPTIONS);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating anonymous user:", error);
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
