import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || (session.user as any).role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { companyId, fullName, username, password, role } = body;

    if (!companyId || !fullName || !username || !password) {
      return NextResponse.json({ error: "همه فیلدها الزامی هستند" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        companyId,
        fullName,
        username,
        passwordHash,
        role,
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