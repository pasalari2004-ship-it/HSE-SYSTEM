"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DashboardStats {
  totalPersonnel: number;
  accidentsThisMonth: number;
  totalAccidents: number;
  openAccidents: number;
  validMedical: number;
  ppeNeedingReplacement: number;
}

interface NewsItem {
  id: number;
  title: string;
  source: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      
      const statsRes = await fetch("/api/dashboard/stats");
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      const newsRes = await fetch("/api/news");
      const newsData = await newsRes.json();
      if (newsData.success) {
        setLatestNews(newsData.data.slice(0, 3));
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

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
          <Link
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
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[20px] font-extrabold text-[#0f2c4c]">
            📰 آخرین اخبار HSE
          </h2>
          <Link
            href="/news"
            className="text-[13px] font-bold text-[#2e7cc4] hover:underline"
          >
            مشاهده همه اخبار ←
          </Link>
        </div>

        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {latestNews.map((newsItem) => (
              <Link
                key={newsItem.id}
                href="/news"
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                {newsItem.imageUrl ? (
                  <div className="h-32 w-full overflow-hidden bg-[#f0f4f8]">
                    <img
                      src={newsItem.imageUrl}
                      alt={newsItem.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-32 w-full items-center justify-center bg-gradient-to-br from-[#e0f2fe] to-[#dbeafe] text-[40px] opacity-40">
                    📰
                  </div>
                )}
                <div className="p-4">
                  <h3 className="mb-2 line-clamp-2 text-[14px] font-bold text-[#0f2c4c] group-hover:text-[#2e7cc4]">
                    {newsItem.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-[#64748b]">
                    <span>{newsItem.source || "بدون منبع"}</span>
                    <span>{formatDate(newsItem.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-8 text-center shadow-md">
            <p className="text-[14px] text-[#64748b]">
              هنوز خبری ثبت نشده است.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}