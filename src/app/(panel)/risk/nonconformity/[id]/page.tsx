"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface NonConformity {
  id: number;
  reportNumber: string | null;
  reportDate: string | null;
  factoryName: string | null;
  unitName: string | null;
  stationName: string | null;
  source: string | null;
  ncType: string | null;
  hazardDescription: string | null;
  cause: string | null;
  consequence: string | null;
  legalRequirement: string | null;
  hseAction: string | null;
  severity: number;
  probability: number;
  detection: number;
  rpl: string | null;
  action1Responsible: string | null;
  action1Deadline: string | null;
  action2Responsible: string | null;
  action2Deadline: string | null;
  actionReport: string | null;
  managerAction: string | null;
  effectiveness: string | null;
  followUpName: string | null;
  status: string;
  createdAt: string;
}

export default function NonConformityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [nc, setNc] = useState<NonConformity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) fetchNc();
  }, [params.id]);

  async function fetchNc() {
    try {
      setLoading(true);
      const res = await fetch(`/api/nonconformity/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setNc(data.data);
      } else {
        alert("❌ " + data.error);
        router.push("/risk/nonconformity");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
      router.push("/risk/nonconformity");
    } finally {
      setLoading(false);
    }
  }

  const handlePrint = () => window.print();

  const sectionTitle = "mb-6 mt-10 rounded-xl bg-gradient-to-l from-[#e0f2fe] to-transparent px-5 py-3 text-[16px] font-extrabold text-[#0f2c4c] border-r-4 border-[#2e7cc4] print:bg-none print:border-black";
  const infoBox = "rounded-xl bg-[#f0f4f8] p-4 print:border print:border-gray-300";
  const infoLabel = "mb-1 text-[12px] font-semibold text-[#64748b]";
  const infoValue = "text-[14px] font-bold text-[#0f2c4c]";
  const gridClass = "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";

  if (loading) return <div className="py-20 text-center"><p className="text-[16px] text-[#64748b]">⏳ در حال بارگذاری...</p></div>;
  if (!nc) return <div className="py-20 text-center"><p className="text-[16px] text-[#64748b]">عدم انطباق یافت نشد</p></div>;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            ⚠️ گزارش عدم انطباق {nc.reportNumber || ""}
          </h1>
          <p className="text-[15px] text-[#64748b]">تاریخ: {nc.reportDate || "-"} | وضعیت: {nc.status}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/risk/nonconformity" className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200">🔙 بازگشت</Link>
          <button onClick={handlePrint} className="rounded-xl bg-slate-800 px-5 py-3 text-[14px] font-bold text-white transition hover:bg-slate-900">🖨️ چاپ</button>
          <Link href={`/risk/nonconformity/${nc.id}/edit`} className="rounded-xl bg-[#2e7cc4] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]">✏️ ویرایش</Link>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg print:shadow-none print:p-0">
        <div className="hidden print:block mb-8 text-center border-b-2 border-gray-800 pb-4">
          <h2 className="text-[24px] font-bold mb-2">سیستم جامع HSE - ایمن‌سازان هستی گستر</h2>
          <h3 className="text-[18px] text-gray-700">فرم گزارش عدم انطباق HSE</h3>
        </div>

        <div className={sectionTitle}>📋 اطلاعات کلی</div>
        <div className={gridClass}>
          <div className={infoBox}><div className={infoLabel}>شماره گزارش</div><div className={infoValue}>{nc.reportNumber || "-"}</div></div>
          <div className={infoBox}><div className={infoLabel}>تاریخ گزارش</div><div className={infoValue}>{nc.reportDate || "-"}</div></div>
          <div className={infoBox}><div className={infoLabel}>وضعیت</div><div className={infoValue}>{nc.status}</div></div>
          <div className={infoBox}><div className={infoLabel}>نام کارخانه/انبار</div><div className={infoValue}>{nc.factoryName || "-"}</div></div>
          <div className={infoBox}><div className={infoLabel}>نام واحد</div><div className={infoValue}>{nc.unitName || "-"}</div></div>
          <div className={infoBox}><div className={infoLabel}>نام ایستگاه کار</div><div className={infoValue}>{nc.stationName || "-"}</div></div>
        </div>

        <div className={sectionTitle}>🔍 شرح و علل</div>
        <div className={gridClass}>
          <div className={infoBox}><div className={infoLabel}>برگرفته از</div><div className={infoValue}>{nc.source || "-"}</div></div>
          <div className={infoBox}><div className={infoLabel}>نوع عدم انطباق</div><div className={infoValue}>{nc.ncType || "-"}</div></div>
          <div className={infoBox + " md:col-span-2 lg:col-span-3"}><div className={infoLabel}>شرح خطر/عدم انطباق</div><div className={infoValue + " leading-7"}>{nc.hazardDescription || "-"}</div></div>
          <div className={infoBox + " md:col-span-2 lg:col-span-3"}><div className={infoLabel}>علت/علل خطر</div><div className={infoValue + " leading-7"}>{nc.cause || "-"}</div></div>
          <div className={infoBox + " md:col-span-2 lg:col-span-3"}><div className={infoLabel}>پیامد</div><div className={infoValue + " leading-7"}>{nc.consequence || "-"}</div></div>
          <div className={infoBox + " md:col-span-2 lg:col-span-3"}><div className={infoLabel}>الزام قانونی مرتبط</div><div className={infoValue + " leading-7"}>{nc.legalRequirement || "-"}</div></div>
          <div className={infoBox + " md:col-span-2 lg:col-span-3"}><div className={infoLabel}>اقدام پیشنهادی توسط HSE</div><div className={infoValue + " leading-7"}>{nc.hseAction || "-"}</div></div>
        </div>

        <div className={sectionTitle}>📊 ارزیابی ریسک</div>
        <div className={gridClass}>
          <div className={infoBox}><div className={infoLabel}>شدت</div><div className={infoValue}>{nc.severity}</div></div>
          <div className={infoBox}><div className={infoLabel}>احتمال</div><div className={infoValue}>{nc.probability}</div></div>
          <div className={infoBox}><div className={infoLabel}>کشف</div><div className={infoValue}>{nc.detection}</div></div>
          <div className={`rounded-xl border-2 p-4 text-center md:col-span-2 lg:col-span-3 ${nc.rpl === "غیرقابل تحمل" ? "bg-red-600 text-white" : "bg-green-100 text-green-700 border-green-300"}`}>
            <div className="text-[12px] font-semibold mb-1">سطح ریسک (RPL)</div>
            <div className="text-[18px] font-extrabold">{nc.rpl || "-"}</div>
          </div>
        </div>

        <div className={sectionTitle}>🛡️ اقدامات اصلاحی و پیگیری</div>
        <div className={gridClass}>
          <div className={infoBox}><div className={infoLabel}>مسئول اقدام ۱</div><div className={infoValue}>{nc.action1Responsible || "-"}</div></div>
          <div className={infoBox}><div className={infoLabel}>مهلت اقدام ۱</div><div className={infoValue}>{nc.action1Deadline || "-"}</div></div>
          <div className={infoBox}><div className={infoLabel}>مسئول اقدام ۲</div><div className={infoValue}>{nc.action2Responsible || "-"}</div></div>
          <div className={infoBox}><div className={infoLabel}>مهلت اقدام ۲</div><div className={infoValue}>{nc.action2Deadline || "-"}</div></div>
          <div className={infoBox + " md:col-span-2 lg:col-span-3"}><div className={infoLabel}>گزارش مسئول اقدام اجرایی</div><div className={infoValue + " leading-7"}>{nc.actionReport || "-"}</div></div>
          <div className={infoBox + " md:col-span-2 lg:col-span-3"}><div className={infoLabel}>شرح اقدام مصوب مدیر کارخانه</div><div className={infoValue + " leading-7"}>{nc.managerAction || "-"}</div></div>
          <div className={infoBox + " md:col-span-2 lg:col-span-3"}><div className={infoLabel}>گزارش پیگیری و اجرا (اثربخشی HSE)</div><div className={infoValue + " leading-7"}>{nc.effectiveness || "-"}</div></div>
          <div className={infoBox}><div className={infoLabel}>نام مسئول پیگیری</div><div className={infoValue}>{nc.followUpName || "-"}</div></div>
        </div>
      </div>
    </div>
  );
}