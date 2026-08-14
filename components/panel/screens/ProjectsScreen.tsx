"use client";

import { useState } from "react";
import { Plus, Layers, Sparkles, Clock, CheckCircle2, ChevronLeft, ArrowUpLeft } from "lucide-react";
import { portalProjects } from "@/lib/data/portal";
import { toPersianDigits } from "@/lib/format";

const filters = ["همه", "در حال اجرا", "تکمیل‌شده", "در انتظار"] as const;

export default function ProjectsScreen({
  onOpenProject,
  onNewProject,
}: {
  onOpenProject: (id: string) => void;
  onNewProject?: () => void;
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("همه");

  const visible = portalProjects.filter((p) => filter === "همه" || p.group === filter);

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8">
      {/* Header and Add Project CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-150 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-accent-600" />
            <h2 className="font-display text-base sm:text-lg font-bold text-ink-950">
              مدیریت و پایش پروژه‌ها
            </h2>
            <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-[11px] font-bold text-accent-700 border border-accent-200">
              {toPersianDigits(portalProjects.length)} پروژه ثبت‌شده
            </span>
          </div>
          <p className="text-xs text-ink-400 mt-1">
            مشاهده وضعیت اسپرینت‌ها، درصد پیشرفت فنی، لینک استیجینگ و زمان‌بندی تحویل
          </p>
        </div>

        {onNewProject && (
          <button
            type="button"
            onClick={onNewProject}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-600 px-5 py-2.5 text-xs font-bold text-white shadow-glow hover:bg-accent-700 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>سفارش پروژه جدید</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-2xl border px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "border-ink-950 bg-ink-950 text-white shadow-xs"
                  : "border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:bg-ink-50"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {visible.map((p) => {
          const isCompleted = p.pct === 100;
          const badgeTone = isCompleted
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : p.pct < 20
            ? "bg-ink-100 text-ink-600 border-ink-200"
            : "bg-accent-50 text-accent-700 border-accent-200";

          const barColor = isCompleted ? "#10b981" : "#e2374a";

          return (
            <div
              key={p.id}
              onClick={() => onOpenProject(p.id)}
              className="group cursor-pointer rounded-3xl border border-ink-150 bg-white p-5 sm:p-6 shadow-card transition-all hover:border-accent-300 hover:shadow-hover space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white font-bold text-sm shadow-xs"
                    style={{ background: p.swatch }}
                  >
                    {p.title.slice(0, 2)}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-ink-950 group-hover:text-accent-600 transition-colors">
                        {p.title}
                      </h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold border ${badgeTone}`}>
                        {p.stage}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink-400 font-mono">
                      بازه زمانی اسپرینت: {toPersianDigits(p.dates)}
                    </p>
                  </div>
                </div>

                {/* Progress bar & Percent */}
                <div className="flex items-center gap-4 shrink-0 sm:self-center">
                  <div className="w-36 sm:w-44 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono font-bold text-ink-700">
                      <span>پیشرفت پروژه</span>
                      <span>{toPersianDigits(p.pct)}٪</span>
                    </div>
                    <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${p.pct}%`, background: barColor }}
                      />
                    </div>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-50 text-ink-500 group-hover:bg-accent-600 group-hover:text-white transition-all">
                    <ArrowUpLeft className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
