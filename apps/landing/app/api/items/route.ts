import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { S3Client, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";

const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_KEY!,
    secretAccessKey: process.env.S3_TOKEN!,
  },
});

async function moveFromTemp(tempUrl: string, companyId: string): Promise<string | null> {
  const s3Host = process.env.S3_HOST!;

  // If not a temp URL, return as is
  if (!tempUrl || !tempUrl.startsWith(s3Host)) {
    return tempUrl;
  }

  const tempKey = tempUrl.replace(s3Host, "");

  // If not from temp folder, return as is
  if (!tempKey.startsWith(`temp/${companyId}/`)) {
    return tempUrl;
  }

  try {
    const filename = tempKey.split("/").pop();
    const permanentKey = `items/${companyId}/${filename}`;

    await s3Client.send(
      new CopyObjectCommand({
        Bucket: process.env.S3_NAME!,
        CopySource: `${process.env.S3_NAME}/${tempKey}`,
        Key: permanentKey,
        ACL: "public-read",
      })
    );

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_NAME!,
        Key: tempKey,
      })
    );

    return `${s3Host}${permanentKey}`;
  } catch (error) {
    console.error("Error moving file from temp:", error);
    return tempUrl;
  }
}

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

    const { name, description, price, imageUrl, categoryId, isActive } =
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

    // Verify category belongs to this company
    const category = await prisma.category.findFirst({
      where: { id: categoryId, companyId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Auto-calculate sortOrder as last existing + 1
    const lastItem = await prisma.item.findFirst({
      where: { companyId, categoryId },
      orderBy: { sortOrder: "desc" },
    });
    const sortOrder = (lastItem?.sortOrder ?? 0) + 1;

    // Move image from temp to permanent location if needed
    const finalImageUrl = imageUrl ? await moveFromTemp(imageUrl, companyId) : null;

    const item = await prisma.item.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        price: Number(price),
        imageUrl: finalImageUrl,
        sortOrder,
        isActive: isActive ?? true,
        categoryId,
        companyId,
      },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

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
