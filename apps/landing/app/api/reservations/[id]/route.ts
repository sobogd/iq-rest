import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: { companyId },
      select: { id: true },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const existingReservation = await prisma.reservation.findFirst({
      where: { id, restaurantId: restaurant.id },
    });

    if (!existingReservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }

    const data = await request.json();
    const updateData: { status?: string; notes?: string } = {};

    if (data.status !== undefined) {
      const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
      if (!validStatuses.includes(data.status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      updateData.status = data.status;
    }

    if (data.notes !== undefined) {
      updateData.notes = data.notes || null;
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data: updateData,
    });

    // TODO: Send email notification to guest when status changes

    return NextResponse.json({ success: true, ...reservation });
  } catch (error) {
    console.error("Error patching reservation:", error);
    return NextResponse.json(
      { error: "Failed to update reservation", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: { companyId },
      select: { id: true },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const existingReservation = await prisma.reservation.findFirst({
      where: { id, restaurantId: restaurant.id },
    });

    if (!existingReservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }

    await prisma.reservation.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Reservation deleted" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return NextResponse.json(
      { error: "Failed to delete reservation" },
      { status: 500 }
    );
  }
}
