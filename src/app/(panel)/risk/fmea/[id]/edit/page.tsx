"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function FmeaEditPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
    recommendedAction: "",
    responsible: "",
    deadline: "",
    status: "باز",
    newSeverity: "",
    newOccurrence: "",
    newDetection: "",
  });

  useEffect(() => {
    if (params.id) {
      fetchFmea();
    }
  }, [params.id]);

  async function fetchFmea() {
    try {
      setLoading(true);
      const res = await fetch(`/api/fmea/${params.id}`);
      const data = await res.json();

      if (data.success) {
        const f = data.data;
        setFormData({
          processName: f.processName || "",
          failureMode: f.failureMode || "",
          failureEffect: f.failureEffect || "",
          failureCause: f.failureCause || "",
          currentControls: f.currentControls || "",
          severity: f.severity?.toString() || "1",
          occurrence: f.occurrence?.toString() || "1",
          detection: f.detection?.toString() || "1",
          recommendedAction: f.recommendedAction || "",
          responsible: f.responsible || "",
          deadline: f.deadline || "",
          status: f.status || "باز",
          newSeverity: f.newSeverity?.toString() || "",
          newOccurrence: f.newOccurrence?.toString() || "",
          newDetection: f.newDetection?.toString() || "",
        });
      } else {
        alert("❌ " + data.error);
        router.push("/risk/fmea");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
      router.push("/risk/fmea");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const s = parseInt(formData.severity) || 1;
  const o = parseInt(formData.occurrence) || 1;
  const d = parseInt(formData.detection) || 1;
  const rpn = s * o * d;

  const ns = parseInt(formData.newSeverity) || 0;
  const no = parseInt(formData.newOccurrence) || 0;
  const nd = parseInt(formData.newDetection) || 0;
  const newRpn = (ns && no && nd) ? ns * no * nd : null;

  const getRpnBadge = (level: number) => {
    if (level >= 100) return { text: "Critical", color: "bg-red-100 text-red-700 border-red-200" };
    if (level >= 40) return { text: "High", color: "bg-orange-100 text-orange-700 border-orange-200" };
    if (level >= 15) return { text: "Medium", color: "bg-yellow-100 text-yellow-700 border-yellow-200" };
    return { text: "Low", color: "bg-green-100 text-green-700 border-green-200" };
  };

  const badge = getRpnBadge(rpn);
  const newBadge = newRpn ? getRpnBadge(newRpn) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.processName.trim() || !formData.failureMode.trim()) {
      alert("نام فرآیند و حالت خرابی الزامی است");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/fmea/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ مورد FMEA با موفقیت بروزرسانی شد");
        router.push(`/risk/fmea/${params.id}`);
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
            ✏️ ویرایش FMEA
          </h1>
          <p className="text-[15px] text-[#64748b]">
            ویرایش اطلاعات {formData.processName}
          </p>
        </div>
        <Link
          href={`/risk/fmea/${params.id}`}
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

        <div className={sectionTitle}>📊 ارزیابی اولیه (SOD)</div>
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
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>RPN اولیه</label>
            <div className={`rounded-xl border-2 px-4 py-3 text-center font-bold text-[18px] ${badge.color}`}>
              {rpn} - {badge.text}
            </div>
          </div>
        </div>

        <div className={sectionTitle}>🛡️ اقدامات اصلاحی پیشنهادی</div>
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
            <input type="text" name="deadline" className={inputClass} value={formData.deadline} onChange={handleChange} />
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

        <div className={sectionTitle}>📈 نتایج پس از اقدام (SOD جدید)</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>S جدید</label>
            <select name="newSeverity" className={inputClass} value={formData.newSeverity} onChange={handleChange}>
              <option value="">-</option>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>O جدید</label>
            <select name="newOccurrence" className={inputClass} value={formData.newOccurrence} onChange={handleChange}>
              <option value="">-</option>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>D جدید</label>
            <select name="newDetection" className={inputClass} value={formData.newDetection} onChange={handleChange}>
              <option value="">-</option>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          {newRpn && newBadge && (
            <div className="md:col-span-2 lg:col-span-3">
              <label className={labelClass}>RPN جدید</label>
              <div className={`rounded-xl border-2 px-4 py-3 text-center font-bold text-[18px] ${newBadge.color}`}>
                {newRpn} - {newBadge.text}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-end gap-4 border-t-2 border-[#e2e8f0] pt-8">
          <Link href={`/risk/fmea/${params.id}`} className="rounded-xl bg-slate-100 px-8 py-3.5 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200">
            انصراف
          </Link>
          <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-10 py-3.5 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50">
            {saving ? "⏳ در حال ذخیره..." : "💾 بروزرسانی"}
          </button>
        </div>
      </form>
    </div>
  );
}