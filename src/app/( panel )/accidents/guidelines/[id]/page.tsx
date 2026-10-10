"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Guideline {
  id: number;
  title: string;
  documentCode: string | null;
  version: string | null;
  category: string;
  processOwner: string | null;
  approvalDate: string | null;
  reviewDate: string | null;
  description: string | null;
  content: string | null;
  fileUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function GuidelineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [guideline, setGuideline] = useState<Guideline | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchGuideline();
    }
  }, [params.id]);

  async function fetchGuideline() {
    try {
      setLoading(true);
      const res = await fetch(`/api/guidelines/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setGuideline(data.data);
      } else {
        alert("❌ " + data.error);
        router.push("/accidents/guidelines");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اطلاعات");
      router.push("/accidents/guidelines");
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

  if (!guideline) {
    return (
      <div className="py-20 text-center">
        <p className="text-[16px] text-[#64748b]">دستورالعمل یافت نشد</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            📄 {guideline.title}
          </h1>
          <p className="text-[15px] text-[#64748b]">
            {guideline.category} - کد سند {guideline.documentCode || "-"}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/accidents/guidelines"
            className="rounded-xl bg-slate-100 px-5 py-3 text-[14px] font-bold text-[#334155] transition hover:bg-slate-200"
          >
            بازگشت
          </Link>
          <Link
            href={`/accidents/guidelines/${guideline.id}/edit`}
            className="rounded-xl bg-[#2e7cc4] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]"
          >
            ✏️ ویرایش
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <div className={sectionTitle}>📋 اطلاعات سند</div>
        <div className={gridClass}>
          <div className={infoBox}>
            <div className={infoLabel}>عنوان</div>
            <div className={infoValue}>{guideline.title}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>کد سند</div>
            <div className={infoValue}>{guideline.documentCode || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>نسخه</div>
            <div className={infoValue}>{guideline.version || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>دسته‌بندی</div>
            <div className={infoValue}>{guideline.category}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>راهبر فرآیند</div>
            <div className={infoValue}>{guideline.processOwner || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>وضعیت</div>
            <div className={infoValue}>{guideline.status}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ تصویب</div>
            <div className={infoValue}>{guideline.approvalDate || "-"}</div>
          </div>
          <div className={infoBox}>
            <div className={infoLabel}>تاریخ بازنگری</div>
            <div className={infoValue}>{guideline.reviewDate || "-"}</div>
          </div>
        </div>

        {guideline.description && (
          <>
            <div className={sectionTitle}>📝 توضیحات</div>
            <div className={infoBox}>
              <div className="text-[14px] leading-8 text-[#1e293b]">
                {guideline.description}
              </div>
            </div>
          </>
        )}

        {guideline.content && (
          <>
            <div className={sectionTitle}>📖 متن کامل دستورالعمل</div>
            <div className="rounded-xl border-2 border-[#e2e8f0] bg-white p-6">
              <div className="whitespace-pre-wrap text-[14px] leading-9 text-[#1e293b]">
                {guideline.content}
              </div>
            </div>
          </>
        )}

        {guideline.fileUrl && (
          <>
            <div className={sectionTitle}>📎 فایل پیوست</div>
            <div className="rounded-xl bg-[#e0f2fe] p-6 text-center">
              <a
                href={guideline.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]"
              >
                📥 دانلود فایل PDF
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}