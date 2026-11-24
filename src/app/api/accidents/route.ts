import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;

    if (!companyId) {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const accidents = await prisma.accident.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
      include: {
        personnel: {
          select: {
            fullName: true,
            unit: true,
            position: true,
          },
        },
      },
    });
    
    return NextResponse.json({ success: true, data: accidents });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, error: "خطا در دریافت اطلاعات" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;

    if (!companyId) {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.victimName || !body.victimName.trim()) {
      return NextResponse.json({ success: false, error: "نام حادثه‌دیده الزامی است" }, { status: 400 });
    }

    const count = await prisma.accident.count({ where: { companyId } });
    // 👈 اضافه کردن companyId به کد حادثه برای جلوگیری از تکرار
    const accidentCode = `ACC-${companyId}-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

    const accident = await prisma.accident.create({
      data: {
        companyId,
        accidentCode,
        personnelCode: body.personnelCode || null,
        victimName: body.victimName,
        birthDate: body.birthDate || null,
        hireDate: body.hireDate || null,
        job: body.job || null,
        workExperience: body.workExperience || null,
        education: body.education || null,
        maritalStatus: body.maritalStatus || null,
        workLocation: body.workLocation || null,
        accidentDate: body.accidentDate || null,
        accidentTime: body.accidentTime || null,
        exactLocation: body.exactLocation || null,
        injuredArea: body.injuredArea || null,
        description: body.description || null,
        result: body.result || null,
        cause: body.cause || null,
        hasTraining: body.hasTraining || null,
        hasPPE: body.hasPPE || null,
        witnesses: body.witnesses || null,
        supervisorReport: body.supervisorReport || null,
        supervisorName: body.supervisorName || null,
        medicalActions: body.medicalActions || null,
        outpatientTreatment: body.outpatientTreatment || null,
        hospitalReferral: body.hospitalReferral || null,
        otherMedical: body.otherMedical || null,
        sickLeaveDays: body.sickLeaveDays ? Number(body.sickLeaveDays) : null,
        lostWorkHours: body.lostWorkHours || null,
        medicalNotes: body.medicalNotes || null,
        status: body.status || "باز",
      },
    });

    return NextResponse.json({ success: true, data: accident });
  } catch (error: any) {
    console.error("POST Error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ success: false, error: "کد حادثه تکراری است" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "خطا در ذخیره اطلاعات" }, { status: 500 });
  }
}