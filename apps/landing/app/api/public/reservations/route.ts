import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import nodemailer from "nodemailer";

// Simple in-memory rate limiter (per IP, 5 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

const reservationSchema = z.object({
  restaurantId: z.string().min(1),
  tableId: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  duration: z.number().int().min(15).max(480).optional(),
  guestName: z.string().trim().min(1).max(100),
  guestEmail: z.string().trim().email().max(200),
  guestsCount: z.number().int().min(1).max(50),
  notes: z.string().max(500).nullable().optional(),
  locale: z.string().min(2).max(5).optional(),
});

// Convert time string "HH:MM" to minutes from midnight
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Check if a table is booked at a specific time
function isTableBooked(
  tableId: string,
  startTime: string,
  slotDuration: number,
  reservations: { tableId: string; startTime: string; duration: number }[]
): boolean {
  const requestedStart = timeToMinutes(startTime);
  const requestedEnd = requestedStart + slotDuration;

  for (const reservation of reservations) {
    if (reservation.tableId !== tableId) continue;

    const bookedStart = timeToMinutes(reservation.startTime);
    const bookedEnd = bookedStart + reservation.duration;

    // Check for overlap
    if (requestedStart < bookedEnd && requestedEnd > bookedStart) {
      return true;
    }
  }

  return false;
}

// --- Email helpers ---

interface ReservationEmailTranslations {
  guestSubject: string;
  guestGreeting: string;
  guestConfirmed: string;
  guestPending: string;
  details: string;
  date: string;
  time: string;
  guests: string;
  table: string;
  notes: string;
  guestOutro: string;
  signature: string;
  ownerSubject: string;
  ownerGreeting: string;
  ownerBody: string;
  ownerCta: string;
  ownerSignature: string;
}

async function getReservationTranslations(locale: string): Promise<ReservationEmailTranslations> {
  try {
    const messages = await import(`@/messages/${locale}.json`);
    return messages.reservationEmail;
  } catch {
    const messages = await import(`@/messages/en.json`);
    return messages.reservationEmail;
  }
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function detailRow(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px;font-size:15px;color:#666;white-space:nowrap;">${label}</td><td style="padding:8px 12px;font-size:15px;font-weight:600;color:#1a1a1a;">${value}</td></tr>`;
}

async function sendGuestEmail(params: {
  email: string;
  guestName: string;
  restaurantTitle: string;
  date: string;
  startTime: string;
  guestsCount: number;
  tableNumber: number;
  notes: string | null;
  status: string;
  locale: string;
}) {
  const t = await getReservationTranslations(params.locale);
  const transporter = createTransporter();

  const subject = t.guestSubject.replace("{restaurant}", params.restaurantTitle);
  const greeting = t.guestGreeting.replace("{name}", params.guestName);
  const statusText = params.status === "confirmed" ? t.guestConfirmed : t.guestPending;
  const sig = t.signature.replace("{restaurant}", params.restaurantTitle);

  let rows = "";
  rows += detailRow(t.date, params.date);
  rows += detailRow(t.time, params.startTime);
  rows += detailRow(t.guests, String(params.guestsCount));
  rows += detailRow(t.table, String(params.tableNumber));
  if (params.notes) {
    rows += detailRow(t.notes, params.notes);
  }

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: params.email,
    subject,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
        <p style="font-size: 20px; font-weight: 600; line-height: 1.5; margin: 0 0 20px;">
          ${greeting}
        </p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
          ${statusText}
        </p>
        <p style="font-size: 15px; font-weight: 600; margin: 0 0 8px;">
          ${t.details}
        </p>
        <table style="border-collapse: collapse; margin: 0 0 24px; background: #f5f5f5; border-radius: 12px; overflow: hidden; width: 100%;">
          ${rows}
        </table>
        <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px; color: #666;">
          ${t.guestOutro}
        </p>
        <p style="font-size: 15px; margin: 0; color: #1a1a1a;">
          ${sig}
        </p>
      </div>
    `,
    text: `${greeting}\n\n${statusText}\n\n${t.details}\n${t.date}: ${params.date}\n${t.time}: ${params.startTime}\n${t.guests}: ${params.guestsCount}\n${t.table}: ${params.tableNumber}${params.notes ? `\n${t.notes}: ${params.notes}` : ""}\n\n${t.guestOutro}\n\n${sig.replace("<br>", "\n")}`,
  });
}

async function sendOwnerEmail(params: {
  ownerEmails: string[];
  guestName: string;
  restaurantTitle: string;
  date: string;
  startTime: string;
  guestsCount: number;
  tableNumber: number;
  notes: string | null;
  guestEmail: string;
  status: string;
  locale: string;
}) {
  const t = await getReservationTranslations(params.locale);
  const transporter = createTransporter();

  const subject = t.ownerSubject.replace("{name}", params.guestName);

  let rows = "";
  rows += detailRow(t.date, params.date);
  rows += detailRow(t.time, params.startTime);
  rows += detailRow(t.guests, String(params.guestsCount));
  rows += detailRow(t.table, String(params.tableNumber));
  rows += detailRow("Email", params.guestEmail);
  if (params.notes) {
    rows += detailRow(t.notes, params.notes);
  }

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: params.ownerEmails.join(","),
    subject,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
        <p style="font-size: 20px; font-weight: 600; line-height: 1.5; margin: 0 0 20px;">
          ${t.ownerGreeting}
        </p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
          ${t.ownerBody}
        </p>
        <table style="border-collapse: collapse; margin: 0 0 24px; background: #f5f5f5; border-radius: 12px; overflow: hidden; width: 100%;">
          ${rows}
        </table>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 24px;">
          <a href="https://iq-rest.com/dashboard/reservations?from=email" style="color: #0066cc;">${t.ownerCta}</a>
        </p>
        <p style="font-size: 15px; margin: 0; color: #1a1a1a;">
          ${t.ownerSignature}
        </p>
      </div>
    `,
    text: `${t.ownerGreeting}\n\n${t.ownerBody}\n\n${t.date}: ${params.date}\n${t.time}: ${params.startTime}\n${t.guests}: ${params.guestsCount}\n${t.table}: ${params.tableNumber}\nEmail: ${params.guestEmail}${params.notes ? `\n${t.notes}: ${params.notes}` : ""}\n\n${t.ownerCta}: https://iq-rest.com/dashboard/reservations?from=email\n\n${t.ownerSignature.replace("<br>", "\n")}`,
  });
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.cookies.get("geo_ip")?.value ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = reservationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const {
      restaurantId,
      tableId,
      date,
      startTime,
      duration,
      guestName,
      guestEmail,
      guestsCount,
      notes,
      locale,
    } = parsed.data;

    const guestLocale = locale || "en";

    // Get restaurant and check if reservations are enabled
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        id: true,
        title: true,
        defaultLanguage: true,
        reservationsEnabled: true,
        reservationMode: true,
        reservationSlotMinutes: true,
        company: {
          select: {
            users: {
              select: {
                user: { select: { email: true } },
              },
            },
          },
        },
      },
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    if (!restaurant.reservationsEnabled) {
      return NextResponse.json(
        { error: "Reservations are not enabled" },
        { status: 400 }
      );
    }

    // Parse date
    const reservationDate = new Date(date);
    if (isNaN(reservationDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }

    const slotDuration = duration || restaurant.reservationSlotMinutes;

    // Get all active tables that can accommodate the guests
    const suitableTables = await prisma.table.findMany({
      where: {
        restaurantId,
        isActive: true,
        capacity: { gte: guestsCount },
      },
      orderBy: [
        { capacity: "asc" }, // Prefer smaller tables first
        { sortOrder: "asc" },
      ],
    });

    if (suitableTables.length === 0) {
      return NextResponse.json(
        { error: "No tables available for this number of guests" },
        { status: 400 }
      );
    }

    // Get existing reservations for this date
    const existingReservations = await prisma.reservation.findMany({
      where: {
        restaurantId,
        date: reservationDate,
        status: { in: ["pending", "confirmed"] },
      },
      select: {
        tableId: true,
        startTime: true,
        duration: true,
      },
    });

    // If tableId is provided, verify it's available; otherwise find the first available table
    let selectedTable;

    if (tableId) {
      // Verify the requested table exists and is suitable
      selectedTable = suitableTables.find((t) => t.id === tableId);
      if (!selectedTable) {
        return NextResponse.json(
          { error: "Requested table not found or not suitable for this number of guests" },
          { status: 400 }
        );
      }
      // Check if the table is available at this time
      if (isTableBooked(tableId, startTime, slotDuration, existingReservations)) {
        return NextResponse.json(
          { error: "Requested table is not available at this time" },
          { status: 400 }
        );
      }
    } else {
      // Find the first available table
      selectedTable = suitableTables.find((table) => {
        return !isTableBooked(table.id, startTime, slotDuration, existingReservations);
      });
    }

    if (!selectedTable) {
      return NextResponse.json(
        { error: "No tables available at this time" },
        { status: 400 }
      );
    }

    // Create reservation
    const status = restaurant.reservationMode === "auto" ? "confirmed" : "pending";

    const reservation = await prisma.reservation.create({
      data: {
        restaurantId,
        tableId: selectedTable.id,
        date: reservationDate,
        startTime,
        duration: slotDuration,
        guestName,
        guestEmail,
        guestPhone: null,
        guestsCount,
        notes: notes || null,
        status,
      },
    });

    // Send notification emails (fire-and-forget)
    const emailParams = {
      guestName,
      restaurantTitle: restaurant.title,
      date,
      startTime,
      guestsCount,
      tableNumber: selectedTable.number,
      notes: notes || null,
      status,
    };

    sendGuestEmail({
      ...emailParams,
      email: guestEmail,
      locale: guestLocale,
    }).catch((err) => console.error("Failed to send guest reservation email:", err));

    const ownerEmails = restaurant.company.users
      .map((uc) => uc.user.email)
      .filter(Boolean);

    if (ownerEmails.length > 0) {
      sendOwnerEmail({
        ...emailParams,
        ownerEmails,
        guestEmail,
        locale: restaurant.defaultLanguage,
      }).catch((err) => console.error("Failed to send owner reservation email:", err));
    }

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}
