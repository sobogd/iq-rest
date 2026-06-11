// Re-export the generated Prisma client so consumers can `import { PrismaClient,
// Prisma, ... } from "@iq-rest/db"`. The schema + migrations live in ./prisma.
module.exports = require("./generated/client");
