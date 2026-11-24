"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NonConformity {
  id: number;
  reportNumber: string | null;
  reportDate: string | null;
  source: string | null;
  hazardDescription: string | null;
  rpl: string | null;
  status: string;
  createdAt: string;
}

export default function NonConformityListPage() {
  const [ncs, setNcs] = useState<NonConformity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNcs();
  }, []);

  async function fetchNcs() {
    try {
      setLoading(true);
      const res = await fetch("/api/nonconformity");
      const data = await res.json();
      if (data.success) {
        setNcs(data.data);
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
      const res = await fetch(`/api/nonconformity/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert("✅ عدم انطباق حذف شد");
        fetchNcs();
      } else {
        alert("❌ خطا در حذف");
      }
    } catch (error) {
      alert("❌ خطا در ارتباط با سرور");
    }
  }

  const filteredNcs = ncs.filter((item) => {
    return (
      item.hazardDescription?.includes(search) ||
      item.reportNumber?.includes(search)
    );
  });

  const getRplBadge = (rpl: string | null) => {
    if (rpl === "غیرقابل تحمل") return "bg-red-600 text-white";
    return "bg-green-100 text-green-700 border-green-300";
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            ⚠️ صدور عدم انطباق
          </h1>
          <p className="text-[15px] text-[#64748b]">
            مدیریت گزارش‌های عدم انطباق HSE - ایمن‌سازان هستی گستر
          </p>
        </div>
        <Link
          href="/risk/nonconformity/new"
          className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
        >
          + ثبت عدم انطباق جدید
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="جستجو با شماره گزارش یا شرح خطر..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        />
        <button
          onClick={fetchNcs}
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
        ) : filteredNcs.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-[60px] opacity-30">⚠️</div>
            <p className="mb-2 text-[18px] font-bold text-[#0f2c4c]">
              هیچ عدم انطباقی یافت نشد
            </p>
            <p className="text-[14px] text-[#64748b]">
              {ncs.length === 0
                ? "برای شروع، اولین گزارش عدم انطباق را ثبت کنید"
                : "با تغییر جستجو دوباره تلاش کنید"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="rounded-r-xl bg-[#f0f4f8] p-3 text-right text-[12px] font-bold text-[#64748b]">شماره گزارش</th>
                  <th className="bg-[#f0f4f8] p-3 text-right text-[12px] font-bold text-[#64748b]">تاریخ</th>
                  <th className="bg-[#f0f4f8] p-3 text-right text-[12px] font-bold text-[#64748b]">منبع</th>
                  <th className="bg-[#f0f4f8] p-3 text-right text-[12px] font-bold text-[#64748b]">شرح خطر</th>
                  <th className="bg-[#f0f4f8] p-3 text-center text-[12px] font-bold text-[#64748b]">RPL</th>
                  <th className="bg-[#f0f4f8] p-3 text-center text-[12px] font-bold text-[#64748b]">وضعیت</th>
                  <th className="rounded-l-xl bg-[#f0f4f8] p-3 text-center text-[12px] font-bold text-[#64748b]">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredNcs.map((item) => (
                  <tr key={item.id} className="border-b border-[#e2e8f0] transition hover:bg-[#f8fafc]">
                    <td className="p-3 text-[13px] font-bold text-[#0f2c4c]">{item.reportNumber || "-"}</td>
                    <td className="p-3 text-[13px] text-[#64748b]">{item.reportDate || "-"}</td>
                    <td className="p-3 text-[13px] text-[#334155]">{item.source || "-"}</td>
                    <td className="p-3 text-[13px] text-[#334155] max-w-[200px] truncate">{item.hazardDescription || "-"}</td>
                    <td className="p-3 text-center">
                      <span className={`inline-block rounded-full px-2 py-1 text-[11px] font-bold border ${getRplBadge(item.rpl)}`}>
                        {item.rpl || "-"}
                      </span>
                    </td>
                    <td className="p-3 text-[13px]">
                      <span className={`inline-block rounded-full px-2 py-1 text-[11px] font-bold ${
                        item.status === "باز" ? "bg-[#fecaca] text-[#991b1b]" : 
                        item.status === "در حال انجام" ? "bg-[#fef08a] text-[#854d0e]" : 
                        "bg-[#d1fae5] text-[#065f46]"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/risk/nonconformity/${item.id}`}
                          className="rounded-lg bg-[#dbeafe] px-3 py-1.5 text-[11px] font-bold text-[#2e7cc4] transition hover:bg-[#bfdbfe]"
                        >
                          مشاهده
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.reportNumber || item.hazardDescription || "")}
                          className="rounded-lg bg-[#fee2e2] px-3 py-1.5 text-[11px] font-bold text-[#ef4444] transition hover:bg-[#fecaca]"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}