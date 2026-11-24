"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalysisForm({ 
  accidentId, 
  initialData, 
  userRole 
}: { 
  accidentId: number, 
  initialData: any, 
  userRole: string 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [formData, setFormData] = useState({
    introduction: initialData?.introduction || "",
    directCause: initialData?.directCause || "",
    indirectCause: initialData?.indirectCause || "",
    basicCause: initialData?.basicCause || "",
    rootCause: initialData?.rootCause || "",
    existingControls: initialData?.existingControls || "",
    witnessStatement: initialData?.witnessStatement || "",
    hseRecommendations: initialData?.hseRecommendations || "",
    managerName: initialData?.managerName || "",
    managerDate: initialData?.managerDate || "",
    unitManagerName: initialData?.unitManagerName || "",
    unitManagerDate: initialData?.unitManagerDate || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/accidents/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accidentId, ...formData }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "اطلاعات با موفقیت ذخیره شد." });
        router.refresh();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "خطا در ذخیره" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "خطا در ارتباط با سرور" });
    } finally {
      setLoading(false);
    }
  }

  // تعیین اینکه چه کسی به چه فیلدهایی دسترسی داره
  const canEditHSE = userRole === "HSE_MANAGER" || userRole === "COMPANY_ADMIN";
  const canEditUnitManager = userRole === "UNIT_MANAGER" || userRole === "COMPANY_ADMIN";
  const canEditManager = userRole === "COMPANY_ADMIN"; // فرض بر اینه که مدیر کارخانه همون COMPANY_ADMIN هست

  const inputClass = "w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#2e7cc4] disabled:bg-slate-100 disabled:text-slate-500";
  const textareaClass = "w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#2e7cc4] disabled:bg-slate-100 disabled:text-slate-500";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      
      {/* بخش کارشناس HSE */}
      <div className="mb-8 border-b pb-6">
        <h3 className="font-bold text-lg text-[#0a1f38] mb-4 bg-blue-50 p-2 rounded">بخش کارشناس HSE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">مقدمه</label>
            <textarea name="introduction" rows={3} value={formData.introduction} onChange={handleChange} disabled={!canEditHSE} className={textareaClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">علل مستقیم</label>
            <textarea name="directCause" rows={2} value={formData.directCause} onChange={handleChange} disabled={!canEditHSE} className={textareaClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">علل غیرمستقیم</label>
            <textarea name="indirectCause" rows={2} value={formData.indirectCause} onChange={handleChange} disabled={!canEditHSE} className={textareaClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">علت زمینه‌ای</label>
            <textarea name="basicCause" rows={2} value={formData.basicCause} onChange={handleChange} disabled={!canEditHSE} className={textareaClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">علت ریشه‌ای</label>
            <textarea name="rootCause" rows={2} value={formData.rootCause} onChange={handleChange} disabled={!canEditHSE} className={textareaClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">اقدامات کنترلی موجود</label>
            <textarea name="existingControls" rows={2} value={formData.existingControls} onChange={handleChange} disabled={!canEditHSE} className={textareaClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">شرح حادثه توسط شاهد</label>
            <textarea name="witnessStatement" rows={2} value={formData.witnessStatement} onChange={handleChange} disabled={!canEditHSE} className={textareaClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">راهکارهای پیشنهادی HSE</label>
            <textarea name="hseRecommendations" rows={3} value={formData.hseRecommendations} onChange={handleChange} disabled={!canEditHSE} className={textareaClass} />
          </div>
        </div>
      </div>

      {/* بخش مدیر واحد */}
      <div className="mb-8 border-b pb-6">
        <h3 className="font-bold text-lg text-[#0a1f38] mb-4 bg-amber-50 p-2 rounded">تاییدیه مدیر واحد</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">نام و نام خانوادگی</label>
            <input type="text" name="unitManagerName" value={formData.unitManagerName} onChange={handleChange} disabled={!canEditUnitManager} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">تاریخ</label>
            <input type="text" name="unitManagerDate" value={formData.unitManagerDate} onChange={handleChange} disabled={!canEditUnitManager} className={inputClass} placeholder="۱۴۰۳/۰۱/۰۱" />
          </div>
        </div>
      </div>

      {/* بخش مدیر کارخانه */}
      <div className="mb-8">
        <h3 className="font-bold text-lg text-[#0a1f38] mb-4 bg-green-50 p-2 rounded">تاییدیه مدیر کارخانه</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">نام و نام خانوادگی</label>
            <input type="text" name="managerName" value={formData.managerName} onChange={handleChange} disabled={!canEditManager} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">تاریخ</label>
            <input type="text" name="managerDate" value={formData.managerDate} onChange={handleChange} disabled={!canEditManager} className={inputClass} placeholder="۱۴۰۳/۰۱/۰۱" />
          </div>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm mb-4 ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button type="submit" disabled={loading} className="bg-[#0f2c4c] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1e4d7b] transition disabled:opacity-50">
          {loading ? "در حال ذخیره..." : "ذخیره اطلاعات"}
        </button>
      </div>
    </form>
  );
}