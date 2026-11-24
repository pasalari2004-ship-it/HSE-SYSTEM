import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET: دریافت تحلیل یک حادثه خاص
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;
    if (!companyId) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });

    const url = new URL(request.url);
    const accidentId = parseInt(url.searchParams.get("accidentId") || "");
    if (isNaN(accidentId)) return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 400 });

    const analysis = await prisma.accidentAnalysis.findUnique({
      where: { accidentId },
    });

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error("GET Analysis Error:", error);
    return NextResponse.json({ error: "خطا در دریافت اطلاعات" }, { status: 500 });
  }
}

// POST: ذخیره یا بروزرسانی تحلیل
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;
    const role = (session?.user as any)?.role;
    if (!companyId) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });

    const body = await request.json();
    const { accidentId, ...data } = body;

    if (!accidentId) return NextResponse.json({ error: "شناسه حادثه الزامی است" }, { status: 400 });

    // چک کردن اینکه این حادثه متعلق به همین شرکته
    const accident = await prisma.accident.findFirst({
      where: { id: accidentId, companyId },
    });
    if (!accident) return NextResponse.json({ error: "حادثه یافت نشد" }, { status: 404 });

    // پیدا کردن تحلیل موجود (اگه هست، آپدیت کن، وگرنه بساز)
    const existing = await prisma.accidentAnalysis.findUnique({
      where: { accidentId },
    });

    let analysis;
    if (existing) {
      analysis = await prisma.accidentAnalysis.update({
        where: { accidentId },
        data: { ...data, companyId },
      });
    } else {
      analysis = await prisma.accidentAnalysis.create({
        data: { accidentId, companyId, ...data },
      });
    }

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error("POST Analysis Error:", error);
    return NextResponse.json({ error: "خطا در ذخیره اطلاعات" }, { status: 500 });
  }
}