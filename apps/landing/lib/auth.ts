import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getUserCompanyId(): Promise<string | null> {
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

export async function getUserCompany(): Promise<{ id: string; name: string } | null> {
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

  const company = user?.companies[0]?.company;
  if (!company) return null;

  return { id: company.id, name: company.name };
}

export async function getUserWithCompany(): Promise<{ userId: string; companyId: string } | null> {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email");

  if (!userEmail?.value) return null;

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    include: {
      companies: {
        take: 1,
      },
    },
  });

  if (!user || !user.companies[0]) return null;

  return { userId: user.id, companyId: user.companies[0].companyId };
}
