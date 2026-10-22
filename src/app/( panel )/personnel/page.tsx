"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Employee {
  id: number;
  personnelCode: string;
  fullName: string;
  nationalCode: string;
  unit: string | null;
  position: string | null;
  mobile: string | null;
  hireDate: string | null;
  createdAt: string;
}

export default function PersonnelListPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterUnit, setFilterUnit] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      setLoading(true);
      const res = await fetch("/api/personnel");
      const data = await res.json();
      if (data.success) {
        setEmployees(data.data);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      alert("❌ خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`آیا از حذف «${name}» مطمئن هستید؟`)) return;

    try {
      const res = await fetch(`/api/personnel/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("✅ کارمند حذف شد");
        fetchEmployees();
      } else {
        alert("❌ خطا در حذف");
      }
    } catch (error) {
      alert("❌ خطا در ارتباط با سرور");
    }
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName?.includes(search) ||
      emp.personnelCode?.includes(search) ||
      emp.nationalCode?.includes(search);
    const matchesUnit = !filterUnit || emp.unit === filterUnit;
    return matchesSearch && matchesUnit;
  });

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            👥 مشاهده اطلاعات پرسنلی
          </h1>
          <p className="text-[15px] text-[#64748b]">
            لیست کارکنان ثبت‌شده - شرکت ایمن سازان هستی گستر
          </p>
        </div>
        <Link
          href="/personnel/new"
          className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
        >
          + افزودن کارمند جدید
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="جستجو با نام، کد ملی یا کد پرسنلی..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        />
        <select
          value={filterUnit}
          onChange={(e) => setFilterUnit(e.target.value)}
          className="rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        >
          <option value="">همه واحدها</option>
          <option value="تولید">تولید</option>
          <option value="بسته‌بندی">بسته‌بندی</option>
          <option value="انبار">انبار</option>
          <option value="کیفیت">کیفیت</option>
          <option value="نگهداری و تعمیرات">نگهداری و تعمیرات</option>
          <option value="اداری">اداری</option>
        </select>
        <button
          onClick={fetchEmployees}
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
        ) : filteredEmployees.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-[60px] opacity-30">👥</div>
            <p className="mb-2 text-[18px] font-bold text-[#0f2c4c]">
              هیچ کارمندی یافت نشد
            </p>
            <p className="text-[14px] text-[#64748b]">
              {employees.length === 0
                ? "برای شروع، اولین کارمند را ثبت کنید"
                : "با تغییر فیلترها دوباره تلاش کنید"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="rounded-r-xl bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    کد پرسنلی
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    نام و نام خانوادگی
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    کد ملی
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    واحد
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    سمت
                  </th>
                  <th className="bg-[#f0f4f8] p-4 text-right text-[13px] font-bold text-[#64748b]">
                    تلفن
                  </th>
                  <th className="rounded-l-xl bg-[#f0f4f8] p-4 text-center text-[13px] font-bold text-[#64748b]">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b border-[#e2e8f0] transition hover:bg-[#f8fafc]"
                  >
                    <td className="p-4 text-[14px] font-bold text-[#0f2c4c]">
                      {emp.personnelCode}
                    </td>
                    <td className="p-4 text-[14px] font-semibold">
                      {emp.fullName}
                    </td>
                    <td className="p-4 text-[14px] text-[#64748b]">
                      {emp.nationalCode}
                    </td>
                    <td className="p-4 text-[14px]">{emp.unit || "-"}</td>
                    <td className="p-4 text-[14px]">{emp.position || "-"}</td>
                    <td className="p-4 text-[14px] text-[#64748b]">
                      {emp.mobile || "-"}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/personnel/${emp.id}`}
                          className="rounded-lg bg-[#dbeafe] px-4 py-2 text-[12px] font-bold text-[#2e7cc4] transition hover:bg-[#bfdbfe]"
                        >
                          مشاهده
                        </Link>
                        <button
                          onClick={() => handleDelete(emp.id, emp.fullName)}
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
              مجموع: <strong className="text-[#0f2c4c]">{filteredEmployees.length}</strong> کارمند
              {search || filterUnit ? ` (از ${employees.length} کل)` : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}