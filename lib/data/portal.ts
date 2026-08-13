export interface PortalProject {
  id: string;
  title: string;
  stage: string;
  group: "در حال اجرا" | "تکمیل‌شده" | "در انتظار";
  pct: number;
  swatch: string;
  dates: string;
}

export const portalProjects: PortalProject[] = [
  {
    id: "aramesh",
    title: "وب‌سایت شرکتی — کلینیک آرامش",
    stage: "طراحی رابط کاربری",
    group: "در حال اجرا",
    pct: 70,
    swatch: "#fef2f3",
    dates: "شروع: ۲ مرداد · تحویل: ۳ شهریور",
  },
  {
    id: "rokh",
    title: "فروشگاه آنلاین — استودیو رخ",
    stage: "توسعه و تست",
    group: "در حال اجرا",
    pct: 40,
    swatch: "#fde3e6",
    dates: "شروع: ۱۵ تیر · تحویل: ۳۰ مرداد",
  },
  {
    id: "parsa",
    title: "لندینگ‌پیج — دفتر وکالت پارسا",
    stage: "تکمیل‌شده",
    group: "تکمیل‌شده",
    pct: 100,
    swatch: "#e9f7ee",
    dates: "شروع: ۱ خرداد · تحویل: ۱۸ خرداد",
  },
  {
    id: "mehr",
    title: "سیستم رزرو — مرکز مهر",
    stage: "در انتظار بریف",
    group: "در انتظار",
    pct: 10,
    swatch: "#f4f4f5",
    dates: "شروع: ۲۰ مرداد · تحویل: تعیین‌نشده",
  },
];

export const projectMilestones = [
  { title: "بریف و جمع‌آوری محتوا", status: "done" as const, meta: "تکمیل‌شده · ۵ مرداد" },
  { title: "معماری اطلاعات و وایرفریم", status: "done" as const, meta: "تکمیل‌شده · ۱۰ مرداد" },
  { title: "طراحی رابط کاربری", status: "active" as const, meta: "در جریان · تحویل ۱۸ مرداد" },
  { title: "توسعه و پیاده‌سازی", status: "pending" as const, meta: "شروع ۲۰ مرداد" },
  { title: "تست نهایی و لانچ", status: "pending" as const, meta: "۳ شهریور" },
];

export const projectTeam = [
  { initials: "ن.ر", name: "نگار رستمی", role: "مدیر پروژه", bg: "#18181b" },
  { initials: "م.ک", name: "مهدی کاظمی", role: "طراح رابط کاربری", bg: "#c41f36" },
  { initials: "س.ا", name: "سینا احمدی", role: "توسعه‌دهنده", bg: "#52525b" },
];

export const projectRecentFiles = [
  { kind: "FIG", name: "طرح صفحه اصلی v3", meta: "۲ ساعت پیش", bg: "#fef2f3", fg: "#c41f36" },
  { kind: "PDF", name: "سند بریف پروژه", meta: "۵ مرداد", bg: "#f4f4f5", fg: "#52525b" },
  { kind: "ZIP", name: "فایل‌های برند", meta: "۳ مرداد", bg: "#f4f4f5", fg: "#52525b" },
];

export const recentActivity = [
  { text: "تیم طراحی نسخه جدید صفحه اصلی رو آپلود کرد", time: "۲ ساعت پیش" },
  { text: "فاکتور قسط دوم صادر شد", time: "دیروز" },
  { text: "مرحله محتوانویسی تکمیل شد", time: "۳ روز پیش" },
];

export const upcomingMilestones = [
  { title: "تحویل طرح صفحه اصلی", meta: "۱۸ مرداد · کلینیک آرامش", active: true },
  { title: "اتصال درگاه پرداخت", meta: "۲۵ مرداد · استودیو رخ", active: false },
  { title: "تست نهایی و لانچ", meta: "۳ شهریور · کلینیک آرامش", active: false },
];

export interface PortalThread {
  id: string;
  name: string;
  initials: string;
  preview: string;
  time: string;
  avatarBg: string;
  unread: boolean;
}

export const portalThreads: PortalThread[] = [
  {
    id: "team",
    name: "تیم پروژه — کلینیک آرامش",
    initials: "ت.پ",
    preview: "نسخه جدید صفحه اصلی آماده شد",
    time: "۲ س",
    avatarBg: "#c41f36",
    unread: true,
  },
  {
    id: "support",
    name: "پشتیبانی ردوبز",
    initials: "پ.ر",
    preview: "فاکتور قسط دوم صادر شد",
    time: "دیروز",
    avatarBg: "#71717a",
    unread: false,
  },
  {
    id: "rokh",
    name: "تیم پروژه — استودیو رخ",
    initials: "ر.خ",
    preview: "درگاه پرداخت تست شد",
    time: "۳ روز",
    avatarBg: "#18181b",
    unread: false,
  },
];

export const portalMessages: Record<string, { text: string; me: boolean }[]> = {
  team: [
    { text: "سلام آرمان، نسخه جدید صفحه اصلی رو آپلود کردیم. لطفاً بررسی کنید.", me: false },
    { text: "عالیه، همین الان چک می‌کنم.", me: true },
    { text: "فقط بخش فرم تماس یه تغییر کوچیک لازم داره.", me: true },
    { text: "حتماً، تا فردا اصلاح می‌کنیم و مجدد ارسال می‌کنیم.", me: false },
  ],
  support: [{ text: "فاکتور قسط دوم پروژه صادر شد و در بخش فاکتورها قابل مشاهده است.", me: false }],
  rokh: [
    { text: "درگاه پرداخت با موفقیت تست شد. آماده لانچ هستیم.", me: false },
    { text: "ممنون، پس فردا اعلام می‌کنم.", me: true },
  ],
};

export interface PortalInvoice {
  title: string;
  amount: string;
  date: string;
  paid: boolean;
}

export const portalInvoices: PortalInvoice[] = [
  { title: "کلینیک آرامش — قسط دوم", amount: "۸٬۵۰۰٬۰۰۰ ت", date: "۱۰ مرداد", paid: false },
  { title: "استودیو رخ — بیعانه", amount: "۶٬۰۰۰٬۰۰۰ ت", date: "۱۵ تیر", paid: true },
  { title: "دفتر وکالت پارسا — تسویه", amount: "۴٬۹۰۰٬۰۰۰ ت", date: "۱ خرداد", paid: true },
];

export const portalFiles = [
  { kind: "FIG", name: "طرح صفحه اصلی v3", meta: "۴٫۲ MB · ۲ ساعت پیش", bg: "#fef2f3", fg: "#c41f36" },
  { kind: "PDF", name: "سند بریف پروژه", meta: "۱٫۱ MB · ۵ مرداد", bg: "#f4f4f5", fg: "#52525b" },
  { kind: "ZIP", name: "فایل‌های برند", meta: "۱۸ MB · ۳ مرداد", bg: "#f4f4f5", fg: "#52525b" },
  { kind: "PNG", name: "اسکرین‌شات موبایل", meta: "۸۹۰ KB · ۱ مرداد", bg: "#fef2f3", fg: "#c41f36" },
  { kind: "DOC", name: "متن صفحات خدمات", meta: "۳۲۰ KB · ۲۸ تیر", bg: "#f4f4f5", fg: "#52525b" },
  { kind: "PDF", name: "قرارداد همکاری", meta: "۷۴۰ KB · ۲ تیر", bg: "#f4f4f5", fg: "#52525b" },
];

export const portalNotifications = [
  {
    title: "نسخه جدید طرح صفحه اصلی آماده بازبینی است",
    body: "کلینیک آرامش · تیم طراحی",
    time: "۲ ساعت پیش",
    unread: true,
  },
  {
    title: "فاکتور قسط دوم صادر شد",
    body: "مبلغ ۸٬۵۰۰٬۰۰۰ تومان · سررسید ۲۰ مرداد",
    time: "دیروز",
    unread: true,
  },
  { title: "مرحله محتوانویسی تکمیل شد", body: "کلینیک آرامش", time: "۳ روز پیش", unread: false },
  { title: "درگاه پرداخت با موفقیت تست شد", body: "استودیو رخ", time: "۴ روز پیش", unread: false },
  {
    title: "پروژه دفتر وکالت پارسا تحویل شد",
    body: "همه فایل‌ها در بخش فایل‌ها موجود است",
    time: "۱۸ خرداد",
    unread: false,
  },
];
