import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;
    if (!companyId) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });

    // گرفتن همه حوادث شرکت
    const accidents = await prisma.accident.findMany({
      where: { companyId },
    });

    // گرفتن ساعات کار ثبت‌شده
    const workHoursRecords = await prisma.workHours.findMany({
      where: { companyId },
    });

    const monthsData = Array(12).fill(0).map((_, index) => ({
      month: index + 1,
      accidents: 0,
      lostDays: 0,
      workHours: 0,
    }));

    // پر کردن داده‌های حوادث
    accidents.forEach(acc => {
      const monthStr = acc.accidentDate?.split("/")[1];
      if (monthStr) {
        const monthIndex = parseInt(monthStr) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthsData[monthIndex].accidents += 1;
          monthsData[monthIndex].lostDays += acc.sickLeaveDays || 0;
        }
      }
    });

    // پر کردن ساعات کار
    workHoursRecords.forEach(wh => {
      if (wh.month >= 1 && wh.month <= 12) {
        monthsData[wh.month - 1].workHours = wh.totalHours;
      }
    });

    return NextResponse.json({ success: true, data: monthsData });
  } catch (error) {
    console.error("Indicators API Error:", error);
    return NextResponse.json({ error: "خطا در محاسبه شاخص‌ها" }, { status: 500 });
  }
}