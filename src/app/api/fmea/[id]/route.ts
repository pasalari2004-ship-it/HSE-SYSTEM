import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// تابع کمکی برای محاسبه RPL
function getRplFromSO(s: number, o: number): string {
  if (s === 10) return "فاجعه بار";
  if (s >= 8 && o >= 4) return "فاجعه بار";
  if (s >= 8 || (s >= 6 && o >= 6)) return "بحرانی";
  if (s >= 4 && o >= 4) return "مرزی";
  return "کم اهمیت";
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;

    if (!companyId) {
      return NextResponse.json({ success: false, error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const fmea = await prisma.fmea.findFirst({
      where: { id: parseInt(params.id), companyId },
    });

    if (!fmea) {
      return NextResponse.json({ success: false, error: "FMEA یافت نشد" }, { status: 404 });
    }

    // محاسبه مجدد RPL برای اطمینان
    const correctRpl = getRplFromSO(fmea.severity, fmea.occurrence);
    return NextResponse.json({ success: true, data: { ...fmea, rpl: correctRpl } });
  } catch (error) {
    console.error("GET FMEA Error:", error);
    return NextResponse.json({ success: false, error: "خطا در دریافت اطلاعات" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;

    if (!companyId) {
      return NextResponse.json({ success: false, error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      processName, failureMode, failureEffect, failureCause, currentControls,
      severity, occurrence, detection, strategy, recommendedAction, responsible, deadline, status,
      newSeverity, newOccurrence, newDetection
    } = body;

    const s = parseInt(severity) || 1;
    const o = parseInt(occurrence) || 1;
    const d = parseInt(detection) || 1;
    const rpn = s * o * d;
    const rpl = getRplFromSO(s, o);
    
    let newRpn = null;
    if (newSeverity && newOccurrence && newDetection) {
      newRpn = parseInt(newSeverity) * parseInt(newOccurrence) * parseInt(newDetection);
    }

    const updatedFmea = await prisma.fmea.updateMany({
      where: { id: parseInt(params.id), companyId },
      data: {
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
        status,
        newSeverity: newSeverity ? parseInt(newSeverity) : null,
        newOccurrence: newOccurrence ? parseInt(newOccurrence) : null,
        newDetection: newDetection ? parseInt(newDetection) : null,
        newRpn,
      },
    });

    if (updatedFmea.count === 0) {
      return NextResponse.json({ success: false, error: "FMEA یافت نشد یا دسترسی ندارید" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "با موفقیت بروزرسانی شد" });
  } catch (error) {
    console.error("PUT FMEA Error:", error);
    return NextResponse.json({ success: false, error: "خطا در بروزرسانی" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;

    if (!companyId) {
      return NextResponse.json({ success: false, error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const deleted = await prisma.fmea.deleteMany({
      where: { id: parseInt(params.id), companyId },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ success: false, error: "FMEA یافت نشد یا دسترسی ندارید" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "با موفقیت حذف شد" });
  } catch (error) {
    console.error("DELETE FMEA Error:", error);
    return NextResponse.json({ success: false, error: "خطا در حذف" }, { status: 500 });
  }
}