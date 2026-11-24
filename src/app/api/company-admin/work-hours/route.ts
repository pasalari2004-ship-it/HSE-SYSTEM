import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;
    if (!companyId) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });

    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get("year") || "");
    const month = parseInt(url.searchParams.get("month") || "");

    const workHours = await prisma.workHours.findUnique({
      where: { companyId_year_month: { companyId, year, month } },
    });

    return NextResponse.json({ success: true, data: workHours });
  } catch (error) {
    console.error("WorkHours GET Error:", error);
    return NextResponse.json({ error: "خطا در دریافت اطلاعات" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;
    if (!companyId) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });

    const body = await request.json();
    const { year, month, totalHours } = body;

    if (!year || !month || totalHours === undefined) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }

    const workHours = await prisma.workHours.upsert({
      where: { companyId_year_month: { companyId, year, month } },
      update: { totalHours },
      create: { companyId, year, month, totalHours },
    });

    return NextResponse.json({ success: true, data: workHours });
  } catch (error) {
    console.error("WorkHours POST Error:", error);
    return NextResponse.json({ error: "خطا در ذخیره اطلاعات" }, { status: 500 });
  }
}