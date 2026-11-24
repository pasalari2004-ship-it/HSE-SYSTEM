import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;

    if (!companyId) {
      return NextResponse.json({ success: false, error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const ncs = await prisma.nonConformity.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: ncs });
  } catch (error) {
    console.error("GET NonConformity Error:", error);
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
    
    // محاسبه RPL بر اساس شدت و احتمال
    const s = parseInt(body.severity) || 1;
    const p = parseInt(body.probability) || 1;
    const d = parseInt(body.detection) || 1;
    const rpl = (s * p) >= 15 ? "غیرقابل تحمل" : "قابل تحمل"; // محاسبه ساده

    const newNc = await prisma.nonConformity.create({
      data: {
        companyId,
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
        status: body.status || "باز",
      },
    });

    return NextResponse.json({ success: true, data: newNc });
  } catch (error) {
    console.error("POST NonConformity Error:", error);
    return NextResponse.json({ success: false, error: "خطا در ثبت اطلاعات" }, { status: 500 });
  }
}