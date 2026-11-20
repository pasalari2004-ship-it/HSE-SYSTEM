"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // فیلدهای قابل ویرایش
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    instagram: "",
    linkedin: "",
    telegram: "",
    aboutText: "",
    heroTitle: "",
    heroSubtitle: "",
  });

  // دریافت تنظیمات از دیتابیس در زمان لود
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/super-admin/settings");
        if (res.ok) {
          const data = await res.json();
          // دیتا به صورت آرایه‌ای از {key, value} هست، تبدیلش می‌کنیم به آبجکت
          const settingsObj: any = {};
          data.data.forEach((item: any) => {
            settingsObj[item.key] = item.value;
          });
          setFormData((prev) => ({ ...prev, ...settingsObj }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  // ذخیره تنظیمات
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/super-admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "تنظیمات با موفقیت ذخیره شد." });
        router.refresh();
      } else {
        setMessage({ type: "error", text: "خطا در ذخیره تنظیمات" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "خطا در ارتباط با سرور" });
    } finally {
      setSaving(false);
    }
  }

  // آپدیت استیت با تایپ کردن
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const inputClass = "w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2e7cc4] focus:bg-white";

  if (loading) return <div className="p-8 text-center text-slate-500">در حال بارگذاری...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">تنظیمات صفحه اصلی</h2>
      <p className="text-sm text-slate-500 mb-8">اطلاعات وارد شده در این صفحه، در لندینگ سایت نمایش داده می‌شود.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* بخش متن‌های اصلی */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">متن‌های اصلی صفحه</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">عنوان اصلی (Hero Title)</label>
              <input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange} className={inputClass} placeholder="آینده‌ای ایمن‌تر" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">زیرعنوان اصلی (Hero Subtitle)</label>
              <input type="text" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} className={inputClass} placeholder="پلتفرم یکپارچه..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">متن درباره ما</label>
              <textarea name="aboutText" value={formData.aboutText} onChange={handleChange} rows={3} className={inputClass} placeholder="متن درباره شرکت..." />
            </div>
          </div>
        </div>

        {/* بخش اطلاعات تماس */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">اطلاعات تماس</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">شماره تلفن</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="۰۲۱-۱۲۳۴۵۶۷۸" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">ایمیل</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="info@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">آدرس</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass} placeholder="تهران، ایران..." />
            </div>
          </div>
        </div>

        {/* بخش شبکه‌های اجتماعی */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">شبکه‌های اجتماعی (لینک)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">اینستاگرام</label>
              <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className={inputClass} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">لینکدین</label>
              <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className={inputClass} placeholder="https://linkedin.com/..." />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">تلگرام</label>
              <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} className={inputClass} placeholder="https://t.me/..." />
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={saving} className="bg-[#0f2c4c] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#1e4d7b] transition disabled:opacity-50 w-full md:w-auto self-end">
          {saving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
        </button>
      </form>
    </div>
  );
}