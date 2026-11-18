import Link from "next/link";

export default function SuperAdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">داشبورد کل سیستم</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-semibold mb-2">تعداد کل شرکت‌ها</h3>
          <p className="text-3xl font-bold text-[#0f2c4c]">-</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-semibold mb-2">تعداد کاربران سیستم</h3>
          <p className="text-3xl font-bold text-[#0f2c4c]">-</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-semibold mb-2">وضعیت سیستم</h3>
          <p className="text-xl font-bold text-green-600">فعال ✅</p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 text-blue-800 p-6 rounded-xl border border-blue-200">
        <h3 className="font-bold mb-2">شروع کنید</h3>
        <p className="text-sm mb-4">شما در پنل مرکزی هستید. برای شروع، می‌توانید شرکت جدید تعریف کنید.</p>
        <Link href="/super-admin/companies" className="bg-[#2e7cc4] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
          مدیریت شرکت‌ها
        </Link>
      </div>
    </div>
  );
}