import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { menuData } from "@/data/menu";

export default async function Sidebar() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  const companyId = (session?.user as any)?.companyId;

  let allowedModuleIds: string[] = [];

  if (role === "HSE_MANAGER" || role === "UNIT_MANAGER") {
    // گرفتن دسترسی‌های کاربر از دیتابیس
    const permissions = await prisma.userPermission.findMany({
      where: { userId: parseInt((session?.user as any)?.id) },
    });
    allowedModuleIds = permissions.map(p => p.moduleId);
  } else if (role === "COMPANY_ADMIN") {
    // مدیرعامل به همه ماژول‌های مجازِ شرکت دسترسی داره
    const companyModules = await prisma.companyModule.findMany({
      where: { companyId },
    });
    allowedModuleIds = companyModules.map(m => m.moduleId);
  }

  // فیلتر کردن منوها
  const filteredMenu = menuData.map(cat => {
    const filteredItems = cat.items.filter(item => allowedModuleIds.includes(item.id));
    return { ...cat, items: filteredItems };
  }).filter(cat => cat.items.length > 0); // حذف دسته‌های خالی

  return (
    <aside className="sticky top-[80px] max-h-[calc(100vh-80px)] w-[320px] overflow-y-auto bg-[#0a1f38] px-4 py-6">
      {filteredMenu.length === 0 ? (
        <p className="text-white/50 text-sm text-center mt-10 px-4">شما به هیچ ماژولی دسترسی ندارید.</p>
      ) : (
        filteredMenu.map((cat, catIdx) => (
          <div key={catIdx} className="mb-6">
            <div className="mb-3 px-5 text-[13px] font-bold tracking-wider text-[#4a9eff]">
              {cat.category}
            </div>

            {cat.items.map((item) => {
              const hasSub = item.submenu && item.submenu.length > 0;

              return (
                <div key={item.id} className="mb-1.5">
                  {/* لینک اصلی ماژول */}
                  <Link
                    href={`/${item.id}`}
                    className="flex cursor-pointer items-center gap-4 rounded-xl px-5 py-4 text-[15px] font-semibold text-white/85 transition-all hover:bg-[#14345c] hover:text-white"
                  >
                    <span className="min-w-[26px] text-center text-[20px]">
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.title}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        ))
      )}
    </aside>
  );
}