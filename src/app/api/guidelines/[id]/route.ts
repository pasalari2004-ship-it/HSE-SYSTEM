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

    const guideline = await prisma.guideline.findUnique({
      where: { id },
    });

    if (!guideline) {
      return NextResponse.json(
        { success: false, error: "دستورالعمل یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: guideline });
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

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "عنوان دستورالعمل الزامی است" },
        { status: 400 }
      );
    }

    const guideline = await prisma.guideline.update({
      where: { id },
      data: {
        title: body.title,
        documentCode: body.documentCode || null,
        version: body.version || null,
        category: body.category || "دستورالعمل",
        processOwner: body.processOwner || null,
        approvalDate: body.approvalDate || null,
        reviewDate: body.reviewDate || null,
        description: body.description || null,
        content: body.content || null,
        fileUrl: body.fileUrl || null,
        status: body.status || "فعال",
      },
    });

    return NextResponse.json({ success: true, data: guideline });
  } catch (error: any) {
    console.error("PUT Error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "دستورالعمل یافت نشد" },
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

    await prisma.guideline.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "دستورالعمل با موفقیت حذف شد",
    });
  } catch (error: any) {
    console.error("DELETE Error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "دستورالعمل یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: "خطا در حذف دستورالعمل" },
      { status: 500 }
    );
  }
}