"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Interview {
  id: number;
  fullName: string;
  position: string | null;
  age: number | null;
  unit: string | null;
  healthStatus: string | null;
  createdAt: string;
}

export default function InterviewListPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, []);

  async function fetchInterviews() {
    try {
      setLoading(true);
      const res = await fetch("/api/interview");
      const data = await res.json();
      if (data.success) {
        setInterviews(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`آیا از حذف مصاحبه «${name}» مطمئن هستید؟`)) return;

    try {
      const res = await fetch(`/api/interview/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("✅ مصاحبه حذف شد");
        fetchInterviews();
      } else {
        alert("❌ خطا در حذف");
      }
    } catch (error) {
      alert("❌ خطا در ارتباط با سرور");
    }
  }

  const filteredInterviews = interviews.filter((item) => {
    return (
      item.fullName?.includes(search) ||
      item.position?.includes(search) ||
      item.unit?.includes(search)
    );
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
            💬 لیست مصاحبه‌های شغلی
          </h1>
          <p className="text-[15px] text-[#64748b]">
            مصاحبه‌های ثبت‌شده - شرکت ایمن سازان هستی گستر
          </p>
        </div>
        <Link
          href="/personnel/interview/new"
          className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
        >
          + افزودن مصاحبه جدید
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="جستجو با نام، سمت یا واحد..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        />
        <button
          onClick={fetchInterviews}
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
        ) : filteredInterviews.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-[60px] opacity-30">💬</div>
            <p className="mb-2 text-[18px] font-bold text-[#0f2c4c]">
              هیچ مصاحبه‌ای یافت نشد
            </p>
            <p className="text-[14px] text-[#64748b]">
              {interviews.length === 0
                ? "برای شروع، اولین مصاحبه را ثبت کنید"
                : "با تغییر جستجو دوباره تلاش کنید"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="rounded-r-xl bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    نام و نام خانوادگی
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    سمت / عنوان شغلی
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    سن
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    واحد
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    وضعیت سلامت
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
                {filteredInterviews.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e2e8f0] transition hover:bg-[#f8fafc]"
                  >
                    <td className="p-4 text-[14px] font-bold text-[#0f2c4c]">
                      {item.fullName}
                    </td>
                    <td className="p-4 text-[14px]">
                      {item.position || "-"}
                    </td>
                    <td className="p-4 text-[14px] text-[#64748b]">
                      {item.age ?? "-"}
                    </td>
                    <td className="p-4 text-[14px]">{item.unit || "-"}</td>
                    <td className="p-4 text-[14px]">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold ${
                          item.healthStatus === "سالم"
                            ? "bg-[#d1fae5] text-[#065f46]"
                            : "bg-[#fed7aa] text-[#92400e]"
                        }`}
                      >
                        {item.healthStatus || "-"}
                      </span>
                    </td>
                    <td className="p-4 text-[13px] text-[#64748b]">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/personnel/interview/${item.id}`}
                          className="rounded-lg bg-[#dbeafe] px-4 py-2 text-[12px] font-bold text-[#2e7cc4] transition hover:bg-[#bfdbfe]"
                        >
                          مشاهده
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.fullName)}
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
                {filteredInterviews.length}
              </strong>{" "}
              مصاحبه
              {search ? ` (از ${interviews.length} کل)` : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}