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

    const guidelines = await prisma.guideline.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json({ success: true, data: guidelines });
  } catch (error) {
    console.error("GET Error:", error);
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

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "عنوان دستورالعمل الزامی است" },
        { status: 400 }
      );
    }

    const guideline = await prisma.guideline.create({
      data: {
        companyId,
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
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, error: "خطا در ذخیره اطلاعات" },
      { status: 500 }
    );
  }
}