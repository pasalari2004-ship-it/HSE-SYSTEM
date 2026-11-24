"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Risk {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
  activity: string | null;
  probability: number;
  severity: number;
  riskLevel: number;
  controlMeasures: string | null;
  responsible: string | null;
  deadline: string | null;
  status: string;
  createdAt: string;
}

export default function RiskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [risk, setRisk] = useState<Risk | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchRisk();
    }
  }, [params.id]);

  async function fetchRisk() {
    try {
      setLoading(true);
      const res = await fetch(`/api/risks/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setRisk(data.data);
      } else {
        alert("❌ " + data.error);
        router.push("/risk/identified");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
      router.push("/risk/identified");
    } finally {
      setLoading(false);
    }
  }

  const handlePrint = () => {
    window.print();
  };

  const getRiskLevelBadge = (level: number) => {
    if (level >= 15) return { text: "بحرانی", color: "bg-red-100 text-red-700 border-red-200", textColor: "text-red-600" };
    if (level >= 9) return { text: "بالا", color: "bg-orange-100 text-orange-700 border-orange-200", textColor: "text-orange-600" };
    if (level >= 4) return { text: "متوسط", color: "bg-yellow-100 text-yellow-700 border-yellow-200", textColor: "text-yellow-600" };
    return { text: "پایین", color: "bg-green-100 text-green-700 border-green-200", textColor: "text-green-600" };
  };

  const sectionTitle =
    "mb-6 mt-10 rounded-xl bg-gradient-to-l from-[#e0f2fe] to-transparent px-5 py-3 text-[16px] font-extrabold text-[#0f2c4c] border-r-4 border-[#2e7cc4] print:bg-none print:border-black";
  const infoBox = "rounded-xl bg-[#f0f4f8] p-4 print:border print:border-gray-300";
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

  if (!risk) {
    return (
      <div className="py-20 text-center">
        <p className="text-[16px] text-[#64748b]">خطر یافت نشد</p>
      </div>
    );
  }

  const badge = getRiskLevelBadge(risk.riskLevel);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            📝 {risk.title}
          </h1>
          <p className="text-[15px] text-[#64748b]">
            محل وقوع: {risk.location || "-"} | وضعیت: {risk.status}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/risk/identified"
            className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            🔙 بازگشت به لیست
          </Link>
          <button
            onClick={handlePrint}
            className="rounded-xl bg-slate-800 px-5 py-3 text-[14px] font-bold text-white transition hover:bg-slate-900"
          >
            🖨️ چاپ
          </button>
          <Link
            href={`/risk/identified/${risk.id}/edit`}
            className="rounded-xl bg-[#2e7cc4] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]"
          >
            ✏️ ویرایش
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg print:shadow-none print:p-0">
        <div className="hidden print:block mb-8 text-center border-b-2 border-gray-800 pb-4">
          <h2 className="text-[24px] font-bold mb-2">سیستم جامع HSE - ایمن‌سازان هستی گستر</h2>
          <h3 className="text-[18px] text-gray-700">برگه ارزیابی ریسک - {risk.title}</h3>
        </div>

        <div className={sectionTitle}>📋 اطلاعات خطر</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>عنوان</div>
            <div className={infoValue}>{risk.title}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>محل وقوع</div>
            <div className={infoValue}>{risk.location || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>فعالیت مرتبط</div>
            <div className={infoValue}>{risk.activity || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>وضعیت</div>
            <div className={infoValue}>{risk.status}</div>
          </div>
        </div>

        {risk.description && (
          <>
            <div className={sectionTitle}>📝 توضیحات</div>
            <div className={infoBox}>
              <div className="text-[14px] leading-8 text-[#1e293b]">
                {risk.description}
              </div>
            </div>
          </>
        )}

        <div className={sectionTitle}>📊 ارزیابی ریسک</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>احتمال</div>
            <div className={infoValue}>{risk.probability}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>شدت</div>
            <div className={infoValue}>{risk.severity}</div>
          </div>
          <div className={`rounded-xl border-2 p-4 text-center ${badge.color}`}>
            <div className="text-[12px] font-semibold mb-1">سطح ریسک</div>
            <div className="text-[20px] font-extrabold">{risk.riskLevel}</div>
            <div className="text-[12px] font-bold">{badge.text}</div>
          </div>
        </div>

        {risk.controlMeasures && (
          <>
            <div className={sectionTitle}>🛡️ اقدامات کنترلی</div>
            <div className={infoBox}>
              <div className="text-[14px] leading-8 text-[#1e293b]">
                {risk.controlMeasures}
              </div>
            </div>
          </>
        )}

        <div className={sectionTitle}>📌 مسئولیت و مهلت</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>مسئول اقدام</div>
            <div className={infoValue}>{risk.responsible || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>مهلت اقدام</div>
            <div className={infoValue}>{risk.deadline || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}