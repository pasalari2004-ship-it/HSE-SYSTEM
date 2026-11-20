import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;
    if (!companyId) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });

    const url = new URL(request.url);
    const id = parseInt(url.pathname.split("/").pop() || "");
    if (isNaN(id)) return NextResponse.json({ success: false, error: "شناسه نامعتبر" }, { status: 400 });

    const news = await prisma.news.findFirst({
      where: { id, companyId },
    });

    if (!news) {
      return NextResponse.json({ success: false, error: "خبر یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, error: "خطا در دریافت اطلاعات" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;
    if (!companyId) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });

    const url = new URL(request.url);
    const id = parseInt(url.pathname.split("/").pop() || "");
    if (isNaN(id)) return NextResponse.json({ success: false, error: "شناسه نامعتبر" }, { status: 400 });

    const existing = await prisma.news.findFirst({ where: { id, companyId } });
    if (!existing) return NextResponse.json({ success: false, error: "خبر یافت نشد" }, { status: 404 });

    const body = await request.json();

    const news = await prisma.news.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        source: body.source || null,
        imageUrl: body.imageUrl || null,
        isPublished: body.isPublished ?? true,
      },
    });

    return NextResponse.json({ success: true, data: news });
  } catch (error: any) {
    console.error("PUT Error:", error);
    return NextResponse.json({ success: false, error: "خطا در بروزرسانی اطلاعات" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    const companyId = (session?.user as any)?.companyId;
    if (!companyId) return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });

    const url = new URL(request.url);
    const id = parseInt(url.pathname.split("/").pop() || "");
    if (isNaN(id)) return NextResponse.json({ success: false, error: "شناسه نامعتبر" }, { status: 400 });

    const existing = await prisma.news.findFirst({ where: { id, companyId } });
    if (!existing) return NextResponse.json({ success: false, error: "خبر یافت نشد" }, { status: 404 });

    await prisma.news.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "خبر با موفقیت حذف شد" });
  } catch (error: any) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ success: false, error: "خطا در حذف اطلاعات" }, { status: 500 });
  }
}