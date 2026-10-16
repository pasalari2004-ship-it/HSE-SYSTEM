"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function AccidentEditPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    personnelCode: "",
    victimName: "",
    birthDate: "",
    hireDate: "",
    job: "",
    workExperience: "",
    education: "",
    maritalStatus: "",
    workLocation: "",
    accidentDate: "",
    accidentTime: "",
    exactLocation: "",
    injuredArea: "",
    description: "",
    result: "",
    cause: "",
    hasTraining: "بله",
    hasPPE: "بله",
    witnesses: "",
    supervisorReport: "",
    supervisorName: "",
    medicalActions: "",
    outpatientTreatment: "خیر",
    hospitalReferral: "خیر",
    otherMedical: "",
    sickLeaveDays: "",
    lostWorkHours: "",
    medicalNotes: "",
    status: "باز",
  });

  useEffect(() => {
    if (params.id) {
      fetchAccident();
    }
  }, [params.id]);

  async function fetchAccident() {
    try {
      setLoading(true);
      const res = await fetch(`/api/accidents/${params.id}`);
      const data = await res.json();

      if (data.success) {
        const a = data.data;
        setFormData({
          personnelCode: a.personnelCode || "",
          victimName: a.victimName || "",
          birthDate: a.birthDate || "",
          hireDate: a.hireDate || "",
          job: a.job || "",
          workExperience: a.workExperience || "",
          education: a.education || "",
          maritalStatus: a.maritalStatus || "",
          workLocation: a.workLocation || "",
          accidentDate: a.accidentDate || "",
          accidentTime: a.accidentTime || "",
          exactLocation: a.exactLocation || "",
          injuredArea: a.injuredArea || "",
          description: a.description || "",
          result: a.result || "",
          cause: a.cause || "",
          hasTraining: a.hasTraining || "بله",
          hasPPE: a.hasPPE || "بله",
          witnesses: a.witnesses || "",
          supervisorReport: a.supervisorReport || "",
          supervisorName: a.supervisorName || "",
          medicalActions: a.medicalActions || "",
          outpatientTreatment: a.outpatientTreatment || "خیر",
          hospitalReferral: a.hospitalReferral || "خیر",
          otherMedical: a.otherMedical || "",
          sickLeaveDays: a.sickLeaveDays?.toString() || "",
          lostWorkHours: a.lostWorkHours || "",
          medicalNotes: a.medicalNotes || "",
          status: a.status || "باز",
        });
      } else {
        alert("❌ " + data.error);
        router.push("/accidents/records");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
      router.push("/accidents/records");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.victimName.trim()) {
      alert("نام حادثه‌دیده الزامی است");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/accidents/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ حادثه با موفقیت بروزرسانی شد");
        router.push(`/accidents/records/${params.id}`);
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
            ✏️ ویرایش گزارش حادثه
          </h1>
          <p className="text-[15px] text-[#64748b]">
            ویرایش اطلاعات {formData.victimName}
          </p>
        </div>
        <Link
          href={`/accidents/records/${params.id}`}
          className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
        >
          بازگشت
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-8 shadow-lg"
      >
        <div className={sectionTitle}>👤 مشخصات حادثه‌دیده</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>کد پرسنلی</label>
            <input
              type="text"
              name="personnelCode"
              className={inputClass}
              value={formData.personnelCode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>نام و نام خانوادگی *</label>
            <input
              type="text"
              name="victimName"
              className={inputClass}
              value={formData.victimName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className={labelClass}>تاریخ تولد</label>
            <input
              type="text"
              name="birthDate"
              className={inputClass}
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>تاریخ استخدام</label>
            <input
              type="text"
              name="hireDate"
              className={inputClass}
              value={formData.hireDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>شغل</label>
            <input
              type="text"
              name="job"
              className={inputClass}
              value={formData.job}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>سابقه کار در این واحد</label>
            <input
              type="text"
              name="workExperience"
              className={inputClass}
              value={formData.workExperience}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>میزان تحصیلات</label>
            <input
              type="text"
              name="education"
              className={inputClass}
              value={formData.education}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>وضعیت تأهل</label>
            <select
              name="maritalStatus"
              className={inputClass}
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">انتخاب کنید</option>
              <option value="مجرد">مجرد</option>
              <option value="متأهل">متأهل</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>محل کار</label>
            <input
              type="text"
              name="workLocation"
              className={inputClass}
              value={formData.workLocation}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>🕐 زمان و محل وقوع حادثه</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>تاریخ حادثه</label>
            <input
              type="text"
              name="accidentDate"
              className={inputClass}
              value={formData.accidentDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>ساعت حادثه</label>
            <input
              type="text"
              name="accidentTime"
              className={inputClass}
              value={formData.accidentTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>محل دقیق</label>
            <input
              type="text"
              name="exactLocation"
              className={inputClass}
              value={formData.exactLocation}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>ناحیه آسیب‌دیده</label>
            <input
              type="text"
              name="injuredArea"
              className={inputClass}
              value={formData.injuredArea}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>📝 شرح حادثه</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>شرح کامل</label>
            <textarea
              name="description"
              rows={4}
              className={inputClass}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>نتیجه حادثه</label>
            <textarea
              name="result"
              rows={3}
              className={inputClass}
              value={formData.result}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>علت حادثه</label>
            <textarea
              name="cause"
              rows={3}
              className={inputClass}
              value={formData.cause}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>🎓 آموزش و تجهیزات</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>آموزش کافی</label>
            <select
              name="hasTraining"
              className={inputClass}
              value={formData.hasTraining}
              onChange={handleChange}
            >
              <option value="بله">بله</option>
              <option value="خیر">خیر</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>تجهیزات حفاظت فردی</label>
            <select
              name="hasPPE"
              className={inputClass}
              value={formData.hasPPE}
              onChange={handleChange}
            >
              <option value="بله">بله</option>
              <option value="خیر">خیر</option>
            </select>
          </div>
        </div>

        <div className={sectionTitle}>👥 شهود حادثه</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>اسامی شهود</label>
            <textarea
              name="witnesses"
              rows={3}
              className={inputClass}
              value={formData.witnesses}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>📋 گزارش مسئول واحد</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>گزارش و پیشنهاد</label>
            <textarea
              name="supervisorReport"
              rows={4}
              className={inputClass}
              value={formData.supervisorReport}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>نام سرپرست</label>
            <input
              type="text"
              name="supervisorName"
              className={inputClass}
              value={formData.supervisorName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>🏥 بخش خانه بهداشت</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>اقدامات درمانی</label>
            <textarea
              name="medicalActions"
              rows={3}
              className={inputClass}
              value={formData.medicalActions}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>معالجه سرپایی</label>
            <select
              name="outpatientTreatment"
              className={inputClass}
              value={formData.outpatientTreatment}
              onChange={handleChange}
            >
              <option value="خیر">خیر</option>
              <option value="بله">بله</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>ارجاع به بیمارستان</label>
            <select
              name="hospitalReferral"
              className={inputClass}
              value={formData.hospitalReferral}
              onChange={handleChange}
            >
              <option value="خیر">خیر</option>
              <option value="بله">بله</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>سایر</label>
            <input
              type="text"
              name="otherMedical"
              className={inputClass}
              value={formData.otherMedical}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>روزهای استعلاجی</label>
            <input
              type="number"
              name="sickLeaveDays"
              min="0"
              className={inputClass}
              value={formData.sickLeaveDays}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>ساعات کاری از دست رفته</label>
            <input
              type="text"
              name="lostWorkHours"
              className={inputClass}
              value={formData.lostWorkHours}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>توضیحات</label>
            <textarea
              name="medicalNotes"
              rows={3}
              className={inputClass}
              value={formData.medicalNotes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>📊 وضعیت پرونده</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>وضعیت</label>
            <select
              name="status"
              className={inputClass}
              value={formData.status}
              onChange={handleChange}
            >
              <option value="باز">باز</option>
              <option value="در بررسی">در بررسی</option>
              <option value="بسته">بسته</option>
            </select>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4 border-t-2 border-[#e2e8f0] pt-8">
          <Link
            href={`/accidents/records/${params.id}`}
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