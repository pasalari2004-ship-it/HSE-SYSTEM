"use client";

import { useState } from "react";

export default function ReportTable({ initialData }: { initialData: any[] }) {
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");

  // منطق فیلتر کردن داده‌ها
  const filteredData = initialData.filter((item) => {
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    const matchesSearch = search 
      ? (item.victimName?.includes(search) || item.accidentCode?.includes(search) || item.personnelCode?.includes(search))
      : true;
    return matchesStatus && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* نوار ابزار فیلتر */}
      <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center bg-slate-50 print:hidden">
        <input
          type="text"
          placeholder="جستجو (نام، کد حادثه، کد پرسنلی)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="باز">باز</option>
          <option value="بسته">بسته</option>
        </select>
        
        <button
          onClick={handlePrint}
          className="mr-auto bg-[#0a1f38] text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-900 transition flex items-center gap-2"
        >
          🖨️ چاپ گزارش
        </button>
      </div>

      {/* جدول گزارش */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-[#0a1f38] text-white">
            <tr>
              <th className="px-4 py-3 font-semibold text-xs">کد حادثه</th>
              <th className="px-4 py-3 font-semibold text-xs">نام حادثه‌دیده</th>
              <th className="px-4 py-3 font-semibold text-xs">تاریخ وقوع</th>
              <th className="px-4 py-3 font-semibold text-xs">شغل</th>
              <th className="px-4 py-3 font-semibold text-xs">وضعیت</th>
              <th className="px-4 py-3 font-semibold text-xs">روز استعلاجی</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs">{row.accidentCode || "-"}</td>
                  <td className="px-4 py-3 font-bold text-slate-700">{row.victimName}</td>
                  <td className="px-4 py-3 font-mono text-xs">{row.accidentDate || "-"}</td>
                  <td className="px-4 py-3">{row.job || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'باز' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">{row.sickLeaveDays || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  هیچ حادثه‌ای با این فیلترها یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* فوتر گزارش */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-600 flex justify-between">
        <span>مجموع حوادث یافت‌شده: {filteredData.length}</span>
        <span>تاریخ چاپ: {new Date().toLocaleDateString('fa-IR')}</span>
      </div>
    </div>
  );
}