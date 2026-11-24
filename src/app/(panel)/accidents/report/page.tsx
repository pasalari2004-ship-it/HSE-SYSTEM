import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ReportTable from "./ReportTable";

export default async function AccidentsReportPage() {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;
  
  if (!companyId) redirect("/login");

  // دریافت همه حوادث با مرتب‌سازی نزولی بر اساس تاریخ
  const accidents = await prisma.accident.findMany({
    where: { companyId },
    orderBy: { accidentDate: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto" dir="rtl">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-2xl font-bold text-[#0a1f38] bg-blue-100 px-6 py-3 rounded-xl shadow-sm">
          گزارش جامع حوادث
        </h2>
      </div>

      <ReportTable initialData={accidents} />
    </div>
  );
}