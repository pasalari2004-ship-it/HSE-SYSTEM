import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  const superAdminPassword = await bcrypt.hash("Admin@1403", 10);

  const superAdmin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      passwordHash: superAdminPassword,
      fullName: "مدیر کل ایمن‌سازان",
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Super Admin created:", superAdmin.username);

  const pakshoo = await prisma.company.upsert({
    where: { name: "پاکشو" },
    update: {},
    create: {
      name: "پاکشو",
      address: "اصفهان، شهرک صنعتی",
      field: "تولید مواد شوینده",
      isActive: true,
    },
  });

  console.log("✅ Company created:", pakshoo.name);

  const hsePassword = await bcrypt.hash("Hse@1403", 10);

  const hseManager = await prisma.user.upsert({
    where: { username: "hse.pakshoo" },
    update: {},
    create: {
      username: "hse.pakshoo",
      passwordHash: hsePassword,
      fullName: "کارشناس ارشد HSE پاکشو",
      role: "HSE_MANAGER",
      companyId: pakshoo.id,
      isActive: true,
    },
  });

  console.log("✅ HSE Manager created:", hseManager.username);
  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });