/*
  Warnings:

  - You are about to drop the column `accidentCause` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `accidentLocation` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `correctiveActions` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `injuredMember` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `injuryType` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `insuranceReport` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `medicalCenter` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `sender` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `severity` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `accidents` table. All the data in the column will be lost.
  - You are about to drop the column `victimPhone` on the `accidents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accidents" DROP COLUMN "accidentCause",
DROP COLUMN "accidentLocation",
DROP COLUMN "correctiveActions",
DROP COLUMN "injuredMember",
DROP COLUMN "injuryType",
DROP COLUMN "insuranceReport",
DROP COLUMN "medicalCenter",
DROP COLUMN "sender",
DROP COLUMN "severity",
DROP COLUMN "unit",
DROP COLUMN "victimPhone",
ADD COLUMN     "birthDate" TEXT,
ADD COLUMN     "cause" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "exactLocation" TEXT,
ADD COLUMN     "hasPPE" TEXT,
ADD COLUMN     "hasTraining" TEXT,
ADD COLUMN     "hireDate" TEXT,
ADD COLUMN     "hospitalReferral" TEXT,
ADD COLUMN     "injuredArea" TEXT,
ADD COLUMN     "lostWorkHours" TEXT,
ADD COLUMN     "maritalStatus" TEXT,
ADD COLUMN     "medicalActions" TEXT,
ADD COLUMN     "medicalNotes" TEXT,
ADD COLUMN     "otherMedical" TEXT,
ADD COLUMN     "outpatientTreatment" TEXT,
ADD COLUMN     "personnelCode" TEXT,
ADD COLUMN     "result" TEXT,
ADD COLUMN     "supervisorName" TEXT,
ADD COLUMN     "supervisorReport" TEXT,
ADD COLUMN     "witnesses" TEXT,
ADD COLUMN     "workExperience" TEXT,
ADD COLUMN     "workLocation" TEXT;

-- AddForeignKey
ALTER TABLE "accidents" ADD CONSTRAINT "accidents_personnelCode_fkey" FOREIGN KEY ("personnelCode") REFERENCES "personnel"("personnelCode") ON DELETE SET NULL ON UPDATE CASCADE;
