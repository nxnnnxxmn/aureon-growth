-- CreateTable
CREATE TABLE "PoolItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "osmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "categoryLabel" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#D6B46A',
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "email" TEXT,
    "street" TEXT,
    "zoneLabel" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'CO',
    "contacted" BOOLEAN NOT NULL DEFAULT false,
    "leadId" TEXT,
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PoolItem_osmId_key" ON "PoolItem"("osmId");

-- CreateIndex
CREATE INDEX "PoolItem_category_idx" ON "PoolItem"("category");

-- CreateIndex
CREATE INDEX "PoolItem_contacted_idx" ON "PoolItem"("contacted");

-- CreateIndex
CREATE INDEX "PoolItem_country_idx" ON "PoolItem"("country");

-- CreateIndex
CREATE INDEX "PoolItem_createdAt_idx" ON "PoolItem"("createdAt");
