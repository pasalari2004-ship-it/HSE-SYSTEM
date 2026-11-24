"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RiskGuidelineNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    documentCode: "",
    version: "1.0",
    category: "ریسک", // 👈 پیش‌فرض روی ریسک تنظیم شد
    processOwner: "HSE",
    approvalDate: "",
    reviewDate: "",
    description: "",
    content: "",
    fileUrl: "",
    status: "فعال",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("عنوان دستورالعمل الزامی است");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/guidelines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ دستورالعمل ریسک با موفقیت ذخیره شد");
        router.push("/risk/guidelines");
      } else {
        alert("❌ خطا: " + (result.error || "مشکل در ذخیره"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در ارتباط با سرور");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border-2 border-[#e2e8f0] bg-slate-50 px-4 py-3 text-[14px] font-medium outline-none transition focus:border-[#2e7cc4] focus:bg-white focus:ring-4 focus:ring-[#2e7cc4]/10";
  const labelClass = "mb-2 block text-[14px] font-semibold text-[#334155]";
  const sectionTitle =
    "mb-6 mt-10 rounded-xl bg-gradient-to-l from-[#e0f2fe] to-transparent px-5 py-3 text-[16px] font-extrabold text-[#0f2c4c] border-r-4 border-[#2e7cc4]";
  const gridClass = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            ➕ افزودن دستورالعمل ریسک جدید
          </h1>
          <p className="text-[15px] text-[#64748b]">
            ثبت سند جدید در سیستم مدیریت ریسک HSE
          </p>
        </div>
        <Link
          href="/risk/guidelines"
          className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
        >
          بازگشت
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-8 shadow-lg"
      >
        <div className={sectionTitle}>📋 اطلاعات اصلی سند</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>عنوان دستورالعمل *</label>
            <input
              type="text"
              name="title"
              placeholder="مثلاً: دستورالعمل مدیریت ریسک"
              className={inputClass}
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className={labelClass}>کد سند</label>
            <input
              type="text"
              name="documentCode"
              placeholder="HSE-RSK-001"
              className={inputClass}
              value={formData.documentCode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>نسخه</label>
            <input
              type="text"
              name="version"
              placeholder="1.0"
              className={inputClass}
              value={formData.version}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>دسته‌بندی</label>
            <select
              name="category"
              className={inputClass}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="ریسک">ریسک</option>
              <option value="دستورالعمل">دستورالعمل</option>
              <option value="فرم">فرم</option>
              <option value="آیین‌نامه">آیین‌نامه</option>
              <option value="گزارش">گزارش</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>راهبر فرآیند</label>
            <input
              type="text"
              name="processOwner"
              placeholder="HSE"
              className={inputClass}
              value={formData.processOwner}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>تاریخ تصویب</label>
            <input
              type="text"
              name="approvalDate"
              placeholder="1403/07/15"
              className={inputClass}
              value={formData.approvalDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>تاریخ بازنگری</label>
            <input
              type="text"
              name="reviewDate"
              placeholder="1404/07/15"
              className={inputClass}
              value={formData.reviewDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>وضعیت</label>
            <select
              name="status"
              className={inputClass}
              value={formData.status}
              onChange={handleChange}
            >
              <option value="فعال">فعال</option>
              <option value="غیرفعال">غیرفعال</option>
            </select>
          </div>
        </div>

        <div className={sectionTitle}>📝 توضیحات و محتوا</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>توضیحات کوتاه</label>
            <input
              type="text"
              name="description"
              placeholder="توضیح کوتاه درباره این سند"
              className={inputClass}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>
              متن کامل دستورالعمل (اختیاری)
            </label>
            <textarea
              name="content"
              rows={15}
              placeholder="متن کامل دستورالعمل را اینجا وارد کنید..."
              className={inputClass}
              value={formData.content}
              onChange={handleChange}
            />
            <p className="mt-2 text-[12px] text-[#64748b]">
              می‌توانید متن کامل را اینجا پیست کنید یا فقط فایل PDF را آپلود کنید.
            </p>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>آدرس فایل PDF (اختیاری)</label>
            <input
              type="text"
              name="fileUrl"
              placeholder="/uploads/guidelines/example.pdf"
              className={inputClass}
              value={formData.fileUrl}
              onChange={handleChange}
            />
            <p className="mt-2 text-[12px] text-[#64748b]">
              فعلاً آدرس فایل را دستی وارد کنید. (آپلود فایل در نسخه بعدی)
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4 border-t-2 border-[#e2e8f0] pt-8">
          <Link
            href="/risk/guidelines"
            className="rounded-xl bg-slate-100 px-8 py-3.5 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            انصراف
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-10 py-3.5 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {saving ? "⏳ در حال ذخیره..." : "💾 ذخیره دستورالعمل ریسک"}
          </button>
        </div>
      </form>
    </div>
  );
}