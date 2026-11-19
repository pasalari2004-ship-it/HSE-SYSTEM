import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CompaniesListPage() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">مدیریت شرکت‌ها</h2>
        <Link 
          href="/super-admin/companies/new"
          className="bg-[#2e7cc4] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition"
        >
          + تعریف شرکت جدید
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600">نام شرکت</th>
              <th className="px-6 py-4 font-semibold text-slate-600">حوزه فعالیت</th>
              <th className="px-6 py-4 font-semibold text-slate-600">وضعیت</th>
              <th className="px-6 py-4 font-semibold text-slate-600">تاریخ ثبت</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  هیچ شرکتی ثبت نشده است.
                </td>
              </tr>
            ) : (
              companies.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-800">{c.name}</td>
                  <td className="px-6 py-4 text-slate-600">{c.field || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${c.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {c.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(c.createdAt).toLocaleDateString("fa-IR")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}