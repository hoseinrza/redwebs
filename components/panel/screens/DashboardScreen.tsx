"use client";

import {
  Sparkles,
  ArrowUpLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  MessageSquare,
  Layers,
  ChevronLeft,
  TrendingUp,
  Activity,
  ShieldCheck,
  Zap,
  ExternalLink,
  Calendar,
} from "lucide-react";
import {
  portalProjects,
  recentActivity,
  upcomingMilestones,
} from "@/lib/data/portal";

export default function DashboardScreen({
  onOpenProject,
  onGoProjects,
  onGoInvoices,
}: {
  onOpenProject: (id: string) => void;
  onGoProjects: () => void;
  onGoInvoices: () => void;
}) {
  const active = portalProjects.filter((p) => p.group === "در حال اجرا");

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8">
      {/* 1. Hero Executive Status Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 p-6 sm:p-8 text-white shadow-card border border-white/10">
        {/* Glow orb */}
        <div className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full bg-accent-600/25 blur-[90px]" />
        <div className="pointer-events-none absolute right-1/4 -bottom-16 h-48 w-48 rounded-full bg-emerald-600/15 blur-[80px]" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-accent-300 backdrop-blur-xs border border-white/15">
              <Sparkles className="h-3.5 w-3.5 text-accent-400" />
              <span>وضعیت اسپرینت جاری و پروژه‌ها</span>
            </div>

            <h2 className="font-display text-xl sm:text-3xl font-black text-white leading-tight">
              سه پروژه فعال در مسیر توسعه · یک فاکتور منتظر تایید
            </h2>

            <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
              آخرین نسخه تعاملی (Staging) صفحه اصلی <span className="text-white font-bold">کلینیک آرامش</span> توسط تیم فرانت‌اند بارگذاری شد و آماده بازبینی شماست.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onGoProjects}
              className="inline-flex items-center gap-2 rounded-2xl bg-accent-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-glow hover:bg-accent-700 transition-all active:scale-[0.98]"
            >
              <span>بازبینی طرح و استیجینگ</span>
              <ArrowUpLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onGoInvoices}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-xs hover:bg-white/15 transition-all"
            >
              <span>مشاهده و تسویه فاکتور</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="پروژه‌های فعال در حال اجرا"
          value="۳"
          icon={Layers}
          iconColor="text-accent-600 bg-accent-50"
          badge="بدون تاخیر زمانی"
          badgeColor="bg-emerald-50 text-emerald-700 border-emerald-200"
          trend="مطابق با برنامه اسپرینت"
        />
        <MetricCard
          label="فاکتور در انتظار پرداخت"
          value="۱"
          icon={FileText}
          iconColor="text-amber-600 bg-amber-50"
          badge="۸٬۵۰۰٬۰۰۰ تومان"
          badgeColor="bg-amber-50 text-amber-800 border-amber-200"
          trend="قسط دوم طراحی رابط کاربری"
        />
        <MetricCard
          label="پیام‌های خوانده‌نشده"
          value="۵"
          icon={MessageSquare}
          iconColor="text-sky-600 bg-sky-50"
          badge="پاسخ داده‌شده توسط مدیر فنی"
          badgeColor="bg-sky-50 text-sky-800 border-sky-200"
          trend="آخرین پیام: ۲ ساعت پیش"
        />
        <MetricCard
          label="مستندات و فایل‌های تحویلی"
          value="۲۴"
          icon={CheckCircle2}
          iconColor="text-emerald-600 bg-emerald-50"
          badge="+۳ فایل جدید"
          badgeColor="bg-emerald-50 text-emerald-700 border-emerald-200"
          trend="شامل فیگما v3 و اکسپورت‌ها"
        />
      </div>

      {/* 3. Main Dashboard Body (2 Columns) */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Active Projects List (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-ink-150 bg-white shadow-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink-150 px-6 py-5">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent-500" />
              <h3 className="text-sm sm:text-base font-bold text-ink-950">
                پروژه‌های در حال اجرای شما
              </h3>
            </div>
            <button
              type="button"
              onClick={onGoProjects}
              className="text-xs font-bold text-accent-700 hover:text-accent-800 hover:underline flex items-center gap-1"
            >
              <span>مشاهده آرشیو کامل</span>
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="divide-y divide-ink-100">
            {active.map((p) => (
              <div
                key={p.id}
                onClick={() => onOpenProject(p.id)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 transition-colors hover:bg-ink-50/70 cursor-pointer"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-bold text-xs shadow-xs border border-ink-200/60"
                    style={{ background: p.swatch }}
                  >
                    <Layers className="h-5 w-5 text-ink-800" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-ink-950 group-hover:text-accent-700 transition-colors">
                        {p.title}
                      </span>
                      <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-[10.5px] font-bold text-accent-800 border border-accent-200/80">
                        {p.stage}
                      </span>
                    </div>
                    <span className="text-[11.5px] text-ink-400 mt-1 block">
                      {p.dates}
                    </span>
                  </div>
                </div>

                {/* Progress bar + percentage */}
                <div className="flex items-center gap-4 sm:w-56 shrink-0 justify-between sm:justify-end">
                  <div className="flex-1 hidden sm:block">
                    <div className="flex justify-between text-[11px] font-semibold text-ink-500 mb-1">
                      <span>پیشرفت فنی</span>
                      <span className="font-mono text-ink-900 font-bold">{toFa(p.pct)}٪</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-ink-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-600 transition-all"
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>

                  <span className="sm:hidden font-mono font-bold text-xs text-accent-700 bg-accent-50 px-2.5 py-1 rounded-lg border border-accent-200">
                    {toFa(p.pct)}٪ تکمیل
                  </span>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-ink-600 group-hover:bg-accent-600 group-hover:text-white transition-all shadow-xs">
                    <ChevronLeft className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick SLA Banner inside Projects */}
          <div className="border-t border-ink-100 bg-ink-50/50 p-4 px-6 flex items-center justify-between text-xs text-ink-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>تمام پروژه‌ها تحت پوشش گارانتی تحویل SLA و مانیتورینگ آنلاین هستند.</span>
            </div>
            <span className="text-[11px] font-bold text-accent-700 hidden sm:inline-block">
              زمان پاسخ‌گویی فنی: زیر ۲ ساعت
            </span>
          </div>
        </div>

        {/* Milestones & Recent Feed Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Upcoming Milestones */}
          <div className="rounded-3xl border border-ink-150 bg-white p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <span className="text-xs sm:text-sm font-bold text-ink-950 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-accent-500" />
                <span>مایل‌استون‌ها و تحویل‌های پیش‌رو</span>
              </span>
              <span className="text-[10.5px] font-bold text-accent-700 bg-accent-50 px-2 py-0.5 rounded-full">
                ۳ گام مهم
              </span>
            </div>

            <div className="space-y-4">
              {upcomingMilestones.map((m, idx) => (
                <div key={m.title} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      m.active
                        ? "bg-accent-600 text-white shadow-xs"
                        : "bg-ink-100 text-ink-600 border border-ink-200"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold ${m.active ? "text-ink-950" : "text-ink-700"}`}>
                      {m.title}
                    </p>
                    <p className="text-[11px] text-ink-400 mt-0.5">{m.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity Feed */}
          <div className="rounded-3xl border border-ink-150 bg-white p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <span className="text-xs sm:text-sm font-bold text-ink-950 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>گزارش فعالیت‌های اخیر تیم</span>
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-3.5">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                  <div className="leading-relaxed">
                    <span className="font-medium text-ink-800">{a.text}</span>
                    <span className="block text-[10.5px] text-ink-400 mt-0.5">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function toFa(n: number) {
  return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

function MetricCard({
  label,
  value,
  icon: Icon,
  iconColor,
  badge,
  badgeColor,
  trend,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  badge: string;
  badgeColor: string;
  trend: string;
}) {
  return (
    <div className="rounded-3xl border border-ink-150 bg-white p-5 shadow-card space-y-3 transition-all hover:border-ink-200">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold border ${badgeColor}`}>
          {badge}
        </span>
      </div>

      <div>
        <span className="text-2xl font-black text-ink-950 font-mono">{toFa(+value || 0)}</span>
        <p className="text-xs font-semibold text-ink-600 mt-0.5">{label}</p>
      </div>

      <div className="border-t border-ink-100 pt-2 text-[11px] text-ink-400">
        {trend}
      </div>
    </div>
  );
}
