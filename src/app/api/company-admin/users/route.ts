import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await auth();
  const userRole = (session?.user as any)?.role;
  const companyId = (session?.user as any)?.companyId;

  // فقط COMPANY_ADMIN اجازه داره
  if (!session || userRole !== "COMPANY_ADMIN" || !companyId) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { fullName, username, password, role, unitName } = body;

    if (!fullName || !username || !password) {
      return NextResponse.json({ error: "همه فیلدها الزامی هستند" }, { status: 400 });
    }

    // بررسی اینکه نقش انتخابی حتماً مجاز باشه (مدیرعامل نتونه سوپر ادمین بسازه)
    if (role !== "HSE_MANAGER" && role !== "UNIT_MANAGER") {
      return NextResponse.json({ error: "نقش نامعتبر است" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        companyId, // به صورت خودکار به شرکت همین مدیرعامل وصل میشه
        fullName,
        username,
        passwordHash,
        role,
        unitName: unitName || null,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, id: user.id });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "این نام کاربری قبلاً ثبت شده است" }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "خطا در ثبت کاربر" }, { status: 500 });
  }
}