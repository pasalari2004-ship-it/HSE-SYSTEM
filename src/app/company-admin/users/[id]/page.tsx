import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { menuData } from "@/data/menu";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function EditUserPermissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;
  
  if (!session || (session?.user as any).role !== "COMPANY_ADMIN") {
    redirect("/login");
  }

  const resolvedParams = await params;
  const userId = parseInt(resolvedParams.id);
  if (isNaN(userId)) return notFound();

  // گرفتن کاربر (با شرط اینکه حتماً متعلق به همین شرکت باشه)
  const user = await prisma.user.findUnique({
    where: { id: userId, companyId },
    include: { permissions: true },
  });

  if (!user) return notFound();

  // ماژول‌هایی که شرکت بهش دسترسی داره
  const companyModules = await prisma.companyModule.findMany({
    where: { companyId },
  });
  const allowedCompanyModuleIds = companyModules.map(m => m.moduleId);

  // فقط ماژول‌هایی که شرکت دسترسی داره رو به کاربر نشون بده
  const availableModules = menuData.flatMap(cat => cat.items).filter(item => 
    allowedCompanyModuleIds.includes(item.id)
  );

  // ماژول‌هایی که کاربر الان دسترسی داره
  const userPermissionIds = user.permissions.map(p => p.moduleId);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            تعیین دسترسی‌های: {user.fullName}
          </h2>
          <p className="text-sm text-slate-500 mt-1">نقش: {user.role === "HSE_MANAGER" ? "کارشناس HSE" : "مدیر واحد"}</p>
        </div>
        <Link href="/company-admin/users" className="text-sm text-slate-500 hover:text-slate-800">
          بازگشت
        </Link>
      </div>

      <form action={async (formData) => {
        "use server";
        const selectedModules = formData.getAll("modules") as string[];
        
        // پاک کردن دسترسی‌های قبلی این کاربر
        await prisma.userPermission.deleteMany({ where: { userId } });
        
        // افزودن دسترسی‌های جدید
        if (selectedModules.length > 0) {
          await prisma.userPermission.createMany({
            data: selectedModules.map(modId => ({ userId, moduleId: modId }))
          });
        }
        
        const { redirect: serverRedirect } = await import("next/navigation");
        serverRedirect("/company-admin/users");
      }}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {availableModules.length === 0 ? (
            <p className="text-slate-500 col-span-2">هیچ ماژولی برای این شرکت فعال نشده است. ابتدا از پنل سوپر ادمین ماژول‌های شرکت را فعال کنید.</p>
          ) : (
            availableModules.map((mod) => (
              <label key={mod.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input 
                  type="checkbox" 
                  name="modules" 
                  value={mod.id}
                  defaultChecked={userPermissionIds.includes(mod.id)}
                  className="w-5 h-5 text-[#2e7cc4] rounded focus:ring-[#2e7cc4]"
                />
                <span className="text-slate-700 font-medium">
                  {mod.icon} {mod.title}
                </span>
              </label>
            ))
          )}
        </div>

        <button type="submit" disabled={availableModules.length === 0} className="bg-[#0f2c4c] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1e4d7b] transition w-full md:w-auto disabled:opacity-50">
          ذخیره دسترسی‌ها
        </button>
      </form>
    </div>
  );
}