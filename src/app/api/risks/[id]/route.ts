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

    const risk = await prisma.risk.findFirst({
      where: { id: parseInt(params.id), companyId },
    });

    if (!risk) {
      return NextResponse.json({ success: false, error: "خطر یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: risk });
  } catch (error) {
    console.error("GET Risk Error:", error);
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
      title, description, location, activity, 
      probability, severity, controlMeasures, 
      responsible, deadline, status 
    } = body;

    const riskLevel = (parseInt(probability) || 1) * (parseInt(severity) || 1);

    const updatedRisk = await prisma.risk.updateMany({
      where: { id: parseInt(params.id), companyId },
      data: {
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
        status,
      },
    });

    if (updatedRisk.count === 0) {
      return NextResponse.json({ success: false, error: "خطر یافت نشد یا دسترسی ندارید" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "با موفقیت بروزرسانی شد" });
  } catch (error) {
    console.error("PUT Risk Error:", error);
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

    const deleted = await prisma.risk.deleteMany({
      where: { id: parseInt(params.id), companyId },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ success: false, error: "خطر یافت نشد یا دسترسی ندارید" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "با موفقیت حذف شد" });
  } catch (error) {
    console.error("DELETE Risk Error:", error);
    return NextResponse.json({ success: false, error: "خطا در حذف" }, { status: 500 });
  }
}