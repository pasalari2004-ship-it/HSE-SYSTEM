import { PrismaClient } from '@prisma/client';
import { menuData } from './src/data/menu';

const prisma = new PrismaClient();

async function main() {
  console.log("⏳ شروع فرآیند پاکسازی مجوزهای اضافی...");

  const allModules: { moduleId: string, subModuleId: string | null }[] = [];

  menuData.forEach((category: any) => {
    category.items.forEach((item: any) => {
      allModules.push({ moduleId: item.id, subModuleId: null });
      item.submenu.forEach((sub: any) => {
        allModules.push({ moduleId: item.id, subModuleId: sub.id });
      });
    });
  });

  console.log(`📊 تعداد مجوزهایی که قرار است حذف شوند: ${allModules.length}`);

  // حذف از CompanyModule
  for (const mod of allModules) {
    await prisma.companyModule.deleteMany({
      where: {
        moduleId: mod.moduleId,
        subModuleId: mod.subModuleId,
      }
    });
  }
  console.log("✅ مجوزهای اضافی از جدول شرکت‌ها حذف شد.");

  // حذف از UserPermission
  for (const mod of allModules) {
    await prisma.userPermission.deleteMany({
      where: {
        moduleId: mod.moduleId,
        subModuleId: mod.subModuleId,
      }
    });
  }
  console.log("✅ مجوزهای اضافی از جدول کاربران حذف شد.");

  console.log("🎉 پاکسازی با موفقیت انجام شد! حالا فقط دسترسی‌های دستی خودتان باقی مانده است.");
}

main()
  .catch((e) => {
    console.error("❌ خطا:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });