import Link from "next/link";
import { Search, Bell, Plus, Menu, Terminal, ArrowRightLeft } from "lucide-react";
import { PortalScreen } from "@/components/panel/types";

const titles: Record<PortalScreen, [string, string]> = {
  dashboard: ["داشبورد و میز کار", "نگاه کلی به پیشرفت پروژه‌ها، اسپرینت‌ها و وضعیت مالی"],
  projects: ["پروژه‌های من", "همه پروژه‌های جاری، فازهای توسعه و پروژه‌های تکمیل‌شده"],
  detail: ["جزئیات پروژه", "مراحل توسعه، اعضای تیم فنی، استیجینگ و مستندات"],
  messages: ["پیام‌ها و تیکت‌ها", "گفتگوی مستقیم با مدیر پروژه، طراح ارشد و مهندسان فنی"],
  invoices: ["فاکتورها و صورتحساب‌ها", "مدیریت اقساط، سوابق پرداخت و صدور پیش‌فاکتور"],
  files: ["فایل‌ها و تحویلی‌ها", "دانلود فایل‌های فیگما، سورس کدها، لایسنس و قراردادها"],
  notifications: ["اعلان‌های سیستمی", "رویدادهای اخیر، بازبینی‌ها و بروزرسانی‌های پروژه"],
  settings: ["تنظیمات حساب کارفرما", "مشخصات شرکت، شماره تماس، نوتیفیکیشن‌ها و امنیت"],
};

export default function TopBar({
  screen,
  onNewProject,
  onNotificationsClick,
  onMenuClick,
}: {
  screen: PortalScreen;
  onNewProject: () => void;
  onNotificationsClick: () => void;
  onMenuClick: () => void;
}) {
  const [title, sub] = titles[screen];

  return (
    <div className="sticky top-0 z-30 flex h-[72px] flex-none items-center justify-between gap-4 border-b border-ink-150 bg-white/90 backdrop-blur-md px-4 sm:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="باز کردن منو"
          className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-ink-200 text-ink-700 transition-colors hover:bg-ink-50 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate font-display text-base sm:text-lg font-bold text-ink-950">{title}</h1>
          <p className="hidden sm:block truncate text-xs text-ink-400 mt-0.5">{sub}</p>
        </div>
      </div>

      <div className="flex flex-none items-center gap-2.5 sm:gap-3">
        <div className="hidden h-10 w-64 items-center gap-2 rounded-2xl border border-ink-150 bg-ink-50/70 px-3.5 text-xs text-ink-400 lg:flex focus-within:border-accent-400 focus-within:bg-white transition-all">
          <Search className="h-4 w-4 text-ink-400" />
          <input
            type="text"
            placeholder="جستجو در پروژه‌ها و فایل‌ها..."
            className="w-full bg-transparent text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={onNotificationsClick}
          aria-label="اعلان‌ها"
          className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-ink-200 bg-white text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-950 shadow-xs"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent-600 ring-2 ring-white animate-pulse" />
        </button>

        <Link
          href="/admin"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-2xl border border-ink-200 bg-white px-3.5 py-2 text-xs font-bold text-ink-800 shadow-2xs hover:bg-ink-50 hover:border-ink-300 transition-all"
        >
          <Terminal className="h-3.5 w-3.5 text-accent-600" />
          <span>پنل تیم توسعه و ادمین</span>
        </Link>

        <button
          type="button"
          onClick={onNewProject}
          className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-accent-600 px-4 py-2.5 text-xs font-bold text-white shadow-glow hover:bg-accent-700 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>سفارش پروژه جدید</span>
        </button>
      </div>
    </div>
  );
}
