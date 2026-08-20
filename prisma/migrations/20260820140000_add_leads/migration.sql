CREATE TYPE "LeadKind" AS ENUM ('ASSESSMENT', 'CARE_HOME', 'WORKPLACE', 'COMMUNITY', 'GENERAL');
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'CLOSED');

CREATE TABLE "Lead" (
  "id" TEXT NOT NULL,
  "kind" "LeadKind" NOT NULL,
  "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "country" TEXT,
  "organisation" TEXT,
  "location" TEXT,
  "preferredContact" TEXT,
  "message" TEXT,
  "details" JSONB,
  "consentVersion" TEXT NOT NULL,
  "consentedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Lead_kind_status_createdAt_idx" ON "Lead"("kind", "status", "createdAt");
CREATE INDEX "Lead_email_idx" ON "Lead"("email");
