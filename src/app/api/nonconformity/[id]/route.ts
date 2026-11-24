import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;

    if (!companyId) {
      return NextResponse.json({ success: false, error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const nc = await prisma.nonConformity.findFirst({
      where: { id: parseInt(params.id), companyId },
    });

    if (!nc) {
      return NextResponse.json({ success: false, error: "عدم انطباق یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: nc });
  } catch (error) {
    console.error("GET NonConformity Error:", error);
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
    
    const s = parseInt(body.severity) || 1;
    const p = parseInt(body.probability) || 1;
    const d = parseInt(body.detection) || 1;
    const rpl = (s * p) >= 15 ? "غیرقابل تحمل" : "قابل تحمل";

    const updatedNc = await prisma.nonConformity.updateMany({
      where: { id: parseInt(params.id), companyId },
      data: {
        reportNumber: body.reportNumber,
        reportDate: body.reportDate,
        factoryName: body.factoryName,
        unitName: body.unitName,
        stationName: body.stationName,
        source: body.source,
        ncType: body.ncType,
        hazardDescription: body.hazardDescription,
        cause: body.cause,
        consequence: body.consequence,
        legalRequirement: body.legalRequirement,
        hseAction: body.hseAction,
        severity: s,
        probability: p,
        detection: d,
        rpl,
        action1Responsible: body.action1Responsible,
        action1Deadline: body.action1Deadline,
        action2Responsible: body.action2Responsible,
        action2Deadline: body.action2Deadline,
        actionReport: body.actionReport,
        managerAction: body.managerAction,
        effectiveness: body.effectiveness,
        followUpName: body.followUpName,
        status: body.status,
      },
    });

    if (updatedNc.count === 0) {
      return NextResponse.json({ success: false, error: "عدم انطباق یافت نشد یا دسترسی ندارید" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "با موفقیت بروزرسانی شد" });
  } catch (error) {
    console.error("PUT NonConformity Error:", error);
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

    const deleted = await prisma.nonConformity.deleteMany({
      where: { id: parseInt(params.id), companyId },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ success: false, error: "عدم انطباق یافت نشد یا دسترسی ندارید" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "با موفقیت حذف شد" });
  } catch (error) {
    console.error("DELETE NonConformity Error:", error);
    return NextResponse.json({ success: false, error: "خطا در حذف" }, { status: 500 });
  }
}