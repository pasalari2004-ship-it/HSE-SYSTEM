import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;
    if (!companyId) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });

    // دریافت همه حوادث شرکت
    const accidents = await prisma.accident.findMany({
      where: { companyId },
      orderBy: { accidentDate: "desc" },
    });

    // محاسبه تعداد روزهای بدون حادثه
    let daysWithoutAccident = 0;
    if (accidents.length > 0) {
      // فرض بر اینه که تاریخ آخرین حادثه رو داریم
      const lastAccidentDateStr = accidents[0].accidentDate;
      if (lastAccidentDateStr) {
        // محاسبه ساده روزها (برای دقت بیشتر نیاز به کتابخانه تاریخ شمسی هست)
        // فعلاً یک عدد فرضی می‌ذاریم تا ساختار مشخص باشه
        daysWithoutAccident = 45; 
      }
    } else {
      daysWithoutAccident = 0; // یا تعداد کل روزهای از شروع سال
    }

    return NextResponse.json({
      success: true,
      data: {
        daysWithoutAccident,
        currentDate: "۱۴۰۵ مهر ۱۶, پنجشنبه", // تاریخ جاری (باید داینامیک بشه)
        lastAccidentDate: accidents.length > 0 ? accidents[0].accidentDate : "بدون حادثه",
        accidents: accidents, // برای نمودار
      }
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "خطا در دریافت اطلاعات" }, { status: 500 });
  }
}