import Link from "next/link";
import { PortalScreen } from "@/components/panel/types";
import { getInitials } from "@/components/panel/initials";

const navItems: { key: PortalScreen; label: string; d: string; badge?: boolean }[] = [
  { key: "dashboard", label: "داشبورد", d: "M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" },
  { key: "projects", label: "پروژه‌ها", d: "M3 7h18M3 12h18M3 17h10" },
  { key: "messages", label: "پیام‌ها", d: "M4 4h16v12H7l-3 3V4z", badge: true },
  { key: "invoices", label: "فاکتورها", d: "M6 3h12v18l-3-2-3 2-3-2-3 2V3z" },
  { key: "files", label: "فایل‌ها", d: "M4 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" },
  { key: "notifications", label: "اعلان‌ها", d: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" },
  {
    key: "settings",
    label: "تنظیمات",
    d: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a7.6 7.6 0 000-6l1.5-1.2-2-3.4-1.8.8a7.6 7.6 0 00-5.2-3L11.5 0h-4L7 2.2a7.6 7.6 0 00-5.2 3L0 4.4l-2 3.4",
  },
];

export default function Sidebar({
  active,
  onNavigate,
  unreadCount,
  clientName,
  open,
  onClose,
}: {
  active: PortalScreen;
  onNavigate: (screen: PortalScreen) => void;
  unreadCount: number;
  clientName: string;
  open: boolean;
  onClose: () => void;
}) {
  const activeNavKey = active === "detail" ? "projects" : active;

  function handleNavigate(screen: PortalScreen) {
    onNavigate(screen);
    onClose();
  }

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="بستن منو"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-ink-950/40 lg:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex h-screen w-[250px] flex-none flex-col gap-6 border-l border-ink-150 bg-white p-[18px] transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:right-auto lg:bottom-auto lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-1 pt-1">
          <Link href="/" className="text-lg font-extrabold text-ink-950">
            <span className="text-accent-600">رد</span>وبز
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-ink-150 bg-ink-50 px-2.5 py-1 text-[10.5px] font-semibold text-ink-400">
              پنل مشتری
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن منو"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[18px] w-[18px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="flex flex-col gap-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeNavKey === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavigate(item.key)}
                className={`flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13px] transition-colors ${
                  isActive ? "bg-accent-50 font-semibold text-accent-600" : "font-medium text-ink-600 hover:bg-ink-50"
                }`}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.d} />
                </svg>
                <span className="flex-1 text-right">{item.label}</span>
                {item.badge && unreadCount > 0 && (
                  <span className="rounded-full bg-accent-50 px-1.5 py-0.5 text-[10.5px] font-bold text-accent-600">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <div className="rounded-[14px] bg-ink-950 p-4 text-white">
            <p className="text-[11px] text-ink-400">پکیج فعال</p>
            <p className="mt-1.5 text-[13.5px] font-bold">سایت شرکتی حرفه‌ای</p>
            <div className="mt-3 h-[5px] rounded-full bg-white/[0.14]">
              <div className="h-full w-[70%] rounded-full bg-accent-500" />
            </div>
            <p className="mt-2.5 text-[10.5px] text-ink-500">۷۰٪ از مسیر پروژه طی شده</p>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-ink-150 p-2.5">
            <div className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-accent-600 text-[11.5px] font-bold text-white">
              {getInitials(clientName)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-semibold text-ink-900">{clientName}</p>
              <Link href="/login" className="mt-0.5 block text-[10.5px] text-ink-400 hover:text-accent-600">
                خروج از حساب
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
