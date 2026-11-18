"use client";

import { signOut } from "next-auth/react";

export default function Header() {
  async function handleLogout() {
    if (confirm("از سیستم خارج می‌شوید؟")) {
      await signOut({ callbackUrl: "/login" });
    }
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-8 py-3.5 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3.5 text-[17px] font-extrabold text-[#0f2c4c]">
        <div className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-xl bg-white shadow-md">
          <img
            src="/logo.png"
            alt="ایمن‌سازان هستی گستر"
            className="h-full w-full object-contain"
          />
        </div>
        <span>سیستم جامع HSE - ایمن‌سازان هستی گستر</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-[22px] border border-[#2e7cc4]/20 bg-gradient-to-br from-[#e0f2fe] to-[#dbeafe] px-4 py-2 text-[13px] font-semibold text-[#0f2c4c]">
          کارشناس ایمنی
        </span>
        <button
          onClick={handleLogout}
          className="rounded-[22px] bg-[#fee2e2] px-4 py-2 text-[13px] font-bold text-[#ef4444] transition hover:bg-[#fecaca]"
        >
          خروج
        </button>
      </div>
    </header>
  );
}