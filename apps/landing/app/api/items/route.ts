import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { moveFromTemp } from "@/lib/s3";

export async function GET(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const where: { companyId: string; categoryId?: string } = { companyId };
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const items = await prisma.item.findMany({
      where,
      orderBy: { sortOrder: "asc" },
      include: {
        category: {
          select: { id: true, name: true, sortOrder: true },
        },
      },
    });

    // Convert Decimal to number for JSON serialization
    const serializedItems = items.map((item) => ({
      ...item,
      price: Number(item.price),
    }));

    return NextResponse.json(serializedItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
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

    const { name, description, price, imageUrl, categoryId, isActive, translations, allergens } =
      await request.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    if (price === undefined || price === null || isNaN(Number(price))) {
      return NextResponse.json(
        { error: "Valid price is required" },
        { status: 400 }
      );
    }

    // Parallel queries: verify category + get last sortOrder + move image
    const [category, lastItem, finalImageUrl] = await Promise.all([
      prisma.category.findFirst({
        where: { id: categoryId, companyId },
      }),
      prisma.item.findFirst({
        where: { companyId, categoryId },
        orderBy: { sortOrder: "desc" },
      }),
      imageUrl ? moveFromTemp(imageUrl, companyId) : Promise.resolve(null),
    ]);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const sortOrder = (lastItem?.sortOrder ?? 0) + 1;

    const item = await prisma.item.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        price: Number(price),
        imageUrl: finalImageUrl,
        allergens: allergens || [],
        sortOrder,
        isActive: isActive ?? true,
        categoryId,
        companyId,
        translations: translations || null,
      },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

    // Mark checklist step done (fire-and-forget, no-op if already set)
    prisma.restaurant.updateMany({
      where: { companyId, checklistMenuEdited: false },
      data: { checklistMenuEdited: true },
    }).catch(() => {});

    return NextResponse.json(
      { ...item, price: Number(item.price) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}
