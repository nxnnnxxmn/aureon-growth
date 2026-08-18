-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "contact" TEXT NOT NULL DEFAULT '',
    "email" TEXT,
    "phone" TEXT,
    "services" TEXT NOT NULL DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'Potencial',
    "startDate" TEXT NOT NULL DEFAULT '',
    "monthlyValue" REAL NOT NULL DEFAULT 0,
    "projects" TEXT NOT NULL DEFAULT '[]',
    "pendingInvoices" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "country" TEXT NOT NULL DEFAULT 'CO',
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Client_status_idx" ON "Client"("status");

-- CreateIndex
CREATE INDEX "Client_country_idx" ON "Client"("country");

-- CreateIndex
CREATE INDEX "Client_createdAt_idx" ON "Client"("createdAt");
