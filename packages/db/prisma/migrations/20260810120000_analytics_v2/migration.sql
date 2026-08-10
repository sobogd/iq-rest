-- Analytics v2 (landing): cookieless salt-hash sessions + minimal events +
-- instant-conversion journal. Coexists with usage_events until the old
-- pipeline is retired.

CREATE TABLE "analytics_salt" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "rotatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analytics_salt_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "sessions_new" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device" TEXT,
    "os" TEXT,
    "country" TEXT NOT NULL DEFAULT 'XX',
    "region" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "lang" TEXT,
    "from" TEXT,
    "ref" TEXT,
    "aid" TEXT,
    "atype" TEXT,
    "aidField" TEXT,
    "clickAt" TIMESTAMP(3),
    "userId" TEXT,
    "restaurantId" TEXT,

    CONSTRAINT "sessions_new_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "sessions_new_hash_key" ON "sessions_new"("hash");
CREATE INDEX "sessions_new_firstAt_idx" ON "sessions_new"("firstAt");
CREATE INDEX "sessions_new_userId_idx" ON "sessions_new"("userId");
CREATE INDEX "sessions_new_atype_firstAt_idx" ON "sessions_new"("atype", "firstAt");

CREATE TABLE "events_new" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_new_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "events_new_sessionId_at_idx" ON "events_new"("sessionId", "at");
CREATE INDEX "events_new_page_action_at_idx" ON "events_new"("page", "action", "at");
CREATE INDEX "events_new_at_idx" ON "events_new"("at");

ALTER TABLE "events_new" ADD CONSTRAINT "events_new_sessionId_fkey"
    FOREIGN KEY ("sessionId") REFERENCES "sessions_new"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "conversion_sends_new" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "response" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversion_sends_new_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "conversion_sends_new_sessionId_network_status_idx" ON "conversion_sends_new"("sessionId", "network", "status");
CREATE INDEX "conversion_sends_new_createdAt_idx" ON "conversion_sends_new"("createdAt");
