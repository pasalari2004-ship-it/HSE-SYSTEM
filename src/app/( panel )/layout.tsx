import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const role = (session.user as any)?.role;
  const companyId = (session.user as any)?.companyId;

  let allowedModuleIds: string[] = [];
  let allowedSubModuleIds: string[] = [];

  // گرفتن دسترسی‌ها بر اساس نقش کاربر
  if (role === "HSE_MANAGER" || role === "UNIT_MANAGER") {
    const permissions = await prisma.userPermission.findMany({
      where: { userId: parseInt((session.user as any)?.id) },
    });
    allowedModuleIds = permissions.map(p => p.moduleId);
    allowedSubModuleIds = permissions.filter(p => p.subModuleId).map(p => p.subModuleId as string);
  } else if (role === "COMPANY_ADMIN") {
    const companyModules = await prisma.companyModule.findMany({
      where: { companyId },
    });
    allowedModuleIds = companyModules.map(m => m.moduleId);
    allowedSubModuleIds = companyModules.filter(m => m.subModuleId).map(m => m.subModuleId as string);
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Header />
      <div className="flex">
        <Sidebar 
          allowedModuleIds={allowedModuleIds} 
          allowedSubModuleIds={allowedSubModuleIds} 
        />
        <main className="flex-1 overflow-x-hidden p-8">{children}</main>
      </div>
    </div>
  );
}