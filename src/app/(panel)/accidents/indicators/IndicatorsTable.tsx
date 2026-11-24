"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

export default function IndicatorsTable({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleWorkHoursChange = (index: number, value: string) => {
    const newData = [...data];
    newData[index].workHours = parseInt(value) || 0;
    setData(newData);
  };

  async function saveWorkHours(index: number) {
    setSaving(true);
    setMessage("");
    try {
      const row = data[index];
      const res = await fetch("/api/company-admin/work-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          year: new Date().getFullYear(), 
          month: row.month, 
          totalHours: row.workHours 
        }),
      });

      if (res.ok) {
        setMessage(`ساعات کار ${monthNames[index]} ذخیره شد.`);
        router.refresh();
      } else {
        setMessage("خطا در ذخیره");
      }
    } catch (err) {
      setMessage("خطا در ارتباط با سرور");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {message && <div className="p-3 bg-green-50 text-green-700 text-sm text-center">{message}</div>}
      
      <table className="w-full text-right text-sm">
        <thead className="bg-[#0a1f38] text-white">
          <tr>
            <th className="px-2 py-3 font-semibold text-xs">ماه</th>
            <th className="px-2 py-3 font-semibold text-xs">تعداد حادثه</th>
            <th className="px-2 py-3 font-semibold text-xs">روز تلف‌شده</th>
            <th className="px-2 py-3 font-semibold text-xs w-32">ساعات کار (قابل ویرایش)</th>
            <th className="px-2 py-3 font-semibold text-xs bg-[#14345c]">OSHA AFR</th>
            <th className="px-2 py-3 font-semibold text-xs bg-[#14345c]">OSHA ASR</th>
            <th className="px-2 py-3 font-semibold text-xs bg-[#1e4d7b]">ILO AFR</th>
            <th className="px-2 py-3 font-semibold text-xs bg-[#1e4d7b]">ILO ASR</th>
            <th className="px-2 py-3 font-semibold text-xs">ذخیره</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const oshaAFR = row.workHours > 0 ? ((row.accidents * 200000) / row.workHours).toFixed(2) : "-";
            const oshaASR = row.workHours > 0 ? ((row.lostDays * 200000) / row.workHours).toFixed(2) : "-";
            const iloAFR = row.workHours > 0 ? ((row.accidents * 1000000) / row.workHours).toFixed(2) : "-";
            const iloASR = row.workHours > 0 ? ((row.lostDays * 1000) / row.workHours).toFixed(2) : "-";

            return (
              <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-2 py-2 font-bold text-slate-700 text-xs">{monthNames[index]}</td>
                <td className="px-2 py-2 text-slate-800 text-center text-xs">{row.accidents}</td>
                <td className="px-2 py-2 text-slate-800 text-center text-xs">{row.lostDays}</td>
                <td className="px-2 py-2">
                  <input
                    type="number"
                    value={row.workHours}
                    onChange={(e) => handleWorkHoursChange(index, e.target.value)}
                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs text-center"
                  />
                </td>
                <td className="px-2 py-2 text-center font-mono text-xs bg-blue-50/30">{oshaAFR}</td>
                <td className="px-2 py-2 text-center font-mono text-xs bg-blue-50/30">{oshaASR}</td>
                <td className="px-2 py-2 text-center font-mono text-xs bg-slate-50/50">{iloAFR}</td>
                <td className="px-2 py-2 text-center font-mono text-xs bg-slate-50/50">{iloASR}</td>
                <td className="px-2 py-2">
                  <button
                    onClick={() => saveWorkHours(index)}
                    disabled={saving}
                    className="bg-[#2e7cc4] text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition"
                  >
                    ذخیره
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}