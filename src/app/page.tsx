import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();
  if (session) {
    const role = (session.user as any)?.role;
    if (role === "SUPER_ADMIN") redirect("/super-admin");
    if (role === "COMPANY_ADMIN") redirect("/company-admin");
    if (role === "HSE_MANAGER" || role === "UNIT_MANAGER") redirect("/dashboard");
  }

  const companies = await prisma.company.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  // دریافت تنظیمات از دیتابیس
  const settingsData = await prisma.siteSetting.findMany();
  const settings: Record<string, string> = {};
  settingsData.forEach((item) => {
    settings[item.key] = item.value;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800" dir="rtl">
      
      {/* هدر */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <h1 className="font-extrabold text-xl text-[#0a1f38]">ایمن‌سازان هستی گستر</h1>
              <p className="text-xs text-slate-500">راهکارهای ایمنی، سلامت و محیط زیست</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="#" className="text-[#0a1f38] border-b-2 border-red-600 pb-1">صفحه اصلی</Link>
            <Link href="#about" className="hover:text-[#0a1f38] transition">درباره ما</Link>
            <Link href="#services" className="hover:text-[#0a1f38] transition">خدمات ما</Link>
            <Link href="#" className="hover:text-[#0a1f38] transition">مقالات</Link>
            <Link href="#contact" className="hover:text-[#0a1f38] transition">تماس با ما</Link>
          </nav>

          <Link href="/login" className="bg-red-600 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-red-700 transition shadow-md">
            ورود به پنل
          </Link>
        </div>
      </header>

      {/* بخش قهرمان (Hero) */}
      <section className="relative bg-[#0a1f38] overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-start justify-center min-h-[400px]">
          <span className="text-red-500 font-bold mb-4 text-sm tracking-widest">ایمنی امروز، آرامش فردا</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {settings.heroTitle || "ایمن‌سازان هستی گستر"}
          </h1>
          <p className="text-xl text-slate-200 font-semibold mb-4">{settings.heroSubtitle || "راهکارهای ایمنی، سلامت و محیط زیست"}</p>
          <p className="text-slate-400 max-w-xl mb-8 leading-relaxed">
            ارائه راهکارهای نوین و استاندارد در حوزه HSE برای سازمان‌ها و صنایع پیشرو کشور.
          </p>
          <div className="flex gap-4">
            <Link href="#services" className="bg-red-600 text-white font-bold px-8 py-3 rounded-full hover:bg-red-700 transition">
              بیشتر بدانید
            </Link>
            <Link href="#about" className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-8 py-3 rounded-full hover:bg-white/20 transition">
              مشاهده خدمات ما
            </Link>
          </div>
        </div>
      </section>

      {/* نوار آمار شناور */}
      <section className="relative max-w-7xl mx-auto px-6 -mt-16 z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-wrap justify-between items-center gap-6 border border-slate-100">
          <div className="flex items-center gap-3"><span className="text-2xl">🛡️</span><div><p className="font-bold text-[#0a1f38]">تعهد به کیفیت</p><p className="text-xs text-slate-500">و استانداردهای بین‌المللی</p></div></div>
          <div className="flex items-center gap-3"><span className="text-2xl">👥</span><div><p className="font-bold text-[#0a1f38]">تیم متخصص</p><p className="text-xs text-slate-500">و مجرب</p></div></div>
          <div className="flex items-center gap-3"><span className="text-2xl">🏆</span><div><p className="font-bold text-[#0a1f38]">+۵۰۰ پروژه موفق</p><p className="text-xs text-slate-500">در کارنامه ما</p></div></div>
          <div className="flex items-center gap-3"><span className="text-2xl">🎧</span><div><p className="font-bold text-[#0a1f38]">پشتیبانی حرفه‌ای</p><p className="text-xs text-slate-500">۲۴/۷</p></div></div>
        </div>
      </section>

      {/* بخش درباره ما */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#0a1f38] to-[#1e4d7b]">
            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-9xl font-bold">HSE</div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[#0a1f38] mb-6">درباره ایمن‌سازان هستی گستر</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {settings.aboutText || "ما در ایمن‌سازان هستی گستر با تکیه بر دانش تخصصی، تجربه عملی و تعهد به کیفیت، در کنار سازمان‌ها هستیم تا محیطی ایمن، سالم و پایدار برای آینده بسازیم."}
            </p>
            <Link href="#" className="bg-red-600 text-white font-bold px-8 py-3 rounded-full hover:bg-red-700 transition inline-block shadow-md">
              درباره ما بیشتر بدانید
            </Link>
          </div>
        </div>
      </section>

      {/* بخش خدمات ما */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#0a1f38] mb-2">خدمات ما</h2>
            <p className="text-red-600 font-semibold">راهکارهای تخصصی برای محیطی ایمن‌تر</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "📋", title: "مشاوره و ممیزی", desc: "مشاوره تخصصی و ممیزی استانداردهای HSE" },
              { icon: "🦺", title: "ایمنی", desc: "ارائه راهکارهای ایمنی و مدیریت ریسک" },
              { icon: "❤️", title: "سلامت", desc: "حفظ سلامت کارکنان و بهبود شرایط کاری" },
              { icon: "🌿", title: "محیط زیست", desc: "مدیریت زیست‌محیطی و راهکارهای سبز و پایدار" },
            ].map((srv, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition flex flex-col items-center text-center group">
                <div className="text-4xl mb-6 text-[#0a1f38] group-hover:scale-110 transition-transform">{srv.icon}</div>
                <h3 className="font-bold text-lg text-[#0a1f38] mb-2">{srv.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{srv.desc}</p>
                <div className="mt-auto w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition">
                  ←
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* نوار آمار پایین */}
      <section className="py-12 bg-[#0a1f38]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-8 text-white text-center">
          <div className="flex flex-col items-center gap-1"><span className="text-2xl">🛡️</span><p className="font-bold text-xl">+۵۰۰</p><p className="text-xs text-slate-300">پروژه موفق</p></div>
          <div className="flex flex-col items-center gap-1"><span className="text-2xl">👥</span><p className="font-bold text-xl">+۱۰۰</p><p className="text-xs text-slate-300">مشتری سازمانی</p></div>
          <div className="flex flex-col items-center gap-1"><span className="text-2xl">👍</span><p className="font-bold text-xl">۹۸٪</p><p className="text-xs text-slate-300">رضایت مشتریان</p></div>
          <div className="flex flex-col items-center gap-1"><span className="text-2xl">🤝</span><p className="font-bold text-xl">+۵۰۰</p><p className="text-xs text-slate-300">سازمان همکار</p></div>
        </div>
      </section>

      {/* بخش تماس و مشتریان */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-50 grayscale">
             {companies.map((c) => (
                <span key={c.id} className="text-lg font-bold text-slate-800">{c.name}</span>
             ))}
          </div>

          <div className="bg-[#0a1f38] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">برای ساخت محیطی ایمن، سالم و پایدار</h3>
              <p className="text-slate-300">همین امروز با ما در ارتباط باشید.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
               {settings.phone && <span className="text-white font-bold text-lg">{settings.phone}</span>}
               <Link href={`mailto:${settings.email || ""}`} className="bg-red-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-red-700 transition flex items-center gap-2 whitespace-nowrap shadow-lg">
                 تماس با ما
                 <span>←</span>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* فوتر */}
      <footer className="bg-[#071526] text-white pt-12 pb-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-bold">ایمن‌سازان هستی گستر</h3>
              <p className="text-xs text-slate-400">راهکارهای ایمنی، سلامت و محیط زیست</p>
            </div>
          </div>
          <nav className="flex gap-6 text-sm text-slate-400">
            <Link href="#" className="hover:text-white transition">صفحه اصلی</Link>
            <Link href="#about" className="hover:text-white transition">درباره ما</Link>
            <Link href="#services" className="hover:text-white transition">خدمات</Link>
            <Link href="#contact" className="hover:text-white transition">تماس</Link>
          </nav>
          <div className="flex gap-3">
             {settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition">📷</a>}
             {settings.linkedin && <a href={settings.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition">in</a>}
             {settings.telegram && <a href={settings.telegram} target="_blank" rel="noreferrer" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition">✈️</a>}
          </div>
        </div>
        <div className="text-center text-xs text-slate-600 border-t border-white/10 pt-6">
          © {new Date().getFullYear()} کلیه حقوق مادی و معنوی محفوظ است.
        </div>
      </footer>
    </div>
  );
}