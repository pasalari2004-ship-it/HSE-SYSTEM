import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { toJalaali } from 'jalaali-js';
import BoardChart from './BoardChart';

const monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

export default async function AccidentsBoardPage() {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;

  if (!companyId) redirect("/login");

  const accidents = await prisma.accident.findMany({
    where: { companyId },
    orderBy: { accidentDate: "desc" },
  });

  // محاسبه تعداد حوادث هر ماه (فقط سال جاری شمسی)
  const now = new Date();
  const currentJalaali = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const currentYear = currentJalaali.jy;

  const monthsData = Array(12).fill(0);
  accidents.forEach(acc => {
    if (!acc.accidentDate) return;
    const parts = acc.accidentDate.split("/");
    if (parts.length !== 3) return;
    const [year, month] = parts.map(Number);
    if (year === currentYear && month >= 1 && month <= 12) {
      monthsData[month - 1] += 1;
    }
  });

  const currentDate = `${currentJalaali.jd} ${monthNames[currentJalaali.jm - 1]} ${currentJalaali.jy}`;

  // محاسبه روزهای بدون حادثه (واقعی)
  const lastAccidentDate = accidents.length > 0 ? accidents[0].accidentDate : null;
  let daysWithoutAccident = 0;
  if (!lastAccidentDate) {
    daysWithoutAccident = 365; // اگر هیچ حادثه‌ای ثبت نشده
  } else {
    const [jy, jm, jd] = lastAccidentDate.split("/").map(Number);
    if (jy && jm && jd) {
      // تبدیل تاریخ شمسی آخرین حادثه به میلادی و محاسبه فاصله
      const { toGregorian } = require('jalaali-js');
      const g = toGregorian(jy, jm, jd);
      const lastDate = new Date(g.gy, g.gm - 1, g.gd);
      const diffMs = now.getTime() - lastDate.getTime();
      daysWithoutAccident = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    }
  }

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
          <p className="text-2xl font-bold text-red-600 mt-2">{lastAccidentDate ?? "بدون حادثه"}</p>
        </div>
      </div>

      <div className="bg-[#0a1f38] p-8 rounded-xl shadow-lg border border-white/10">
        <h3 className="text-white font-bold mb-8 text-center text-lg">نمودار روند حوادث ماهانه (سال {currentYear})</h3>
        <div className="h-72 w-full" dir="ltr">
          <BoardChart data={monthsData} />
        </div>
      </div>
    </div>
  );
}