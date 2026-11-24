import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// تابع کمکی برای محاسبه RPL بر اساس S و O (طبق استاندارد پاکشو)
function getRplFromSO(s: number, o: number): string {
  if (s === 10) return "فاجعه بار";
  if (s >= 8 && o >= 4) return "فاجعه بار";
  if (s >= 8 || (s >= 6 && o >= 6)) return "بحرانی";
  if (s >= 4 && o >= 4) return "مرزی";
  return "کم اهمیت";
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;

    if (!companyId) {
      return NextResponse.json({ success: false, error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const fmeas = await prisma.fmea.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });

    // 👈 به‌روزرسانی خودکار RPL برای رکوردهای قدیمی
    const updatedFmeas = await Promise.all(
      fmeas.map(async (fmea) => {
        const correctRpl = getRplFromSO(fmea.severity, fmea.occurrence);
        
        // اگر RPL فعلی با RPL صحیح متفاوت بود، در دیتابیس هم آپدیت کن
        if (fmea.rpl !== correctRpl) {
          await prisma.fmea.update({
            where: { id: fmea.id },
            data: { rpl: correctRpl },
          });
          return { ...fmea, rpl: correctRpl };
        }
        return fmea;
      })
    );

    return NextResponse.json({ success: true, data: updatedFmeas });
  } catch (error) {
    console.error("GET FMEA Error:", error);
    return NextResponse.json({ success: false, error: "خطا در دریافت اطلاعات" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;

    if (!companyId) {
      return NextResponse.json({ success: false, error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      processName, failureMode, failureEffect, failureCause, currentControls,
      severity, occurrence, detection, strategy, recommendedAction, responsible, deadline, status 
    } = body;

    if (!processName || !failureMode) {
      return NextResponse.json({ success: false, error: "نام فرآیند و حالت خرابی الزامی است" }, { status: 400 });
    }

    const s = parseInt(severity) || 1;
    const o = parseInt(occurrence) || 1;
    const d = parseInt(detection) || 1;
    const rpn = s * o * d;
    const rpl = getRplFromSO(s, o);

    const newFmea = await prisma.fmea.create({
      data: {
        companyId,
        processName,
        failureMode,
        failureEffect,
        failureCause,
        currentControls,
        severity: s,
        occurrence: o,
        detection: d,
        rpn,
        rpl,
        strategy,
        recommendedAction,
        responsible,
        deadline,
        status: status || "باز",
      },
    });

    return NextResponse.json({ success: true, data: newFmea });
  } catch (error) {
    console.error("POST FMEA Error:", error);
    return NextResponse.json({ success: false, error: "خطا در ثبت اطلاعات" }, { status: 500 });
  }
}