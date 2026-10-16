import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const accidents = await prisma.accident.findMany({
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
    return NextResponse.json(
      { success: false, error: "خطا در دریافت اطلاعات" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.victimName || !body.victimName.trim()) {
      return NextResponse.json(
        { success: false, error: "نام حادثه‌دیده الزامی است" },
        { status: 400 }
      );
    }

    const count = await prisma.accident.count();
    const accidentCode = `ACC-${new Date().getFullYear()}-${String(
      count + 1
    ).padStart(4, "0")}`;

    const accident = await prisma.accident.create({
      data: {
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
    return NextResponse.json(
      { success: false, error: "خطا در ذخیره اطلاعات" },
      { status: 500 }
    );
  }
}