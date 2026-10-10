"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Guideline {
  id: number;
  title: string;
  documentCode: string | null;
  version: string | null;
  category: string;
  processOwner: string | null;
  description: string | null;
  status: string;
  createdAt: string;
}

export default function GuidelinesListPage() {
  const [guidelines, setGuidelines] = useState<Guideline[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchGuidelines();
  }, []);

  async function fetchGuidelines() {
    try {
      setLoading(true);
      const res = await fetch("/api/guidelines");
      const data = await res.json();
      if (data.success) {
        setGuidelines(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!confirm(`آیا از حذف «${title}» مطمئن هستید؟`)) return;

    try {
      const res = await fetch(`/api/guidelines/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("✅ دستورالعمل حذف شد");
        fetchGuidelines();
      } else {
        alert("❌ خطا در حذف");
      }
    } catch (error) {
      alert("❌ خطا در ارتباط با سرور");
    }
  }

  const filteredGuidelines = guidelines.filter((item) => {
    const matchesSearch =
      item.title?.includes(search) ||
      item.documentCode?.includes(search) ||
      item.description?.includes(search);
    const matchesCategory = !filterCategory || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            📄 دستورالعمل‌های حوادث
          </h1>
          <p className="text-[15px] text-[#64748b]">
            مدیریت اسناد و دستورالعمل‌های HSE - شرکت پاکشو
          </p>
        </div>
        <Link
          href="/accidents/guidelines/new"
          className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
        >
          + افزودن دستورالعمل جدید
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="جستجو با عنوان، کد سند یا توضیحات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        >
          <option value="">همه دسته‌ها</option>
          <option value="دستورالعمل">دستورالعمل</option>
          <option value="فرم">فرم</option>
          <option value="آیین‌نامه">آیین‌نامه</option>
          <option value="گزارش">گزارش</option>
        </select>
        <button
          onClick={fetchGuidelines}
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
        ) : filteredGuidelines.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-[60px] opacity-30">📄</div>
            <p className="mb-2 text-[18px] font-bold text-[#0f2c4c]">
              هیچ دستورالعمل‌ای یافت نشد
            </p>
            <p className="text-[14px] text-[#64748b]">
              {guidelines.length === 0
                ? "برای شروع، اولین دستورالعمل را ثبت کنید"
                : "با تغییر جستجو دوباره تلاش کنید"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="rounded-r-xl bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    عنوان دستورالعمل
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    کد سند
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    نسخه
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    دسته
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    راهبر فرآیند
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    وضعیت
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    تاریخ ثبت
                  </th>
                  <th className="rounded-l-xl bg-[#f0f4f8] p-4 text-center text-[13px] font-bold text-[#64748b]">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGuidelines.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e2e8f0] transition hover:bg-[#f8fafc]"
                  >
                    <td className="p-4 text-[14px] font-bold text-[#0f2c4c]">
                      {item.title}
                    </td>
                    <td className="p-4 text-[13px] text-[#64748b]">
                      {item.documentCode || "-"}
                    </td>
                    <td className="p-4 text-[13px] text-[#64748b]">
                      {item.version || "-"}
                    </td>
                    <td className="p-4 text-[13px]">
                      <span className="inline-block rounded-full bg-[#e0f2fe] px-3 py-1 text-[12px] font-bold text-[#2e7cc4]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-[13px] text-[#64748b]">
                      {item.processOwner || "-"}
                    </td>
                    <td className="p-4 text-[13px]">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold ${
                          item.status === "فعال"
                            ? "bg-[#d1fae5] text-[#065f46]"
                            : "bg-[#fecaca] text-[#991b1b]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-[13px] text-[#64748b]">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/accidents/guidelines/${item.id}`}
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
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-center text-[13px] text-[#64748b]">
              مجموع:{" "}
              <strong className="text-[#0f2c4c]">
                {filteredGuidelines.length}
              </strong>{" "}
              سند
              {search || filterCategory ? ` (از ${guidelines.length} کل)` : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}