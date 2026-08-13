"use client";

import { useState } from "react";
import { portalProjects } from "@/lib/data/portal";

const filters = ["همه", "در حال اجرا", "تکمیل‌شده", "در انتظار"] as const;

function toFa(n: number) {
  return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

export default function ProjectsScreen({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("همه");

  const visible = portalProjects.filter((p) => filter === "همه" || p.group === filter);

  return (
    <div className="flex flex-col gap-4 px-5 pb-10 pt-6 sm:px-7">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                isActive ? "border-ink-950 bg-ink-950 text-white" : "border-ink-150 bg-white text-ink-600 hover:border-ink-300"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        {visible.map((p) => {
          const badgeTone =
            p.pct === 100
              ? "bg-emerald-50 text-emerald-700"
              : p.pct < 20
                ? "bg-ink-100 text-ink-500"
                : "bg-accent-50 text-accent-600";
          const barColor = p.pct === 100 ? "#10b981" : "#e2374a";

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onOpenProject(p.id)}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-ink-150 bg-white p-5 text-right transition-colors hover:border-ink-300"
            >
              <span className="h-14 w-14 flex-none rounded-[13px]" style={{ background: p.swatch }} />
              <span className="min-w-[160px] flex-1">
                <span className="block text-[14.5px] font-bold text-ink-900">{p.title}</span>
                <span className="mt-1.5 block text-xs text-ink-400">{p.dates}</span>
              </span>
              <span className={`flex-none rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${badgeTone}`}>
                {p.stage}
              </span>
              <span className="hidden w-[140px] flex-none sm:block">
                <span className="block h-1.5 rounded-full bg-ink-100">
                  <span className="block h-full rounded-full" style={{ width: `${p.pct}%`, background: barColor }} />
                </span>
              </span>
              <span className="w-9 flex-none text-left text-xs text-ink-400">{toFa(p.pct)}٪</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
