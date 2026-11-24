export type SubItem = { id: string; name: string; icon: string; href?: string };

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
          { id: "personnel-view", name: "مشاهده اطلاعات پرسنلی", icon: "👁", href: "/personnel" },
          { id: "personnel-new", name: "ثبت اطلاعات پرسنلی", icon: "📝", href: "/personnel/new" },
          { id: "personnel-interview", name: "مصاحبه شغلی", icon: "💬", href: "/personnel/interview" },
        ],
      },
      {
        id: "news",
        icon: "📰",
        title: "اخبار HSE",
        desc: "اخبار و رویدادهای حوزه ایمنی، بهداشت و محیط زیست",
        submenu: [
          { id: "news-view", name: "مشاهده اخبار", icon: "👁", href: "/news" },
          { id: "news-new", name: "افزودن خبر", icon: "📝", href: "/news/new" },
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
          { id: "accidents-guidelines", name: "دستورالعمل حوادث", icon: "📖", href: "/accidents/guidelines" },
          { id: "accidents-records", name: "ثبت حوادث و بیماری‌های شغلی", icon: "📝", href: "/accidents/records" },
          { id: "accidents-analysis", name: "تجزیه و تحلیل حوادث", icon: "🔍", href: "/accidents/analysis" },
          { id: "accidents-index", name: "شاخص حوادث", icon: "📊", href: "/accidents/indicators" },
          { id: "accidents-board", name: "تابلو حوادث", icon: "📋", href: "/accidents/board" },
          { id: "accidents-chart-yearly", name: "نمودار حوادث سالانه", icon: "📈", href: "/accidents/chart-yearly" },
          { id: "accidents-report", name: "گزارش حوادث", icon: "📄", href: "/accidents/report" },
          { id: "accidents-chart-compare", name: "نمودار مقایسه‌ای", icon: "📉", href: "/accidents/chart-compare" }, // 👈 لینک اینجا اضافه شد
        ],
      },
      {
        id: "risk",
        icon: "📊",
        title: "مدیریت ریسک",
        desc: "شناسایی و ارزیابی ریسک‌ها",
        submenu: [
          { id: "risk-guidelines", name: "دستورالعمل ریسک‌ها", icon: "📖" },
          { id: "risk-identified", name: "ثبت خطرات شناسایی‌شده", icon: "📝" },
          { id: "risk-fmea", name: "ارزیابی ریسک به روش FMEA", icon: "🔬" },
          { id: "risk-jsa", name: "ارزیابی ریسک به روش JSA", icon: "🔬" },
          { id: "risk-nonconformity-issue", name: "صدور عدم انطباق", icon: "⚠️" },
          { id: "risk-nonconformity-record", name: "ثبت عدم انطباق", icon: "📝" },
          { id: "risk-chart-compare", name: "نمودار مقایسه‌ای", icon: "📉" },
          { id: "risk-improvements", name: "بهبودهای انجام‌شده", icon: "✅" },
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
          { id: "fire-guidelines", name: "دستورالعمل اطفاء و اعلام حریق", icon: "📖" },
          { id: "fire-extinguishers", name: "چک‌لیست کپسول‌های اطفاء حریق", icon: "✅" },
          { id: "fire-boxes", name: "چک‌لیست فایر باکس‌ها", icon: "✅" },
          { id: "fire-sand-foam", name: "چک‌لیست سطل شن و موبایل فوم", icon: "✅" },
          { id: "fire-alarm", name: "چک‌لیست اعلام حریق", icon: "✅" },
          { id: "fire-drills", name: "مانورهای اطفاء حریق", icon: "🎯" },
          { id: "fire-equipment", name: "چک‌لیست تجهیزات", icon: "✅" },
        ],
      },
      {
        id: "monitoring",
        icon: "📡",
        title: "اندازه‌گیری و پایش‌ها",
        desc: "پایش عوامل زیان‌آور محیط کار",
        submenu: [
          { id: "monitoring-guidelines", name: "دستورالعمل اندازه‌گیری‌ها و پایش‌ها", icon: "📖" },
          { id: "monitoring-grounding", name: "ارت سنجی", icon: "⚡" },
          { id: "monitoring-noise", name: "صدا سنجی", icon: "🔊" },
          { id: "monitoring-lighting", name: "روشنایی", icon: "💡" },
          { id: "monitoring-tanks", name: "تست مخازن", icon: "🛢" },
          { id: "monitoring-forklift", name: "بازرسی لیفتراک‌ها", icon: "🚜" },
          { id: "monitoring-elevator", name: "بازرسی آسانسورها", icon: "🛗" },
          { id: "monitoring-crane", name: "بازرسی جرثقیل‌ها", icon: "🏗" },
          { id: "monitoring-pm", name: "ثبت PM", icon: "🔧" },
          { id: "monitoring-improvements", name: "بهبودهای انجام‌شده", icon: "✅" },
        ],
      },
      {
        id: "signs",
        icon: "🚧",
        title: "تابلوهای HSE",
        desc: "مدیریت علائم و تابلوها",
        submenu: [
          { id: "signs-safety", name: "تابلوهای ایمنی", icon: "⚠️" },
          { id: "signs-health", name: "تابلوهای بهداشتی", icon: "🏥" },
          { id: "signs-environment", name: "تابلوهای محیط زیست", icon: "🌱" },
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
          { id: "ppe-guidelines", name: "دستورالعمل لوازم حفاظت فردی", icon: "📖" },
          { id: "ppe-matrix", name: "ماتریس لوازم حفاظت فردی", icon: "📊" },
          { id: "ppe-consumable", name: "ثبت لوازم حفاظت فردی مصرفی", icon: "📝" },
          { id: "ppe-delivered", name: "ثبت لوازم حفاظت فردی تحویلی", icon: "📝" },
          { id: "ppe-boards", name: "تابلوهای لوازم حفاظت فردی و پوشاک", icon: "📋" },
        ],
      },
      {
        id: "training",
        icon: "🎓",
        title: "آموزش",
        desc: "دوره‌ها و آموزش‌های HSE",
        submenu: [
          { id: "training-guidelines", name: "دستورالعمل آموزش", icon: "📖" },
          { id: "training-form", name: "فرم آموزش", icon: "📝" },
          { id: "training-calendar", name: "اطلاعیه آموزش و تقویم آموزشی", icon: "📅" },
          { id: "training-safety", name: "دوره‌های ایمنی و سرفصل‌ها", icon: "🦺" },
          { id: "training-safety-record", name: "ثبت آموزش‌های ایمنی و تصاویر", icon: "📷" },
          { id: "training-health", name: "دوره‌های بهداشتی و سرفصل‌ها", icon: "🏥" },
          { id: "training-health-record", name: "ثبت آموزش‌های بهداشتی و تصاویر", icon: "📷" },
          { id: "training-fire", name: "دوره‌های اطفاء حریق و سرفصل‌ها", icon: "🔥" },
          { id: "training-fire-record", name: "ثبت آموزش‌های اطفاء حریق و تصاویر", icon: "📷" },
        ],
      },
      {
        id: "health",
        icon: "🏥",
        title: "خانه بهداشت",
        desc: "پرونده پزشکی و پایش سلامت",
        submenu: [
          { id: "health-guidelines", name: "دستورالعمل خانه بهداشت", icon: "📖" },
          { id: "health-visitors", name: "ثبت مراجعین به خانه بهداشت", icon: "📝" },
          { id: "health-doctor-reports", name: "گزارشات پزشک", icon: "📄" },
          { id: "health-records", name: "ثبت پرونده‌های پزشکی", icon: "📁" },
          { id: "health-records-recad", name: "ثبت پرونده‌های پزشکی رکاد", icon: "🗂" },
          { id: "health-periodic-tests", name: "ثبت آزمایشات ادواری", icon: "🧪" },
          { id: "health-work-conditions", name: "توصیه و شروط کاری کارکنان", icon: "📋" },
          { id: "health-first-aid", name: "چک‌لیست جعبه‌های کمک‌های اولیه", icon: "✅" },
          { id: "health-equipment", name: "لیست تجهیزات", icon: "📦" },
          { id: "health-bathrooms", name: "چک‌لیست سرویس‌های بهداشتی و حمام‌ها", icon: "✅" },
          { id: "health-restaurant", name: "چک‌لیست رستوران و آشپزخانه", icon: "✅" },
          { id: "health-water-rooms", name: "چک‌لیست آبدارخانه‌ها", icon: "✅" },
          { id: "health-pest-control", name: "سم پاشی و قطعه گذاری", icon: "🐜" },
          { id: "health-chlorine", name: "کلر سنجی", icon: "💧" },
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
          { id: "permits-dangerous", name: "مجوز فعالیت خطرناک کارکنان سازمان", icon: "⚠️" },
          { id: "permits-contractor", name: "مجوز کار پیمانکار", icon: "👷" },
        ],
      },
      {
        id: "requests",
        icon: "📦",
        title: "درخواست کالا",
        desc: "درخواست و مدیریت خرید تجهیزات",
        submenu: [
          { id: "requests-archive", name: "بایگانی مجوزها و گواهی‌نامه‌ها", icon: "🗂" },
          { id: "requests-new", name: "ثبت درخواست کالا", icon: "📝" },
          { id: "requests-iso", name: "ایزو (ISO)", icon: "🏆" },
          { id: "requests-transport", name: "چک‌لیست سرویس‌های ایاب و ذهاب", icon: "✅" },
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
          { id: "reports-daily", name: "ثبت گزارشات روزانه", icon: "📅" },
          { id: "reports-weekly", name: "ثبت گزارشات وقایع مهم هفته", icon: "📅" },
          { id: "reports-monthly", name: "ثبت گزارشات ماهیانه", icon: "📅" },
          { id: "reports-seasonal", name: "ثبت گزارشات فصلی", icon: "📅" },
          { id: "reports-yearly", name: "ثبت گزارشات سالیانه", icon: "📅" },
        ],
      },
      {
        id: "reports-external",
        icon: "📤",
        title: "ارتباطات برون‌سازمانی",
        desc: "گزارش به سازمان‌های بیرونی",
        submenu: [
          { id: "external-committee", name: "صورت‌جلسات کمیته حفاظت فنی", icon: "📋" },
          { id: "external-accident-report", name: "گزارش حوادث", icon: "⚠️" },
          { id: "external-meetings", name: "جلسات برون‌سازمانی", icon: "👥" },
          { id: "external-contractors", name: "پیمانکاران", icon: "👷" },
        ],
      },
      {
        id: "environment",
        icon: "🌱",
        title: "محیط زیست",
        desc: "مدیریت مسائل زیست‌محیطی",
        submenu: [
          { id: "environment-guidelines", name: "دستورالعمل محیط زیست", icon: "📖" },
          { id: "environment-bins", name: "سطل‌های زباله", icon: "🗑" },
          { id: "environment-wastewater", name: "پساب", icon: "💧" },
          { id: "environment-waste", name: "پسماندها و شیمیایی", icon: "☣️" },
          { id: "environment-self-extinguishing", name: "خود اطفایی", icon: "🧯" },
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