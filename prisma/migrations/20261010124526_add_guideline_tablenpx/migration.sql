-- CreateTable
CREATE TABLE "guidelines" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "documentCode" TEXT,
    "version" TEXT,
    "category" TEXT NOT NULL DEFAULT 'دستورالعمل',
    "processOwner" TEXT,
    "approvalDate" TEXT,
    "reviewDate" TEXT,
    "description" TEXT,
    "content" TEXT,
    "fileUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'فعال',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guidelines_pkey" PRIMARY KEY ("id")
);
