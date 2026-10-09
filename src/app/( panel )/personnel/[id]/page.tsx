"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Personnel {
  id: number;
  personnelCode: string;
  fullName: string;
  nationalCode: string;
  mobile: string | null;
  fatherName: string | null;
  issuePlace: string | null;
  birthDate: string | null;
  gender: string | null;
  maritalStatus: string | null;
  childrenCount: number | null;
  education: string | null;
  age: number | null;
  height: number | null;
  bloodPressure: string | null;
  diseaseType: string | null;
  physicalFactors: string | null;
  chemicalFactors: string | null;
  biologicalFactors: string | null;
  ergonomicFactors: string | null;
  psychologicalFactors: string | null;
  hireDate: string | null;
  settlementDate: string | null;
  unit: string | null;
  militaryStatus: string | null;
  exemptionType: string | null;
  workStation: string | null;
  position: string | null;
  assignedDuty: string | null;
  shiftType: string | null;
  shiftHours: string | null;
  medicalFileNumber: string | null;
  workConditions: string | null;
  medicalAdvice: string | null;
  workPhone: string | null;
  workAddress: string | null;
  postalCodeWorkplace: string | null;
  homePhone: string | null;
  homePostalCode: string | null;
  homeAddress: string | null;
  hseExpertOpinion: string | null;
  createdAt: string;
}

export default function PersonnelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [personnel, setPersonnel] = useState<Personnel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPersonnel();
    }
  }, [params.id]);

  async function fetchPersonnel() {
    try {
      setLoading(true);
      const res = await fetch(`/api/personnel/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setPersonnel(data.data);
      } else {
        alert("❌ " + data.error);
        router.push("/personnel");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
      router.push("/personnel");
    } finally {
      setLoading(false);
    }
  }

  const sectionTitle =
    "mb-6 mt-10 rounded-xl bg-gradient-to-l from-[#e0f2fe] to-transparent px-5 py-3 text-[16px] font-extrabold text-[#0f2c4c] border-r-4 border-[#2e7cc4]";
  const infoBox = "rounded-xl bg-[#f0f4f8] p-4";
  const infoLabel = "mb-1 text-[12px] font-semibold text-[#64748b]";
  const infoValue = "text-[14px] font-bold text-[#0f2c4c]";
  const gridClass = "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-[16px] text-[#64748b]">⏳ در حال بارگذاری...</p>
      </div>
    );
  }

  if (!personnel) {
    return (
      <div className="py-20 text-center">
        <p className="text-[16px] text-[#64748b]">کارمند یافت نشد</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            👤 پروفایل {personnel.fullName}
          </h1>
          <p className="text-[15px] text-[#64748b]">
            اطلاعات کامل کارمند - کد پرسنلی {personnel.personnelCode}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/personnel"
            className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            بازگشت
          </Link>
          <Link
            href={`/personnel/${personnel.id}/edit`}
            className="rounded-xl bg-[#2e7cc4] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]"
          >
            ✏️ ویرایش
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <div className={sectionTitle}>👤 اطلاعات هویتی</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>کد پرسنلی</div>
            <div className={infoValue}>{personnel.personnelCode}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>نام و نام خانوادگی</div>
            <div className={infoValue}>{personnel.fullName}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>کد ملی</div>
            <div className={infoValue}>{personnel.nationalCode}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>شماره همراه</div>
            <div className={infoValue}>{personnel.mobile || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>نام پدر</div>
            <div className={infoValue}>{personnel.fatherName || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>محل صدور</div>
            <div className={infoValue}>{personnel.issuePlace || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ تولد</div>
            <div className={infoValue}>{personnel.birthDate || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>جنسیت</div>
            <div className={infoValue}>{personnel.gender || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>وضعیت تأهل</div>
            <div className={infoValue}>{personnel.maritalStatus || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تعداد فرزند</div>
            <div className={infoValue}>{personnel.childrenCount ?? "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>🎓 تحصیلات و سلامت</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>تحصیلات</div>
            <div className={infoValue}>{personnel.education || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>سن</div>
            <div className={infoValue}>{personnel.age ?? "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>قد (سانتی‌متر)</div>
            <div className={infoValue}>{personnel.height ?? "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>فشار خون</div>
            <div className={infoValue}>{personnel.bloodPressure || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>نوع بیماری</div>
            <div className={infoValue}>{personnel.diseaseType || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>☣️ عوامل زیان‌آور</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>عوامل فیزیکی</div>
            <div className={infoValue}>{personnel.physicalFactors || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>عوامل شیمیایی</div>
            <div className={infoValue}>{personnel.chemicalFactors || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>عوامل بیولوژیکی</div>
            <div className={infoValue}>{personnel.biologicalFactors || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>عوامل ارگونومی</div>
            <div className={infoValue}>{personnel.ergonomicFactors || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>عوامل روانی</div>
            <div className={infoValue}>{personnel.psychologicalFactors || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>💼 اطلاعات شغلی</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ استخدام</div>
            <div className={infoValue}>{personnel.hireDate || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ تسویه</div>
            <div className={infoValue}>{personnel.settlementDate || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>واحد</div>
            <div className={infoValue}>{personnel.unit || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>وضعیت نظام وظیفه</div>
            <div className={infoValue}>{personnel.militaryStatus || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>نوع معافیت</div>
            <div className={infoValue}>{personnel.exemptionType || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>ایستگاه کاری</div>
            <div className={infoValue}>{personnel.workStation || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>عنوان / سمت</div>
            <div className={infoValue}>{personnel.position || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>وظیفه محوله</div>
            <div className={infoValue}>{personnel.assignedDuty || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>نوع شیفت</div>
            <div className={infoValue}>{personnel.shiftType || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>ساعات حضور</div>
            <div className={infoValue}>{personnel.shiftHours || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>🏥 اطلاعات پزشکی</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>شماره پرونده پزشکی</div>
            <div className={infoValue}>{personnel.medicalFileNumber || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>شرایط کاری</div>
            <div className={infoValue}>{personnel.workConditions || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>توصیه پزشکی</div>
            <div className={infoValue}>{personnel.medicalAdvice || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>📞 اطلاعات تماس</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>تلفن محل کار</div>
            <div className={infoValue}>{personnel.workPhone || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>کد پستی محل کار</div>
            <div className={infoValue}>{personnel.postalCodeWorkplace || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تلفن منزل</div>
            <div className={infoValue}>{personnel.homePhone || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>کد پستی منزل</div>
            <div className={infoValue}>{personnel.homePostalCode || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>آدرس محل کار</div>
            <div className={infoValue}>{personnel.workAddress || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>آدرس منزل</div>
            <div className={infoValue}>{personnel.homeAddress || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>📷 نظریه کارشناس</div>
        <div className={infoBox}>
          <div className={infoLabel}>نظریه کارشناس HSE</div>
          <div className={infoValue}>{personnel.hseExpertOpinion || "-"}</div>
        </div>
      </div>
    </div>
  );
}