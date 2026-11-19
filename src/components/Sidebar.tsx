"use client";

import { useState } from "react";
import Link from "next/link";
import { menuData } from "@/data/menu";

export default function Sidebar() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  function toggleItem(id: string) {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
    <aside className="sticky top-[80px] max-h-[calc(100vh-80px)] w-[320px] overflow-y-auto bg-[#0a1f38] px-4 py-6">
      {menuData.map((cat, catIdx) => (
        <div key={catIdx} className="mb-6">
          <div className="mb-3 px-5 text-[13px] font-bold tracking-wider text-[#4a9eff]">
            {cat.category}
          </div>

          {cat.items.map((item) => {
            const hasSub = item.submenu && item.submenu.length > 0;
            const isOpen = openItems.includes(item.id);

            return (
              <div key={item.id} className="mb-1.5">
                <div
                  onClick={() => {
                    if (hasSub) toggleItem(item.id);
                  }}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-5 py-4 text-[15px] font-semibold transition-all ${
                    isOpen
                      ? "bg-[#14345c] text-white"
                      : "text-white/85 hover:bg-[#14345c] hover:text-white"
                  }`}
                >
                  <span className="min-w-[26px] text-center text-[20px]">
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.title}</span>
                  {hasSub && (
                    <span
                      className={`text-[12px] opacity-60 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </div>

                {hasSub && isOpen && (
                  <div className="mt-2 mr-6 space-y-1.5">
                    {item.submenu.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href ?? `/${item.id}/${idx}`}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-[14px] font-medium text-white/70 transition-all hover:bg-[#4a9eff]/15 hover:text-white"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4a9eff]" />
                        <span>{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </aside>
  );
}