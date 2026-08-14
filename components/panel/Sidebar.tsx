import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  MessageSquare,
  FileText,
  FolderArchive,
  Bell,
  Settings,
  LogOut,
  X,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  Terminal,
  ArrowRightLeft,
} from "lucide-react";
import { PortalScreen } from "@/components/panel/types";
import { getInitials } from "@/components/panel/initials";
import { toPersianDigits } from "@/lib/format";

const navItems: { key: PortalScreen; label: string; icon: React.ComponentType<{ className?: string }>; badge?: boolean }[] = [
  { key: "dashboard", label: "داشبورد اصلی", icon: LayoutDashboard },
  { key: "projects", label: "پروژه‌های من", icon: Layers },
  { key: "messages", label: "پیام‌ها و پشتیبانی", icon: MessageSquare, badge: true },
  { key: "invoices", label: "فاکتورها و مالی", icon: FileText },
  { key: "files", label: "فایل‌ها و تحویلی‌ها", icon: FolderArchive },
  { key: "notifications", label: "اعلان‌ها", icon: Bell },
  { key: "settings", label: "تنظیمات حساب", icon: Settings },
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
          className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex h-screen w-[260px] flex-none flex-col gap-5 border-l border-ink-150 bg-white p-4 transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:right-auto lg:bottom-auto lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Brand & Client Badge Header */}
        <div className="flex items-center justify-between px-2 pt-1">
          <Link href="/" className="font-display text-xl font-black text-ink-950">
            <span className="text-accent-600">رد</span>وبز
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-accent-200 bg-accent-50 px-2.5 py-0.5 text-[10.5px] font-bold text-accent-700">
              میز کارفرما
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن منو"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-xl text-ink-500 hover:bg-ink-100 lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeNavKey === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavigate(item.key)}
                className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-accent-600 text-white shadow-xs"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-950"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-ink-400"}`} />
                <span className="flex-1 text-right">{item.label}</span>
                {item.badge && unreadCount > 0 && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold ${
                      isActive
                        ? "bg-white text-accent-700"
                        : "bg-accent-100 text-accent-700"
                    }`}
                  >
                    {toPersianDigits(unreadCount)}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile & SLA Widget */}
        <div className="mt-auto flex flex-col gap-3">
          {/* Switch to Admin & Dev Portal */}
          <Link
            href="/admin"
            className="flex items-center justify-between gap-2 rounded-2xl bg-ink-950 hover:bg-ink-900 text-white p-3 text-xs font-bold transition-all shadow-xs border border-ink-800 group"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent-600 text-white shadow-2xs">
                <Terminal className="h-3.5 w-3.5" />
              </div>
              <span>پنل تیم توسعه و ادمین</span>
            </div>
            <span className="rounded-md bg-accent-500/20 text-accent-400 px-1.5 py-0.5 text-[10px] font-mono">
              Dev/CTO
            </span>
          </Link>

          {/* Active SLA Card */}
          <div className="rounded-2xl bg-gradient-to-br from-ink-950 to-ink-900 p-3.5 text-white shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-accent-400">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>پروژه فعال</span>
              </span>
              <span className="font-mono text-white">۷۰٪</span>
            </div>
            <p className="text-xs font-bold text-white truncate">کلینیک آرامش (Next.js)</p>
            <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full w-[70%] rounded-full bg-accent-500" />
            </div>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 rounded-2xl border border-ink-150 bg-ink-50/60 p-2.5">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-accent-600 text-xs font-bold text-white shadow-xs">
              {getInitials(clientName)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-ink-950">{clientName}</p>
              <Link
                href="/login"
                className="text-[10.5px] font-medium text-ink-400 hover:text-accent-600 transition-colors inline-flex items-center gap-1 mt-0.5"
              >
                <span>خروج از حساب</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
