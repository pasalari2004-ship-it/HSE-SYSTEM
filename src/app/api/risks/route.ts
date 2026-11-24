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

    const risks = await prisma.risk.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: risks });
  } catch (error) {
    console.error("GET Risks Error:", error);
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
      title, description, location, activity, 
      probability, severity, controlMeasures, 
      responsible, deadline, status 
    } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: "عنوان خطر الزامی است" }, { status: 400 });
    }

    const riskLevel = (parseInt(probability) || 1) * (parseInt(severity) || 1);

    const newRisk = await prisma.risk.create({
      data: {
        companyId,
        title,
        description,
        location,
        activity,
        probability: parseInt(probability) || 1,
        severity: parseInt(severity) || 1,
        riskLevel,
        controlMeasures,
        responsible,
        deadline,
        status: status || "باز",
      },
    });

    return NextResponse.json({ success: true, data: newRisk });
  } catch (error) {
    console.error("POST Risk Error:", error);
    return NextResponse.json({ success: false, error: "خطا در ثبت اطلاعات" }, { status: 500 });
  }
}