"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface News {
  id: number;
  title: string;
  content: string;
  source: string | null;
  imageUrl: string | null;
  isPublished: boolean;
  createdAt: string;
}

export default function NewsListPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      setLoading(true);
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.success) {
        setNews(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در دریافت اخبار");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!confirm(`آیا از حذف خبر «${title}» مطمئن هستید؟`)) return;

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("✅ خبر حذف شد");
        fetchNews();
      } else {
        alert("❌ خطا در حذف");
      }
    } catch (error) {
      alert("❌ خطا در ارتباط با سرور");
    }
  }

  const filteredNews = news.filter((item) => {
    return (
      item.title?.includes(search) ||
      item.content?.includes(search) ||
      item.source?.includes(search)
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-[28px] font-extrabold text-[#0f2c4c]">
            📰 اخبار HSE
          </h1>
          <p className="text-[15px] text-[#64748b]">
            اخبار و رویدادهای حوزه ایمنی، بهداشت و محیط زیست
          </p>
        </div>
        <Link
          href="/news/new"
          className="rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
        >
          + افزودن خبر جدید
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="جستجو با عنوان، متن یا منبع..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border-2 border-[#e2e8f0] bg-white px-5 py-3 text-[14px] outline-none transition focus:border-[#2e7cc4]"
        />
        <button
          onClick={fetchNews}
          className="rounded-xl bg-[#2e7cc4] px-6 py-3 text-[14px] font-bold text-white transition hover:bg-[#4a9eff]"
        >
          🔄 بروزرسانی
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <p className="text-[16px] text-[#64748b]">⏳ در حال بارگذاری...</p>
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="rounded-2xl bg-white py-20 text-center shadow-lg">
          <div className="mb-4 text-[60px] opacity-30">📰</div>
          <p className="mb-2 text-[18px] font-bold text-[#0f2c4c]">
            هیچ خبری یافت نشد
          </p>
          <p className="text-[14px] text-[#64748b]">
            {news.length === 0
              ? "برای شروع، اولین خبر را اضافه کنید"
              : "با تغییر جستجو دوباره تلاش کنید"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              {item.imageUrl ? (
                <div className="h-48 w-full overflow-hidden bg-[#f0f4f8]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-[#e0f2fe] to-[#dbeafe] text-[60px] opacity-40">
                  📰
                </div>
              )}

              <div className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${
                      item.isPublished
                        ? "bg-[#d1fae5] text-[#065f46]"
                        : "bg-[#fed7aa] text-[#92400e]"
                    }`}
                  >
                    {item.isPublished ? "منتشر شده" : "پیش‌نویس"}
                  </span>
                  <span className="text-[11px] text-[#64748b]">
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <h3 className="mb-2 line-clamp-2 text-[16px] font-bold text-[#0f2c4c]">
                  {item.title}
                </h3>

                <p className="mb-4 line-clamp-3 text-[13px] leading-6 text-[#64748b]">
                  {item.content}
                </p>

                {item.source && (
                  <p className="mb-4 text-[12px] text-[#2e7cc4]">
                    📌 منبع: {item.source}
                  </p>
                )}

                <div className="flex justify-end gap-2 border-t border-[#e2e8f0] pt-4">
                  <Link
                    href={`/news/${item.id}/edit`}
                    className="rounded-lg bg-[#dbeafe] px-4 py-2 text-[12px] font-bold text-[#2e7cc4] transition hover:bg-[#bfdbfe]"
                  >
                    ✏️ ویرایش
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="rounded-lg bg-[#fee2e2] px-4 py-2 text-[12px] font-bold text-[#ef4444] transition hover:bg-[#fecaca]"
                  >
                    🗑 حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredNews.length > 0 && (
        <div className="mt-6 text-center text-[13px] text-[#64748b]">
          مجموع:{" "}
          <strong className="text-[#0f2c4c]">{filteredNews.length}</strong> خبر
          {search ? ` (از ${news.length} کل)` : ""}
        </div>
      )}
    </div>
  );
}