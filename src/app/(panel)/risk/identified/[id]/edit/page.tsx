"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function RiskEditPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    activity: "",
    probability: "1",
    severity: "1",
    controlMeasures: "",
    responsible: "",
    deadline: "",
    status: "باز",
  });

  useEffect(() => {
    if (params.id) {
      fetchRisk();
    }
  }, [params.id]);

  async function fetchRisk() {
    try {
      setLoading(true);
      const res = await fetch(`/api/risks/${params.id}`);
      const data = await res.json();

      if (data.success) {
        const r = data.data;
        setFormData({
          title: r.title || "",
          description: r.description || "",
          location: r.location || "",
          activity: r.activity || "",
          probability: r.probability?.toString() || "1",
          severity: r.severity?.toString() || "1",
          controlMeasures: r.controlMeasures || "",
          responsible: r.responsible || "",
          deadline: r.deadline || "",
          status: r.status || "باز",
        });
      } else {
        alert("❌ " + data.error);
        router.push("/risk/identified");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
      router.push("/risk/identified");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const riskLevel = parseInt(formData.probability) * parseInt(formData.severity);

  const getRiskLevelBadge = (level: number) => {
    if (level >= 15) return { text: "بحرانی", color: "bg-red-100 text-red-700 border-red-200" };
    if (level >= 9) return { text: "بالا", color: "bg-orange-100 text-orange-700 border-orange-200" };
    if (level >= 4) return { text: "متوسط", color: "bg-yellow-100 text-yellow-700 border-yellow-200" };
    return { text: "پایین", color: "bg-green-100 text-green-700 border-green-200" };
  };

  const badge = getRiskLevelBadge(riskLevel);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("عنوان خطر الزامی است");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/risks/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ خطر با موفقیت بروزرسانی شد");
        router.push(`/risk/identified/${params.id}`);
      } else {
        alert("❌ خطا: " + (result.error || "مشکل در بروزرسانی"));
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

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-[16px] text-[#64748b]">⏳ در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            ✏️ ویرایش خطر
          </h1>
          <p className="text-[15px] text-[#64748b]">
            ویرایش اطلاعات {formData.title}
          </p>
        </div>
        <Link
          href={`/risk/identified/${params.id}`}
          className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
        >
          بازگشت
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-lg">
        <div className={sectionTitle}>📋 اطلاعات خطر</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>عنوان خطر *</label>
            <input
              type="text"
              name="title"
              className={inputClass}
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className={labelClass}>محل وقوع</label>
            <input
              type="text"
              name="location"
              className={inputClass}
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>فعالیت مرتبط</label>
            <input
              type="text"
              name="activity"
              className={inputClass}
              value={formData.activity}
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
              <option value="باز">باز</option>
              <option value="در حال انجام">در حال انجام</option>
              <option value="بسته">بسته</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>توضیحات</label>
            <textarea
              name="description"
              rows={3}
              className={inputClass}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>📊 ارزیابی ریسک</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>احتمال (۱ تا ۵)</label>
            <select
              name="probability"
              className={inputClass}
              value={formData.probability}
              onChange={handleChange}
            >
              <option value="1">۱ - بسیار کم</option>
              <option value="2">۲ - کم</option>
              <option value="3">۳ - متوسط</option>
              <option value="4">۴ - زیاد</option>
              <option value="5">۵ - بسیار زیاد</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>شدت (۱ تا ۵)</label>
            <select
              name="severity"
              className={inputClass}
              value={formData.severity}
              onChange={handleChange}
            >
              <option value="1">۱ - ناچیز</option>
              <option value="2">۲ - جزئی</option>
              <option value="3">۳ - متوسط</option>
              <option value="4">۴ - شدید</option>
              <option value="5">۵ - فاجعه‌بار</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>سطح ریسک (محاسبه خودکار)</label>
            <div className={`mt-1 rounded-xl border-2 px-4 py-3 text-center font-bold text-[16px] ${badge.color}`}>
              {riskLevel} - {badge.text}
            </div>
          </div>
        </div>

        <div className={sectionTitle}>🛡️ اقدامات کنترلی</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>اقدامات کنترلی</label>
            <textarea
              name="controlMeasures"
              rows={3}
              className={inputClass}
              value={formData.controlMeasures}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>مسئول اقدام</label>
            <input
              type="text"
              name="responsible"
              className={inputClass}
              value={formData.responsible}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>مهلت اقدام</label>
            <input
              type="text"
              name="deadline"
              className={inputClass}
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4 border-t-2 border-[#e2e8f0] pt-8">
          <Link
            href={`/risk/identified/${params.id}`}
            className="rounded-xl bg-slate-100 px-8 py-3.5 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            انصراف
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-10 py-3.5 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {saving ? "⏳ در حال ذخیره..." : "💾 بروزرسانی"}
          </button>
        </div>
      </form>
    </div>
  );
}