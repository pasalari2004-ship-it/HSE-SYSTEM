import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CompanyUsersPage() {
  const session = await auth();
  const companyId = (session?.user as any)?.companyId;

  // گرفتن لیست کاربران این شرکت (به جز خود مدیرعامل)
  const users = await prisma.user.findMany({
    where: { 
      companyId,
      role: { not: "COMPANY_ADMIN" } // مدیرعامل رو نشون نده
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">مدیریت کاربران شرکت</h2>
        <Link 
          href="/company-admin/users/new"
          className="bg-[#2e7cc4] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition"
        >
          + تعریف کاربر جدید
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600">نام و نام خانوادگی</th>
              <th className="px-6 py-4 font-semibold text-slate-600">نام کاربری</th>
              <th className="px-6 py-4 font-semibold text-slate-600">نقش</th>
              <th className="px-6 py-4 font-semibold text-slate-600">واحد</th>
              <th className="px-6 py-4 font-semibold text-slate-600">وضعیت</th>
              <th className="px-6 py-4 font-semibold text-slate-600">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  هنوز کاربری برای این شرکت تعریف نشده است.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-800">{u.fullName}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono">{u.username}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {u.role === "HSE_MANAGER" ? "کارشناس HSE" : u.role === "UNIT_MANAGER" ? "مدیر واحد" : u.role}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{u.unitName || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {u.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/company-admin/users/${u.id}`} className="text-[#2e7cc4] font-semibold hover:underline text-sm">
                      تعیین دسترسی
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