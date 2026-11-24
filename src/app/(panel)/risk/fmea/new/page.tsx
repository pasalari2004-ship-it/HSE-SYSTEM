"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FmeaNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    processName: "",
    failureMode: "",
    failureEffect: "",
    failureCause: "",
    currentControls: "",
    severity: "1",
    occurrence: "1",
    detection: "1",
    rpl: "کم اهمیت",
    strategy: "کاهش ریسک",
    recommendedAction: "",
    responsible: "",
    deadline: "",
    status: "باز",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const s = parseInt(formData.severity) || 1;
  const o = parseInt(formData.occurrence) || 1;
  const d = parseInt(formData.detection) || 1;
  const rpn = s * o * d;

  // تعیین خودکار RPL بر اساس S و O (بر اساس جدول ۳ سند)
  function getRplFromSO(s: number, o: number): string {
    // اگر S=10 باشد، حتماً فاجعه بار است
    if (s === 10) return "فاجعه بار";
    
    // جدول ساده شده بر اساس استاندارد
    if (s >= 8 && o >= 4) return "فاجعه بار";
    if (s >= 8 || (s >= 6 && o >= 6)) return "بحرانی";
    if (s >= 4 && o >= 4) return "مرزی";
    return "کم اهمیت";
  }

  const autoRpl = getRplFromSO(s, o);

  // رنگ‌بندی بر اساس RPL
  const getRplBadge = (rpl: string) => {
    if (rpl === "فاجعه بار") return "bg-red-600 text-white";
    if (rpl === "بحرانی") return "bg-red-100 text-red-700 border-red-300";
    if (rpl === "مرزی") return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.processName.trim() || !formData.failureMode.trim()) {
      alert("نام فرآیند و حالت خرابی الزامی است");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/fmea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rpl: autoRpl }),
      });

      const result = await res.json();

      if (result.success) {
        // 👈 هدایت خودکار بر اساس RPL
        if (autoRpl === "فاجعه بار" || autoRpl === "بحرانی") {
          alert("⚠️ هشدار: سطح ریسک " + autoRpl + " است! لطفاً اقدام اصلاحی / عدم انطباق را ثبت کنید.");
          router.push("/risk/nonconformity/new");
        } else {
          alert("✅ مورد FMEA با موفقیت ثبت شد");
          router.push("/risk/fmea");
        }
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
            ➕ ثبت FMEA جدید
          </h1>
          <p className="text-[15px] text-[#64748b]">
            تحلیل حالات خرابی و اثرات آن (استاندارد پاکشو)
          </p>
        </div>
        <Link
          href="/risk/fmea"
          className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
        >
          بازگشت
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-lg">
        <div className={sectionTitle}>📋 اطلاعات فرآیند و خرابی</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>Process Name (نام فرآیند) *</label>
            <input type="text" name="processName" className={inputClass} value={formData.processName} onChange={handleChange} required />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>Failure Mode (حالت خرابی) *</label>
            <input type="text" name="failureMode" className={inputClass} value={formData.failureMode} onChange={handleChange} required />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>Failure Effect (اثر خرابی)</label>
            <textarea name="failureEffect" rows={2} className={inputClass} value={formData.failureEffect} onChange={handleChange} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>Failure Cause (علت خرابی)</label>
            <textarea name="failureCause" rows={2} className={inputClass} value={formData.failureCause} onChange={handleChange} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>Current Controls (کنترل‌های موجود)</label>
            <textarea name="currentControls" rows={2} className={inputClass} value={formData.currentControls} onChange={handleChange} />
          </div>
        </div>

        <div className={sectionTitle}>📊 ارزیابی ریسک (SOD و RPL)</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>S (Severity) ۱ تا ۱۰</label>
            <select name="severity" className={inputClass} value={formData.severity} onChange={handleChange}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>O (Occurrence) ۱ تا ۱۰</label>
            <select name="occurrence" className={inputClass} value={formData.occurrence} onChange={handleChange}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>D (Detection) ۱ تا ۱۰</label>
            <select name="detection" className={inputClass} value={formData.detection} onChange={handleChange}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>RPN (S × O × D)</label>
            <div className="rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-center font-bold text-[18px] text-slate-800">
              {rpn}
            </div>
          </div>
          <div>
            <label className={labelClass}>RPL (سطح اولویت ریسک)</label>
            <div className={`rounded-xl border-2 px-4 py-3 text-center font-bold text-[16px] ${getRplBadge(autoRpl)}`}>
              {autoRpl}
            </div>
          </div>
          <div>
            <label className={labelClass}>استراتژی برخورد</label>
            <select name="strategy" className={inputClass} value={formData.strategy} onChange={handleChange}>
              <option value="حذف ریسک">حذف ریسک (Avoidance)</option>
              <option value="انتقال ریسک">انتقال ریسک (Transfer)</option>
              <option value="پذیرش ریسک">پذیرش ریسک (Acceptance)</option>
              <option value="کاهش ریسک">کاهش ریسک (Mitigation)</option>
            </select>
          </div>
        </div>

        <div className={sectionTitle}>🛡️ اقدامات اصلاحی</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>Recommended Action (اقدامات پیشنهادی)</label>
            <textarea name="recommendedAction" rows={3} className={inputClass} value={formData.recommendedAction} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>مسئول اقدام</label>
            <input type="text" name="responsible" className={inputClass} value={formData.responsible} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>مهلت اقدام</label>
            <input type="text" name="deadline" placeholder="1403/08/01" className={inputClass} value={formData.deadline} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>وضعیت</label>
            <select name="status" className={inputClass} value={formData.status} onChange={handleChange}>
              <option value="باز">باز</option>
              <option value="در حال انجام">در حال انجام</option>
              <option value="بسته">بسته</option>
            </select>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4 border-t-2 border-[#e2e8f0] pt-8">
          <Link href="/risk/fmea" className="rounded-xl bg-slate-100 px-8 py-3.5 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200">
            انصراف
          </Link>
          <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-10 py-3.5 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50">
            {saving ? "⏳ در حال ذخیره..." : "💾 ذخیره FMEA"}
          </button>
        </div>
      </form>
    </div>
  );
}