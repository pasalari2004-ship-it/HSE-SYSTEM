"use client";

import { useState, useEffect } from "react";

interface DashboardStats {
  totalPersonnel: number;
  accidentsThisMonth: number;
  totalAccidents: number;
  openAccidents: number;
  validMedical: number;
  ppeNeedingReplacement: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const statsCards = [
    {
      label: "کل پرسنل",
      value: stats?.totalPersonnel ?? 0,
      icon: "👥",
      color: "border-[#2e7cc4]",
      link: "/personnel",
    },
    {
      label: "معاینات معتبر",
      value: stats?.validMedical ?? 0,
      icon: "✅",
      color: "border-[#10b981]",
      link: "#",
    },
    {
      label: "PPE نیاز به تعویض",
      value: stats?.ppeNeedingReplacement ?? 0,
      icon: "🦺",
      color: "border-[#f59e0b]",
      link: "#",
    },
    {
      label: "حوادث این ماه",
      value: stats?.accidentsThisMonth ?? 0,
      icon: "⚠️",
      color: "border-[#ef4444]",
      link: "/accidents/records",
    },
  ];

  return (
    <div>
      <h1 className="mb-2 text-[26px] font-extrabold text-[#0f2c4c]">
        داشبورد مدیریتی
      </h1>
      <p className="mb-7 text-sm text-[#64748b]">
        نمای کلی وضعیت HSE - ایمن‌سازان هستی گستر
      </p>

      <div className="relative mb-7 overflow-hidden rounded-[20px] bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] p-9 text-white">
        <h2 className="mb-2.5 text-[26px] font-bold">خوش آمدید 👋</h2>
        <p className="text-sm opacity-90 leading-7">
          به سیستم جامع مدیریت HSE ایمن‌سازان هستی گستر خوش آمدید. از منوی
          سمت راست به تمام بخش‌های سیستم دسترسی دارید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, idx) => (
          <a
            key={idx}
            href={stat.link}
            className={`flex items-center justify-between rounded-2xl border-r-4 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg ${stat.color}`}
          >
            <div>
              <h3 className="mb-2 text-[12.5px] font-semibold text-[#64748b]">
                {stat.label}
              </h3>
              <p className="text-[28px] font-extrabold text-[#0f2c4c]">
                {loading ? "..." : stat.value}
              </p>
            </div>
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl bg-[#e0f2fe] text-[26px]">
              {stat.icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}