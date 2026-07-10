-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "instagram" TEXT,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "fields" TEXT NOT NULL DEFAULT '{}',
    "source" TEXT NOT NULL DEFAULT 'Manual',
    "country" TEXT NOT NULL DEFAULT 'CO',
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Contact_country_idx" ON "Contact"("country");

-- CreateIndex
CREATE INDEX "Contact_createdAt_idx" ON "Contact"("createdAt");
