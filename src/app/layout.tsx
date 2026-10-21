import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سیستم جامع HSE - ایمن‌سازان هستی گستر",
  description:
    "سیستم جامع مدیریت ایمنی، بهداشت و محیط زیست - ایمن‌سازان هستی گستر",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
        />
      </head>
      <body className="font-[Vazirmatn] bg-[#f0f4f8] text-[#1e293b]">
        {children}
      </body>
    </html>
  );
}