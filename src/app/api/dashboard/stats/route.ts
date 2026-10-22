import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalPersonnel = await prisma.personnel.count();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const accidentsThisMonth = await prisma.accident.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    const totalAccidents = await prisma.accident.count();

    const openAccidents = await prisma.accident.count({
      where: {
        status: "باز",
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        totalPersonnel,
        accidentsThisMonth,
        totalAccidents,
        openAccidents,
        validMedical: 0,
        ppeNeedingReplacement: 0,
      },
    });
  } catch (error) {
    console.error("GET Stats Error:", error);
    return NextResponse.json(
      { success: false, error: "خطا در دریافت آمار" },
      { status: 500 }
    );
  }
}