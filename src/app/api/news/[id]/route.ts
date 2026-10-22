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

    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return NextResponse.json(
        { success: false, error: "خبر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: "خطا در دریافت خبر" },
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

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "عنوان خبر الزامی است" },
        { status: 400 }
      );
    }

    const news = await prisma.news.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        source: body.source || null,
        imageUrl: body.imageUrl || null,
        isPublished: body.isPublished !== undefined ? body.isPublished : true,
      },
    });

    return NextResponse.json({ success: true, data: news });
  } catch (error: any) {
    console.error("PUT Error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "خبر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: "خطا در بروزرسانی خبر" },
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

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "خبر با موفقیت حذف شد",
    });
  } catch (error: any) {
    console.error("DELETE Error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "خبر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: "خطا در حذف خبر" },
      { status: 500 }
    );
  }
}