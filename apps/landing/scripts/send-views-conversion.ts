/**
 * One-time script to manually send Google Ads views conversion
 * for a specific session and update flags.
 *
 * Usage: npx tsx scripts/send-views-conversion.ts
 */

import { uploadClickConversion } from "../lib/google-ads";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const gclid =
    "Cj0KCQiA49XMBhDRARIsAOOKJHbBVogNG2P2yBFKgbve2lcDGT5SRatqP4WKVhEj6XUVDpOpPB6oQHoaAlo3EALw_wcB";
  const companyId = "cmlsbao6w003ukw60ggtcwmgb";
  const conversionActionId =
    process.env.GOOGLE_ADS_CONVERSION_ACTION_ID_VIEWS;

  console.log(
    "GOOGLE_ADS_CONVERSION_ACTION_ID_VIEWS:",
    conversionActionId || "NOT SET"
  );

  if (!conversionActionId) {
    console.log("Env var not set, cannot send views conversion");
    return;
  }

  console.log("Sending views conversion...");
  const result = await uploadClickConversion(
    gclid,
    new Date().toISOString(),
    undefined,
    conversionActionId
  );
  console.log("Result:", JSON.stringify(result, null, 2));

  if (result.success) {
    await prisma.session.updateMany({
      where: { companyId },
      data: { reached50Views: true, conversionViewsSent: true },
    });
    console.log("Session flags updated");
  } else {
    // Even if conversion failed, set reached50Views since they did reach 20
    await prisma.session.updateMany({
      where: { companyId },
      data: { reached50Views: true },
    });
    console.log("reached50Views flag updated (conversion failed)");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
