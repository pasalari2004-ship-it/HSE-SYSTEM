"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PersonnelNewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    personnelCode: "",
    fullName: "",
    nationalCode: "",
    mobile: "",
    fatherName: "",
    issuePlace: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
    childrenCount: "",
    education: "",
    age: "",
    height: "",
    bloodPressure: "",
    diseaseType: "",
    physicalFactors: "",
    chemicalFactors: "",
    biologicalFactors: "",
    ergonomicFactors: "",
    psychologicalFactors: "",
    hireDate: "",
    settlementDate: "",
    unit: "",
    militaryStatus: "",
    exemptionType: "",
    workStation: "",
    position: "",
    assignedDuty: "",
    shiftType: "",
    shiftHours: "",
    medicalFileNumber: "",
    workConditions: "",
    medicalAdvice: "",
    workPhone: "",
    workAddress: "",
    postalCodeWorkplace: "",
    homePhone: "",
    homePostalCode: "",
    homeAddress: "",
    hseExpertOpinion: "",
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
  try {
    const response = await fetch("/api/personnel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (result.success) {
      alert("✅ اطلاعات با موفقیت ذخیره شد");
      router.push("/personnel");
    } else {
      alert("❌ خطا: " + (result.error || "مشکل در ذخیره"));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("❌ خطا در ارتباط با سرور");
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
            📝 ثبت اطلاعات پرسنلی
          </h1>
          <p className="text-[15px] text-[#64748b]">
            فرم ثبت اطلاعات کارکنان - شرکت ایمن سازان هستی گستر
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/personnel"
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
        <div className={sectionTitle}>👤 اطلاعات هویتی</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>کد پرسنلی *</label>
            <input
              type="text"
              name="personnelCode"
              className={inputClass}
              value={formData.personnelCode}
              onChange={handleChange}
              required
            />
          </div>
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
            <label className={labelClass}>کد ملی *</label>
            <input
              type="text"
              name="nationalCode"
              maxLength={10}
              className={inputClass}
              value={formData.nationalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className={labelClass}>شماره همراه</label>
            <input
              type="text"
              name="mobile"
              maxLength={11}
              className={inputClass}
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>نام پدر</label>
            <input
              type="text"
              name="fatherName"
              className={inputClass}
              value={formData.fatherName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>محل صدور</label>
            <input
              type="text"
              name="issuePlace"
              className={inputClass}
              value={formData.issuePlace}
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
            <label className={labelClass}>جنسیت</label>
            <select
              name="gender"
              className={inputClass}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">انتخاب کنید</option>
              <option value="مرد">مرد</option>
              <option value="زن">زن</option>
            </select>
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
            <label className={labelClass}>تعداد فرزند</label>
            <input
              type="number"
              name="childrenCount"
              min="0"
              className={inputClass}
              value={formData.childrenCount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>🎓 تحصیلات و سلامت</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>تحصیلات</label>
            <select
              name="education"
              className={inputClass}
              value={formData.education}
              onChange={handleChange}
            >
              <option value="">انتخاب کنید</option>
              <option value="زیر دیپلم">زیر دیپلم</option>
              <option value="دیپلم">دیپلم</option>
              <option value="فوق دیپلم">فوق دیپلم</option>
              <option value="لیسانس">لیسانس</option>
              <option value="فوق لیسانس">فوق لیسانس</option>
              <option value="دکتری">دکتری</option>
            </select>
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
            <label className={labelClass}>فشار خون</label>
            <input
              type="text"
              name="bloodPressure"
              placeholder="120/80"
              className={inputClass}
              value={formData.bloodPressure}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>نوع بیماری (در صورت وجود)</label>
            <input
              type="text"
              name="diseaseType"
              className={inputClass}
              value={formData.diseaseType}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>⚠️ حوادث شغلی</div>
        <div className="mb-4 rounded-xl border-r-4 border-[#f59e0b] bg-amber-50 px-5 py-4 text-[13px] leading-7 text-amber-800">
          ℹ️ توجه: این اطلاعات بعداً به‌صورت خودکار از بخش «مدیریت حوادث» با کد
          پرسنلی خوانده می‌شود.
        </div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>حادثه شغلی ۱</label>
            <input
              type="text"
              name="accident1"
              placeholder="خودکار از بخش حوادث"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>حادثه شغلی ۲</label>
            <input
              type="text"
              name="accident2"
              placeholder="خودکار از بخش حوادث"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>حادثه شغلی ۳</label>
            <input
              type="text"
              name="accident3"
              placeholder="خودکار از بخش حوادث"
              className={inputClass}
            />
          </div>
        </div>

        <div className={sectionTitle}>🎓 آموزش‌های ایمنی گذرانده</div>
        <div className="mb-4 rounded-xl border-r-4 border-[#f59e0b] bg-amber-50 px-5 py-4 text-[13px] leading-7 text-amber-800">
          ℹ️ توجه: این اطلاعات بعداً به‌صورت خودکار از بخش «آموزش» با کد
          پرسنلی خوانده می‌شود.
        </div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>آموزش ایمنی ۱</label>
            <input
              type="text"
              name="training1"
              placeholder="خودکار از بخش آموزش"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>آموزش ایمنی ۲</label>
            <input
              type="text"
              name="training2"
              placeholder="خودکار از بخش آموزش"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>آموزش ایمنی ۳</label>
            <input
              type="text"
              name="training3"
              placeholder="خودکار از بخش آموزش"
              className={inputClass}
            />
          </div>
        </div>

        <div className={sectionTitle}>☣️ عوامل زیان‌آور</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>عوامل فیزیکی</label>
            <input
              type="text"
              name="physicalFactors"
              className={inputClass}
              value={formData.physicalFactors}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>عوامل شیمیایی</label>
            <input
              type="text"
              name="chemicalFactors"
              className={inputClass}
              value={formData.chemicalFactors}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>عوامل بیولوژیکی</label>
            <input
              type="text"
              name="biologicalFactors"
              className={inputClass}
              value={formData.biologicalFactors}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>عوامل ارگونومی</label>
            <input
              type="text"
              name="ergonomicFactors"
              className={inputClass}
              value={formData.ergonomicFactors}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>عوامل روانی</label>
            <input
              type="text"
              name="psychologicalFactors"
              className={inputClass}
              value={formData.psychologicalFactors}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>💼 اطلاعات شغلی</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>تاریخ استخدام</label>
            <input
              type="text"
              name="hireDate"
              placeholder="1403/01/01"
              className={inputClass}
              value={formData.hireDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>تاریخ تسویه</label>
            <input
              type="text"
              name="settlementDate"
              placeholder="خالی = فعال"
              className={inputClass}
              value={formData.settlementDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>واحد</label>
            <select
              name="unit"
              className={inputClass}
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="">انتخاب کنید</option>
              <option value="سورلفلکس">سورلفلکس</option>
              <option value="پاکان پاستکار">پاکان</option>
              <option value="مایعات">مایعات</option>
              <option value="پودر">پودر</option>
              <option value="انبار">انبار</option>
              <option value="قرص">قرص</option>
              <option value="نگهداری و تعمیرات">نگهداری و تعمیرات</option>
              <option value="اداری">اداری</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>وضعیت نظام وظیفه</label>
            <select
              name="militaryStatus"
              className={inputClass}
              value={formData.militaryStatus}
              onChange={handleChange}
            >
              <option value="">انتخاب کنید</option>
              <option value="معاف">معاف</option>
              <option value="پایان خدمت">پایان خدمت</option>
              <option value="مشمول">مشمول</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>نوع معافیت</label>
            <input
              type="text"
              name="exemptionType"
              className={inputClass}
              value={formData.exemptionType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>ایستگاه کاری</label>
            <input
              type="text"
              name="workStation"
              className={inputClass}
              value={formData.workStation}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>عنوان / سمت</label>
            <input
              type="text"
              name="position"
              className={inputClass}
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>وظیفه محوله</label>
            <input
              type="text"
              name="assignedDuty"
              className={inputClass}
              value={formData.assignedDuty}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>نوع شیفت</label>
            <select
              name="shiftType"
              className={inputClass}
              value={formData.shiftType}
              onChange={handleChange}
            >
              <option value="">انتخاب کنید</option>
              <option value="صبح">صبح</option>
              <option value="عصر">عصر</option>
              <option value="شب">شب</option>
              <option value="چرخشی">چرخشی</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>ساعات حضور در شیفت</label>
            <input
              type="text"
              name="shiftHours"
              placeholder="7:00 - 15:00"
              className={inputClass}
              value={formData.shiftHours}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>🏥 اطلاعات پزشکی</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>شماره پرونده پزشکی</label>
            <input
              type="text"
              name="medicalFileNumber"
              className={inputClass}
              value={formData.medicalFileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>شرایط کاری</label>
            <textarea
              name="workConditions"
              rows={3}
              className={inputClass}
              value={formData.workConditions}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>توصیه پزشکی</label>
            <textarea
              name="medicalAdvice"
              rows={3}
              className={inputClass}
              value={formData.medicalAdvice}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>📞 اطلاعات تماس</div>
        <div className={gridClass}>
          <div>
            <label className={labelClass}>تلفن محل کار</label>
            <input
              type="text"
              name="workPhone"
              className={inputClass}
              value={formData.workPhone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>کد پستی محل کار</label>
            <input
              type="text"
              name="postalCodeWorkplace"
              className={inputClass}
              value={formData.postalCodeWorkplace}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>تلفن منزل</label>
            <input
              type="text"
              name="homePhone"
              className={inputClass}
              value={formData.homePhone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>کد پستی منزل</label>
            <input
              type="text"
              name="homePostalCode"
              className={inputClass}
              value={formData.homePostalCode}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>آدرس محل کار</label>
            <input
              type="text"
              name="workAddress"
              className={inputClass}
              value={formData.workAddress}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>آدرس منزل</label>
            <textarea
              name="homeAddress"
              rows={3}
              className={inputClass}
              value={formData.homeAddress}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={sectionTitle}>📷 تصویر و نظریه</div>
        <div className={gridClass}>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>عکس پرسنلی</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>نظریه کارشناس HSE</label>
            <textarea
              name="hseExpertOpinion"
              rows={3}
              className={inputClass}
              value={formData.hseExpertOpinion}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4 border-t-2 border-[#e2e8f0] pt-8">
          <Link
            href="/personnel"
            className="rounded-xl bg-slate-100 px-8 py-3.5 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            انصراف
          </Link>
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-10 py-3.5 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
          >
            💾 ذخیره اطلاعات
          </button>
        </div>
      </form>
    </div>
  );
}