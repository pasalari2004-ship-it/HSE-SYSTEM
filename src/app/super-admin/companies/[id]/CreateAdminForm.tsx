"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAdminForm({ companyId }: { companyId: number }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/super-admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId,
          fullName,
          username,
          password,
          role: "COMPANY_ADMIN",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "خطا در ثبت" });
      } else {
        setMessage({ type: "success", text: "مدیرعامل با موفقیت تعریف شد." });
        setFullName("");
        setUsername("");
        setPassword("");
        router.refresh();
      }
    } catch (err) {
      setMessage({ type: "error", text: "خطا در ارتباط با سرور" });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e7cc4]";

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4">تعریف مدیرعامل (Company Admin)</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <div>
          <label className="block text-sm font-semibold mb-1">نام و نام خانوادگی</label>
          <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">نام کاربری</label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">رمز عبور</label>
          <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </div>

        {message.text && (
          <div className={`p-3 rounded-lg text-sm ${message.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={loading} className="bg-[#0f2c4c] text-white py-2 rounded-lg font-bold hover:bg-[#1e4d7b] transition disabled:opacity-50">
          {loading ? "در حال ثبت..." : "ثبت مدیرعامل"}
        </button>
      </form>
    </div>
  );
}