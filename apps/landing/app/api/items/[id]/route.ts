import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { moveFromTemp } from "@/lib/s3";

async function getUserCompanyId(): Promise<string | null> {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email");

  if (!userEmail?.value) return null;

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    include: {
      companies: {
        include: { company: true },
        take: 1,
      },
    },
  });

  return user?.companies[0]?.company.id ?? null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const item = await prisma.item.findFirst({
      where: { id, companyId },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ ...item, price: Number(item.price) });
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingItem = await prisma.item.findFirst({
      where: { id, companyId },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const { name, description, price, imageUrl, categoryId, sortOrder, isActive, translations, allergens } =
      await request.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (price === undefined || price === null || isNaN(Number(price))) {
      return NextResponse.json(
        { error: "Valid price is required" },
        { status: 400 }
      );
    }

    // If categoryId is being changed, verify the new category belongs to this company
    if (categoryId && categoryId !== existingItem.categoryId) {
      const category = await prisma.category.findFirst({
        where: { id: categoryId, companyId },
      });

      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }
    }

    // Move image from temp to permanent location if needed
    const finalImageUrl = imageUrl ? await moveFromTemp(imageUrl, companyId) : null;

    const item = await prisma.item.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        price: Number(price),
        imageUrl: finalImageUrl,
        allergens: allergens !== undefined ? allergens : existingItem.allergens,
        categoryId: categoryId ?? existingItem.categoryId,
        sortOrder: sortOrder ?? existingItem.sortOrder,
        isActive: isActive ?? existingItem.isActive,
        translations: translations !== undefined ? translations : existingItem.translations,
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
    prisma.session.updateMany({
      where: { companyId, modifiedMenu: false },
      data: { modifiedMenu: true },
    }).catch(() => {});

    return NextResponse.json({ ...item, price: Number(item.price) });
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

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

    const existingItem = await prisma.item.findFirst({
      where: { id, companyId },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const body = await request.json();
    const updateData: { name?: string; description?: string | null; isActive?: boolean } = {};

    if (body.name !== undefined) {
      if (typeof body.name !== "string" || body.name.trim().length === 0) {
        return NextResponse.json(
          { error: "Name cannot be empty" },
          { status: 400 }
        );
      }
      updateData.name = body.name.trim();
    }

    if (body.description !== undefined) {
      updateData.description = body.description?.trim() || null;
    }

    if (body.isActive !== undefined) {
      updateData.isActive = Boolean(body.isActive);
    }

    const item = await prisma.item.update({
      where: { id },
      data: updateData,
    });

    // Mark checklist step done (fire-and-forget, no-op if already set)
    prisma.restaurant.updateMany({
      where: { companyId, checklistMenuEdited: false },
      data: { checklistMenuEdited: true },
    }).catch(() => {});
    prisma.session.updateMany({
      where: { companyId, modifiedMenu: false },
      data: { modifiedMenu: true },
    }).catch(() => {});

    return NextResponse.json({ success: true, ...item, price: Number(item.price) });
  } catch (error) {
    console.error("Error patching item:", error);
    return NextResponse.json(
      { error: "Failed to update item", success: false },
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

    const existingItem = await prisma.item.findFirst({
      where: { id, companyId },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    await prisma.item.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Item deleted" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
