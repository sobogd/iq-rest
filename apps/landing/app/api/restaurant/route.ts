import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { moveFromTemp } from "@/lib/s3";

export async function GET() {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: { companyId },
    });

    return NextResponse.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurant" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Move source from temp to permanent location if needed
    const finalSource = data.source
      ? await moveFromTemp(data.source, companyId, "restaurants")
      : null;

    // Check if restaurant already exists
    const existing = await prisma.restaurant.findFirst({
      where: { companyId },
    });

    if (existing) {
      // Update existing
      const restaurant = await prisma.restaurant.update({
        where: { id: existing.id },
        data: {
          title: data.title,
          description: data.description || null,
          slug: data.slug || null,
          source: finalSource,
          address: data.address || null,
          x: data.x || null,
          y: data.y || null,
          phone: data.phone || null,
          instagram: data.instagram || null,
          whatsapp: data.whatsapp || null,
          languages: data.languages || ["en"],
          defaultLanguage: data.defaultLanguage || "en",
        },
      });

      return NextResponse.json(restaurant);
    } else {
      // Create new
      if (!data.title) {
        return NextResponse.json(
          { error: "Title is required" },
          { status: 400 }
        );
      }

      const restaurant = await prisma.restaurant.create({
        data: {
          title: data.title,
          description: data.description || null,
          slug: data.slug || null,
          source: finalSource,
          address: data.address || null,
          x: data.x || null,
          y: data.y || null,
          phone: data.phone || null,
          instagram: data.instagram || null,
          whatsapp: data.whatsapp || null,
          languages: data.languages || ["en"],
          defaultLanguage: data.defaultLanguage || "en",
          companyId,
        },
      });

      return NextResponse.json(restaurant, { status: 201 });
    }
  } catch (error) {
    console.error("Error saving restaurant:", error);
    return NextResponse.json(
      { error: "Failed to save restaurant" },
      { status: 500 }
    );
  }
}
