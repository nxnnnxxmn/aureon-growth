-- CreateTable
CREATE TABLE "Broadcast" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "audienceTag" TEXT NOT NULL DEFAULT '',
    "templateId" TEXT,
    "objective" TEXT,
    "budget" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Borrador',
    "sent" TEXT NOT NULL DEFAULT '[]',
    "country" TEXT NOT NULL DEFAULT 'CO',
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Broadcast_kind_idx" ON "Broadcast"("kind");

-- CreateIndex
CREATE INDEX "Broadcast_status_idx" ON "Broadcast"("status");

-- CreateIndex
CREATE INDEX "Broadcast_country_idx" ON "Broadcast"("country");

-- CreateIndex
CREATE INDEX "Broadcast_createdAt_idx" ON "Broadcast"("createdAt");
