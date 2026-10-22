import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: "خطا در دریافت اخبار" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "عنوان خبر الزامی است" },
        { status: 400 }
      );
    }

    if (!body.content || !body.content.trim()) {
      return NextResponse.json(
        { success: false, error: "متن خبر الزامی است" },
        { status: 400 }
      );
    }

    const news = await prisma.news.create({
      data: {
        title: body.title,
        content: body.content,
        source: body.source || null,
        imageUrl: body.imageUrl || null,
        isPublished: body.isPublished !== undefined ? body.isPublished : true,
      },
    });

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, error: "خطا در ذخیره خبر" },
      { status: 500 }
    );
  }
}