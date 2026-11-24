"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkHoursPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(1);
  const [totalHours, setTotalHours] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/company-admin/work-hours?year=${year}&month=${month}`);
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            setTotalHours(data.data.totalHours.toString());
          } else {
            setTotalHours("");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [year, month]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/company-admin/work-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, month, totalHours: parseInt(totalHours) || 0 }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "ساعات کار با موفقیت ذخیره شد." });
        router.refresh();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "خطا در ذخیره" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "خطا در ارتباط با سرور" });
    } finally {
      setSaving(false);
    }
  }

  const monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">ثبت ساعات کار ماهانه</h2>
      <p className="text-sm text-slate-500 mb-8">مجموع ساعات کار مفید پرسنل شرکت را برای هر ماه وارد کنید. این اطلاعات برای محاسبه دقیق شاخص‌های حوادث (AFR/ASR) استفاده می‌شود.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">سال</label>
            <input 
              type="number" 
              value={year} 
              onChange={(e) => setYear(parseInt(e.target.value))} 
              className="w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm focus:border-[#2e7cc4]" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">ماه</label>
            <select 
              value={month} 
              onChange={(e) => setMonth(parseInt(e.target.value))} 
              className="w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm focus:border-[#2e7cc4]"
            >
              {monthNames.map((name, idx) => (
                <option key={idx} value={idx + 1}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">مجموع ساعات کار مفید (ساعت)</label>
          <input 
            type="number" 
            value={totalHours} 
            onChange={(e) => setTotalHours(e.target.value)} 
            className="w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm focus:border-[#2e7cc4]" 
            placeholder="مثلاً 120000"
          />
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={saving || loading} className="bg-[#0f2c4c] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1e4d7b] transition disabled:opacity-50 w-full">
          {saving ? "در حال ذخیره..." : "ذخیره ساعات کار"}
        </button>
      </form>
    </div>
  );
}