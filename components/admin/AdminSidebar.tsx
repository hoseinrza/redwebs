"use client";

import Link from "next/link";
import {
  Activity,
  Code2,
  Server,
  Users,
  DollarSign,
  Terminal,
  Sliders,
  LogOut,
  UserCheck,
  ShieldCheck,
  Zap,
  ArrowRightLeft,
  ChevronLeft,
} from "lucide-react";
import { toFa } from "@/lib/format";

export type AdminTab =
  | "dashboard"
  | "sprints"
  | "servers"
  | "clients"
  | "finance"
  | "team"
  | "logs"
  | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onNavigate: (tab: AdminTab) => void;
  open: boolean;
  onClose: () => void;
  currentRole: string;
  onChangeRole: (newRole: string) => void;
}

const NAV_ITEMS: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
  { id: "dashboard", label: "داشبورد و مانیتورینگ عملیات", icon: Activity },
  { id: "sprints", label: "بورد اسپرینت و تسک‌های کانبان", icon: Code2, badge: "اسپرینت ۴" },
  { id: "servers", label: "سرورها، کلاستر و DevOps", icon: Server },
  { id: "clients", label: "مدیریت کارفرمایان و CRM", icon: Users },
  { id: "finance", label: "امور مالی، فاکتورها و درگاه‌ها", icon: DollarSign },
  { id: "team", label: "تیم مهندسی و سطوح دسترسی", icon: ShieldCheck },
  { id: "logs", label: "کنسول زنده لاگ‌ها و دیباگ", icon: Terminal, badge: "Live" },
  { id: "settings", label: "پیکربندی، وب‌هوک و امنیت", icon: Sliders },
];

export default function AdminSidebar({
  activeTab,
  onNavigate,
  open,
  onClose,
  currentRole,
  onChangeRole,
}: AdminSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-ink-950 text-white border-l border-ink-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between border-b border-ink-800/80 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-600 font-bold text-white shadow-glow">
              رد
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">پنل تیم فنی و ادمین</span>
              <span className="block text-[10.5px] font-mono text-emerald-400">v3.4.2 · Production Live</span>
            </div>
          </Link>
        </div>

        {/* Role Selector Badge Card */}
        <div className="p-4 border-b border-ink-800/80">
          <div className="rounded-2xl bg-ink-900/90 border border-ink-800 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-ink-400 font-bold">نقش فعال در پنل:</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <select
              value={currentRole}
              onChange={(e) => onChangeRole(e.target.value)}
              className="w-full bg-ink-950 border border-ink-700 text-white text-xs font-bold rounded-xl px-2.5 py-1.5 outline-none cursor-pointer hover:border-accent-500 transition-colors"
            >
              <option value="Super Admin (CTO)">مدیر ارشد و CTO (دسترسی کامل)</option>
              <option value="Tech Lead & DevOps">تیم مهندسی و DevOps</option>
              <option value="Product & Scrum Master">مدیر محصول و اسکرام‌مستر</option>
            </select>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`group flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-xs font-bold transition-all ${
                  active
                    ? "bg-accent-600 text-white shadow-glow"
                    : "text-ink-300 hover:bg-ink-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${active ? "text-white" : "text-ink-400 group-hover:text-white"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold font-mono ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-ink-800 text-accent-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Switcher: Jump to Client Portal & Return Home */}
        <div className="p-4 border-t border-ink-800/80 space-y-2">
          <Link
            href="/panel"
            className="flex items-center justify-between w-full rounded-2xl bg-white/10 hover:bg-white/15 px-3.5 py-2.5 text-xs font-bold text-white transition-colors border border-white/10"
          >
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-accent-400" />
              <span>مشاهده پنل کارفرما</span>
            </div>
            <ChevronLeft className="h-4 w-4 text-ink-400" />
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-ink-900 hover:bg-ink-800 px-3.5 py-2.5 text-xs font-bold text-ink-400 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>خروج به صفحه اصلی سایت</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
