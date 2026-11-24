"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Risk {
  id: number;
  title: string;
  location: string | null;
  probability: number;
  severity: number;
  riskLevel: number;
  status: string;
  createdAt: string;
}

export default function RisksListPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRisks();
  }, []);

  async function fetchRisks() {
    try {
      setLoading(true);
      const res = await fetch("/api/risks");
      const data = await res.json();
      if (data.success) {
        setRisks(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!confirm(`آیا از حذف خطر «${title}» مطمئن هستید؟`)) return;

    try {
      const res = await fetch(`/api/risks/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("✅ خطر حذف شد");
        fetchRisks();
      } else {
        alert("❌ خطا در حذف");
      }
    } catch (error) {
      alert("❌ خطا در ارتباط با سرور");
    }
  }

  const filteredRisks = risks.filter((item) => {
    return item.title?.includes(search) || item.location?.includes(search);
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  // تعیین رنگ و متن برای سطح ریسک
  const getRiskLevelBadge = (level: number) => {
    if (level >= 15) return { text: "بحرانی", color: "bg-red-100 text-red-700" };
    if (level >= 9) return { text: "بالا", color: "bg-orange-100 text-orange-700" };
    if (level >= 4) return { text: "متوسط", color: "bg-yellow-100 text-yellow-700" };
    return { text: "پایین", color: "bg-green-100 text-green-700" };
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            📝 خطرات شناسایی‌شده
          </h1>
          <p className="text-[15px] text-[#64748b]">
            مدیریت خطرات و ریسک‌های شناسایی‌شده - ایمن‌سازان هستی گستر
          </p>
        </div>
        <Link
          href="/risk/identified/new"
          className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
        >
          + ثبت خطر جدید
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="جستجو با عنوان یا محل وقوع..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        />
        <button
          onClick={fetchRisks}
          className="rounded-xl bg-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]"
        >
          🔄 بروزرسانی
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-lg">
        {loading ? (
          <div className="py-20 text-center">
            <p className="text-[16px] text-[#64748b]">⏳ در حال بارگذاری...</p>
          </div>
        ) : filteredRisks.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-[60px] opacity-30">📝</div>
            <p className="mb-2 text-[18px] font-bold text-[#0f2c4c]">
              هیچ خطری یافت نشد
            </p>
            <p className="text-[14px] text-[#64748b]">
              {risks.length === 0
                ? "برای شروع، اولین خطر را ثبت کنید"
                : "با تغییر جستجو دوباره تلاش کنید"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="rounded-r-xl bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">عنوان خطر</th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">محل وقوع</th>
                  <th className="bg-[#f0f4f8] p-4 text-center text-[13px] font-bold text-[#64748b]">احتمال</th>
                  <th className="bg-[#f0f4f8] p-4 text-center text-[13px] font-bold text-[#64748b]">شدت</th>
                  <th className="bg-[#f0f4f8] p-4 text-center text-[13px] font-bold text-[#64748b]">سطح ریسک</th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">وضعیت</th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">تاریخ ثبت</th>
                  <th className="rounded-l-xl bg-[#f0f4f8] p-4 text-center text-[13px] font-bold text-[#64748b]">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRisks.map((item) => {
                  const badge = getRiskLevelBadge(item.riskLevel);
                  return (
                    <tr key={item.id} className="border-b border-[#e2e8f0] transition hover:bg-[#f8fafc]">
                      <td className="p-4 text-[14px] font-bold text-[#0f2c4c]">{item.title}</td>
                      <td className="p-4 text-[13px] text-[#64748b]">{item.location || "-"}</td>
                      <td className="p-4 text-[13px] text-center">{item.probability}</td>
                      <td className="p-4 text-[13px] text-center">{item.severity}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold ${badge.color}`}>
                          {item.riskLevel} - {badge.text}
                        </span>
                      </td>
                      <td className="p-4 text-[13px]">
                        <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold ${
                          item.status === "باز" ? "bg-[#fecaca] text-[#991b1b]" : 
                          item.status === "در حال انجام" ? "bg-[#fef08a] text-[#854d0e]" : 
                          "bg-[#d1fae5] text-[#065f46]"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-[13px] text-[#64748b]">{formatDate(item.createdAt)}</td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/risk/identified/${item.id}`}
                            className="rounded-lg bg-[#dbeafe] px-4 py-2 text-[12px] font-bold text-[#2e7cc4] transition hover:bg-[#bfdbfe]"
                          >
                            مشاهده
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            className="rounded-lg bg-[#fee2e2] px-4 py-2 text-[12px] font-bold text-[#ef4444] transition hover:bg-[#fecaca]"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}