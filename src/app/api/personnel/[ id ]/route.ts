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

    const personnel = await prisma.personnel.findUnique({
      where: { id },
    });

    if (!personnel) {
      return NextResponse.json(
        { success: false, error: "کارمند یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: personnel });
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

    const personnel = await prisma.personnel.update({
      where: { id },
      data: {
        personnelCode: body.personnelCode,
        fullName: body.fullName,
        nationalCode: body.nationalCode,
        mobile: body.mobile || null,
        fatherName: body.fatherName || null,
        issuePlace: body.issuePlace || null,
        birthDate: body.birthDate || null,
        gender: body.gender || null,
        maritalStatus: body.maritalStatus || null,
        childrenCount: body.childrenCount ? Number(body.childrenCount) : null,
        education: body.education || null,
        age: body.age ? Number(body.age) : null,
        height: body.height ? Number(body.height) : null,
        bloodPressure: body.bloodPressure || null,
        diseaseType: body.diseaseType || null,
        physicalFactors: body.physicalFactors || null,
        chemicalFactors: body.chemicalFactors || null,
        biologicalFactors: body.biologicalFactors || null,
        ergonomicFactors: body.ergonomicFactors || null,
        psychologicalFactors: body.psychologicalFactors || null,
        hireDate: body.hireDate || null,
        settlementDate: body.settlementDate || null,
        unit: body.unit || null,
        militaryStatus: body.militaryStatus || null,
        exemptionType: body.exemptionType || null,
        workStation: body.workStation || null,
        position: body.position || null,
        assignedDuty: body.assignedDuty || null,
        shiftType: body.shiftType || null,
        shiftHours: body.shiftHours || null,
        medicalFileNumber: body.medicalFileNumber || null,
        workConditions: body.workConditions || null,
        medicalAdvice: body.medicalAdvice || null,
        workPhone: body.workPhone || null,
        workAddress: body.workAddress || null,
        postalCodeWorkplace: body.postalCodeWorkplace || null,
        homePhone: body.homePhone || null,
        homePostalCode: body.homePostalCode || null,
        homeAddress: body.homeAddress || null,
        hseExpertOpinion: body.hseExpertOpinion || null,
      },
    });

    return NextResponse.json({ success: true, data: personnel });
  } catch (error: any) {
    console.error("PUT Error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "کد پرسنلی یا کد ملی تکراری است" },
        { status: 400 }
      );
    }

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "کارمند یافت نشد" },
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

    await prisma.personnel.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "کارمند با موفقیت حذف شد",
    });
  } catch (error: any) {
    console.error("DELETE Error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "کارمند یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: "خطا در حذف کارمند" },
      { status: 500 }
    );
  }
}