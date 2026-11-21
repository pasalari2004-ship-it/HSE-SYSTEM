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

  // گرفتن کاربر
  const user = await prisma.user.findUnique({
    where: { id: userId, companyId },
    include: { permissions: true },
  });

  if (!user) return notFound();

  // ماژول‌ها و زیرمنوهایی که شرکت بهشون دسترسی داره
  const companyModules = await prisma.companyModule.findMany({
    where: { companyId },
  });
  
  const allowedCompanyModuleIds = companyModules.map(m => m.moduleId);
  const allowedCompanySubModuleIds = companyModules.filter(m => m.subModuleId).map(m => m.subModuleId as string);

  // فیلتر کردن منو برای نمایش فقط موارد مجاز شرکت
  const availableMenu = menuData.map(cat => {
    const items = cat.items.map(item => {
      // آیا شرکت به ماژول اصلی دسترسی داره؟
      const hasModuleAccess = allowedCompanyModuleIds.includes(item.id);
      
      // فیلتر کردن زیرمنوها: فقط اونایی که شرکت دسترسی داره
      const submenu = item.submenu.filter(sub => allowedCompanySubModuleIds.includes(sub.id));

      // اگه نه خود ماژول و نه زیرمنوهاش مجاز نیستن، نمایش نده
      if (!hasModuleAccess && submenu.length === 0) return null;

      return { ...item, submenu };
    }).filter(Boolean) as any[];

    return { ...cat, items };
  }).filter(cat => cat.items.length > 0);

  // ماژول‌ها و زیرمنوهایی که کاربر الان دسترسی داره
  const userPermissionIds = user.permissions.map(p => p.moduleId);
  const userSubPermissionIds = user.permissions.filter(p => p.subModuleId).map(p => p.subModuleId as string);

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
        const selectedItems = formData.getAll("modules") as string[];
        
        await prisma.userPermission.deleteMany({ where: { userId } });
        
        // ذخیره ماژول‌های اصلی و زیرمنوها
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

        for (const modId of moduleIds) {
          await prisma.userPermission.create({
            data: { userId, moduleId: modId }
          });
        }

        for (const subId of subModuleIds) {
          const parentModule = subId.split("-")[0];
          await prisma.userPermission.create({
            data: { userId, moduleId: parentModule, subModuleId: subId }
          });
        }
        
        const { redirect: serverRedirect } = await import("next/navigation");
        serverRedirect("/company-admin/users");
      }}>
        
        <div className="flex flex-col gap-6 mb-8">
          {availableMenu.length === 0 ? (
            <p className="text-slate-500">هیچ ماژولی برای این شرکت فعال نشده است. ابتدا از پنل سوپر ادمین ماژول‌های شرکت را فعال کنید.</p>
          ) : (
            availableMenu.map((category) => (
              <div key={category.category} className="border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((mod: any) => (
                    <div key={mod.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      {/* ماژول اصلی */}
                      <label className="flex items-center gap-3 font-semibold text-slate-800 cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="modules" 
                          value={mod.id}
                          defaultChecked={userPermissionIds.includes(mod.id)}
                          className="w-5 h-5 text-[#2e7cc4] rounded focus:ring-[#2e7cc4]"
                        />
                        <span>{mod.icon} {mod.title}</span>
                      </label>

                      {/* زیرمنوها */}
                      {mod.submenu.length > 0 && (
                        <div className="mr-8 flex flex-col gap-2 mt-2 border-r-2 border-slate-200 pr-4">
                          {mod.submenu.map((sub: any) => (
                            <label key={sub.id} className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                              <input 
                                type="checkbox" 
                                name="modules" 
                                value={`sub-${sub.id}`}
                                defaultChecked={userSubPermissionIds.includes(sub.id)}
                                className="w-4 h-4 text-[#2e7cc4] rounded focus:ring-[#2e7cc4]"
                              />
                              <span>{sub.icon} {sub.name}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <button type="submit" disabled={availableMenu.length === 0} className="bg-[#0f2c4c] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1e4d7b] transition w-full md:w-auto disabled:opacity-50">
          ذخیره دسترسی‌ها
        </button>
      </form>
    </div>
  );
}