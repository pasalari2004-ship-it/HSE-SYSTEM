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

    const news = await prisma.news.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json({ success: true, data: news });
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

    if (!body.title || !body.content) {
      return NextResponse.json({ success: false, error: "عنوان و متن خبر الزامی است" }, { status: 400 });
    }

    const news = await prisma.news.create({
      data: {
        companyId,
        title: body.title,
        content: body.content,
        source: body.source || null,
        imageUrl: body.imageUrl || null,
        isPublished: body.isPublished ?? true,
      },
    });

    return NextResponse.json({ success: true, data: news });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: "خطا در ذخیره اطلاعات" }, { status: 500 });
  }
}