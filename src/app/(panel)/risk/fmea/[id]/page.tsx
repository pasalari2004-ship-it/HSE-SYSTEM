"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Fmea {
  id: number;
  processName: string;
  failureMode: string;
  failureEffect: string | null;
  failureCause: string | null;
  currentControls: string | null;
  severity: number;
  occurrence: number;
  detection: number;
  rpn: number;
  rpl: string;
  strategy: string;
  recommendedAction: string | null;
  responsible: string | null;
  deadline: string | null;
  status: string;
  createdAt: string;
}

export default function FmeaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [fmea, setFmea] = useState<Fmea | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) fetchFmea();
  }, [params.id]);

  async function fetchFmea() {
    try {
      setLoading(true);
      const res = await fetch(`/api/fmea/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setFmea(data.data);
      } else {
        alert("❌ " + data.error);
        router.push("/risk/fmea");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
      router.push("/risk/fmea");
    } finally {
      setLoading(false);
    }
  }

  const handlePrint = () => window.print();

  const getRplBadge = (rpl: string) => {
    if (rpl === "فاجعه بار") return "bg-red-600 text-white";
    if (rpl === "بحرانی") return "bg-red-100 text-red-700 border-red-300";
    if (rpl === "مرزی") return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  const sectionTitle = "mb-6 mt-10 rounded-xl bg-gradient-to-l from-[#e0f2fe] to-transparent px-5 py-3 text-[16px] font-extrabold text-[#0f2c4c] border-r-4 border-[#2e7cc4] print:bg-none print:border-black";
  const infoBox = "rounded-xl bg-[#f0f4f8] p-4 print:border print:border-gray-300";
  const infoLabel = "mb-1 text-[12px] font-semibold text-[#64748b]";
  const infoValue = "text-[14px] font-bold text-[#0f2c4c]";
  const gridClass = "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";

  if (loading) return <div className="py-20 text-center"><p className="text-[16px] text-[#64748b]">⏳ در حال بارگذاری...</p></div>;
  if (!fmea) return <div className="py-20 text-center"><p className="text-[16px] text-[#64748b]">مورد FMEA یافت نشد</p></div>;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">🔬 {fmea.processName}</h1>
          <p className="text-[15px] text-[#64748b]">حالت خرابی: {fmea.failureMode} | وضعیت: {fmea.status}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/risk/fmea" className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200">🔙 بازگشت</Link>
          <button onClick={handlePrint} className="rounded-xl bg-slate-800 px-5 py-3 text-[14px] font-bold text-white transition hover:bg-slate-900">🖨️ چاپ</button>
          <Link href={`/risk/fmea/${fmea.id}/edit`} className="rounded-xl bg-[#2e7cc4] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]">✏️ ویرایش</Link>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg print:shadow-none print:p-0">
        <div className="hidden print:block mb-8 text-center border-b-2 border-gray-800 pb-4">
          <h2 className="text-[24px] font-bold mb-2">سیستم جامع HSE - ایمن‌سازان هستی گستر</h2>
          <h3 className="text-[18px] text-gray-700">برگه ارزیابی FMEA - {fmea.processName}</h3>
        </div>

        <div className={sectionTitle}>📋 اطلاعات فرآیند و خرابی</div>
        <div className={gridClass}>
          <div className={infoBox}><div className={infoLabel}>نام فرآیند (Process Name)</div><div className={infoValue}>{fmea.processName}</div></div>
          <div className={infoBox}><div className={infoLabel}>حالت خرابی (Failure Mode)</div><div className={infoValue}>{fmea.failureMode}</div></div>
          <div className={infoBox}><div className={infoLabel}>وضعیت</div><div className={infoValue}>{fmea.status}</div></div>
        </div>

        {fmea.failureEffect && (<><div className={sectionTitle}>📝 اثر خرابی (Failure Effect)</div><div className={infoBox}><div className="text-[14px] leading-8 text-[#1e293b]">{fmea.failureEffect}</div></div></>)}
        {fmea.failureCause && (<><div className={sectionTitle}>🔍 علت خرابی (Failure Cause)</div><div className={infoBox}><div className="text-[14px] leading-8 text-[#1e293b]">{fmea.failureCause}</div></div></>)}
        {fmea.currentControls && (<><div className={sectionTitle}>🛡️ کنترل‌های موجود (Current Controls)</div><div className={infoBox}><div className="text-[14px] leading-8 text-[#1e293b]">{fmea.currentControls}</div></div></>)}

        <div className={sectionTitle}>📊 ارزیابی ریسک (SOD و RPL)</div>
        <div className={gridClass}>
          <div className={infoBox}><div className={infoLabel}>S (Severity)</div><div className={infoValue}>{fmea.severity}</div></div>
          <div className={infoBox}><div className={infoLabel}>O (Occurrence)</div><div className={infoValue}>{fmea.occurrence}</div></div>
          <div className={infoBox}><div className={infoLabel}>D (Detection)</div><div className={infoValue}>{fmea.detection}</div></div>
          <div className={infoBox}><div className={infoLabel}>RPN (S × O × D)</div><div className="text-[18px] font-extrabold text-[#0f2c4c]">{fmea.rpn}</div></div>
          <div className={`rounded-xl border-2 p-4 text-center ${getRplBadge(fmea.rpl)}`}>
            <div className="text-[12px] font-semibold mb-1">RPL (سطح اولویت)</div>
            <div className="text-[16px] font-extrabold">{fmea.rpl}</div>
          </div>
          <div className={infoBox}><div className={infoLabel}>استراتژی برخورد</div><div className={infoValue}>{fmea.strategy}</div></div>
        </div>

        {fmea.recommendedAction && (<><div className={sectionTitle}>🛡️ اقدامات پیشنهادی</div><div className={infoBox}><div className="text-[14px] leading-8 text-[#1e293b]">{fmea.recommendedAction}</div></div></>)}

        <div className={sectionTitle}>📌 مسئولیت و مهلت</div>
        <div className={gridClass}>
          <div className={infoBox}><div className={infoLabel}>مسئول اقدام</div><div className={infoValue}>{fmea.responsible || "-"}</div></div>
          <div className={infoBox}><div className={infoLabel}>مهلت اقدام</div><div className={infoValue}>{fmea.deadline || "-"}</div></div>
        </div>
      </div>
    </div>
  );
}