"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewsNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    source: "",
    imageUrl: "",
    isPublished: true,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const target = e.target as HTMLInputElement;
    const value =
      target.type === "checkbox" ? target.checked : target.value;
    setFormData({ ...formData, [e.target.name]: value });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const result = await res.json();

      if (result.success) {
        setFormData({ ...formData, imageUrl: result.url });
      } else {
        alert("❌ " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در آپلود عکس");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("عنوان خبر الزامی است");
      return;
    }

    if (!formData.content.trim()) {
      alert("متن خبر الزامی است");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ خبر با موفقیت ثبت شد");
        router.push("/news");
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

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            ➕ افزودن خبر جدید
          </h1>
          <p className="text-[15px] text-[#64748b]">
            ثبت خبر جدید در بخش اخبار HSE
          </p>
        </div>
        <Link
          href="/news"
          className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
        >
          بازگشت
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-8 shadow-lg"
      >
        <div className={sectionTitle}>📝 اطلاعات خبر</div>

        <div className="mb-6">
          <label className={labelClass}>عنوان خبر *</label>
          <input
            type="text"
            name="title"
            placeholder="مثلاً: ریزش معدن در طبس"
            className={inputClass}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className={labelClass}>متن کامل خبر *</label>
          <textarea
            name="content"
            rows={10}
            placeholder="متن کامل خبر را اینجا وارد کنید..."
            className={inputClass}
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className={labelClass}>منبع خبر</label>
            <input
              type="text"
              name="source"
              placeholder="مثلاً: خبرگزاری ایسنا"
              className={inputClass}
              value={formData.source}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>وضعیت انتشار</label>
            <select
              name="isPublished"
              className={inputClass}
              value={formData.isPublished ? "true" : "false"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isPublished: e.target.value === "true",
                })
              }
            >
              <option value="true">منتشر شده</option>
              <option value="false">پیش‌نویس</option>
            </select>
          </div>
        </div>

        <div className={sectionTitle}>📷 عکس خبر</div>

        <div className="mb-6">
          <label className={labelClass}>آپلود عکس</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full rounded-xl border-2 border-[#e2e8f0] bg-slate-50 px-4 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
          />
          {uploading && (
            <p className="mt-2 text-[13px] text-[#2e7cc4]">
              ⏳ در حال آپلود...
            </p>
          )}
          {formData.imageUrl && (
            <div className="mt-4">
              <p className="mb-2 text-[13px] text-[#10b981]">
                ✅ عکس آپلود شد
              </p>
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-48 w-auto rounded-xl border-2 border-[#e2e8f0] object-cover"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, imageUrl: "" })}
                className="mt-2 rounded-lg bg-[#fee2e2] px-3 py-1 text-[12px] font-bold text-[#ef4444]"
              >
                🗑 حذف عکس
              </button>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-end gap-4 border-t-2 border-[#e2e8f0] pt-8">
          <Link
            href="/news"
            className="rounded-xl bg-slate-100 px-8 py-3.5 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            انصراف
          </Link>
          <button
            type="submit"
            disabled={saving || uploading}
            className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-10 py-3.5 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {saving ? "⏳ در حال ذخیره..." : "💾 ذخیره خبر"}
          </button>
        </div>
      </form>
    </div>
  );
}