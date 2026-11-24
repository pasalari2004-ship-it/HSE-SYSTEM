import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AnalysisListPage() {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;
  
  if (!companyId) redirect("/login");

  // گرفتن لیست حوادث شرکت
  const accidents = await prisma.accident.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
    include: { analysis: true }, // ببینیم کدوم‌ها قبلاً تحلیل شدن
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">تجزیه و تحلیل حوادث</h2>
        <Link href="/accidents/records" className="text-sm bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200 transition">
          بازگشت به ثبت حوادث
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600">کد حادثه</th>
              <th className="px-6 py-4 font-semibold text-slate-600">نام حادثه‌دیده</th>
              <th className="px-6 py-4 font-semibold text-slate-600">تاریخ حادثه</th>
              <th className="px-6 py-4 font-semibold text-slate-600">وضعیت تحلیل</th>
              <th className="px-6 py-4 font-semibold text-slate-600">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {accidents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  هیچ حادثه‌ای ثبت نشده است.
                </td>
              </tr>
            ) : (
              accidents.map((acc) => (
                <tr key={acc.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono font-semibold text-slate-800">{acc.accidentCode || acc.id}</td>
                  <td className="px-6 py-4 text-slate-700">{acc.victimName}</td>
                  <td className="px-6 py-4 text-slate-600">{acc.accidentDate || "-"}</td>
                  <td className="px-6 py-4">
                    {acc.analysis ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">تحلیل شده</span>
                    ) : (
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">در انتظار تحلیل</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      href={`/accidents/analysis/${acc.id}`} 
                      className="text-[#2e7cc4] font-semibold hover:underline text-sm"
                    >
                      {acc.analysis ? "مشاهده / ویرایش" : "شروع تحلیل"}
                    </Link>
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