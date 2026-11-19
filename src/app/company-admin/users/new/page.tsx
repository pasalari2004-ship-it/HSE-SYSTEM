"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewUserPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("HSE_MANAGER");
  const [unitName, setUnitName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/company-admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, role, unitName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
        setLoading(false);
        return;
      }

      router.push("/company-admin/users");
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
        <h2 className="text-2xl font-bold text-slate-800">تعریف کاربر جدید</h2>
        <Link href="/company-admin/users" className="text-sm text-slate-500 hover:text-slate-800">
          بازگشت
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">نام و نام خانوادگی *</label>
          <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">نام کاربری *</label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">رمز عبور *</label>
          <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">نقش کاربر</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
            <option value="HSE_MANAGER">کارشناس HSE</option>
            <option value="UNIT_MANAGER">مدیر واحد</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">واحد (اختیاری)</label>
          <input type="text" value={unitName} onChange={(e) => setUnitName(e.target.value)} className={inputClass} placeholder="مثلاً: واحد تولید" />
        </div>

        {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#0f2c4c] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1e4d7b] transition disabled:opacity-50 mt-2"
        >
          {loading ? "در حال ثبت..." : "ثبت کاربر"}
        </button>
      </form>
    </div>
  );
}