-- CreateTable
CREATE TABLE "auth_handoffs" (
    "id" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_handoffs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_handoffs_codeHash_key" ON "auth_handoffs"("codeHash");
