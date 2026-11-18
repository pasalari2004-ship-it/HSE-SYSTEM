"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("نام کاربری یا رمز عبور اشتباه است");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("خطا در ارتباط با سرور");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border-2 border-[#e2e8f0] bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#2e7cc4] focus:bg-white focus:ring-4 focus:ring-[#2e7cc4]/10";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f2c4c] via-[#1e4d7b] to-[#2e7cc4]">
      <div className="absolute -right-52 -top-52 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,154,44,0.25),transparent)]" />
      <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(45,106,58,0.2),transparent)]" />

      <div className="relative z-10 w-[440px] max-w-[90%] rounded-3xl bg-white/95 px-10 py-11 shadow-2xl">
        <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl bg-white shadow-lg">
          <Image
            src="/logo.png"
            alt="ایمن‌سازان هستی گستر"
            width={112}
            height={112}
            className="object-contain"
            priority
          />
        </div>
        <h1 className="mb-2 text-center text-2xl font-extrabold text-[#0f2c4c]">
          سیستم جامع HSE
        </h1>
        <p className="mb-1 text-center text-sm font-bold text-[#e89a2c]">
          ایمن‌سازان هستی گستر
        </p>
        <p className="mb-8 text-center text-xs text-[#64748b]">
          راهکارهای ایمنی، سلامت و محیط زیست
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold">
              نام کاربری
            </label>
            <input
              type="text"
              className={inputClass}
              placeholder="نام کاربری خود را وارد کنید"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold">رمز عبور</label>
            <input
              type="password"
              className={inputClass}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-br from-[#0f2c4c] to-[#2e7cc4] py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? "⏳ در حال ورود..." : "ورود به سیستم"}
          </button>
        </form>
      </div>
    </div>
  );
}