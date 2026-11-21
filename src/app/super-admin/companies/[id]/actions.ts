"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function saveCompanyModules(companyId: number, formData: FormData) {
  const selectedItems = formData.getAll("modules") as string[];
  
  // ۱. پاک کردن دسترسی‌های قبلی شرکت
  await prisma.companyModule.deleteMany({ where: { companyId } });
  
  // ۲. جداسازی ماژول‌های اصلی و زیرمنوها
  const moduleIds = new Set<string>();
  const subModuleIds = new Set<string>();

  selectedItems.forEach((item) => {
    if (item.startsWith("sub-")) {
      const subId = item.replace("sub-", "");
      const parentModule = subId.split("-")[0]; 
      subModuleIds.add(subId);
      moduleIds.add(parentModule);
    } else {
      moduleIds.add(item);
    }
  });

  // ۳. ذخیره ماژول‌های اصلی
  for (const modId of moduleIds) {
    await prisma.companyModule.create({
      data: { companyId, moduleId: modId }
    });
  }

  // ۴. ذخیره زیرمنوها
  for (const subId of subModuleIds) {
    const parentModule = subId.split("-")[0];
    await prisma.companyModule.create({
      data: { 
        companyId, 
        moduleId: parentModule, 
        subModuleId: subId 
      }
    });
  }
  
  // ۵. برگشت به صفحه لیست شرکت‌ها
  redirect("/super-admin/companies");
}