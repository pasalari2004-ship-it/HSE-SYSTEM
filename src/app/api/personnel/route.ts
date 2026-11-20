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

    // فقط پرسنلِ همین شرکت رو برگردون
    const personnel = await prisma.personnel.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json({ success: true, data: personnel });
  } catch (error) {
    console.error("Error fetching personnel:", error);
    return NextResponse.json(
      { success: false, error: "خطا در دریافت اطلاعات" },
      { status: 500 }
    );
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

    const personnel = await prisma.personnel.create({
      data: {
        companyId, // 👈 اتصال به شرکتِ کاربرِ لاگین‌شده
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
    console.error("Error creating personnel:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "کد پرسنلی یا کد ملی تکراری است" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "خطا در ذخیره اطلاعات" },
      { status: 500 }
    );
  }
}