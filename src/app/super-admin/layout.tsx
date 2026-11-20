import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/auth";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // چک امنیتی: فقط SUPER_ADMIN
  if (!session || (session.user as any).role !== "SUPER_ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* هدر پنل مرکزی */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="لوگو" className="h-10 w-10 object-contain" />
          <h1 className="font-bold text-lg text-slate-800">
            پنل مدیریت مرکزی (سوپر ادمین)
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">
            {session.user?.name}
          </span>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}>
            <button className="text-sm text-red-600 hover:text-red-700 font-semibold">
              خروج
            </button>
          </form>
        </div>
      </header>

      <div className="flex flex-1">
        {/* سایدبار ساده سوپر ادمین */}
        <aside className="w-64 bg-white border-l border-slate-200 p-4">
          <nav className="flex flex-col gap-2">
            <Link href="/super-admin" className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium">
              داشبورد
            </Link>
            <Link href="/super-admin/companies" className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium">
              مدیریت شرکت‌ها
            </Link>
            <Link href="/super-admin/settings" className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium">
              تنظیمات صفحه اصلی
            </Link>
          </nav>
        </aside>

        {/* محتوای اصلی */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}