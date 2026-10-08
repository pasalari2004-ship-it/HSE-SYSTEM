-- CreateTable
CREATE TABLE "personnel" (
    "id" SERIAL NOT NULL,
    "personnelCode" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "nationalCode" TEXT NOT NULL,
    "mobile" TEXT,
    "fatherName" TEXT,
    "issuePlace" TEXT,
    "birthDate" TEXT,
    "gender" TEXT,
    "maritalStatus" TEXT,
    "childrenCount" INTEGER,
    "education" TEXT,
    "age" INTEGER,
    "height" INTEGER,
    "bloodPressure" TEXT,
    "diseaseType" TEXT,
    "physicalFactors" TEXT,
    "chemicalFactors" TEXT,
    "biologicalFactors" TEXT,
    "ergonomicFactors" TEXT,
    "psychologicalFactors" TEXT,
    "hireDate" TEXT,
    "settlementDate" TEXT,
    "unit" TEXT,
    "militaryStatus" TEXT,
    "exemptionType" TEXT,
    "workStation" TEXT,
    "position" TEXT,
    "assignedDuty" TEXT,
    "shiftType" TEXT,
    "shiftHours" TEXT,
    "medicalFileNumber" TEXT,
    "workConditions" TEXT,
    "medicalAdvice" TEXT,
    "workPhone" TEXT,
    "workAddress" TEXT,
    "postalCodeWorkplace" TEXT,
    "homePhone" TEXT,
    "homePostalCode" TEXT,
    "homeAddress" TEXT,
    "hseExpertOpinion" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personnel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personnel_personnelCode_key" ON "personnel"("personnelCode");

-- CreateIndex
CREATE UNIQUE INDEX "personnel_nationalCode_key" ON "personnel"("nationalCode");
