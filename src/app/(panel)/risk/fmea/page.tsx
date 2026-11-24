"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FmeaChart from "./FmeaChart";

interface Fmea {
  id: number;
  processName: string;
  failureMode: string;
  severity: number;
  occurrence: number;
  detection: number;
  rpn: number;
  rpl: string;
  strategy: string;
  status: string;
  createdAt: string;
}

export default function FmeaListPage() {
  const [fmeas, setFmeas] = useState<Fmea[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFmeas();
  }, []);

  async function fetchFmeas() {
    try {
      setLoading(true);
      const res = await fetch("/api/fmea");
      const data = await res.json();
      if (data.success) {
        setFmeas(data.data);
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
      const res = await fetch(`/api/fmea/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert("✅ مورد FMEA حذف شد");
        fetchFmeas();
      } else {
        alert("❌ خطا در حذف");
      }
    } catch (error) {
      alert("❌ خطا در ارتباط با سرور");
    }
  }

  const filteredFmeas = fmeas.filter((item) => {
    return item.processName?.includes(search) || item.failureMode?.includes(search);
  });

  const getRplBadge = (rpl: string) => {
    if (rpl === "فاجعه بار") return "bg-red-600 text-white";
    if (rpl === "بحرانی") return "bg-red-100 text-red-700 border-red-300";
    if (rpl === "مرزی") return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            🔬 ارزیابی ریسک به روش FMEA
          </h1>
          <p className="text-[15px] text-[#64748b]">
            تحلیل حالات خرابی و اثرات آن - ایمن‌سازان هستی گستر
          </p>
        </div>
        <Link
          href="/risk/fmea/new"
          className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
        >
          + ثبت FMEA جدید
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="جستجو با نام فرآیند یا حالت خرابی..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        />
        <button
          onClick={fetchFmeas}
          className="rounded-xl bg-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]"
        >
          🔄 بروزرسانی
        </button>
      </div>

      {/* 👈 نمودار اینجا اضافه شد */}
      <FmeaChart data={fmeas} />

      <div className="rounded-2xl bg-white p-6 shadow-lg">
        {loading ? (
          <div className="py-20 text-center">
            <p className="text-[16px] text-[#64748b]">⏳ در حال بارگذاری...</p>
          </div>
        ) : filteredFmeas.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-[60px] opacity-30">🔬</div>
            <p className="mb-2 text-[18px] font-bold text-[#0f2c4c]">
              هیچ مورد FMEA یافت نشد
            </p>
            <p className="text-[14px] text-[#64748b]">
              {fmeas.length === 0
                ? "برای شروع، اولین مورد FMEA را ثبت کنید"
                : "با تغییر جستجو دوباره تلاش کنید"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="rounded-r-xl bg-[#f0f4f8] p-3 text-right text-[12px] font-bold text-[#64748b]">فرآیند</th>
                  <th className="bg-[#f0f4f8] p-3 text-right text-[12px] font-bold text-[#64748b]">حالت خرابی</th>
                  <th className="bg-[#f0f4f8] p-3 text-center text-[12px] font-bold text-[#64748b]">S</th>
                  <th className="bg-[#f0f4f8] p-3 text-center text-[12px] font-bold text-[#64748b]">O</th>
                  <th className="bg-[#f0f4f8] p-3 text-center text-[12px] font-bold text-[#64748b]">D</th>
                  <th className="bg-[#f0f4f8] p-3 text-center text-[12px] font-bold text-[#64748b]">RPN</th>
                  <th className="bg-[#f0f4f8] p-3 text-center text-[12px] font-bold text-[#64748b]">RPL</th>
                  <th className="bg-[#f0f4f8] p-3 text-center text-[12px] font-bold text-[#64748b]">استراتژی</th>
                  <th className="rounded-l-xl bg-[#f0f4f8] p-3 text-center text-[12px] font-bold text-[#64748b]">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredFmeas.map((item) => {
                  return (
                    <tr key={item.id} className="border-b border-[#e2e8f0] transition hover:bg-[#f8fafc]">
                      <td className="p-3 text-[13px] font-bold text-[#0f2c4c]">{item.processName}</td>
                      <td className="p-3 text-[13px] text-[#334155]">{item.failureMode}</td>
                      <td className="p-3 text-[13px] text-center font-bold">{item.severity}</td>
                      <td className="p-3 text-[13px] text-center font-bold">{item.occurrence}</td>
                      <td className="p-3 text-[13px] text-center font-bold">{item.detection}</td>
                      <td className="p-3 text-[14px] text-center font-extrabold text-[#0f2c4c]">{item.rpn}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-block rounded-full px-2 py-1 text-[11px] font-bold border ${getRplBadge(item.rpl)}`}>
                          {item.rpl}
                        </span>
                      </td>
                      <td className="p-3 text-[12px] text-center text-[#64748b]">{item.strategy}</td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/risk/fmea/${item.id}`}
                            className="rounded-lg bg-[#dbeafe] px-3 py-1.5 text-[11px] font-bold text-[#2e7cc4] transition hover:bg-[#bfdbfe]"
                          >
                            مشاهده
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id, item.failureMode)}
                            className="rounded-lg bg-[#fee2e2] px-3 py-1.5 text-[11px] font-bold text-[#ef4444] transition hover:bg-[#fecaca]"
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