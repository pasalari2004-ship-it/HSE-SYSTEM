import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split("/").pop() || "");

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "شناسه نامعتبر" },
        { status: 400 }
      );
    }

    const accident = await prisma.accident.findUnique({
      where: { id },
      include: {
        personnel: {
          select: {
            fullName: true,
            unit: true,
            position: true,
            mobile: true,
          },
        },
      },
    });

    if (!accident) {
      return NextResponse.json(
        { success: false, error: "حادثه یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: accident });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: "خطا در دریافت اطلاعات" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split("/").pop() || "");

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "شناسه نامعتبر" },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.victimName || !body.victimName.trim()) {
      return NextResponse.json(
        { success: false, error: "نام حادثه‌دیده الزامی است" },
        { status: 400 }
      );
    }

    const accident = await prisma.accident.update({
      where: { id },
      data: {
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
    console.error("PUT Error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "حادثه یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: "خطا در بروزرسانی اطلاعات" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split("/").pop() || "");

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "شناسه نامعتبر" },
        { status: 400 }
      );
    }

    await prisma.accident.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "حادثه با موفقیت حذف شد",
    });
  } catch (error: any) {
    console.error("DELETE Error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "حادثه یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: "خطا در حذف حادثه" },
      { status: 500 }
    );
  }
}