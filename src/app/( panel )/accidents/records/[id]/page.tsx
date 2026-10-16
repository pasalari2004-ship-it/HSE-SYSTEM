"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Accident {
  id: number;
  accidentCode: string | null;
  personnelCode: string | null;
  victimName: string;
  birthDate: string | null;
  hireDate: string | null;
  job: string | null;
  workExperience: string | null;
  education: string | null;
  maritalStatus: string | null;
  workLocation: string | null;
  accidentDate: string | null;
  accidentTime: string | null;
  exactLocation: string | null;
  injuredArea: string | null;
  description: string | null;
  result: string | null;
  cause: string | null;
  hasTraining: string | null;
  hasPPE: string | null;
  witnesses: string | null;
  supervisorReport: string | null;
  supervisorName: string | null;
  medicalActions: string | null;
  outpatientTreatment: string | null;
  hospitalReferral: string | null;
  otherMedical: string | null;
  sickLeaveDays: number | null;
  lostWorkHours: string | null;
  medicalNotes: string | null;
  status: string;
  createdAt: string;
}

export default function AccidentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [accident, setAccident] = useState<Accident | null>(null);
  const [loading, setLoading] = useState(true);

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
        setAccident(data.data);
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

  if (!accident) {
    return (
      <div className="py-20 text-center">
        <p className="text-[16px] text-[#64748b]">حادثه یافت نشد</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            ⚠️ حادثه {accident.victimName}
          </h1>
          <p className="text-[15px] text-[#64748b]">
            کد حادثه {accident.accidentCode || "-"} - وضعیت {accident.status}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/accidents/records"
            className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            بازگشت
          </Link>
          <Link
            href={`/accidents/records/${accident.id}/edit`}
            className="rounded-xl bg-[#2e7cc4] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]"
          >
            ✏️ ویرایش
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <div className={sectionTitle}>📋 اطلاعات حادثه</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>کد حادثه</div>
            <div className={infoValue}>{accident.accidentCode || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>وضعیت</div>
            <div className={infoValue}>{accident.status}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ ثبت</div>
            <div className={infoValue}>
              {new Date(accident.createdAt).toLocaleDateString("fa-IR")}
            </div>
          </div>
        </div>

        <div className={sectionTitle}>👤 مشخصات حادثه‌دیده</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>نام و نام خانوادگی</div>
            <div className={infoValue}>{accident.victimName}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>کد پرسنلی</div>
            <div className={infoValue}>{accident.personnelCode || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ تولد</div>
            <div className={infoValue}>{accident.birthDate || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ استخدام</div>
            <div className={infoValue}>{accident.hireDate || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>شغل</div>
            <div className={infoValue}>{accident.job || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>سابقه کار</div>
            <div className={infoValue}>{accident.workExperience || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تحصیلات</div>
            <div className={infoValue}>{accident.education || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>وضعیت تأهل</div>
            <div className={infoValue}>{accident.maritalStatus || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>محل کار</div>
            <div className={infoValue}>{accident.workLocation || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>🕐 زمان و محل وقوع</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ حادثه</div>
            <div className={infoValue}>{accident.accidentDate || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>ساعت حادثه</div>
            <div className={infoValue}>{accident.accidentTime || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>محل دقیق</div>
            <div className={infoValue}>{accident.exactLocation || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>ناحیه آسیب‌دیده</div>
            <div className={infoValue}>{accident.injuredArea || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>📝 شرح حادثه</div>
        <div className={gridClass}>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>شرح کامل</div>
            <div className="whitespace-pre-wrap text-[14px] leading-8 text-[#1e293b]">
              {accident.description || "-"}
            </div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>نتیجه حادثه</div>
            <div className="whitespace-pre-wrap text-[14px] leading-8 text-[#1e293b]">
              {accident.result || "-"}
            </div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>علت حادثه</div>
            <div className="whitespace-pre-wrap text-[14px] leading-8 text-[#1e293b]">
              {accident.cause || "-"}
            </div>
          </div>
        </div>

        <div className={sectionTitle}>🎓 آموزش و تجهیزات</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>آموزش کافی</div>
            <div className={infoValue}>{accident.hasTraining || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تجهیزات حفاظت فردی</div>
            <div className={infoValue}>{accident.hasPPE || "-"}</div>
          </div>
        </div>

        {accident.witnesses && (
          <>
            <div className={sectionTitle}>👥 شهود حادثه</div>
            <div className={infoBox}>
              <div className="whitespace-pre-wrap text-[14px] leading-8 text-[#1e293b]">
                {accident.witnesses}
              </div>
            </div>
          </>
        )}

        <div className={sectionTitle}>📋 گزارش مسئول واحد</div>
        <div className={gridClass}>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>گزارش و پیشنهاد</div>
            <div className="whitespace-pre-wrap text-[14px] leading-8 text-[#1e293b]">
              {accident.supervisorReport || "-"}
            </div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>نام سرپرست</div>
            <div className={infoValue}>{accident.supervisorName || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>🏥 بخش خانه بهداشت</div>
        <div className={gridClass}>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>اقدامات درمانی</div>
            <div className="whitespace-pre-wrap text-[14px] leading-8 text-[#1e293b]">
              {accident.medicalActions || "-"}
            </div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>معالجه سرپایی</div>
            <div className={infoValue}>
              {accident.outpatientTreatment || "-"}
            </div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>ارجاع به بیمارستان</div>
            <div className={infoValue}>
              {accident.hospitalReferral || "-"}
            </div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>سایر</div>
            <div className={infoValue}>{accident.otherMedical || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>روزهای استعلاجی</div>
            <div className={infoValue}>{accident.sickLeaveDays ?? "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>ساعات کاری از دست رفته</div>
            <div className={infoValue}>{accident.lostWorkHours || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>توضیحات</div>
            <div className="whitespace-pre-wrap text-[14px] leading-8 text-[#1e293b]">
              {accident.medicalNotes || "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}