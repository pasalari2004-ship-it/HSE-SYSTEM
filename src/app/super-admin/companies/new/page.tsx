"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewCompanyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [field, setField] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/super-admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, field }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
        setLoading(false);
        return;
      }

      // موفقیت‌آمیز بود، برگرد به لیست شرکت‌ها
      router.push("/super-admin/companies");
      router.refresh();
    } catch (err) {
      setError("خطا در ارتباط با سرور");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2e7cc4] focus:bg-white focus:ring-4 focus:ring-[#2e7cc4]/10";

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">تعریف شرکت جدید</h2>
        <Link href="/super-admin/companies" className="text-sm text-slate-500 hover:text-slate-800">
          بازگشت
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">نام شرکت *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="مثلاً: پاکشو"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">حوزه فعالیت</label>
          <input
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            className={inputClass}
            placeholder="مثلاً: صنایع غذایی"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">آدرس</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={inputClass}
            rows={3}
            placeholder="آدرس کامل شرکت..."
          />
        </div>

        {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#0f2c4c] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1e4d7b] transition disabled:opacity-50 mt-2"
        >
          {loading ? "در حال ثبت..." : "ثبت شرکت"}
        </button>
      </form>
    </div>
  );
}