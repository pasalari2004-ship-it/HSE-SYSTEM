"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Interview {
  id: number;
  fullName: string;
  position: string | null;
  birthDate: string | null;
  age: number | null;
  unit: string | null;
  otherUnits: string | null;
  diseaseHistory: string | null;
  diseaseNotes: string | null;
  accidentHistory: string | null;
  accidentNotes: string | null;
  safetyKnowledge: string | null;
  hseCourses: string | null;
  hseCoursesNotes: string | null;
  sportsHistory: string | null;
  sportsNotes: string | null;
  physicalFitness: string | null;
  smokingHistory: string | null;
  smokingNotes: string | null;
  fileStatus: string | null;
  lastTestDate: string | null;
  healthStatus: string | null;
  height: number | null;
  weight: number | null;
  bmi: string | null;
  militaryStatus: string | null;
  serviceField: string | null;
  exemptionType: string | null;
  hseOpinion: string | null;
  notes: string | null;
  interviewerName: string | null;
  createdAt: string;
}

export default function InterviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchInterview();
    }
  }, [params.id]);

  async function fetchInterview() {
    try {
      setLoading(true);
      const res = await fetch(`/api/interview/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setInterview(data.data);
      } else {
        alert("❌ " + data.error);
        router.push("/personnel/interview");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
      router.push("/personnel/interview");
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

  if (!interview) {
    return (
      <div className="py-20 text-center">
        <p className="text-[16px] text-[#64748b]">مصاحبه یافت نشد</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            💬 مصاحبه {interview.fullName}
          </h1>
          <p className="text-[15px] text-[#64748b]">
            جزئیات کامل مصاحبه شغلی
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/personnel/interview"
            className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            بازگشت
          </Link>
          <Link
            href={`/personnel/interview/${interview.id}/edit`}
            className="rounded-xl bg-[#2e7cc4] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]"
          >
            ✏️ ویرایش
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <div className={sectionTitle}>👤 اطلاعات متقاضی</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>نام و نام خانوادگی</div>
            <div className={infoValue}>{interview.fullName}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>عنوان شغلی / سمت</div>
            <div className={infoValue}>{interview.position || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ تولد</div>
            <div className={infoValue}>{interview.birthDate || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>سن</div>
            <div className={infoValue}>{interview.age ?? "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>نام واحد</div>
            <div className={infoValue}>{interview.unit || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>سایر واحدها</div>
            <div className={infoValue}>{interview.otherUnits || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>🏥 سوابق پزشکی</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>سابقه بیماری / حساسیت / آلرژی</div>
            <div className={infoValue}>{interview.diseaseHistory || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2`}>
            <div className={infoLabel}>توضیحات بیماری</div>
            <div className={infoValue}>{interview.diseaseNotes || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>سابقه حادثه و بستری</div>
            <div className={infoValue}>{interview.accidentHistory || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2`}>
            <div className={infoLabel}>توضیحات حادثه</div>
            <div className={infoValue}>{interview.accidentNotes || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>🎓 ایمنی و آموزش</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>میزان اطلاع از ایمنی</div>
            <div className={infoValue}>{interview.safetyKnowledge || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>دوره‌های HSE گذرانده</div>
            <div className={infoValue}>{interview.hseCourses || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>نام دوره‌ها</div>
            <div className={infoValue}>{interview.hseCoursesNotes || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>💪 وضعیت جسمانی و ورزشی</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>سابقه ورزش و تفریح</div>
            <div className={infoValue}>{interview.sportsHistory || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>میزان آمادگی جسمانی</div>
            <div className={infoValue}>{interview.physicalFitness || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>توضیحات ورزش</div>
            <div className={infoValue}>{interview.sportsNotes || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>⚠️ سابقه استعمال سیگار</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>سابقه استعمال سیگار</div>
            <div className={infoValue}>{interview.smokingHistory || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2`}>
            <div className={infoLabel}>توضیحات سیگار</div>
            <div className={infoValue}>{interview.smokingNotes || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>📋 وضعیت پرونده بدو استخدام</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>وضعیت پرونده</div>
            <div className={infoValue}>{interview.fileStatus || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ آخرین آزمایشات</div>
            <div className={infoValue}>{interview.lastTestDate || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>وضعیت سلامت</div>
            <div className={infoValue}>{interview.healthStatus || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>📏 مشخصات بدنی</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>قد (سانتی‌متر)</div>
            <div className={infoValue}>{interview.height ?? "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>وزن (کیلوگرم)</div>
            <div className={infoValue}>{interview.weight ?? "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>BMI</div>
            <div className={infoValue}>{interview.bmi || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>🎖 وضعیت خدمت وظیفه</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>وضعیت خدمت</div>
            <div className={infoValue}>{interview.militaryStatus || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>نام رشته خدمت</div>
            <div className={infoValue}>{interview.serviceField || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>نوع معافیت</div>
            <div className={infoValue}>{interview.exemptionType || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>✍️ نظریه و توضیحات</div>
        <div className={gridClass}>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>نظریه واحد HSE</div>
            <div className={infoValue}>{interview.hseOpinion || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>توضیحات</div>
            <div className={infoValue}>{interview.notes || "-"}</div>
          </div>
          <div className={`${infoBox} md:col-span-2 lg:col-span-3`}>
            <div className={infoLabel}>نام و امضای مصاحبه‌کننده</div>
            <div className={infoValue}>{interview.interviewerName || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}