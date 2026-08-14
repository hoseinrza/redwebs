"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
  Server,
  Code2,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRightLeft,
  Shield,
} from "lucide-react";
import { AdminTab } from "./AdminSidebar";

interface AdminTopBarProps {
  activeTab: AdminTab;
  onMenuClick: () => void;
  onOpenDeployModal: () => void;
  onOpenNewTaskModal: () => void;
  currentRole: string;
}

const TAB_TITLES: Record<AdminTab, { title: string; desc: string }> = {
  dashboard: { title: "مرکز فرماندهی و عملیات زنده", desc: "پایش بلادرنگ شاخص‌ها، سرورها و اسپرینت‌ها" },
  sprints: { title: "بورد اسپرینت و تسک‌های مهندسی", desc: "مدیریت چابک فیچرها، باگ‌ها و کدهای در حال بازبینی" },
  servers: { title: "مدیریت زیرساخت و کلاسترها (DevOps)", desc: "وضعیت کانتینرهای داکر، منابع و استقرار بدون قطعی" },
  clients: { title: "مدیریت کارفرمایان و CRM", desc: "اطلاعات مشتریان سازمانی، قراردادها و ورود شبیه‌سازی‌شده" },
  finance: { title: "امور مالی و حسابداری رسمی", desc: "تایید واریزی‌ها، فاکتورها و گزارش‌های مالی دوره‌ای" },
  team: { title: "تیم فنی و سطوح دسترسی", desc: "اعضای تیم مهندسی، تسک‌های جاری و دسترسی مخازن گیت" },
  logs: { title: "کنسول استریم زنده لاگ‌ها", desc: "ردیابی رویدادها، ترکینگ وب‌هوک‌ها و خطاهای کلاستر" },
  settings: { title: "پیکربندی سیستم و متغیرها", desc: "امنیت، نرخ درخواست‌ها، توکن‌های گیت‌وی و وب‌هوک‌ها" },
};

export default function AdminTopBar({
  activeTab,
  onMenuClick,
  onOpenDeployModal,
  onOpenNewTaskModal,
  currentRole,
}: AdminTopBarProps) {
  const current = TAB_TITLES[activeTab] || TAB_TITLES.dashboard;

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-ink-200 bg-white/95 px-4 sm:px-8 backdrop-blur-md font-sans">
      {/* Left side: Hamburger + Title */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-700 hover:bg-ink-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-black text-ink-950">{current.title}</h1>
          <p className="hidden text-xs text-ink-500 sm:block">{current.desc}</p>
        </div>
      </div>

      {/* Right side: Quick Action Buttons & Switcher */}
      <div className="flex items-center gap-3">
        {/* Switch to Client Panel Button */}
        <Link
          href="/panel"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-ink-200 bg-ink-50 hover:bg-ink-100 text-xs font-bold text-ink-800 transition-colors shadow-2xs"
        >
          <ArrowRightLeft className="h-3.5 w-3.5 text-accent-600" />
          <span>پنل کارفرما</span>
        </Link>

        {/* Quick New Task */}
        <button
          type="button"
          onClick={onOpenNewTaskModal}
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ink-950 text-white text-xs font-bold hover:bg-ink-800 transition-colors"
        >
          <Code2 className="h-3.5 w-3.5 text-accent-400" />
          <span>+ تسک جدید</span>
        </button>

        {/* Quick Deploy Button */}
        <button
          type="button"
          onClick={onOpenDeployModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-600 text-white text-xs font-bold hover:bg-accent-700 shadow-glow transition-all active:scale-95"
        >
          <Play className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">استقرار فوری</span>
          <span className="sm:hidden">Deploy</span>
        </button>

        {/* Admin profile mini badge */}
        <div className="flex items-center gap-2.5 pr-2 border-r border-ink-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-950 font-bold text-white text-xs shadow-xs">
            اد
          </div>
          <div className="hidden xl:block text-right">
            <span className="block text-xs font-bold text-ink-950">نگار رستمی (CTO)</span>
            <span className="block text-[10px] text-emerald-600 font-mono">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
