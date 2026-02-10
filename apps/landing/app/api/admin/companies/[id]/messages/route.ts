import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id: companyId } = await params;

    const messages = await prisma.supportMessage.findMany({
      where: { companyId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        message: true,
        isAdmin: true,
        createdAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching support messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id: companyId } = await params;

    // Get admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    const { message } = await request.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message is too long (max 2000 characters)" },
        { status: 400 }
      );
    }

    const supportMessage = await prisma.supportMessage.create({
      data: {
        message: message.trim(),
        companyId,
        userId: adminUser.id,
        isAdmin: true,
      },
      select: {
        id: true,
        message: true,
        isAdmin: true,
        createdAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json(supportMessage, { status: 201 });
  } catch (error) {
    console.error("Error creating support message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
