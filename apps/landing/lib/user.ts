import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getUser = cache(async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      companies: {
        include: {
          company: true,
        },
        take: 1,
      },
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    companyId: user.companies[0]?.company.id,
    companyName: user.companies[0]?.company.name,
  };
});
