export type SubItem = { name: string; icon: string; href?: string };

export type MenuItem = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  submenu: SubItem[];
};

export type MenuCategory = {
  category: string;
  managerVisible: boolean;
  items: MenuItem[];
};

export const menuData: MenuCategory[] = [
  {
    category: "اطلاعات پایه",
    managerVisible: false,
    items: [
      {
        id: "personnel",
        icon: "👤",
        title: "اطلاعات پرسنلی",
        desc: "مدیریت اطلاعات کارکنان",
        submenu: [
          { name: "مشاهده اطلاعات پرسنلی", icon: "👁", href: "/personnel" },
          { name: "ثبت اطلاعات پرسنلی", icon: "📝", href: "/personnel/new" },
          { name: "مصاحبه شغلی", icon: "💬", href: "/personnel/interview" },
        ],
      },
    ],
  },
  {
    category: "ایمنی و عملیات",
    managerVisible: false,
    items: [
      {
        id: "accidents",
        icon: "⚠️",
        title: "مدیریت حوادث",
        desc: "ثبت، پیگیری و تحلیل حوادث",
        submenu: [
          { name: "دستورالعمل حوادث", icon: "📖", href: "/accidents/guidelines" },
          { name: "ثبت حوادث و بیماری‌های شغلی", icon: "📝", href: "/accidents/records" },
          { name: "تجزیه و تحلیل حوادث", icon: "🔍" },
          { name: "شاخص حوادث", icon: "📊" },
          { name: "تابلو حوادث", icon: "📋" },
          { name: "نمودار حوادث سالانه", icon: "📈" },
          { name: "گزارش حوادث", icon: "📄" },
          { name: "نمودار مقایسه‌ای", icon: "📉" },
        ],
      },
      {
        id: "risk",
        icon: "📊",
        title: "مدیریت ریسک",
        desc: "شناسایی و ارزیابی ریسک‌ها",
        submenu: [
          { name: "دستورالعمل ریسک‌ها", icon: "📖" },
          { name: "ثبت خطرات شناسایی‌شده", icon: "📝" },
          { name: "ارزیابی ریسک به روش FMEA", icon: "🔬" },
          { name: "ارزیابی ریسک به روش JSA", icon: "🔬" },
          { name: "صدور عدم انطباق", icon: "⚠️" },
          { name: "ثبت عدم انطباق", icon: "📝" },
          { name: "نمودار مقایسه‌ای", icon: "📉" },
          { name: "بهبودهای انجام‌شده", icon: "✅" },
        ],
      },
      {
        id: "crisis",
        icon: "🚨",
        title: "مدیریت بحران",
        desc: "برنامه‌ریزی و واکنش در بحران",
        submenu: [],
      },
      {
        id: "fire",
        icon: "🔥",
        title: "آتش‌نشانی",
        desc: "تجهیزات و آموزش‌های آتش‌نشانی",
        submenu: [
          { name: "دستورالعمل اطفاء و اعلام حریق", icon: "📖" },
          { name: "چک‌لیست کپسول‌های اطفاء حریق", icon: "✅" },
          { name: "چک‌لیست فایر باکس‌ها", icon: "✅" },
          { name: "چک‌لیست سطل شن و موبایل فوم", icon: "✅" },
          { name: "چک‌لیست اعلام حریق", icon: "✅" },
          { name: "مانورهای اطفاء حریق", icon: "🎯" },
          { name: "چک‌لیست تجهیزات", icon: "✅" },
        ],
      },
      {
        id: "monitoring",
        icon: "📡",
        title: "اندازه‌گیری و پایش‌ها",
        desc: "پایش عوامل زیان‌آور محیط کار",
        submenu: [
          { name: "دستورالعمل اندازه‌گیری‌ها و پایش‌ها", icon: "📖" },
          { name: "ارت سنجی", icon: "⚡" },
          { name: "صدا سنجی", icon: "🔊" },
          { name: "روشنایی", icon: "💡" },
          { name: "تست مخازن", icon: "🛢" },
          { name: "بازرسی لیفتراک‌ها", icon: "🚜" },
          { name: "بازرسی آسانسورها", icon: "🛗" },
          { name: "بازرسی جرثقیل‌ها", icon: "🏗" },
          { name: "ثبت PM", icon: "🔧" },
          { name: "بهبودهای انجام‌شده", icon: "✅" },
        ],
      },
      {
        id: "signs",
        icon: "🚧",
        title: "تابلوهای HSE",
        desc: "مدیریت علائم و تابلوها",
        submenu: [
          { name: "تابلوهای ایمنی", icon: "⚠️" },
          { name: "تابلوهای بهداشتی", icon: "🏥" },
          { name: "تابلوهای محیط زیست", icon: "🌱" },
        ],
      },
    ],
  },
  {
    category: "پرسنل و تجهیزات",
    managerVisible: false,
    items: [
      {
        id: "ppe",
        icon: "🦺",
        title: "لوازم حفاظت فردی (PPE)",
        desc: "مدیریت و تحویل تجهیزات ایمنی",
        submenu: [
          { name: "دستورالعمل لوازم حفاظت فردی", icon: "📖" },
          { name: "ماتریس لوازم حفاظت فردی", icon: "📊" },
          { name: "ثبت لوازم حفاظت فردی مصرفی", icon: "📝" },
          { name: "ثبت لوازم حفاظت فردی تحویلی", icon: "📝" },
          { name: "تابلوهای لوازم حفاظت فردی و پوشاک", icon: "📋" },
        ],
      },
      {
        id: "training",
        icon: "🎓",
        title: "آموزش",
        desc: "دوره‌ها و آموزش‌های HSE",
        submenu: [
          { name: "دستورالعمل آموزش", icon: "📖" },
          { name: "فرم آموزش", icon: "📝" },
          { name: "اطلاعیه آموزش و تقویم آموزشی", icon: "📅" },
          { name: "دوره‌های ایمنی و سرفصل‌ها", icon: "🦺" },
          { name: "ثبت آموزش‌های ایمنی و تصاویر", icon: "📷" },
          { name: "دوره‌های بهداشتی و سرفصل‌ها", icon: "🏥" },
          { name: "ثبت آموزش‌های بهداشتی و تصاویر", icon: "📷" },
          { name: "دوره‌های اطفاء حریق و سرفصل‌ها", icon: "🔥" },
          { name: "ثبت آموزش‌های اطفاء حریق و تصاویر", icon: "📷" },
        ],
      },
      {
        id: "health",
        icon: "🏥",
        title: "خانه بهداشت",
        desc: "پرونده پزشکی و پایش سلامت",
        submenu: [
          { name: "دستورالعمل خانه بهداشت", icon: "📖" },
          { name: "ثبت مراجعین به خانه بهداشت", icon: "📝" },
          { name: "گزارشات پزشک", icon: "📄" },
          { name: "ثبت پرونده‌های پزشکی", icon: "📁" },
          { name: "ثبت پرونده‌های پزشکی رکاد", icon: "🗂" },
          { name: "ثبت آزمایشات ادواری", icon: "🧪" },
          { name: "توصیه و شروط کاری کارکنان", icon: "📋" },
          { name: "چک‌لیست جعبه‌های کمک‌های اولیه", icon: "✅" },
          { name: "لیست تجهیزات", icon: "📦" },
          { name: "چک‌لیست سرویس‌های بهداشتی و حمام‌ها", icon: "✅" },
          { name: "چک‌لیست رستوران و آشپزخانه", icon: "✅" },
          { name: "چک‌لیست آبدارخانه‌ها", icon: "✅" },
          { name: "سم پاشی و قطعه گذاری", icon: "🐜" },
          { name: "کلر سنجی", icon: "💧" },
        ],
      },
      {
        id: "certificates",
        icon: "📜",
        title: "گواهینامه‌ها",
        desc: "مدیریت گواهی‌نامه‌های پرسنل",
        submenu: [],
      },
      {
        id: "permits",
        icon: "📋",
        title: "مجوز کار (پرمیت)",
        desc: "صدور و مدیریت مجوزها",
        submenu: [
          { name: "مجوز فعالیت خطرناک کارکنان سازمان", icon: "⚠️" },
          { name: "مجوز کار پیمانکار", icon: "👷" },
        ],
      },
      {
        id: "requests",
        icon: "📦",
        title: "درخواست کالا",
        desc: "درخواست و مدیریت خرید تجهیزات",
        submenu: [
          { name: "بایگانی مجوزها و گواهی‌نامه‌ها", icon: "🗂" },
          { name: "ثبت درخواست کالا", icon: "📝" },
          { name: "ایزو (ISO)", icon: "🏆" },
          { name: "چک‌لیست سرویس‌های ایاب و ذهاب", icon: "✅" },
        ],
      },
    ],
  },
  {
    category: "اسناد و گزارشات",
    managerVisible: true,
    items: [
      {
        id: "reports-hse",
        icon: "📈",
        title: "گزارشات HSE",
        desc: "گزارش‌های داخلی ایمنی",
        submenu: [
          { name: "ثبت گزارشات روزانه", icon: "📅" },
          { name: "ثبت گزارشات وقایع مهم هفته", icon: "📅" },
          { name: "ثبت گزارشات ماهیانه", icon: "📅" },
          { name: "ثبت گزارشات فصلی", icon: "📅" },
          { name: "ثبت گزارشات سالیانه", icon: "📅" },
        ],
      },
      {
        id: "reports-external",
        icon: "📤",
        title: "ارتباطات برون‌سازمانی",
        desc: "گزارش به سازمان‌های بیرونی",
        submenu: [
          { name: "صورت‌جلسات کمیته حفاظت فنی", icon: "📋" },
          { name: "گزارش حوادث", icon: "⚠️" },
          { name: "جلسات برون‌سازمانی", icon: "👥" },
          { name: "پیمانکاران", icon: "👷" },
        ],
      },
      {
        id: "environment",
        icon: "🌱",
        title: "محیط زیست",
        desc: "مدیریت مسائل زیست‌محیطی",
        submenu: [
          { name: "دستورالعمل محیط زیست", icon: "📖" },
          { name: "سطل‌های زباله", icon: "🗑" },
          { name: "پساب", icon: "💧" },
          { name: "پسماندها و شیمیایی", icon: "☣️" },
          { name: "خود اطفایی", icon: "🧯" },
        ],
      },
      {
        id: "regulations",
        icon: "📖",
        title: "آیین‌نامه و دستورالعمل‌ها",
        desc: "قوانین و دستورالعمل‌های HSE",
        submenu: [],
      },
      {
        id: "documents",
        icon: "🗂",
        title: "مدیریت اسناد",
        desc: "آرشیو و بایگانی اسناد",
        submenu: [],
      },
    ],
  },
];
