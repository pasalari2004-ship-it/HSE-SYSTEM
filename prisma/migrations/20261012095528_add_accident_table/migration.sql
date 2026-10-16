-- CreateTable
CREATE TABLE "accidents" (
    "id" SERIAL NOT NULL,
    "accidentCode" TEXT,
    "victimName" TEXT NOT NULL,
    "unit" TEXT,
    "job" TEXT,
    "injuryType" TEXT NOT NULL,
    "injuredMember" TEXT,
    "accidentDate" TEXT,
    "accidentTime" TEXT,
    "medicalCenter" TEXT,
    "accidentLocation" TEXT,
    "accidentCause" TEXT,
    "insuranceReport" TEXT DEFAULT 'ندارد',
    "victimPhone" TEXT,
    "sickLeaveDays" INTEGER,
    "sender" TEXT,
    "correctiveActions" TEXT,
    "description" TEXT,
    "severity" TEXT DEFAULT 'جزئی',
    "status" TEXT NOT NULL DEFAULT 'باز',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accidents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accidents_accidentCode_key" ON "accidents"("accidentCode");
