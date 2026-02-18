import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

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
  notes: z.string().max(500).optional(),
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
    } = parsed.data;

    // Get restaurant and check if reservations are enabled
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        id: true,
        reservationsEnabled: true,
        reservationMode: true,
        reservationSlotMinutes: true,
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

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}
