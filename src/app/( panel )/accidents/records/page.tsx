"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Accident {
  id: number;
  accidentCode: string | null;
  victimName: string;
  personnelCode: string | null;
  job: string | null;
  injuredArea: string | null;
  accidentDate: string | null;
  accidentTime: string | null;
  exactLocation: string | null;
  sickLeaveDays: number | null;
  status: string;
  createdAt: string;
}

export default function AccidentsListPage() {
  const [accidents, setAccidents] = useState<Accident[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchAccidents();
  }, []);

  async function fetchAccidents() {
    try {
      setLoading(true);
      const res = await fetch("/api/accidents");
      const data = await res.json();
      if (data.success) {
        setAccidents(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`آیا از حذف حادثه «${name}» مطمئن هستید؟`)) return;

    try {
      const res = await fetch(`/api/accidents/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("✅ حادثه حذف شد");
        fetchAccidents();
      } else {
        alert("❌ خطا در حذف");
      }
    } catch (error) {
      alert("❌ خطا در ارتباط با سرور");
    }
  }

  const filteredAccidents = accidents.filter((item) => {
    const matchesSearch =
      item.victimName?.includes(search) ||
      item.accidentCode?.includes(search) ||
      item.personnelCode?.includes(search);
    const matchesStatus = !filterStatus || item.status === filterStatus;
    return matchesSearch && matchesStatus;
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
            ⚠️ لیست حوادث و بیماری‌های شغلی
          </h1>
          <p className="text-[15px] text-[#64748b]">
            ثبت و پیگیری حوادث - شرکت ایمن‌سازان هستی گستر
          </p>
        </div>
        <Link
          href="/accidents/records/new"
          className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
        >
          + ثبت حادثه جدید
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="جستجو با نام، کد حادثه یا کد پرسنلی..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="باز">باز</option>
          <option value="در بررسی">در بررسی</option>
          <option value="بسته">بسته</option>
        </select>
        <button
          onClick={fetchAccidents}
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
        ) : filteredAccidents.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-[60px] opacity-30">⚠️</div>
            <p className="mb-2 text-[18px] font-bold text-[#0f2c4c]">
              هیچ حادثه‌ای یافت نشد
            </p>
            <p className="text-[14px] text-[#64748b]">
              {accidents.length === 0
                ? "برای شروع، اولین حادثه را ثبت کنید"
                : "با تغییر جستجو دوباره تلاش کنید"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="rounded-r-xl bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    کد حادثه
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    نام حادثه‌دیده
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    شغل
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    ناحیه آسیب
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    تاریخ وقوع
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    روز استعلاجی
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    وضعیت
                  </th>
                  <th className="rounded-l-xl bg-[#f0f4f8] p-4 text-center text-[13px] font-bold text-[#64748b]">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAccidents.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e2e8f0] transition hover:bg-[#f8fafc]"
                  >
                    <td className="p-4 text-[13px] font-bold text-[#2e7cc4]">
                      {item.accidentCode || "-"}
                    </td>
                    <td className="p-4 text-[14px] font-bold text-[#0f2c4c]">
                      {item.victimName}
                    </td>
                    <td className="p-4 text-[13px] text-[#64748b]">
                      {item.job || "-"}
                    </td>
                    <td className="p-4 text-[13px] text-[#64748b]">
                      {item.injuredArea || "-"}
                    </td>
                    <td className="p-4 text-[13px] text-[#64748b]">
                      {item.accidentDate || "-"}
                    </td>
                    <td className="p-4 text-[13px] text-[#64748b]">
                      {item.sickLeaveDays ?? "-"}
                    </td>
                    <td className="p-4 text-[13px]">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold ${
                          item.status === "بسته"
                            ? "bg-[#d1fae5] text-[#065f46]"
                            : item.status === "در بررسی"
                            ? "bg-[#fed7aa] text-[#92400e]"
                            : "bg-[#fecaca] text-[#991b1b]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/accidents/records/${item.id}`}
                          className="rounded-lg bg-[#dbeafe] px-4 py-2 text-[12px] font-bold text-[#2e7cc4] transition hover:bg-[#bfdbfe]"
                        >
                          مشاهده
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.victimName)}
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
                {filteredAccidents.length}
              </strong>{" "}
              حادثه
              {search || filterStatus ? ` (از ${accidents.length} کل)` : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}