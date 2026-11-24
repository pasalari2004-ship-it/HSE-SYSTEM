"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NonConformityNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    reportNumber: "",
    reportDate: "",
    factoryName: "",
    unitName: "",
    stationName: "",
    source: "ایمنی",
    ncType: "شرایط ناایمن",
    hazardDescription: "",
    cause: "",
    consequence: "",
    legalRequirement: "",
    hseAction: "",
    severity: "1",
    probability: "1",
    detection: "1",
    action1Responsible: "",
    action1Deadline: "",
    action2Responsible: "",
    action2Deadline: "",
    actionReport: "",
    managerAction: "",
    effectiveness: "",
    followUpName: "",
    status: "باز",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const s = parseInt(formData.severity) || 1;
  const p = parseInt(formData.probability) || 1;
  const d = parseInt(formData.detection) || 1;
  
  // محاسبه RPL بر اساس شدت و احتمال
  const isNonTolerable = (s * p) >= 15;
  const rplText = isNonTolerable ? "غیرقابل تحمل" : "قابل تحمل";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.hazardDescription.trim()) {
      alert("شرح خطر الزامی است");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/nonconformity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rpl: rplText }),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ عدم انطباق با موفقیت ثبت شد");
        router.push("/risk/nonconformity");
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

  const inputClass = "w-full rounded-xl border-2 border-[#e2e8f0] bg-slate-50 px-4 py-3 text-[14px] font-medium outline-none transition focus:border-[#2e7cc4] focus:bg-white focus:ring-4 focus:ring-[#2e7cc4]/10";
  const labelClass = "mb-2 block text-[14px] font-semibold text-[#334155]";
  const sectionTitle = "mb-6 mt-10 rounded-xl bg-gradient-to-l from-[#e0f2fe] to-transparent px-5 py-3 text-[16px] font-extrabold text-[#0f2c4c] border-r-4 border-[#2e7cc4]";
  const gridClass = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            ➕ ثبت گزارش عدم انطباق
          </h1>
          <p className="text-[15px] text-[#64748b]">
            فرم گزارش عدم انطباق HSE - طبق استاندارد پاکشو
          </p>
        </div>
        <Link href="/risk/nonconformity" className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200">
          بازگشت
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-lg">
        <div className={sectionTitle}>📋 اطلاعات کلی</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>شماره گزارش</label>
            <input type="text" name="reportNumber" placeholder="P-31" className={inputClass} value={formData.reportNumber} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>تاریخ گزارش</label>
            <input type="text" name="reportDate" placeholder="1403/05/25" className={inputClass} value={formData.reportDate} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>وضعیت</label>
            <select name="status" className={inputClass} value={formData.status} onChange={handleChange}>
              <option value="باز">باز</option>
              <option value="در حال انجام">در حال انجام</option>
              <option value="بسته">بسته</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>نام کارخانه/انبار</label>
            <input type="text" name="factoryName" className={inputClass} value={formData.factoryName} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>نام واحد</label>
            <input type="text" name="unitName" className={inputClass} value={formData.unitName} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>نام ایستگاه کار</label>
            <input type="text" name="stationName" className={inputClass} value={formData.stationName} onChange={handleChange} />
          </div>
        </div>

        <div className={sectionTitle}>🔍 شرح و علل</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>برگرفته از</label>
            <select name="source" className={inputClass} value={formData.source} onChange={handleChange}>
              <option value="ایمنی">ایمنی</option>
              <option value="بهداشتی-سلامت">بهداشتی-سلامت</option>
              <option value="زیست محیطی">زیست محیطی</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>نوع عدم انطباق</label>
            <select name="ncType" className={inputClass} value={formData.ncType} onChange={handleChange}>
              <option value="شرایط ناایمن">شرایط ناایمن</option>
              <option value="رفتار ناایمن">رفتار ناایمن</option>
              <option value="ثبت در ارزیابی ریسک">ثبت در ارزیابی ریسک</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>شرح خطر/عدم انطباق *</label>
            <textarea name="hazardDescription" rows={2} className={inputClass} value={formData.hazardDescription} onChange={handleChange} required />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>علت/علل خطر</label>
            <textarea name="cause" rows={2} className={inputClass} value={formData.cause} onChange={handleChange} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>پیامد</label>
            <textarea name="consequence" rows={2} className={inputClass} value={formData.consequence} onChange={handleChange} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>الزام قانونی مرتبط</label>
            <textarea name="legalRequirement" rows={2} className={inputClass} value={formData.legalRequirement} onChange={handleChange} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>اقدام پیشنهادی توسط HSE</label>
            <textarea name="hseAction" rows={2} className={inputClass} value={formData.hseAction} onChange={handleChange} />
          </div>
        </div>

        <div className={sectionTitle}>📊 ارزیابی ریسک</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>شدت (1-5)</label>
            <select name="severity" className={inputClass} value={formData.severity} onChange={handleChange}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>احتمال (1-5)</label>
            <select name="probability" className={inputClass} value={formData.probability} onChange={handleChange}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>کشف (1-5)</label>
            <select name="detection" className={inputClass} value={formData.detection} onChange={handleChange}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>سطح ریسک (RPL) - محاسبه خودکار</label>
            <div className={`rounded-xl border-2 px-4 py-3 text-center font-bold text-[16px] ${isNonTolerable ? "bg-red-100 text-red-700 border-red-300" : "bg-green-100 text-green-700 border-green-300"}`}>
              {rplText}
            </div>
          </div>
        </div>

        <div className={sectionTitle}>🛡️ اقدامات اصلاحی</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>مسئول اقدام ۱</label>
            <input type="text" name="action1Responsible" className={inputClass} value={formData.action1Responsible} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>مهلت اقدام ۱</label>
            <input type="text" name="action1Deadline" placeholder="5 روز" className={inputClass} value={formData.action1Deadline} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>مسئول اقدام ۲</label>
            <input type="text" name="action2Responsible" className={inputClass} value={formData.action2Responsible} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>مهلت اقدام ۲</label>
            <input type="text" name="action2Deadline" placeholder="30 روز" className={inputClass} value={formData.action2Deadline} onChange={handleChange} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>گزارش مسئول اقدام اجرایی</label>
            <textarea name="actionReport" rows={2} className={inputClass} value={formData.actionReport} onChange={handleChange} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>شرح اقدام مصوب مدیر کارخانه</label>
            <textarea name="managerAction" rows={2} className={inputClass} value={formData.managerAction} onChange={handleChange} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>گزارش پیگیری و اجرا (اثربخشی HSE)</label>
            <textarea name="effectiveness" rows={2} className={inputClass} value={formData.effectiveness} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>نام مسئول پیگیری</label>
            <input type="text" name="followUpName" className={inputClass} value={formData.followUpName} onChange={handleChange} />
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4 border-t-2 border-[#e2e8f0] pt-8">
          <Link href="/risk/nonconformity" className="rounded-xl bg-slate-100 px-8 py-3.5 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200">
            انصراف
          </Link>
          <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-10 py-3.5 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50">
            {saving ? "⏳ در حال ذخیره..." : "💾 ذخیره عدم انطباق"}
          </button>
        </div>
      </form>
    </div>
  );
}