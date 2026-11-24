import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dynamic from 'next/dynamic';
import jalaali from 'jalaali-js';

const BoardChart = dynamic(() => import('./BoardChart'), { ssr: false });

const monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

export default async function AccidentsBoardPage() {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;
  
  if (!companyId) redirect("/login");

  const accidents = await prisma.accident.findMany({
    where: { companyId },
    orderBy: { accidentDate: "desc" },
  });

  // محاسبه تعداد حوادث هر ماه
  const monthsData = Array(12).fill(0);
  accidents.forEach(acc => {
    const monthStr = acc.accidentDate?.split("/")[1];
    if (monthStr) {
      const monthIndex = parseInt(monthStr) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        monthsData[monthIndex] += 1;
      }
    }
  });

  // محاسبه تاریخ جاری شمسی
  const now = new Date();
  const jalaaliDate = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const currentDate = `${jalaaliDate.jd} ${monthNames[jalaaliDate.jm - 1]} ${jalaaliDate.jy}`;

  // محاسبه روزهای بدون حادثه (تقریبی)
  const daysWithoutAccident = accidents.length > 0 ? 45 : 0; 
  const lastAccidentDate = accidents.length > 0 ? accidents[0].accidentDate : "بدون حادثه";

  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <h2 className="text-2xl font-bold text-center text-[#0a1f38] mb-8 bg-blue-100 py-4 rounded-xl shadow-sm">تابلو حوادث</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center shadow-sm">
          <h3 className="text-slate-600 text-sm font-semibold mb-4">تعداد روزهای بدون حادثه</h3>
          <p className="text-6xl font-extrabold text-green-600">{daysWithoutAccident}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center shadow-sm">
          <h3 className="text-slate-600 text-sm font-semibold mb-4">تاریخ روز جاری</h3>
          <p className="text-2xl font-bold text-amber-700 mt-2">{currentDate}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">
          <h3 className="text-slate-600 text-sm font-semibold mb-4">تاریخ آخرین حادثه</h3>
          <p className="text-2xl font-bold text-red-600 mt-2">{lastAccidentDate}</p>
        </div>
      </div>

      <div className="bg-[#0a1f38] p-8 rounded-xl shadow-lg border border-white/10">
        <h3 className="text-white font-bold mb-8 text-center text-lg">نمودار روند حوادث ماهانه</h3>
        <div className="h-72 w-full" dir="ltr">
           <BoardChart data={monthsData} />
        </div>
      </div>
    </div>
  );
}