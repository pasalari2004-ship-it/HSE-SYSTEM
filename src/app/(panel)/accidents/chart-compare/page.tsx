import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CompareChart from "./CompareChart";

export default async function CompareAccidentsPage() {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;
  
  if (!companyId) redirect("/login");

  const accidents = await prisma.accident.findMany({
    where: { companyId },
    select: { accidentDate: true }
  });

  // استخراج تمام سال‌های موجود در داده‌ها
  const yearsSet = new Set<number>();
  accidents.forEach(acc => {
    if (acc.accidentDate) {
      const year = parseInt(acc.accidentDate.split("/")[0]);
      if (!isNaN(year)) yearsSet.add(year);
    }
  });

  const sortedYears = Array.from(yearsSet).sort((a, b) => a - b);
  
  // اگر سالی وجود نداشت، یک سال پیش‌فرض برای جلوگیری از خطا می‌گذاریم
  if (sortedYears.length === 0) {
    sortedYears.push(new Date().getFullYear());
  }

  const currentYear = sortedYears[sortedYears.length - 1];
  const previousYear = sortedYears.length > 1 ? sortedYears[sortedYears.length - 2] : currentYear;

  // داده‌های مقایسه‌ای ماهانه
  const compareData = Array.from({ length: 12 }).map((_, index) => {
    const monthNum = index + 1;
    
    const currentYearAccidents = accidents.filter(acc => {
      if (!acc.accidentDate) return false;
      const [y, m] = acc.accidentDate.split("/").map(Number);
      return y === currentYear && m === monthNum;
    }).length;

    const previousYearAccidents = accidents.filter(acc => {
      if (!acc.accidentDate) return false;
      const [y, m] = acc.accidentDate.split("/").map(Number);
      return y === previousYear && m === monthNum;
    }).length;

    return {
      month: monthNum,
      currentYearAccidents,
      previousYearAccidents,
    };
  });

  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <h2 className="text-2xl font-bold text-center text-[#0a1f38] mb-8 bg-blue-100 py-4 rounded-xl shadow-sm">
        نمودار مقایسه‌ای حوادث
      </h2>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-slate-800 font-bold mb-6 text-center text-lg">
          مقایسه ماهانه سال {currentYear} با سال {previousYear}
        </h3>
        
        <div className="h-96 w-full" dir="ltr">
          <CompareChart 
            data={compareData} 
            currentYear={currentYear} 
            previousYear={previousYear} 
          />
        </div>
      </div>
    </div>
  );
}