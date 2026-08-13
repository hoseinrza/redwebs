import { PortalScreen } from "@/components/panel/types";

const titles: Record<PortalScreen, [string, string]> = {
  dashboard: ["داشبورد", "نگاه کلی به پروژه‌ها و وضعیت حساب"],
  projects: ["پروژه‌های من", "همه پروژه‌های جاری و تکمیل‌شده"],
  detail: ["جزئیات پروژه", "مراحل، تیم و فایل‌های پروژه"],
  messages: ["پیام‌ها", "گفتگو با تیم پروژه و پشتیبانی"],
  invoices: ["فاکتورها", "وضعیت پرداخت‌ها و صورتحساب‌ها"],
  files: ["فایل‌ها", "تحویلی‌ها و اسناد پروژه"],
  notifications: ["اعلان‌ها", "رویدادهای اخیر حساب شما"],
  settings: ["تنظیمات حساب", "پروفایل، اعلان‌ها و امنیت"],
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
    <div className="sticky top-0 z-[5] flex h-[70px] flex-none items-center justify-between gap-3 border-b border-ink-150 bg-white px-4 sm:gap-4 sm:px-7">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="باز کردن منو"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] text-ink-700 transition-colors hover:bg-ink-100 lg:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-ink-900">{title}</p>
          <p className="mt-0.5 truncate text-[11.5px] text-ink-400">{sub}</p>
        </div>
      </div>
      <div className="flex flex-none items-center gap-3">
        <div className="hidden h-[38px] w-60 items-center gap-2 rounded-[10px] bg-ink-100 px-3 text-xs text-ink-400 lg:flex">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <span>جستجو در پروژه‌ها و فایل‌ها</span>
        </div>
        <button
          type="button"
          onClick={onNotificationsClick}
          aria-label="اعلان‌ها"
          className="relative flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-ink-100 transition-colors hover:bg-ink-150"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth={1.9} strokeLinecap="round">
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 01-3.4 0" />
          </svg>
          <span className="absolute right-[7px] top-[7px] h-[7px] w-[7px] rounded-full border-[1.5px] border-ink-100 bg-accent-600" />
        </button>
        <button
          type="button"
          onClick={onNewProject}
          className="hidden items-center gap-1.5 rounded-[10px] bg-accent-600 px-[18px] py-2.5 text-[12.5px] font-bold text-white transition-colors hover:bg-accent-700 sm:inline-flex"
        >
          درخواست پروژه جدید
        </button>
      </div>
    </div>
  );
}
