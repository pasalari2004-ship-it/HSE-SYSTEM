"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Personnel {
  id: number;
  personnelCode: string;
  fullName: string;
  nationalCode: string;
  birthDate: string | null;
  hireDate: string | null;
  position: string | null;
  unit: string | null;
  education: string | null;
  maritalStatus: string | null;
}

export default function AccidentNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [personnelList, setPersonnelList] = useState<Personnel[]>([]);
  const [loadingPersonnel, setLoadingPersonnel] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null);

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
    fetchPersonnel();
  }, []);

  async function fetchPersonnel() {
    try {
      setLoadingPersonnel(true);
      const res = await fetch("/api/personnel");
      const data = await res.json();
      if (data.success) {
        setPersonnelList(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingPersonnel(false);
    }
  }

  function handlePersonnelSelect(code: string) {
    setFormData({ ...formData, personnelCode: code });

    if (!code) {
      setSelectedPersonnel(null);
      return;
    }

    const person = personnelList.find((p) => p.personnelCode === code);

    if (person) {
      setSelectedPersonnel(person);
      setFormData((prev) => ({
        ...prev,
        personnelCode: code,
        victimName: person.fullName || prev.victimName,
        birthDate: person.birthDate || prev.birthDate,
        hireDate: person.hireDate || prev.hireDate,
        job: person.position || prev.job,
        education: person.education || prev.education,
        maritalStatus: person.maritalStatus || prev.maritalStatus,
        workLocation: person.unit || prev.workLocation,
      }));
    } else {
      setSelectedPersonnel(null);
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
      const res = await fetch("/api/accidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ حادثه با موفقیت ثبت شد");
        router.push("/accidents/records");
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
            ⚠️ ثبت گزارش حادثه (داخلی)
          </h1>
          <p className="text-[15px] text-[#64748b]">
            فرم گزارش حادثه داخلی - شرکت ایمن‌سازان هستی گستر
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/accidents/records"
            className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            بازگشت
          </Link>
          <button
            onClick={() => window.print()}
            className="rounded-xl bg-[#2e7cc4] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]"
          >
            🖨 چاپ فرم
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-8 shadow-lg"
      >
        <div className={sectionTitle}>🔍 انتخاب کارمند از لیست پرسنلی</div>
        <div className="mb-6 rounded-xl border-r-4 border-[#2e7cc4] bg-blue-50 p-5 text-[13px] leading-7 text-[#1e293b]">
          ℹ️ برای تکمیل خودکار مشخصات، کد پرسنلی را از لیست زیر انتخاب کنید.
          در صورت نبود کارمند در سیستم، فیلدها را دستی پر کنید.
        </div>
        <div className={gridClass}>
          <div className="md:col-span-2">
            <label className={labelClass}>کد پرسنلی (اختیاری)</label>
            <select
              value={formData.personnelCode}
              onChange={(e) => handlePersonnelSelect(e.target.value)}
              className={inputClass}
              disabled={loadingPersonnel}
            >
              <option value="">
                {loadingPersonnel
                  ? "در حال بارگذاری..."
                  : "-- انتخاب کارمند از لیست --"}
              </option>
              {personnelList.map((p) => (
                <option key={p.id} value={p.personnelCode}>
                  {p.personnelCode} - {p.fullName}
                </option>
              ))}
            </select>
          </div>
          {selectedPersonnel && (
            <div className="md:col-span-1">
              <div className="rounded-xl bg-[#d1fae5] p-4 text-[13px]">
                <div className="mb-1 font-bold text-[#065f46]">
                  ✅ اطلاعات پیدا شد
                </div>
                <div className="text-[#065f46]">
                  {selectedPersonnel.fullName}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={sectionTitle}>👤 مشخصات حادثه‌دیده</div>
        <div className={gridClass}>
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
            <label className={labelClass}>محل کار (شیفت/واحد)</label>
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
              placeholder="1403/07/15"
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
              placeholder="10:30"
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
              placeholder="مثلاً: دست راست - انگشت اشاره"
              className={inputClass}
              value={formData.injuredArea}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>📝 شرح حادثه</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>شرح کامل حادثه</label>
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
            <label className={labelClass}>
              آیا مصدوم از آموزش کافی برخوردار بوده؟
            </label>
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
            <label className={labelClass}>
              آیا مصدوم به تجهیزات حفاظت فردی مجهز بوده؟
            </label>
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
              placeholder="نام و نام خانوادگی شهود (هر کدام در یک خط)"
              className={inputClass}
              value={formData.witnesses}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>📋 گزارش و پیشنهاد مسئول واحد</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>
              گزارش و پیشنهاد جهت پیشگیری از بروز مجدد حادثه
            </label>
            <textarea
              name="supervisorReport"
              rows={4}
              className={inputClass}
              value={formData.supervisorReport}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>نام و نام خانوادگی سرپرست</label>
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
        <div className="mb-4 rounded-xl border-r-4 border-[#f59e0b] bg-amber-50 px-5 py-4 text-[13px] leading-7 text-amber-800">
          ℹ️ این بخش توسط خانه بهداشت تکمیل می‌شود.
        </div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>اقدامات درمانی صورت‌گرفته</label>
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
            <label className={labelClass}>تعداد روزهای استعلاجی</label>
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
            <label className={labelClass}>میزان ساعات کاری از دست رفته</label>
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
            href="/accidents/records"
            className="rounded-xl bg-slate-100 px-8 py-3.5 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            انصراف
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-10 py-3.5 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {saving ? "⏳ در حال ذخیره..." : "💾 ذخیره حادثه"}
          </button>
        </div>
      </form>
    </div>
  );
}