export default function DashboardPage() {
  const stats = [
    { label: "کل پرسنل", value: "247", icon: "👥", color: "border-[#2e7cc4]" },
    { label: "معاینات معتبر", value: "198", icon: "✅", color: "border-[#10b981]" },
    { label: "PPE نیاز به تعویض", value: "34", icon: "🦺", color: "border-[#f59e0b]" },
    { label: "حوادث این ماه", value: "7", icon: "⚠️", color: "border-[#ef4444]" },
  ];

  return (
    <div>
      <h1 className="mb-2 text-[26px] font-extrabold text-[#0f2c4c]">
        داشبورد مدیریتی
      </h1>
      <p className="mb-7 text-sm text-[#64748b]">
        نمای کلی وضعیت HSE - شرکت پاکشو
      </p>

      <div className="relative mb-7 overflow-hidden rounded-[20px] bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] p-9 text-white">
        <h2 className="mb-2.5 text-[26px] font-bold">خوش آمدید 👋</h2>
        <p className="text-sm opacity-90 leading-7">
          به سیستم جامع مدیریت HSE شرکت پاکشو خوش آمدید.
          از منوی سمت راست به تمام بخش‌های سیستم دسترسی دارید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between rounded-2xl border-r-4 bg-white p-5 shadow-md ${stat.color}`}
          >
            <div>
              <h3 className="mb-2 text-[12.5px] font-semibold text-[#64748b]">
                {stat.label}
              </h3>
              <p className="text-[28px] font-extrabold text-[#0f2c4c]">
                {stat.value}
              </p>
            </div>
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl bg-[#e0f2fe] text-[26px]">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}