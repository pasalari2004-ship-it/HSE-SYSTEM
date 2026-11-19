import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function CompanyAdminDashboard() {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;

  // گرفتن اطلاعات شرکت
  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });

  // آمار کلی شرکت
  const usersCount = await prisma.user.count({
    where: { companyId },
  });
  
  const personnelCount = await prisma.personnel.count({
    where: { companyId },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        داشبورد مدیریت {company?.name}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-semibold mb-2">تعداد کاربران شرکت</h3>
          <p className="text-3xl font-bold text-[#0f2c4c]">{usersCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-semibold mb-2">تعداد پرسنل ثبت‌شده</h3>
          <p className="text-3xl font-bold text-[#0f2c4c]">{personnelCount}</p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 text-blue-800 p-6 rounded-xl border border-blue-200">
        <h3 className="font-bold mb-2">خوش آمدید</h3>
        <p className="text-sm">شما در پنل مدیریت شرکت خود هستید. از منوی سمت راست می‌توانید کاربران جدید تعریف کنید و به آن‌ها دسترسی بدهید.</p>
      </div>
    </div>
  );
}