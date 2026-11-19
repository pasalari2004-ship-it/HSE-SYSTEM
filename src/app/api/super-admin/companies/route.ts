import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET: دریافت لیست همه شرکت‌ها
export async function GET() {
  const session = await auth();
  if (!session || (session.user as any).role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(companies);
}

// POST: ثبت شرکت جدید
export async function POST(req: Request) {
  const session = await auth();
  if (!session || (session.user as any).role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, address, field } = body;

    if (!name) {
      return NextResponse.json({ error: "نام شرکت الزامی است" }, { status: 400 });
    }

    const company = await prisma.company.create({
      data: {
        name,
        address: address || null,
        field: field || null,
      },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "این نام شرکت قبلاً ثبت شده است" }, { status: 400 });
    }
    return NextResponse.json({ error: "خطا در ثبت شرکت" }, { status: 500 });
  }
}