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

    const interviews = await prisma.interview.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json({ success: true, data: interviews });
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

    const interview = await prisma.interview.create({
      data: {
        companyId,
        fullName: body.fullName,
        position: body.position || null,
        birthDate: body.birthDate || null,
        age: body.age ? Number(body.age) : null,
        unit: body.unit || null,
        otherUnits: body.otherUnits || null,
        diseaseHistory: body.diseaseHistory || null,
        diseaseNotes: body.diseaseNotes || null,
        accidentHistory: body.accidentHistory || null,
        accidentNotes: body.accidentNotes || null,
        safetyKnowledge: body.safetyKnowledge || null,
        hseCourses: body.hseCourses || null,
        hseCoursesNotes: body.hseCoursesNotes || null,
        sportsHistory: body.sportsHistory || null,
        sportsNotes: body.sportsNotes || null,
        physicalFitness: body.physicalFitness || null,
        smokingHistory: body.smokingHistory || null,
        smokingNotes: body.smokingNotes || null,
        fileStatus: body.fileStatus || null,
        lastTestDate: body.lastTestDate || null,
        healthStatus: body.healthStatus || null,
        height: body.height ? Number(body.height) : null,
        weight: body.weight ? Number(body.weight) : null,
        bmi: body.bmi || null,
        militaryStatus: body.militaryStatus || null,
        serviceField: body.serviceField || null,
        exemptionType: body.exemptionType || null,
        hseOpinion: body.hseOpinion || null,
        notes: body.notes || null,
        interviewerName: body.interviewerName || null,
      },
    });

    return NextResponse.json({ success: true, data: interview });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: "خطا در ذخیره اطلاعات" }, { status: 500 });
  }
}