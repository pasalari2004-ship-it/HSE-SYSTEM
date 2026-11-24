import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import YearlyChart from "./YearlyChart";

export default async function YearlyAccidentsPage() {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;
  
  if (!companyId) redirect("/login");

  // دریافت همه حوادث شرکت
  const accidents = await prisma.accident.findMany({
    where: { companyId },
    select: { accidentDate: true }
  });

  // گروه‌بندی بر اساس سال
  const yearsMap = new Map<number, number>();
  
  accidents.forEach(acc => {
    if (acc.accidentDate) {
      const yearStr = acc.accidentDate.split("/")[0];
      const year = parseInt(yearStr);
      if (!isNaN(year)) {
        yearsMap.set(year, (yearsMap.get(year) || 0) + 1);
      }
    }
  });

  // تبدیل به آرایه و مرتب‌سازی بر اساس سال
  const chartData = Array.from(yearsMap.entries())
    .map(([year, count]) => ({ year: year.toString(), accidents: count }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year));

  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <h2 className="text-2xl font-bold text-center text-[#0a1f38] mb-8 bg-blue-100 py-4 rounded-xl shadow-sm">
        نمودار حوادث سالانه
      </h2>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-slate-800 font-bold mb-6 text-center text-lg">
          مقایسه تعداد حوادث در سال‌های مختلف
        </h3>
        {chartData.length > 0 ? (
          <div className="h-96 w-full" dir="ltr">
            <YearlyChart data={chartData} />
          </div>
        ) : (
          <p className="text-center text-slate-500 py-10">داده‌ای برای نمایش وجود ندارد.</p>
        )}
      </div>
    </div>
  );
}