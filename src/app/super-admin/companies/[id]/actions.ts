"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function saveCompanyModules(companyId: number, formData: FormData) {
  const selectedModules = formData.getAll("modules") as string[];
  
  // پاک کردن دسترسی‌های قبلی
  await prisma.companyModule.deleteMany({ where: { companyId } });
  
  // افزودن دسترسی‌های جدید
  if (selectedModules.length > 0) {
    await prisma.companyModule.createMany({
      data: selectedModules.map(modId => ({ companyId, moduleId: modId }))
    });
  }
  
  redirect("/super-admin/companies");
}