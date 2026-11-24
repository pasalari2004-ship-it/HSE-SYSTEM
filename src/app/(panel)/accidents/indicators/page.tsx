import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import IndicatorsTable from "./IndicatorsTable";
import IndicatorsChart from "./IndicatorsChart";

export default async function IndicatorsPage() {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;
  
  if (!companyId) redirect("/login");

  const accidents = await prisma.accident.findMany({
    where: { companyId },
  });

  const workHoursRecords = await prisma.workHours.findMany({
    where: { companyId },
  });

  const monthsData = Array(12).fill(0).map((_, index) => ({
    month: index + 1,
    accidents: 0,
    lostDays: 0,
    workHours: 0,
  }));

  accidents.forEach(acc => {
    const monthStr = acc.accidentDate?.split("/")[1];
    if (monthStr) {
      const monthIndex = parseInt(monthStr) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        monthsData[monthIndex].accidents += 1;
        monthsData[monthIndex].lostDays += acc.sickLeaveDays || 0;
      }
    }
  });

  workHoursRecords.forEach(wh => {
    if (wh.month >= 1 && wh.month <= 12) {
      monthsData[wh.month - 1].workHours = wh.totalHours;
    }
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">شاخص‌های حوادث (OSHA / ILO)</h2>
      
      <IndicatorsTable initialData={monthsData} />
      
      {/* 👈 اضافه کردن نمودار */}
      <IndicatorsChart data={monthsData} />
      
      <div className="mt-6 bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-200 text-sm">
        <p className="font-bold mb-2">راهنما:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>OSHA:</strong> فرمول AFR بر پایه ۲۰۰,۰۰۰ ساعت و ASR بر پایه ۲۰۰,۰۰۰ ساعت.</li>
          <li><strong>ILO:</strong> فرمول AFR بر پایه ۱,۰۰۰,۰۰۰ ساعت و ASR بر پایه ۱,۰۰۰ ساعت.</li>
          <li>شما می‌توانید ساعات کار هر ماه را در ستون مربوطه وارد کرده و دکمه ذخیره را بزنید.</li>
        </ul>
      </div>
    </div>
  );
}