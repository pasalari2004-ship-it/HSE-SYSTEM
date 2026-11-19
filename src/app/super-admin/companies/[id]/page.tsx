import { prisma } from "@/lib/prisma";
import { menuData } from "@/data/menu";
import Link from "next/link";
import { notFound } from "next/navigation";
import CreateAdminForm from "./CreateAdminForm";
import { saveCompanyModules } from "./actions";

export default async function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const companyId = parseInt(resolvedParams.id);
  
  if (isNaN(companyId)) return notFound();

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: { modules: true },
  });

  if (!company) return notFound();

  const allModules = menuData.flatMap(cat => cat.items.map(item => ({
    id: item.id,
    title: item.title,
    icon: item.icon
  })));

  const activeModuleIds = company.modules.map(m => m.moduleId);

  // استفاده از bind برای پاس دادن companyId به اکشن
  const saveAction = saveCompanyModules.bind(null, companyId);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          مدیریت ماژول‌های: {company.name}
        </h2>
        <Link href="/super-admin/companies" className="text-sm text-slate-500 hover:text-slate-800">
          بازگشت
        </Link>
      </div>

      <form action={saveAction}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {allModules.map((mod) => (
            <label key={mod.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input 
                type="checkbox" 
                name="modules" 
                value={mod.id}
                defaultChecked={activeModuleIds.includes(mod.id)}
                className="w-5 h-5 text-[#2e7cc4] rounded focus:ring-[#2e7cc4]"
              />
              <span className="text-slate-700 font-medium">
                {mod.icon} {mod.title}
              </span>
            </label>
          ))}
        </div>

        <button type="submit" className="bg-[#0f2c4c] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1e4d7b] transition w-full md:w-auto">
          ذخیره تغییرات
        </button>
      </form>

      <CreateAdminForm companyId={companyId} />
    </div>
  );
}