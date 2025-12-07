import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface TimeSlot {
  time: string;
  available: boolean;
  availableTables: number;
}

interface TableAvailability {
  id: string;
  number: number;
  capacity: number;
  zone: string | null;
  translations: Record<string, { zone?: string }> | null;
  imageUrl: string | null;
  available: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const dateStr = searchParams.get("date");
    const time = searchParams.get("time");
    const guestsCount = parseInt(searchParams.get("guests") || "2");

    if (!slug || !dateStr) {
      return NextResponse.json(
        { error: "Missing required parameters: slug, date" },
        { status: 400 }
      );
    }

    // Get restaurant by slug
    const restaurant = await prisma.restaurant.findFirst({
      where: { slug },
      select: {
        id: true,
        reservationsEnabled: true,
        reservationSlotMinutes: true,
        workingHoursStart: true,
        workingHoursEnd: true,
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

    // Get all active tables for this restaurant
    const tables = await prisma.table.findMany({
      where: { restaurantId: restaurant.id, isActive: true },
      select: {
        id: true,
        number: true,
        capacity: true,
        zone: true,
        translations: true,
        imageUrl: true,
      },
      orderBy: { sortOrder: "asc" },
    });

    // Filter tables by capacity
    const suitableTables = tables.filter((t) => t.capacity >= guestsCount);

    if (suitableTables.length === 0) {
      return NextResponse.json({
        timeSlots: [],
        tables: [],
        message: "No tables available for the requested number of guests",
      });
    }

    // Parse date
    const reservationDate = new Date(dateStr);

    // Get all existing reservations for this date
    const existingReservations = await prisma.reservation.findMany({
      where: {
        restaurantId: restaurant.id,
        date: reservationDate,
        status: { in: ["pending", "confirmed"] },
      },
      select: {
        tableId: true,
        startTime: true,
        duration: true,
      },
    });

    // Generate time slots based on working hours (every 30 minutes)
    const timeSlots: TimeSlot[] = [];
    const [startHour, startMin] = restaurant.workingHoursStart.split(":").map(Number);
    const [endHour, endMin] = restaurant.workingHoursEnd.split(":").map(Number);
    const slotDuration = restaurant.reservationSlotMinutes;

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    // Check if the date is today - if so, filter out past times
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const isToday = dateStr === todayStr;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Generate slots every 30 minutes
    for (let minutes = startMinutes; minutes < endMinutes; minutes += 30) {
      const hour = Math.floor(minutes / 60);
      const min = minutes % 60;
      const timeStr = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;

      // Skip past times for today
      if (isToday && minutes <= currentMinutes) {
        continue;
      }

      // Count how many suitable tables are available at this time
      const availableTablesAtTime = suitableTables.filter((table) => {
        return !isTableBooked(table.id, timeStr, slotDuration, existingReservations);
      });

      timeSlots.push({
        time: timeStr,
        available: availableTablesAtTime.length > 0,
        availableTables: availableTablesAtTime.length,
      });
    }

    // If time is specified, return available tables for that time
    let tablesAvailability: TableAvailability[] = [];
    if (time) {
      tablesAvailability = suitableTables.map((table) => ({
        ...table,
        translations: table.translations as Record<string, { zone?: string }> | null,
        available: !isTableBooked(table.id, time, slotDuration, existingReservations),
      }));
    }

    return NextResponse.json({
      timeSlots,
      tables: tablesAvailability,
      slotDuration,
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
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

// Convert time string "HH:MM" to minutes from midnight
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
