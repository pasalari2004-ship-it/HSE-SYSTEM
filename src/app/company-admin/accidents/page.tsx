import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccidentsBoardPage() {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;
  
  if (!companyId) redirect("/login");

  const accidents = await prisma.accident.findMany({
    where: { companyId },
    orderBy: { accidentDate: "desc" },
  });

  // محاسبه روزهای بدون حادثه (فعلاً فرضی)
  const daysWithoutAccident = accidents.length > 0 ? 45 : 0;
  const lastAccidentDate = accidents.length > 0 ? accidents[0].accidentDate : "بدون حادثه";
  const currentDate = "۱۴۰۵ مهر ۱۶, پنجشنبه"; // باید داینامیک بشه

  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <h2 className="text-2xl font-bold text-center text-[#0a1f38] mb-8 bg-blue-100 py-4 rounded-xl">تابلو حوادث</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* کارت تعداد روزهای بدون حادثه */}
        <div className="bg-green-100 border border-green-300 rounded-xl p-6 text-center shadow-sm">
          <h3 className="text-slate-700 font-semibold mb-4">تعداد روزهای بدون حادثه</h3>
          <p className="text-5xl font-extrabold text-green-700">{daysWithoutAccident}</p>
        </div>

        {/* کارت تاریخ جاری */}
        <div className="bg-amber-100 border border-amber-300 rounded-xl p-6 text-center shadow-sm">
          <h3 className="text-slate-700 font-semibold mb-4">تاریخ روز جاری</h3>
          <p className="text-xl font-bold text-amber-800">{currentDate}</p>
        </div>

        {/* کارت تاریخ آخرین حادثه */}
        <div className="bg-red-100 border border-red-300 rounded-xl p-6 text-center shadow-sm">
          <h3 className="text-slate-700 font-semibold mb-4">تاریخ آخرین حادثه</h3>
          <p className="text-xl font-bold text-red-700">{lastAccidentDate}</p>
        </div>
      </div>

      {/* نمودار ساده */}
      <div className="bg-[#0a1f38] p-6 rounded-xl shadow-lg">
        <h3 className="text-white font-bold mb-4 text-center">نمودار روند حوادث</h3>
        <div className="h-64 flex items-end justify-around gap-2 px-4">
          {accidents.length > 0 ? (
            accidents.slice(0, 10).reverse().map((acc, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-[#e31e24] to-[#f87171] rounded-t-sm" 
                  style={{ height: `${Math.max(20, Math.random() * 100)}%` }}
                ></div>
                <span className="text-[10px] text-slate-300">{acc.accidentDate?.split("/")[1] || idx + 1}</span>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm">داده‌ای برای نمایش وجود ندارد.</p>
          )}
        </div>
      </div>
    </div>
  );
}