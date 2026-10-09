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

    const personnel = await prisma.personnel.findUnique({
      where: { id },
    });

    if (!personnel) {
      return NextResponse.json(
        { success: false, error: "کارمند یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: personnel });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: "خطا در دریافت اطلاعات" },
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

    await prisma.personnel.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "کارمند با موفقیت حذف شد",
    });
  } catch (error: any) {
    console.error("DELETE Error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: "کارمند یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: "خطا در حذف کارمند" },
      { status: 500 }
    );
  }
}