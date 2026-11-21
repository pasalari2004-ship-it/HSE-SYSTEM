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

  // شناسه ماژول‌های اصلی و زیرمنوهایی که شرکت الان دسترسی داره
  const activeModuleIds = company.modules.map(m => m.moduleId);
  const activeSubModuleIds = company.modules.filter(m => m.subModuleId).map(m => m.subModuleId as string);

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
        <div className="flex flex-col gap-6 mb-8">
          {menuData.map((category, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl p-4">
              <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((mod) => (
                  <div key={mod.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    {/* ماژول اصلی */}
                    <label className="flex items-center gap-3 font-semibold text-slate-800 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="modules" 
                        value={mod.id}
                        defaultChecked={activeModuleIds.includes(mod.id)}
                        className="w-5 h-5 text-[#2e7cc4] rounded focus:ring-[#2e7cc4]"
                      />
                      <span>{mod.icon} {mod.title}</span>
                    </label>

                    {/* زیرمنوها */}
                    {mod.submenu.length > 0 && (
                      <div className="mr-8 flex flex-col gap-2 mt-2 border-r-2 border-slate-200 pr-4">
                        {mod.submenu.map((sub) => (
                          <label key={sub.id} className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="modules" 
                              value={`sub-${sub.id}`}
                              defaultChecked={activeSubModuleIds.includes(sub.id)}
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