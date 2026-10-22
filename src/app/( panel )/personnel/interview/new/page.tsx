"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InterviewNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    birthDate: "",
    age: "",
    unit: "",
    otherUnits: "",
    diseaseHistory: "ندارد",
    diseaseNotes: "",
    accidentHistory: "ندارد",
    accidentNotes: "",
    safetyKnowledge: "",
    hseCourses: "ندارد",
    hseCoursesNotes: "",
    sportsHistory: "ندارد",
    sportsNotes: "",
    physicalFitness: "",
    smokingHistory: "ندارد",
    smokingNotes: "",
    fileStatus: "ندارد",
    lastTestDate: "",
    healthStatus: "سالم",
    height: "",
    weight: "",
    bmi: "",
    militaryStatus: "",
    serviceField: "",
    exemptionType: "",
    hseOpinion: "",
    notes: "",
    interviewerName: "",
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

    if (!formData.fullName.trim()) {
      alert("نام و نام خانوادگی را وارد کنید");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ مصاحبه با موفقیت ذخیره شد");
        router.push("/personnel/interview");
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
            💬 ثبت مصاحبه شغلی
          </h1>
          <p className="text-[15px] text-[#64748b]">
            فرم مصاحبه شغلی HSE - شرکت ایمن سازان هستی گستر
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/personnel/interview"
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
        <div className={sectionTitle}>👤 اطلاعات متقاضی</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>نام و نام خانوادگی *</label>
            <input
              type="text"
              name="fullName"
              className={inputClass}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className={labelClass}>عنوان شغلی / سمت</label>
            <input
              type="text"
              name="position"
              className={inputClass}
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>تاریخ تولد</label>
            <input
              type="text"
              name="birthDate"
              placeholder="1370/01/01"
              className={inputClass}
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>سن</label>
            <input
              type="number"
              name="age"
              min="18"
              max="70"
              className={inputClass}
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>نام واحد</label>
            <input
              type="text"
              name="unit"
              className={inputClass}
              value={formData.unit}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>سایر واحدها</label>
            <input
              type="text"
              name="otherUnits"
              className={inputClass}
              value={formData.otherUnits}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>🏥 سوابق پزشکی</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>
              سابقه بیماری / حساسیت / آلرژی
            </label>
            <select
              name="diseaseHistory"
              className={inputClass}
              value={formData.diseaseHistory}
              onChange={handleChange}
            >
              <option value="ندارد">ندارد</option>
              <option value="دارد">دارد</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>توضیحات سابقه بیماری</label>
            <input
              type="text"
              name="diseaseNotes"
              className={inputClass}
              value={formData.diseaseNotes}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>سابقه حادثه و بستری</label>
            <select
              name="accidentHistory"
              className={inputClass}
              value={formData.accidentHistory}
              onChange={handleChange}
            >
              <option value="ندارد">ندارد</option>
              <option value="دارد">دارد</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>توضیحات سابقه حادثه</label>
            <input
              type="text"
              name="accidentNotes"
              className={inputClass}
              value={formData.accidentNotes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>🎓 ایمنی و آموزش</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>
              میزان اطلاع از ایمنی شغل مورد نظر
            </label>
            <select
              name="safetyKnowledge"
              className={inputClass}
              value={formData.safetyKnowledge}
              onChange={handleChange}
            >
              <option value="">انتخاب کنید</option>
              <option value="تا حدودی">تا حدودی</option>
              <option value="بله">بله</option>
              <option value="خیر">خیر</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>دوره‌های HSE گذرانده</label>
            <select
              name="hseCourses"
              className={inputClass}
              value={formData.hseCourses}
              onChange={handleChange}
            >
              <option value="ندارد">ندارد</option>
              <option value="دارد">دارد</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>نام دوره‌ها</label>
            <input
              type="text"
              name="hseCoursesNotes"
              placeholder="نام دوره‌ها را وارد کنید"
              className={inputClass}
              value={formData.hseCoursesNotes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>💪 وضعیت جسمانی و ورزشی</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>سابقه ورزش و تفریح</label>
            <select
              name="sportsHistory"
              className={inputClass}
              value={formData.sportsHistory}
              onChange={handleChange}
            >
              <option value="ندارد">ندارد</option>
              <option value="دارد">دارد</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>میزان آمادگی جسمانی</label>
            <input
              type="text"
              name="physicalFitness"
              className={inputClass}
              value={formData.physicalFitness}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>توضیحات ورزش و تفریح</label>
            <input
              type="text"
              name="sportsNotes"
              className={inputClass}
              value={formData.sportsNotes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>⚠️ سابقه استعمال سیگار</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>سابقه استعمال سیگار</label>
            <select
              name="smokingHistory"
              className={inputClass}
              value={formData.smokingHistory}
              onChange={handleChange}
            >
              <option value="ندارد">ندارد</option>
              <option value="دارد">دارد</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>توضیحات سیگار</label>
            <input
              type="text"
              name="smokingNotes"
              className={inputClass}
              value={formData.smokingNotes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>📋 وضعیت پرونده بدو استخدام</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>وضعیت پرونده</label>
            <select
              name="fileStatus"
              className={inputClass}
              value={formData.fileStatus}
              onChange={handleChange}
            >
              <option value="ندارد">ندارد (موارد ذیل تکمیل گردد)</option>
              <option value="دارد">دارد</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>تاریخ آخرین آزمایشات</label>
            <input
              type="text"
              name="lastTestDate"
              placeholder="1403/01/01"
              className={inputClass}
              value={formData.lastTestDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>وضعیت سلامت طبق اظهارات</label>
            <select
              name="healthStatus"
              className={inputClass}
              value={formData.healthStatus}
              onChange={handleChange}
            >
              <option value="سالم">سالم</option>
              <option value="نیاز به بررسی">نیاز به بررسی</option>
            </select>
          </div>
        </div>

        <div className={sectionTitle}>📏 مشخصات بدنی</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>قد (سانتی‌متر)</label>
            <input
              type="number"
              name="height"
              className={inputClass}
              value={formData.height}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>وزن (کیلوگرم)</label>
            <input
              type="number"
              name="weight"
              className={inputClass}
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>BMI (شاخص توده بدنی)</label>
            <input
              type="text"
              name="bmi"
              placeholder="ایده آل"
              className={inputClass}
              value={formData.bmi}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>🎖 وضعیت خدمت وظیفه</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>وضعیت خدمت وظیفه</label>
            <select
              name="militaryStatus"
              className={inputClass}
              value={formData.militaryStatus}
              onChange={handleChange}
            >
              <option value="">انتخاب کنید</option>
              <option value="معاف">معاف</option>
              <option value="کارت پایان خدمت">کارت پایان خدمت</option>
              <option value="مشمول">مشمول</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>نام رشته خدمت</label>
            <input
              type="text"
              name="serviceField"
              className={inputClass}
              value={formData.serviceField}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>ذکر نوع معافیت</label>
            <input
              type="text"
              name="exemptionType"
              className={inputClass}
              value={formData.exemptionType}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>✍️ تعهد و نظریه</div>
        <div className="mb-6 rounded-xl border-r-4 border-[#2e7cc4] bg-blue-50 p-6 text-[14px] leading-9 text-[#1e293b]">
          احتراماً اینجانب .............................. اظهارات بالا را
          مطابق مقوله قبول دارم و گواهی می‌دهم، که در حال حاضر هیچ گونه بیماری
          ندارم و چنانچه در حین کار، مواردی با بیماری در بنده مشاهده گردد،
          تمامی مسئولیت آن متوجه اینجانب می‌باشد.
        </div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>نظریه واحد HSE</label>
            <textarea
              name="hseOpinion"
              rows={3}
              placeholder="نظریه واحد HSE را وارد کنید"
              className={inputClass}
              value={formData.hseOpinion}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>توضیحات</label>
            <textarea
              name="notes"
              rows={3}
              className={inputClass}
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>نام و امضای مصاحبه‌کننده</label>
            <input
              type="text"
              name="interviewerName"
              className={inputClass}
              value={formData.interviewerName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4 border-t-2 border-[#e2e8f0] pt-8">
          <Link
            href="/personnel/interview"
            className="rounded-xl bg-slate-100 px-8 py-3.5 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            انصراف
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-10 py-3.5 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {saving ? "⏳ در حال ذخیره..." : "💾 ذخیره مصاحبه"}
          </button>
        </div>
      </form>
    </div>
  );
}